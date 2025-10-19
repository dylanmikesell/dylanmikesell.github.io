# Quickstart Guide: Professional Website Development

**Created**: 2025-10-19  
**Purpose**: Developer onboarding and setup instructions

## Prerequisites

### Required Software
- **Git**: Version control (latest)
- **Ruby**: 3.1.0 or higher
- **Bundler**: Ruby dependency management
- **Node.js**: 18+ (for build tools and testing)
- **Code Editor**: VS Code recommended with extensions

### Required Accounts  
- **GitHub**: Repository hosting and Pages deployment
- **SciXplorer**: API access for publications data
- **Google Analytics**: Visitor tracking (optional but recommended)

### VS Code Extensions (Recommended)
- Jekyll support
- HTML/CSS/JavaScript language support
- Markdown preview
- Git integration
- Live Server for local testing

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/dylanmikesell/dylanmikesell.github.io.git
cd dylanmikesell.github.io
git checkout 001-professional-website
```

### 2. Install Dependencies
```bash
# Install Ruby gems
bundle install

# Install Node.js dependencies (if using build tools)
npm install

# Verify Jekyll installation
bundle exec jekyll --version
```

### 3. Configure Environment Variables
Create `.env` file (ignored by git):
```bash
# SciXplorer API Configuration
SCIXPLORER_API_KEY=your_api_key_here
SCIXPLORER_LIBRARY_ID=your_library_id_here
SCIXPLORER_GRANTS_ID=your_grants_library_id_here

# Google Analytics
GA_TRACKING_ID=G-XXXXXXXXXX

# Contact form service (if using external service)
CONTACT_FORM_ENDPOINT=https://your-form-service.com/submit
```

### 4. Set Up GitHub Repository Secrets
In GitHub repository settings > Secrets and variables > Actions:
```
SCIXPLORER_API_KEY: your_api_key_here
SCIXPLORER_LIBRARY_ID: your_library_id_here
GA_TRACKING_ID: G-XXXXXXXXXX
```

## Development Workflow

### Local Development Server
```bash
# Start Jekyll development server
bundle exec jekyll serve --livereload

# With drafts and future posts
bundle exec jekyll serve --drafts --future --livereload

# Custom port (if 4000 is occupied)
bundle exec jekyll serve --port 4001
```

Website will be available at: `http://localhost:4000`

### Project Structure Overview
```
dylanmikesell.github.io/
├── _config.yml              # Jekyll configuration
├── _data/                   # Static data files
│   ├── profile.yml          # Personal/professional info
│   ├── experience.yml       # Academic/work history
│   ├── projects.yml         # Research projects
│   └── students.yml         # Student opportunities
├── _includes/               # Reusable components
│   ├── header.html          # Site navigation
│   ├── footer.html          # Site footer
│   ├── publication-list.html # Publications display
│   └── contact-form.html    # Contact form
├── _layouts/                # Page templates
│   ├── default.html         # Base layout
│   ├── page.html           # Standard pages
│   └── home.html           # Homepage layout
├── _sass/                   # Stylesheet partials
│   ├── base.scss           # Base styles
│   ├── components.scss     # Component styles
│   └── responsive.scss     # Mobile responsiveness
├── assets/                  # Static assets
│   ├── css/                # Compiled CSS
│   ├── js/                 # JavaScript files
│   ├── images/             # Images and photos
│   └── files/              # Downloadable files (CV, etc.)
├── _posts/                  # Blog posts (if needed)
├── pages/                   # Static pages
│   ├── about.md            # About/research page
│   ├── publications.md     # Publications list
│   ├── research.md         # Research projects
│   ├── students.md         # Student opportunities
│   └── contact.md          # Contact information
└── index.md                # Homepage
```

## Content Management

### Adding Content

#### Update Profile Information
Edit `_data/profile.yml`:
```yaml
name: "Dylan Mikesell"
title: "Research Scientist"
affiliation: "Institution Name"
research_interests:
  - "Cryosphere Science"
  - "Solid Earth Geophysics"
  - "Seismic Methods"
bio_summary: |
  Professional biography here...
```

#### Add Academic Experience
Edit `_data/experience.yml`:
```yaml
positions:
  - position: "Research Scientist"
    institution: "Institution Name"
    start_date: "2020-01-01"
    end_date: null  # null for current position
    responsibilities:
      - "Lead research projects..."
      - "Mentor graduate students..."
```

#### Add Research Projects
Edit `_data/projects.yml`:
```yaml
projects:
  - id: "project-001"
    title: "Project Title"
    description: "Project description..."
    status: "active"
    featured: true
    funding_sources:
      - "NSF Grant #12345"
```

### API Integration Testing

#### Test SciXplorer API Connection
```bash
# Test API connectivity
curl -H "Authorization: Bearer YOUR_API_KEY" \
     "https://api.adsabs.harvard.edu/v1/biblib/libraries/YOUR_LIBRARY_ID"

# Test from Jekyll (development)
bundle exec jekyll build --verbose
```

#### Verify API Caching
1. Load publications page
2. Check browser developer tools > Network tab
3. Verify API calls are cached appropriately
4. Test manual refresh functionality

## Testing & Validation

### Performance Testing
```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Run Lighthouse audit
lhci autorun --upload.target=temporary-public-storage

# Test mobile performance specifically
lighthouse http://localhost:4000 --preset=perf --form-factor=mobile
```

### Accessibility Testing
```bash
# Install axe CLI
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:4000 --tags wcag2a,wcag2aa
```

### HTML Validation
```bash
# Install html5validator
pip install html5validator

# Validate generated site
bundle exec jekyll build
html5validator --root _site/
```

### Cross-Browser Testing
Test in multiple browsers:
- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)
- Mobile Chrome/Safari

## Deployment

### GitHub Pages Deployment
```bash
# Commit changes
git add .
git commit -m "feat: add content updates"

# Push to GitHub (auto-deploys to Pages)
git push origin 001-professional-website

# Merge to main when ready for production
git checkout main
git merge 001-professional-website
git push origin main
```

### Custom Domain Setup (Optional)
1. Add CNAME file to repository root:
   ```
   www.dylantmikesell.com
   ```
2. Configure DNS A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

## Monitoring & Maintenance

### Google Analytics Setup
1. Create GA4 property
2. Add tracking ID to `_config.yml`:
   ```yaml
   google_analytics: G-XXXXXXXXXX
   ```
3. Verify tracking in GA dashboard

### Performance Monitoring
- Weekly Lighthouse audits
- Monthly accessibility testing  
- Quarterly dependency updates
- Annual content review and updates

### API Key Rotation
- Rotate SciXplorer API keys quarterly
- Update GitHub repository secrets
- Test deployment after key rotation

## Troubleshooting

### Common Issues

#### Jekyll Build Errors
```bash
# Clear cache and rebuild
bundle exec jekyll clean
bundle exec jekyll build --verbose
```

#### API Connection Issues
1. Verify API key is valid
2. Check rate limiting status
3. Test with curl command
4. Review error logs in browser console

#### Performance Issues  
1. Optimize images (compress, resize)
2. Minimize CSS/JavaScript
3. Review API caching strategy
4. Check third-party dependencies

#### Mobile Display Issues
1. Test on actual mobile devices
2. Use browser developer tools device simulation
3. Verify viewport meta tag
4. Check responsive CSS breakpoints

## Support Resources

- **Jekyll Documentation**: https://jekyllrb.com/docs/
- **GitHub Pages**: https://docs.github.com/en/pages
- **SciXplorer API**: https://ui.adsabs.harvard.edu/help/api/
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **Web Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/

For project-specific questions, refer to the specification documents in `specs/001-professional-website/`.