
# Skill Compass

**Version:** 1.0
**API Version:** v1
**Base URL (Development):**

```text
http://localhost:5000/api/v1
```

**Content-Type**

```http
application/json
```

**Authentication**

JWT Bearer Token

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# API Standards

## Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Something went wrong",
  "error": "Detailed error message"
}
```

---

# Authentication

## Register User

**POST**

```http
/api/v1/auth/register
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

### Response

```json
{
  "success": true,
  "message": "Account created successfully"
}
```

---

## Login

**POST**

```http
/api/v1/auth/login
```

### Request

```json
{
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

### Response

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {}
}
```

---

## Google OAuth

**POST**

```http
/api/v1/auth/google
```

### Request

```json
{
  "credential": "GOOGLE_ID_TOKEN"
}
```

---

## Logout

**POST**

```http
/api/v1/auth/logout
```

---

## Get Current User

**GET**

```http
/api/v1/auth/me
```

Authentication Required

---

# User Profile

## Get Profile

**GET**

```http
/api/v1/profile
```

---

## Update Profile

**PATCH**

```http
/api/v1/profile
```

### Request

```json
{
  "targetRole": "Frontend Developer",
  "mode": "student",
  "experience": 2
}
```

---

## Delete Account

**DELETE**

```http
/api/v1/profile
```

---

# Resume

## Upload Resume

**POST**

```http
/api/v1/resume/upload
```

Content-Type

```http
multipart/form-data
```

Body

```text
resume.pdf
```

Stores the resume in Cloudinary and returns the secure URL.

---

## Extract Resume Skills

**POST**

```http
/api/v1/resume/extract
```

Authentication Required

### Flow

Resume

↓

Cloudinary

↓

Gemini

↓

Skills

↓

MongoDB

---

### Response

```json
{
  "skills": [
    "React",
    "Node.js",
    "MongoDB",
    "Docker"
  ]
}
```

---

# Skills

## Get User Skills

**GET**

```http
/api/v1/skills
```

---

## Add Skills

**POST**

```http
/api/v1/skills
```

### Request

```json
{
  "skills": [
    "React",
    "Node.js",
    "Express"
  ]
}
```

---

## Update Skill

**PATCH**

```http
/api/v1/skills/:skillId
```

---

## Delete Skill

**DELETE**

```http
/api/v1/skills/:skillId
```

---

# Skill Analysis

## Analyze Skills

**POST**

```http
/api/v1/analysis/run
```

Authentication Required

### Request

```json
{
  "targetRole": "Full Stack Developer",
  "mode": "professional"
}
```

### Internal Flow

* Load user skills
* Fetch job market data
* Normalize skills
* Compare skills
* Generate scores
* Create recommendations
* Store report

---

### Response

```json
{
  "marketScore": 82,
  "decayScore": 21,
  "driftScore": 0,
  "missingSkills": [],
  "recommendations": []
}
```

---

# Dashboard

## Dashboard Data

**GET**

```http
/api/v1/dashboard
```

Returns

* User Profile
* Current Score
* Recent Report
* Trends
* Recommendations

---

# Reports

## Generate Report

**POST**

```http
/api/v1/reports
```

Creates a new analysis report.

---

## Report History

**GET**

```http
/api/v1/reports/history
```

Returns all previous reports.

---

## Single Report

**GET**

```http
/api/v1/reports/:reportId
```

---

## Delete Report

**DELETE**

```http
/api/v1/reports/:reportId
```

---

# Recommendations

## Get Recommendations

**GET**

```http
/api/v1/recommendations
```

Returns AI-generated learning recommendations.

---

## Refresh Recommendations

**POST**

```http
/api/v1/recommendations/refresh
```

Triggers Gemini to regenerate recommendations.

---

# AI Career Assistant

## Chat

**POST**

```http
/api/v1/chat
```

### Request

```json
{
  "message": "How can I improve my score?"
}
```

### Flow

User

↓

Groq API

↓

Response

↓

Store Chat History

↓

Return Response

---

### Response

```json
{
  "reply": "Focus on TypeScript, Docker and CI/CD..."
}
```

---

## Chat History

**GET**

```http
/api/v1/chat/history
```

---

## Clear Chat

**DELETE**

```http
/api/v1/chat/history
```

---

# Evidence Trail

## Get Evidence

**GET**

```http
/api/v1/evidence/:reportId
```

Returns

* Job Title
* Company
* Skill
* Source
* Date
* Matching Sentence

---

# Analytics

## Score Trend

**GET**

```http
/api/v1/analytics/score
```

Returns historical score data for Recharts.

---

## Skill Distribution

**GET**

```http
/api/v1/analytics/skills
```

Returns categorized skills.

---

## Market Trends

**GET**

```http
/api/v1/analytics/market
```

Returns trend analysis.

---

## Weekly Progress

**GET**

```http
/api/v1/analytics/progress
```

---

# Notifications (Future)

## Get Notifications

**GET**

```http
/api/v1/notifications
```

---

## Mark Read

**PATCH**

```http
/api/v1/notifications/:id
```

---

# Health Check

## API Status

**GET**

```http
/api/v1/health
```

### Response

```json
{
  "status": "OK",
  "uptime": "12h 14m",
  "database": "Connected",
  "ai": "Available"
}
```

---

# Admin (Future)

## Users

```http
GET /api/v1/admin/users
```

---

## Reports

```http
GET /api/v1/admin/reports
```

---

## Analytics

```http
GET /api/v1/admin/analytics
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

# API Security

Every protected endpoint must:

* Validate JWT
* Validate request body
* Sanitize inputs
* Verify resource ownership
* Rate limit requests
* Return standardized error responses

---

# Middleware Pipeline

```text
Request
    │
    ▼
Rate Limiter
    │
Helmet
    │
CORS
    │
Authentication
    │
Validation
    │
Controller
    │
Service
    │
Database / AI
    │
Response Formatter
    │
Client
```

---

# API Versioning

Current Version

```text
v1
```

Future versions should follow:

```text
/api/v2/...
```

Never introduce breaking changes within the same API version.

---

# Endpoint Naming Conventions

* Use plural nouns for collections (`/skills`, `/reports`)
* Use HTTP methods instead of verbs (`POST /reports`, not `/createReport`)
* Follow RESTful principles consistently.
* All endpoints return the standard response format.
* All protected routes require a valid JWT access token.
* API documentation must be updated whenever an endpoint is added, removed, or modified.
