# API Contracts: Professional Website

**Created**: 2025-10-19  
**Purpose**: Define API interfaces for website functionality

## SciXplorer API Integration

### Publications Endpoint

**Base URL**: `https://api.adsabs.harvard.edu/v1/`

#### Get Publications Library
```http
GET /biblib/libraries/{library_id}
Authorization: Bearer {api_token}
Content-Type: application/json
```

**Parameters**:
- `library_id`: User's publication library ID (string, required)
- `sort`: Sort order (string, optional, default: "date desc")
- `start`: Pagination offset (integer, optional, default: 0)  
- `rows`: Results per page (integer, optional, default: 20, max: 200)

**Response**:
```json
{
  "documents": [
    {
      "bibcode": "2023JGRA..128e1234S",
      "title": ["Research Paper Title"],
      "author": ["Author, First", "Author, Second"],
      "pub": "Journal of Geophysical Research: Atmospheres",
      "pubdate": "2023-05-00",
      "abstract": "Full abstract text...",
      "citation_count": 15,
      "doi": ["10.1029/2023JA001234"],
      "arxiv_class": ["physics.geo-ph"],
      "keyword": ["seismology", "cryosphere", "glaciers"],
      "aff": ["University Example, Department"]
    }
  ],
  "numFound": 85,
  "start": 0
}
```

#### Get Citation Metrics
```http
GET /metrics/{bibcode}
Authorization: Bearer {api_token}
```

**Response**:
```json
{
  "citation stats": {
    "total number of citations": 15,
    "number of citing papers": 12,
    "average citations per year": 3.75,
    "median citations per year": 2.5,
    "normalized paper count": 1.0,
    "total normalized citations": 8.2,
    "h": 1,
    "g": 1,
    "i10": 0,
    "i100": 0,
    "tori": 2.1,
    "riq": 0.95
  }
}
```

### Grants/Funding Integration

#### Get Grants Library (if available)
```http
GET /biblib/libraries/{grants_library_id}
Authorization: Bearer {api_token}
```

**Note**: If SciXplorer doesn't support grants, implement as Jekyll data files with manual updates.

## Contact Form API

### Submit Contact Form
```http
POST /contact
Content-Type: application/json
```

**Request**:
```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com", 
  "subject": "Research Collaboration Inquiry",
  "message": "Detailed message content...",
  "inquiry_type": "collaboration",
  "captcha_response": "captcha_token"
}
```

**Response Success**:
```json
{
  "status": "success",
  "message": "Your message has been sent successfully.",
  "id": "msg_123456789"
}
```

**Response Error**:
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "message": "Message is required"
  }
}
```

## Website API Endpoints (Client-Side)

### Get Cached Publications
```javascript
GET /api/publications.json
```

**Response**:
```json
{
  "publications": [...], // SciXplorer format
  "cached_at": "2025-10-19T10:30:00Z",
  "expires_at": "2025-10-20T10:30:00Z",
  "total_count": 85
}
```

### Get Research Projects
```javascript
GET /api/projects.json  
```

**Response**:
```json
{
  "projects": [
    {
      "id": "proj_001",
      "title": "Project Title",
      "description": "Project description...",
      "status": "active",
      "featured": true,
      "publications": ["2023JGRA..128e1234S"],
      "funding": ["NSF-12345"],
      "collaborators": [...]
    }
  ]
}
```

### Get Profile Data
```javascript
GET /api/profile.json
```

**Response**:
```json
{
  "profile": {
    "name": "Dylan Mikesell",
    "title": "Research Scientist",
    "affiliation": "Institution Name",
    "research_interests": [...],
    "bio_summary": "Professional biography...",
    "orcid": "0000-0000-0000-0000"
  },
  "contact": {
    "email_primary": "email@institution.edu",
    "orcid_url": "https://orcid.org/...",
    "google_scholar_url": "https://scholar.google.com/..."
  }
}
```

## Error Handling Standards

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (API key issues)  
- `429`: Too Many Requests (rate limiting)
- `500`: Internal Server Error
- `503`: Service Unavailable (API maintenance)

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable error description",
    "details": {
      "field": "Specific field error"
    },
    "timestamp": "2025-10-19T10:30:00Z"
  }
}
```

## Rate Limiting

### SciXplorer API
- **Limit**: 5,000 requests/day per API key
- **Burst**: 10 requests/second
- **Retry**: Exponential backoff on 429 responses

### Contact Form
- **Limit**: 5 submissions/hour per IP address
- **Protection**: reCAPTCHA v3 integration
- **Spam**: Content filtering and honeypot fields

## Caching Strategy

### Browser Cache Headers
```http
Cache-Control: public, max-age=3600
ETag: "hash-of-content"
Last-Modified: Thu, 19 Oct 2025 10:30:00 GMT
```

### API Response Caching
- **Publications**: 24 hours (daily citation updates)
- **Profile**: 7 days (rarely changes)
- **Projects**: 1 hour (active development)
- **Contact form**: No cache (always fresh)

## Security Considerations

### API Key Management
- Store in GitHub repository secrets
- Access via environment variables during build
- Never expose in client-side code
- Rotate quarterly or on compromise

### Contact Form Security
- CSRF protection with tokens
- Input sanitization and validation
- Rate limiting by IP address
- Email validation and domain checking
- Content filtering for spam detection

### CORS Configuration
```http
Access-Control-Allow-Origin: https://dylanmikesell.github.io
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
```

All API contracts follow REST conventions and include proper error handling, security measures, and performance optimizations to meet constitutional requirements.