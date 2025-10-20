#!/bin/bash
# Working NASA ADS Data Sync Script
# Fetches publication data from NASA ADS API and converts to Jekyll-compatible static data

set -e

# Configuration - Use environment variables for security
API_TOKEN="${ADS_TOKEN:-}"
LIBRARY_ID="${ADS_LIBRARY_ID:-2xPvCd9BSHKpZtiqPsgexQ}"  # Safe to include library IDs
GRANTS_ID="${ADS_GRANTS_ID:-8wXghzfWQOCJg-8sWjsnUA}"   # Safe to include grants IDs
ADS_API_URL="https://api.adsabs.harvard.edu/v1"
OUTPUT_DIR="_data"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "🔄 NASA ADS Data Sync - $(date)"
echo "=================================="

# Validate API token is provided
if [ -z "$API_TOKEN" ]; then
    echo "❌ Error: ADS_TOKEN environment variable is required"
    echo "Please set your NASA ADS API token: export ADS_TOKEN=your_token_here"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Function to fetch publication details for a single bibcode
fetch_single_publication() {
    local bibcode="$1"
    curl -s -H "Authorization: Bearer ${API_TOKEN}" \
        "https://api.adsabs.harvard.edu/v1/search/query?q=bibcode:${bibcode}&fl=title,author,pub,year,citation_count,doi,abstract,keyword,doctype,bibcode" | \
        jq '.response.docs[0]' 2>/dev/null
}

# Function to fetch all publications
fetch_publications() {
    echo "📚 Fetching publications from NASA ADS API..."
    
    # Get all bibcodes from library (request all documents)
    local library_response=$(curl -s -H "Authorization: Bearer ${API_TOKEN}" \
        "${ADS_API_URL}/biblib/libraries/${LIBRARY_ID}?start=0&rows=1000")
    
    if [ $? -ne 0 ] || [ -z "$library_response" ]; then
        echo "❌ Failed to fetch library"
        return 1
    fi
    
    local bibcodes=($(echo "$library_response" | jq -r '.documents[]'))
    local total_bibcodes=${#bibcodes[@]}
    
    echo "📖 Processing $total_bibcodes publications..."
    
    # Create temporary file for collecting results
    local temp_file=$(mktemp)
    echo "[]" > "$temp_file"
    
    local processed=0
    local successful=0
    
    for bibcode in "${bibcodes[@]}"; do
        processed=$((processed + 1))
        echo -n "  [$processed/$total_bibcodes] $bibcode... "
        
        local pub_data=$(fetch_single_publication "$bibcode")
        
        if [ "$pub_data" != "null" ] && [ -n "$pub_data" ] && [ "$pub_data" != "{}" ]; then
            # Validate that we have essential fields
            local title_check=$(echo "$pub_data" | jq -r '.title[0]? // empty')
            if [ -n "$title_check" ]; then
                # Add to results array
                local new_array=$(jq --argjson pub "$pub_data" '. + [$pub]' "$temp_file")
                echo "$new_array" > "$temp_file"
                successful=$((successful + 1))
                echo "✓"
            else
                echo "✗ (no title)"
            fi
        else
            echo "✗ (no data)"
        fi
        
        # Add small delay to respect rate limits
        sleep 0.1
    done
    
    echo "📄 Successfully retrieved $successful/$total_bibcodes publications"
    
    if [ "$successful" -eq 0 ]; then
        rm "$temp_file"
        return 1
    fi
    
    # Create final JSON structure
    echo "💾 Creating JSON data file..."
    local json_result=$(jq --arg timestamp "$TIMESTAMP" --argjson total "$successful" '
    {
        "last_updated": $timestamp,
        "total_count": $total,
        "publications": [
            .[] | {
                "title": ((.title // [])[0] // ""),
                "authors": ((.author // []) | join(", ")),
                "venue": (.pub // ""),
                "year": (.year // ""),
                "citations": (.citation_count // 0),
                "doi": ((.doi // [])[0] // ""),
                "abstract": (.abstract // ""),
                "keywords": ((.keyword // []) | join(", ")),
                "type": (.doctype // "article"),
                "bibcode": (.bibcode // "")
            }
        ]
    }' "$temp_file")
    
    if [ $? -eq 0 ] && [ -n "$json_result" ]; then
        echo "$json_result" > "$OUTPUT_DIR/publications.json"
        echo "✅ JSON file created"
    else
        echo "❌ Failed to create JSON file"
        rm "$temp_file"
        return 1
    fi
    
    # Also create YAML version
    echo "💾 Creating YAML data file..."
    cat > "$OUTPUT_DIR/publications.yml" << EOF
# Auto-generated from NASA ADS API on $TIMESTAMP
last_updated: "$TIMESTAMP"
total_count: $successful
publications:
EOF
    
    # Process each publication for YAML
    for i in $(seq 0 $((successful - 1))); do
        echo "  Processing publication $((i + 1))/$successful for YAML..."
        local pub_data=$(jq ".[$i]" "$temp_file")
        local title=$(echo "$pub_data" | jq -r '(.title // [])[0] // ""' | sed 's/"/\\"/g')
        local authors=$(echo "$pub_data" | jq -r '(.author // []) | join(", ")' | sed 's/"/\\"/g')
        local venue=$(echo "$pub_data" | jq -r '.pub // ""' | sed 's/"/\\"/g')
        local year=$(echo "$pub_data" | jq -r '.year // ""')
        local citations=$(echo "$pub_data" | jq -r '.citation_count // 0')
        local doi=$(echo "$pub_data" | jq -r '(.doi // [])[0] // ""')
        local abstract=$(echo "$pub_data" | jq -r '.abstract // ""' | sed 's/"/\\"/g' | tr '\n' ' ')
        local bibcode=$(echo "$pub_data" | jq -r '.bibcode // ""')
        
        cat >> "$OUTPUT_DIR/publications.yml" << EOF
  - title: "$title"
    authors: "$authors"
    venue: "$venue"
    year: $year
    citations: $citations
    doi: "$doi"
    abstract: "$abstract"
    type: "article"
    bibcode: "$bibcode"
EOF
    done
    
    echo "✅ YAML file created"
    
    rm "$temp_file"
    return 0
}

# Function to calculate metrics
calculate_metrics() {
    echo "📊 Calculating metrics..."
    
    if [ ! -f "$OUTPUT_DIR/publications.json" ]; then
        echo "❌ No publications data found"
        return 1
    fi
    
    jq -r --arg timestamp "$TIMESTAMP" '
    {
        "last_updated": $timestamp,
        "total_publications": .total_count,
        "total_citations": (.publications | map(.citations) | add),
        "h_index": (
            .publications 
            | map(.citations) 
            | sort 
            | reverse 
            | to_entries 
            | map(select(.value >= (.key + 1))) 
            | length
        ),
        "recent_publications": (
            .publications 
            | map(select(.year >= (now | strftime("%Y") | tonumber) - 3)) 
            | length
        ),
        "years_active": (
            .publications 
            | map(.year) 
            | unique 
            | length
        ),
        "most_cited": (
            .publications 
            | sort_by(.citations) 
            | reverse 
            | .[0]
        )
    }' "$OUTPUT_DIR/publications.json" > "$OUTPUT_DIR/metrics.json"
    
    echo "✅ Metrics calculated"
    return 0
}

# Function to create featured publications
create_featured() {
    echo "⭐ Creating featured publications..."
    
    if [ ! -f "$OUTPUT_DIR/publications.json" ]; then
        echo "❌ No publications data found"
        return 1
    fi
    
    jq -r --arg timestamp "$TIMESTAMP" '
    {
        "last_updated": $timestamp,
        "featured": (
            .publications 
            | sort_by(.citations) 
            | reverse 
            | .[0:5]
        )
    }' "$OUTPUT_DIR/publications.json" > "$OUTPUT_DIR/featured_publications.json"
    
    echo "✅ Featured publications created"
    return 0
}

# Main execution
main() {
    if ! command -v jq &> /dev/null; then
        echo "❌ jq is required but not installed."
        exit 1
    fi
    
    echo "🔍 Testing NASA ADS API connection..."
    
    local test_response=$(curl -s -H "Authorization: Bearer ${API_TOKEN}" \
        "${ADS_API_URL}/biblib/libraries/${LIBRARY_ID}")
    
    if [ $? -ne 0 ] || [ -z "$test_response" ]; then
        echo "❌ Cannot connect to NASA ADS API"
        exit 1
    fi
    
    if echo "$test_response" | jq -e '.error' > /dev/null 2>&1; then
        echo "❌ API Error: $(echo "$test_response" | jq -r '.error')"
        exit 1
    fi
    
    echo "✅ API connection successful"
    echo ""
    
    # Fetch all data
    if fetch_publications; then
        calculate_metrics
        create_featured
        
        echo ""
        echo "🎉 Sync completed successfully!"
        echo "📁 Data files created in $OUTPUT_DIR/"
        echo "   - publications.json (JSON format)"
        echo "   - publications.yml (YAML format)"
        echo "   - metrics.json (calculated metrics)"
        echo "   - featured_publications.json (top publications)"
        
        echo ""
        echo "📈 Summary:"
        if [ -f "$OUTPUT_DIR/metrics.json" ]; then
            echo "   Total Publications: $(jq -r '.total_publications' "$OUTPUT_DIR/metrics.json")"
            echo "   Total Citations: $(jq -r '.total_citations' "$OUTPUT_DIR/metrics.json")"
            echo "   h-index: $(jq -r '.h_index' "$OUTPUT_DIR/metrics.json")"
        fi
        
        echo ""
        echo "💡 Next steps:"
        echo "   1. Commit the updated data files: git add _data/ && git commit -m 'Update publication data'"
        echo "   2. Push to GitHub: git push"
        echo "   3. Your GitHub Pages site will now show real data!"
        
    else
        echo "❌ Sync failed"
        exit 1
    fi
}

# Run the script
main "$@"