# Dylan Mikesell Professional Website
# Constitutional Requirements: Performance, Mobile-First, Accessibility

source "https://rubygems.org"
git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# GitHub Pages compatible configuration
gem "github-pages", group: :jekyll_plugins

# Essential Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap" 
  gem "jekyll-seo-tag"
end

# Development Dependencies
group :development do
  gem "wdm", "~> 0.1.1", platforms: [:mingw, :x64_mingw, :mswin]
  gem "html-proofer", "~> 5.0"
  gem "parallel", "~> 1.22"
end

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance monitoring
gem "wdm", ">= 0.1.0" if Gem.win_platform?