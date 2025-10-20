# Deployment Configuration

## GitHub Pages Setup

Your website uses static data files updated via NASA ADS sync script. No runtime API integration or repository secrets required for GitHub Pages deployment.

### Static Data Approach

The site uses pre-generated static data files instead of real-time API calls:

- **Publications Data**: `_data/publications.yml` and `_data/publications.json`
- **Metrics Data**: `_data/metrics.json` 
- **Featured Publications**: `_data/featured_publications.json`
- **Profile Data**: `_data/profile.yml`

### NASA ADS Sync Script

To update publication data, run the sync script locally:

```bash
# Update publications from NASA ADS API
./sync-ads-data.sh

# Verify the updates
cat _data/metrics.json
head -20 _data/publications.yml
```

**Script Requirements**:
- NASA ADS API token (set as environment variable `ADS_TOKEN`)
- `jq` command-line JSON processor
- `curl` for API requests

### Local Development

For local testing, simply run Jekyll with the static data files:

```bash
bundle exec jekyll serve
# Visit http://localhost:4000/publications/
```

**No API credentials needed** - the site uses static data files committed to the repository.

### Current Data Status

Your website currently has:
- **46 Publications** (fetched from NASA ADS API)
- **1,110 Total Citations**
- **h-index: 16**
- **Recent Publications (2020+): 11**

Data last updated: Check timestamp in `_data/publications.yml`

### Manual Data Updates

#### Publications Update Process:
1. Set your NASA ADS API token: `export ADS_TOKEN=your_token_here`
2. Run sync script: `./sync-ads-data.sh`
3. Review generated files in `_data/` directory
4. Test locally: `bundle exec jekyll serve`
5. Commit and push changes to deploy

#### Manual Data Curation:
- **Profile Data**: Edit `_data/profile.yml` for personal information
- **Experience**: Edit `_data/experience.yml` for career history
- **Projects**: Edit `_data/projects.yml` for research projects
- **Expertise**: Edit `_data/expertise.yml` for skills and domains

### Deployment Commands

```bash
# Update publications and grants
./sync-ads-data.sh 
# Build and test locally
bundle exec jekyll build
bundle exec jekyll serve

# Deploy to GitHub Pages
git add .
git commit -m "Update publication data via NASA ADS sync"
git push origin main
```

### Verification

After deployment, verify:
1. Publications page loads: `/publications/`
2. Publication data displays correctly
3. Metrics show current values
4. Search and filters work
5. Export functions are enabled