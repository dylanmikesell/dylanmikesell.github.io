# Data Model: Professional Website

**Created**: 2025-10-19  
**Feature**: Professional Website  
**Source**: Extracted from functional requirements in spec.md

## Core Entities

### Research Profile
**Purpose**: Central professional identity and research overview

**Fields**:
- `name`: Full name (string, required)
- `title`: Current position/title (string, required)  
- `affiliation`: Current institution (string, required)
- `research_interests`: List of research areas (array of strings)
- `expertise_areas`: Scientific domains (array of strings)
- `bio_summary`: Professional summary (text, 2-3 paragraphs)
- `profile_image`: Professional headshot (image URL)
- `orcid`: ORCID identifier (string, validated format)
- `location`: Current location (string)

**Validation Rules**:
- Name and title must be present
- Bio summary max 500 words
- ORCID format: 0000-0000-0000-0000

### Academic Experience  
**Purpose**: Employment and educational history

**Fields**:
- `id`: Unique identifier (auto-generated)
- `position`: Role/title (string, required)
- `institution`: Organization name (string, required)  
- `start_date`: Start date (date, required)
- `end_date`: End date (date, nullable for current)
- `responsibilities`: Key duties (array of strings)
- `achievements`: Notable accomplishments (array of strings)
- `type`: Position type (enum: 'employment', 'education', 'visiting')
- `location`: Geographic location (string)

**Validation Rules**:
- Start date must be before end date
- Current positions have null end_date
- At least one responsibility required

**Relationships**:
- One-to-many with Research Profile
- Ordered by start_date descending

### Publications (SciXplorer API)
**Purpose**: Scholarly publications with real-time metrics

**API Fields** (from SciXplorer):
- `bibcode`: Unique ADS identifier (string, required)
- `title`: Publication title (string, required)
- `authors`: Author list (array of strings, required)
- `publication`: Journal/venue (string, required)
- `pubdate`: Publication date (date, required)
- `abstract`: Article abstract (text)
- `citation_count`: Current citations (integer, auto-updated)
- `doi`: Digital Object Identifier (string)
- `arxiv_id`: ArXiv identifier (string, optional)
- `keywords`: Subject keywords (array of strings)
- `affiliations`: Author affiliations (array of strings)

**Local Fields** (website-specific):
- `featured`: Highlight publication (boolean, default false)
- `category`: Research area classification (string)
- `local_notes`: Personal notes/context (text, optional)
- `cached_at`: Last API fetch timestamp (datetime)

**Validation Rules**:
- Title and authors required
- Citation count non-negative integer
- DOI format validation if present

### Funding History (SciXplorer API + Manual)
**Purpose**: Grants, awards, and research support

**Fields**:
- `id`: Unique identifier (string, required)
- `title`: Grant/award title (string, required)
- `funding_agency`: Sponsor organization (string, required)
- `amount`: Funding amount (decimal, nullable)
- `currency`: Currency code (string, default 'USD')
- `start_date`: Project start (date, required)
- `end_date`: Project end (date, nullable for ongoing)
- `role`: Investigator role (enum: 'PI', 'Co-PI', 'Co-I', 'collaborator')
- `status`: Current status (enum: 'active', 'completed', 'pending')
- `description`: Project description (text)
- `collaborators`: Co-investigators (array of strings)
- `keywords`: Research keywords (array of strings)
- `publications`: Related publications (array of bibcodes)

**Validation Rules**:
- Title, agency, and role required
- Amount must be positive if specified
- Start date before end date
- Status must match date ranges

### Research Portfolio
**Purpose**: Current and past research projects

**Fields**:
- `id`: Unique identifier (auto-generated)
- `title`: Project title (string, required)
- `description`: Project overview (text, required)
- `objectives`: Research goals (array of strings)
- `methodologies`: Approaches used (array of strings)
- `outcomes`: Results/findings (array of strings)
- `collaborators`: Research partners (array of objects)
- `funding_sources`: Related grants (array of funding IDs)
- `publications`: Related papers (array of bibcodes)
- `status`: Project status (enum: 'active', 'completed', 'planned')
- `start_date`: Project start (date)
- `end_date`: Project end (date, nullable)
- `website_url`: Project website (URL, optional)
- `repository_url`: Code repository (URL, optional)
- `featured`: Showcase project (boolean, default false)

**Validation Rules**:
- Title and description required
- At least one objective and methodology
- Status must align with dates

### Student Information
**Purpose**: Research opportunities and mentorship details

**Fields**:
- `id`: Unique identifier (auto-generated)
- `opportunity_title`: Position title (string, required)
- `level`: Student level (enum: 'undergraduate', 'masters', 'phd', 'postdoc')
- `description`: Opportunity description (text, required)
- `requirements`: Prerequisites (array of strings)
- `application_process`: How to apply (text)
- `funding_available`: Financial support (boolean)
- `start_date`: Position start (date, optional)
- `deadline`: Application deadline (date, optional)
- `status`: Availability (enum: 'open', 'closed', 'filled')
- `project_areas`: Research topics (array of strings)
- `contact_method`: How to inquire (string)

**Validation Rules**:
- Title, level, and description required
- Deadline must be future date if specified
- At least one project area required

### Contact Information
**Purpose**: Multiple communication channels

**Fields**:
- `email_primary`: Main contact email (email, required)
- `email_institutional`: University email (email, optional)
- `phone`: Phone number (string, optional)
- `office_location`: Physical address (text, optional)
- `orcid_url`: ORCID profile (URL, validated)
- `google_scholar_url`: Google Scholar profile (URL, optional)
- `researchgate_url`: ResearchGate profile (URL, optional)
- `linkedin_url`: LinkedIn profile (URL, optional)
- `twitter_handle`: Twitter username (string, optional)
- `website_personal`: Personal homepage (URL, optional)

**Validation Rules**:
- Primary email required and valid format
- URLs must be valid format if provided
- ORCID URL format: https://orcid.org/0000-0000-0000-0000

## API Integration Model

### SciXplorer API Cache
**Purpose**: Local caching of API responses

**Fields**:
- `endpoint`: API endpoint called (string, required)
- `parameters`: Query parameters (JSON object)
- `response_data`: API response (JSON object, required)
- `fetched_at`: Timestamp of API call (datetime, required)
- `expires_at`: Cache expiration (datetime, required)
- `status`: Cache status (enum: 'valid', 'expired', 'error')

**TTL**: 24 hours for publications, 1 hour for citation metrics

### Contact Form Submissions
**Purpose**: Visitor inquiries and messages

**Fields**:
- `id`: Unique identifier (auto-generated)
- `name`: Sender name (string, required)
- `email`: Sender email (email, required)
- `subject`: Message subject (string, required)
- `message`: Message content (text, required)
- `inquiry_type`: Category (enum: 'collaboration', 'student', 'media', 'other')
- `submitted_at`: Submission timestamp (datetime, auto)
- `ip_address`: Sender IP (string, for spam protection)
- `status`: Processing status (enum: 'new', 'responded', 'spam')

**Validation Rules**:
- All fields except inquiry_type required
- Email format validation
- Message minimum 10 characters
- Spam protection via rate limiting

## State Transitions

### Publication Status Flow
1. **API Fetch** → Cached locally with timestamp
2. **Cache Valid** → Serve from local storage  
3. **Cache Expired** → Refresh from API
4. **API Error** → Serve stale cache with error notice
5. **Manual Refresh** → Force API call regardless of cache

### Contact Form Flow
1. **Submitted** → Validation and spam check
2. **Valid** → Send email notification  
3. **Confirmation** → Display success message
4. **Error** → Show error with retry option

All entities support CRUD operations through Jekyll's data files and front matter, with API entities having additional real-time sync capabilities.