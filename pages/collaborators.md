---
layout: page
title: "Collaborators & Opportunities"
description: "Information for students, postdocs, visiting researchers, and industry partners interested in collaboration."
permalink: /collaborators/
---

<div class="collaborators-page">
  <div class="collaborators-intro">
    <p>I welcome collaboration with students, postdocs, visiting researchers, and industry partners. Explore current opportunities below and reach out to discuss your interests.</p>
    <p><em>See research projects for specific openings. For all inquiries, use the contact form.</em></p>
  </div>

  <div class="collaborators-grid">
    {% for collab in site.data.collaborators.collaborators %}
    <div class="opportunity-card">
      <h2>{{ collab.name }}</h2>
      <p><strong>Type:</strong> {{ collab.type | capitalize }}</p>
      <p>{{ collab.description }}</p>
      <p><strong>Application Process:</strong> {{ collab.application_process }}</p>
      <ul>
        {% for req in collab.requirements %}
        <li>{{ req }}</li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
  </div>

  <div class="collaborators-contact">
    <h2>How to Apply or Collaborate</h2>
    <p>For all opportunities, please use the <a href="/contact/">contact form</a> to submit your inquiry, CV, and any relevant materials. Specify your collaborator type and research interests. Industry partners and visiting researchers may include a brief proposal or description of intended collaboration.</p>
  </div>

  <div class="collaborators-philosophy">
    <h2>Mentorship & Collaboration Philosophy</h2>
    <p>I value curiosity, integrity, and teamwork. My approach emphasizes hands-on research, open communication, and professional growth for all collaborators.</p>
    <p>Success stories and past collaborations are highlighted in the research and publications sections.</p>
  </div>

  <div class="collaborators-success">
    <h2>Success Stories</h2>
    <p>Past collaborators have gone on to successful careers in academia, industry, and government. Highlights and testimonials are available in the research and publications sections.</p>
  </div>
</div>

<style>
.collaborators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
.opportunity-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.collaborators-intro {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #e7f3ff;
  border-left: 4px solid #0066cc;
  border-radius: 4px;
}
.collaborators-philosophy {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #dee2e6;
}
</style>
