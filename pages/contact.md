---
layout: page
title: "Contact"
description: ""
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
