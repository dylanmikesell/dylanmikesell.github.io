# Data Contracts: Professional Website

**Created**: 2025-10-19  
**Updated**: 2025-10-20  
**Purpose**: Define data structures and sync processes for website functionality

## Static Data Architecture

The website uses static Jekyll data files instead of real-time API calls. Data is updated via sync scripts that fetch from external APIs and generate static files.

## NASA ADS API Integration (Sync Script Only)

### Publications Sync Process

**Sync Script**: `./sync-ads-data.sh`  
**API Base URL**: `https://api.adsabs.harvard.edu/v1/`  
**Output Files**: `_data/publications.yml`, `_data/publications.json`, `_data/metrics.json`

#### NASA ADS Search Endpoint (Used by Sync Script)
```http
GET /search/q
Authorization: Bearer {ADS_TOKEN}
Content-Type: application/json
```

**Parameters** (used in sync script):
- `q`: Search query (e.g., `author:"Mikesell, T Dylan"`)
- `fl`: Fields to return (bibcode,title,author,pub,year,citation_count,doi,abstract)
- `sort`: Sort order (date desc)
- `rows`: Results per page (default: 200)

**API Response**:
```json
{
  "response": {
    "docs": [
      {
        "bibcode": "2024FRSPT...4.1510Z",
        "title": ["Research Paper Title"],
        "author": ["Author, First", "Mikesell, T. Dylan"],
        "pub": "Frontiers in Space Technologies", 
        "year": "2024",
        "citation_count": 15,
        "doi": ["10.3389/frspt.2024.1510635"],
        "abstract": "Full abstract text..."
      }
    ],
    "numFound": 46
  }
```

## Generated Static Data Files

### Publications Data Structure

**File**: `_data/publications.yml`
```yaml
# Auto-generated from NASA ADS API on 2025-10-19T18:48:02Z
last_updated: "2025-10-19T18:48:02Z"
total_count: 46
publications:
  - title: "Research Paper Title"
    authors: "Author, First, Mikesell, T. Dylan, Author, Third"
    venue: "Journal Name"
    year: 2024
    citations: 15
    doi: "10.1000/journal.2024.123456"
    bibcode: "2024JName.123..456A"
    abstract: "Full abstract text..."
    keywords: ["keyword1", "keyword2"]
```

**File**: `_data/metrics.json`
```json
{
  "total_publications": 46,
  "total_citations": 1110,
  "h_index": 16,
  "recent_publications": 11,
  "years_active": "2012-2024",
  "avg_citations_per_paper": 24.1,
  "most_cited": {
    "title": "Most Cited Paper Title",
    "citations": 89,
    "year": 2018
  },
  "last_updated": "2025-10-19T18:48:02Z"
}
```

### Manual Data Files

**File**: `_data/profile.yml`
```yaml
name: "Dylan Mikesell"
title: "Research Geophysicist"
affiliation: "Boise State University"
orcid: "0000-0000-0000-0000"  # Update with real ORCID
email: "research@example.com"  # Update with real email
bio: "Professional bio text..."
```

### Sync Script Implementation

**Script**: `sync-ads-data.sh`
- Fetches publications from NASA ADS API using author search
- Processes JSON response with `jq` 
- Generates Jekyll-compatible YAML and JSON data files
- Calculates citation metrics and publication statistics
- Updates last_updated timestamps

**Requirements**:
- Environment variable: `ADS_TOKEN` (NASA ADS API token)
- Dependencies: `curl`, `jq`
- Output: Updates `_data/publications.yml`, `_data/metrics.json`, `_data/featured_publications.json`

## Contact Form API

### Submit Contact Form
```http
POST /contact
Content-Type: application/json
```

**Request**:
```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com", 
  "subject": "Research Collaboration Inquiry",
  "message": "Detailed message content...",
  "inquiry_type": "collaboration",
  "captcha_response": "captcha_token"
}
```

**Response Success**:
```json
{
  "status": "success",
  "message": "Your message has been sent successfully.",
  "id": "msg_123456789"
}
```

**Response Error**:
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "message": "Message is required"
  }
}
```

## Jekyll Data Access (Client-Side)

### Access Publications Data
```javascript
// Publications data available via Jekyll site.data
// Accessed in Liquid templates as: site.data.publications
```

**Jekyll Data Structure**:
```yaml
# Available as site.data.publications
last_updated: "2025-10-19T18:48:02Z"
total_count: 46
publications: [...]
```

### Access Metrics Data
```javascript  
// Metrics available via Jekyll site.data
// Accessed in Liquid templates as: site.data.metrics
```

**Jekyll Data Structure**:
```json
{
  "total_publications": 46,
  "total_citations": 1110,
  "h_index": 16,
  "last_updated": "2025-10-19T18:48:02Z"
}
```

### Access Profile Data
```javascript
// Profile data available via Jekyll site.data
// Accessed in Liquid templates as: site.data.profile
```

**Response**:
```json
{
  "profile": {
    "name": "Dylan Mikesell",
    "title": "Research Scientist",
    "affiliation": "Institution Name",
    "research_interests": [...],
    "bio_summary": "Professional biography...",
    "orcid": "0000-0000-0000-0000"
  },
  "contact": {
    "email_primary": "email@institution.edu",
    "orcid_url": "https://orcid.org/...",
    "google_scholar_url": "https://scholar.google.com/..."
  }
}
```

## Error Handling Standards

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (API key issues)  
- `429`: Too Many Requests (rate limiting)
- `500`: Internal Server Error
- `503`: Service Unavailable (API maintenance)

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error description",
    "details": {
      "field": "Specific field error"
    },
    "timestamp": "2025-10-19T10:30:00Z"
  }
}
```

## Rate Limits & Security

### NASA ADS API (Sync Script)
- **Limit**: 5,000 requests/day per API token
- **Burst**: 10 requests/second
- **Usage**: Manual sync script execution only

### Contact Form
- **Limit**: 5 submissions/hour per IP address  
- **Protection**: reCAPTCHA v3 integration
- **Spam**: Content filtering and honeypot fields

## Static Site Performance

### Jekyll Build Optimization
- Static data files for optimal loading speed
- No runtime API dependencies
- Pre-generated content during build process
- Optimized for GitHub Pages hosting

### Content Freshness
- **Publications**: Updated via manual sync script execution
- **Profile**: Manual updates to `_data/profile.yml`
- **Projects**: Manual updates to `_data/projects.yml` 
- **Contact form**: Real-time submission (no static data)

## Security Considerations

### API Token Management (Sync Script)
- Store NASA ADS token as environment variable (`ADS_TOKEN`)
- Never commit tokens to repository
- Use only for local sync script execution
- Rotate periodically for security

### Contact Form Security
- CSRF protection with tokens
- Input sanitization and validation
- Rate limiting by IP address
- Email validation and domain checking
- Content filtering for spam detection

### Static Site Security
- No client-side API keys or secrets
- Content served via HTTPS (GitHub Pages)
- No runtime database or API dependencies
- Secure static file hosting

All data contracts follow Jekyll conventions and static site best practices to meet constitutional requirements for performance, security, and maintainability.