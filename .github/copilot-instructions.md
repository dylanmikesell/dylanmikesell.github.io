# dylanmikesell.github.io Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-10-20

## Active Technologies
- HTML5, CSS3, JavaScript ES6+, Ruby 3.1+ (Jekyll), Liquid templating, Bash scripting (001-professional-website)
- NASA ADS API (sync script only), Static data files (_data/), GitHub Pages deployment

## Project Structure
```
_data/                   # Static data files (publications, metrics, profile)
_includes/               # Jekyll includes and components
_layouts/                # Jekyll page templates  
pages/                   # Markdown content pages
assets/                  # CSS, JavaScript, images
sync-ads-data.sh         # NASA ADS publication sync script
specs/                   # Feature specifications and documentation
```

## Commands
bundle exec jekyll build && bundle exec jekyll serve

## Data Management
- Publications: Use ./sync-ads-data.sh to update from NASA ADS API
- Profile/Experience: Edit _data/ YAML files manually
- No real-time API calls - all data is static Jekyll files

## Code Style
HTML5, CSS3, JavaScript ES6+, Ruby 3.1+ (Jekyll), Liquid templating: Follow standard conventions

## Recent Changes
- 001-professional-website: Added HTML5, CSS3, JavaScript ES6+, Ruby 3.1+ (Jekyll), Liquid templating

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
