---
layout: page
title: "Contact"
description: "Get in touch with Dr. Dylan Mikesell for research and collaboration opportunities or professional consulting inquiries."
permalink: /contact/
---

<div class="contact-page">
  <div class="contact-intro">
    <p>I welcome inquiries about research and collaboration opportunities, as well as professional partnerships and consulting. Please use the form below to get in touch.</p>
    <p><em>{{ site.data.contact.response_time }}</em></p>
  </div>

  <div class="contact-form-container">
    <h2>Send a Message</h2>
    {% include contact-form.html %}
  </div>

  <!-- Professional Profiles -->
  <div class="professional-profiles">
    <h2>Professional Profiles</h2>
    <div class="profile-links">
      {% if site.data.contact.academic_profiles.orcid %}
      <a href="https://orcid.org/{{ site.data.contact.academic_profiles.orcid }}" 
         class="profile-link orcid"
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="ORCID Profile">
        <span class="profile-icon">🔗</span>
        <span class="profile-name">ORCID</span>
      </a>
      {% endif %}

      {% if site.data.contact.academic_profiles.google_scholar %}
      <a href="https://scholar.google.com/citations?user={{ site.data.contact.academic_profiles.google_scholar }}" 
         class="profile-link scholar"
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="Google Scholar Profile">
        <span class="profile-icon">🎓</span>
        <span class="profile-name">Google Scholar</span>
      </a>
      {% endif %}

      {% if site.data.contact.academic_profiles.researchgate %}
      <a href="https://www.researchgate.net/profile/{{ site.data.contact.academic_profiles.researchgate }}" 
         class="profile-link researchgate"
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="ResearchGate Profile">
        <span class="profile-icon">📊</span>
        <span class="profile-name">ResearchGate</span>
      </a>
      {% endif %}

      {% if site.data.contact.social_media.github %}
      <a href="https://github.com/{{ site.data.contact.social_media.github }}" 
         class="profile-link github"
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="GitHub Profile">
        <span class="profile-icon">💻</span>
        <span class="profile-name">GitHub</span>
      </a>
      {% endif %}

      {% if site.data.contact.social_media.linkedin %}
      <a href="https://www.linkedin.com/in/{{ site.data.contact.social_media.linkedin }}" 
         class="profile-link linkedin"
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="LinkedIn Profile">
        <span class="profile-icon">💼</span>
        <span class="profile-name">LinkedIn</span>
      </a>
      {% endif %}

      {% if site.data.contact.social_media.twitter %}
      <a href="https://twitter.com/{{ site.data.contact.social_media.twitter }}" 
         class="profile-link twitter"
         target="_blank" 
         rel="noopener noreferrer"
         aria-label="Twitter Profile">
        <span class="profile-icon">🐦</span>
        <span class="profile-name">Twitter/X</span>
      </a>
      {% endif %}
    </div>
  </div>
</div>

<style>
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 2rem 0;
  }

  @media (min-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr 2fr;
    }
  }

  .contact-info-section,
  .contact-form-section {
    background: var(--bg-secondary, #f8f9fa);
    padding: 1.5rem;
    border-radius: 8px;
  }

  .contact-intro {
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--bg-info, #e7f3ff);
    border-left: 4px solid var(--color-primary, #0066cc);
    border-radius: 4px;
  }

  .professional-profiles {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid var(--border-color, #dee2e6);
  }

  .profile-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .profile-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: white;
    border: 1px solid var(--border-color, #dee2e6);
    border-radius: 6px;
    text-decoration: none;
    color: var(--text-primary, #212529);
    transition: all 0.2s ease;
  }

  .profile-link:hover {
    border-color: var(--color-primary, #0066cc);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .profile-icon {
    font-size: 1.25rem;
  }

  .profile-name {
    font-weight: 500;
  }
</style>
