<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- MINOR version bump: Added Google Analytics specification to Technical Standards
- Modified sections: Security & Privacy, Content Strategy Integration
- Templates alignment: ✅ No template updates required (analytics is implementation detail)
- Follow-up TODOs: None - Google Analytics integration specified
-->

# Dylan Mikesell Professional Website Constitution

## Core Principles

### I. Professional Focus (NON-NEGOTIABLE)
This website MUST serve as a professional showcase that accurately represents Dylan Mikesell's expertise, experience, and professional brand. Every feature, design decision, and content addition MUST enhance professional credibility and provide clear value to potential employers, collaborators, or clients. No personal content that doesn't advance professional objectives.

**Rationale**: GitHub Pages professional websites are primarily career tools that directly impact professional opportunities.

### II. Mobile-First Design
All features and content MUST be designed and tested for mobile devices first, then enhanced for larger screens. Touch interfaces, readable typography on small screens, and fast loading on mobile networks are mandatory. Desktop enhancement is secondary to mobile functionality.

**Rationale**: Professional contacts increasingly view portfolios on mobile devices during commutes, meetings, and informal settings.

### III. Performance & Accessibility (NON-NEGOTIABLE)
The website MUST load within 3 seconds on mobile networks and achieve 90+ scores on Lighthouse performance and accessibility audits. All content MUST meet WCAG 2.1 AA accessibility standards. Every feature addition requires performance impact assessment.

**Rationale**: Professional credibility requires technical excellence and inclusive design practices.

### IV. Content-Driven Development
Technical implementation decisions MUST be driven by content strategy and user goals, not technology preferences. Features are only added if they directly support content presentation or user task completion. Content updates must be possible without developer intervention.

**Rationale**: Professional websites succeed based on content quality and user experience, not technical complexity.

### V. Simplicity & Maintainability
Choose the simplest technical solution that meets requirements. Prefer static generation over dynamic complexity. Every dependency must be justified by clear user value. Code and architecture must be maintainable by a single developer over multiple years.

**Rationale**: Personal professional websites require long-term sustainability with minimal maintenance overhead.

## Technical Standards

### Technology Stack Requirements
- **Platform**: GitHub Pages with Jekyll (native GitHub support)
- **Languages**: HTML5, CSS3, minimal JavaScript for progressive enhancement
- **Dependencies**: Only add dependencies that provide clear user value
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge) with graceful degradation
- **Content Management**: Git-based workflow with Markdown content

### Security & Privacy
- HTTPS only (GitHub Pages default)
- Google Analytics integration with privacy-compliant configuration
- No external dependencies that compromise user privacy beyond approved analytics
- Contact forms must use secure, privacy-respecting services

## Development Workflow

### Quality Gates
1. **Constitution Check**: Every feature must align with core principles
2. **Performance Check**: Lighthouse audit scores must meet thresholds
3. **Accessibility Check**: WCAG 2.1 AA compliance verification
4. **Mobile Check**: Feature testing on mobile devices
5. **Content Check**: Feature enhances content presentation or user goals

### Content Strategy Integration
- User research drives feature prioritization
- Content audits inform design decisions
- Google Analytics data guides iterative improvements and user behavior insights
- Professional goals determine content and feature roadmap

## Governance

This constitution supersedes all other development practices and preferences. All features, design decisions, and technical choices must be evaluated against these principles. When principles conflict, Professional Focus takes precedence.

**Amendment Process**: Constitution changes require documentation of rationale, impact assessment on existing features, and migration plan for affected components. Version changes follow semantic versioning.

**Compliance Review**: Each development cycle includes constitution compliance verification. Technical debt that violates principles must be prioritized for resolution.

**Version**: 1.1.0 | **Ratified**: 2025-10-19 | **Last Amended**: 2025-10-19
