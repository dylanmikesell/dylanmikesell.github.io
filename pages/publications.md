---
layout: page
title: "Publications"
description: "Comprehensive list of research publications in geophysics and related fields"
# description: "Comprehensive list of research publications, conference presentations, and scholarly contributions in geophysics and related fields"
permalink: /publications/
navigation_weight: 2
---

<div class="publications-page">
  <!-- Publication Statistics -->
  <div class="statistics-section">
    <h2>Publication Statistics</h2>
    <div class="stats-grid">
      <div class="stat-item">
        <strong>Total Publications:</strong> {{ site.data.metrics.total_publications }}
      </div>
      <div class="stat-item">
        <strong>Total Citations:</strong> {{ site.data.metrics.total_citations }}
      </div>
      <div class="stat-item">
        <strong>h-index:</strong> {{ site.data.metrics.h_index }}
      </div>
      <div class="stat-item">
        <strong>Years Active:</strong> {{ site.data.metrics.years_active }}
      </div>
      <div class="stat-item">
        <strong>Most Cited Paper:</strong> {{ site.data.metrics.most_cited.citations }} citations
      </div>
      <div class="stat-item">
        <strong>Average Citations per Paper:</strong> 
        {% assign avg_citations = site.data.metrics.total_citations | divided_by: site.data.metrics.total_publications %}
        {{ avg_citations }}
      </div>
      <div class="stat-item">
        <strong>Publications Since 2020:</strong>
        {% assign recent_pubs = 0 %}
        {% for pub in site.data.publications.publications %}
          {% assign pub_year = pub.year | plus: 0 %}
          {% if pub_year >= 2020 %}
            {% assign recent_pubs = recent_pubs | plus: 1 %}
          {% endif %}
        {% endfor %}
        {{ recent_pubs }}
      </div>
    </div>
    <div class="last-updated">
      Last updated: {{ site.data.publications.last_updated | date: "%B %d, %Y" }}
    </div>
  </div>

  <!-- Search and Filter Controls -->
  <div class="controls-section">
    <div class="search-controls">
      <input type="text" id="search-input" placeholder="Search publications by title, author, or venue..." class="search-input">
      <div class="filter-controls">
        <select id="year-filter" class="filter-select">
          <option value="">All Years</option>
          {% assign years = site.data.publications.publications | map: 'year' | uniq | sort | reverse %}
          {% for year in years %}
          <option value="{{ year }}">{{ year }}</option>
          {% endfor %}
        </select>
        <select id="venue-filter" class="filter-select">
          <option value="">All Venues</option>
          {% assign venues = site.data.publications.publications | map: 'venue' | uniq | sort %}
          {% for venue in venues %}
          <option value="{{ venue }}">{{ venue }}</option>
          {% endfor %}
        </select>
      </div>
    </div>
    <div class="export-controls">
      <button class="export-btn" onclick="exportPublications('bibtex')">Export BibTeX</button>
      <button class="export-btn" onclick="exportPublications('csv')">Export CSV</button>
      <button class="export-btn" onclick="exportPublications('json')">Export JSON</button>
    </div>
  </div>

  <!-- All Publications List -->
  <div class="publications-section">
    <h2>All Publications ({{ site.data.publications.total_count }})</h2>
    <div class="publications-list" id="publications-list">
      {% assign sorted_pubs = site.data.publications.publications | sort: 'year' | reverse %}
      {% for pub in sorted_pubs %}
      <div class="publication-item" data-year="{{ pub.year }}" data-venue="{{ pub.venue | escape }}" data-title="{{ pub.title | escape }}" data-authors="{{ pub.authors | escape }}">
        <details class="publication-content">
          <summary class="publication-title-summary">{{ pub.title }} ({{ pub.year }})</summary>
          <div class="publication-details-wrapper" style="margin-left: 2rem;">
            <p class="publication-authors">{{ pub.authors }}</p>
            <div class="publication-details">
              <span class="publication-venue">{{ pub.venue }}</span>
              {% if pub.citations > 0 %}
              <span class="publication-citations">({{ pub.citations }} citations)</span>
              {% endif %}
            </div>
            {% if pub.doi %}
            <div class="publication-links">
              <a href="https://doi.org/{{ pub.doi }}" target="_blank" class="publication-link">DOI</a>
              {% if pub.bibcode %}
              <a href="https://ui.adsabs.harvard.edu/abs/{{ pub.bibcode }}" target="_blank" class="publication-link">ADS</a>
              {% endif %}
            </div>
            {% endif %}
            {% if pub.abstract and pub.abstract != "" %}
            <details class="publication-abstract">
              <summary>Abstract</summary>
              <p>{{ pub.abstract }}</p>
            </details>
            {% endif %}
          </div>
        </details>
      </div>
      {% endfor %}
    </div>
  </div>
</div>

<script>
// Static publication data management - no API calls needed
document.addEventListener('DOMContentLoaded', function() {
  setupSearchAndFilter();
});

/**
 * Setup search and filter functionality
 */
function setupSearchAndFilter() {
  const searchInput = document.getElementById('search-input');
  const yearFilter = document.getElementById('year-filter');
  const venueFilter = document.getElementById('venue-filter');
  const publicationItems = document.querySelectorAll('.publication-item');

  function filterPublications() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedYear = yearFilter.value;
    const selectedVenue = venueFilter.value;

    publicationItems.forEach(item => {
      const title = item.dataset.title.toLowerCase();
      const authors = item.dataset.authors.toLowerCase();
      const venue = item.dataset.venue;
      const year = item.dataset.year;

      const matchesSearch = searchTerm === '' || 
                           title.includes(searchTerm) || 
                           authors.includes(searchTerm) ||
                           venue.toLowerCase().includes(searchTerm);
      
      const matchesYear = selectedYear === '' || year === selectedYear;
      const matchesVenue = selectedVenue === '' || venue === selectedVenue;

      if (matchesSearch && matchesYear && matchesVenue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    // Update visible count
    const visibleCount = Array.from(publicationItems).filter(item => 
      item.style.display !== 'none'
    ).length;
    
    const sectionTitle = document.querySelector('.publications-section h2');
    sectionTitle.textContent = `All Publications (${visibleCount} of {{ site.data.publications.total_count }})`;
  }

  // Add event listeners
  searchInput.addEventListener('input', filterPublications);
  yearFilter.addEventListener('change', filterPublications);
  venueFilter.addEventListener('change', filterPublications);
}

/**
 * Export publications in specified format
 */
function exportPublications(format) {
  // Get all visible publications
  const visibleItems = Array.from(document.querySelectorAll('.publication-item'))
    .filter(item => item.style.display !== 'none');
  
  const publications = visibleItems.map(item => ({
    title: item.dataset.title,
    authors: item.dataset.authors,
    venue: item.dataset.venue,
    year: item.dataset.year
  }));

  let content = '';
  let filename = '';
  let mimeType = '';

  switch (format) {
    case 'bibtex':
      content = generateBibTeX(publications);
      filename = 'publications.bib';
      mimeType = 'text/plain';
      break;
    case 'csv':
      content = generateCSV(publications);
      filename = 'publications.csv';
      mimeType = 'text/csv';
      break;
    case 'json':
      content = JSON.stringify(publications, null, 2);
      filename = 'publications.json';
      mimeType = 'application/json';
      break;
  }

  // Create and trigger download
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Generate BibTeX format
 */
function generateBibTeX(publications) {
  return publications.map((pub, index) => {
    const key = `publication${index + 1}`;
    return `@article{${key},
  title={${pub.title}},
  author={${pub.authors}},
  journal={${pub.venue}},
  year={${pub.year}}
}`;
  }).join('\n\n');
}

/**
 * Generate CSV format
 */
function generateCSV(publications) {
  const headers = ['Title', 'Authors', 'Venue', 'Year'];
  const rows = publications.map(pub => [
    `"${pub.title.replace(/"/g, '""')}"`,
    `"${pub.authors.replace(/"/g, '""')}"`,
    `"${pub.venue.replace(/"/g, '""')}"`,
    pub.year
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}
</script>