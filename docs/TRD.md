# Skill Compass

**Version:** 1.0
**Project Type:** Production-Ready Full Stack AI Web Application
**Frontend:** React + Vite + Tailwind CSS
**Backend:** Node.js + Express.js
**Database:** MongoDB Atlas
**Storage:** Cloudinary
**AI:** Google Gemini API + Groq API
**Authentication:** JWT + Google OAuth
**Charts:** Recharts

---

# 1. Purpose

This document defines the complete technical architecture, implementation standards, infrastructure, and engineering requirements for Skill Compass.

The goal is to ensure every contributor and AI agent follows a consistent architecture while maintaining production-level code quality.

---

# 2. System Architecture

```
                        Client

              React + Vite + Tailwind

                        │

                HTTPS REST API

                        │

               Express.js Backend

        ┌──────────────┼──────────────┐

        │              │              │

        ▼              ▼              ▼

    MongoDB       Cloudinary     AI Services

                                       │

                      ┌────────────────┴───────────────┐

                      ▼                                ▼

                 Gemini API                      Groq API

                      │                                │

          Skill Extraction              AI Career Assistant

                      │

                      ▼

             Scoring Engine

                      │

                      ▼

            Recommendation Engine

                      │

                      ▼

              Analytics Dashboard
```

---

# 3. Technology Stack

## Frontend

* React 19+
* Vite
* Tailwind CSS
* React Router
* Axios
* React Hook Form
* Zod
* Recharts
* Framer Motion
* Lucide React

---

## Backend

* Node.js LTS
* Express.js
* JWT
* Google OAuth
* bcrypt
* Multer
* Cloudinary SDK
* dotenv
* Helmet
* CORS
* Morgan

---

## Database

MongoDB Atlas

ODM:

* Mongoose

---

## AI Layer

### Gemini

Responsibilities

* Resume Parsing
* Skill Extraction
* Learning Recommendations
* Gap Analysis
* Skill Categorization

---

### Groq

Responsibilities

* AI Chat
* Career Assistant
* Q&A
* Recommendation Explanation

---

# 4. Folder Structure

```
skill-compass/

client/

src/

components/

pages/

layouts/

hooks/

context/

services/

utils/

styles/

assets/

server/

config/

controllers/

routes/

middleware/

models/

services/

validators/

ai/

utils/

tests/

docs/

README.md

PRD.md

TRD.md
```

---

# 5. Frontend Architecture

Architecture Pattern

Feature-Based Structure

```
pages/

Dashboard/

Profile/

History/

Recommendations/

components/

cards/

charts/

layout/

forms/

modals/
```

State Management

* React Context
* Custom Hooks

API Layer

Axios Instance

```
services/

api.js

auth.js

dashboard.js

skills.js

history.js
```

---

# 6. Backend Architecture

Pattern

Controller

↓

Service

↓

Repository (Model)

↓

Database

Each endpoint must follow

```
Route

↓

Controller

↓

Validation

↓

Service

↓

Database

↓

Response
```

Business logic must never exist inside routes.

---

# 7. Database Design

## User

```
{
    _id,
    name,
    email,
    password,
    avatar,
    role,
    provider,
    createdAt,
    updatedAt
}
```

---

## Profile

```
{
    userId,
    targetRole,
    mode,
    bio,
    experience,
    education,
    resumeUrl
}
```

---

## Skills

```
{
    userId,
    skills:[
        {
            name,
            category,
            proficiency
        }
    ]
}
```

---

## Reports

```
{
    userId,
    score,
    decayScore,
    driftScore,
    missingSkills,
    recommendations,
    evidence,
    createdAt
}
```

---

## Chat History

```
{
    userId,
    prompt,
    response,
    createdAt
}
```

---

# 8. Authentication

Supported

* Email Login
* Password Login
* JWT
* Google OAuth

Flow

```
Login

↓

JWT

↓

HTTP Only Cookie

↓

Protected Routes

↓

Refresh Token

↓

Logout
```

Passwords

bcrypt

Minimum

12 rounds

---

# 9. API Endpoints

Authentication

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/google

POST /api/auth/logout

GET /api/auth/me
```

Users

```
GET /api/user

PATCH /api/user

DELETE /api/user
```

Resume

```
POST /api/resume/upload

POST /api/resume/extract
```

Skills

```
POST /api/skills

GET /api/skills

PATCH /api/skills

DELETE /api/skills
```

Dashboard

```
GET /api/dashboard
```

Reports

```
POST /api/report

GET /api/report/history
```

Chat

```
POST /api/chat
```

---

# 10. AI Pipeline

Resume

↓

Upload

↓

Cloudinary

↓

Gemini

↓

Extract Skills

↓

Normalize Skills

↓

Compare

↓

Generate Report

↓

Store

↓

Dashboard

---

# 11. Skill Matching Flow

```
User Skills

↓

Normalization

↓

Market Skills

↓

Comparison

↓

Missing Skills

↓

Score

↓

Recommendation
```

---

# 12. AI Prompt Strategy

Gemini

Tasks

* Extract Skills
* Categorize Skills
* Identify Missing Skills
* Learning Roadmap

Groq

Tasks

* Explain Reports
* Career Advice
* Answer Questions
* Personalized Guidance

Prompt templates must be stored separately in

```
server/ai/prompts/
```

Never hardcode prompts inside controllers.

---

# 13. Error Handling

Centralized Error Middleware

Standard Response

```
{
    success:false,
    message:"",
    error:""
}
```

HTTP Status

* 200
* 201
* 400
* 401
* 403
* 404
* 500

---

# 14. Validation

Frontend

* React Hook Form
* Zod

Backend

* Express Validation Middleware

Never trust frontend validation.

---

# 15. Security

Helmet

CORS

Rate Limiting

JWT Expiration

Environment Variables

Password Hashing

Cloudinary Signed Uploads

Input Sanitization

Mongo Injection Protection

XSS Protection

CSRF Protection (if cookie-based auth)

---

# 16. Performance

Requirements

Lazy Loading

Route Splitting

Image Optimization

Memoization

Pagination

Database Indexing

Caching (future)

---

# 17. Charts

Library

Recharts

Required

Skill Score Trend

Decay History

Drift History

Skill Categories

Learning Progress

Market Trends

Charts must be responsive.

---

# 18. UI Requirements

Theme

Dark

Glassmorphism

Minimal

Modern

Responsive

Animations

Framer Motion

Icons

Lucide React

Spacing

8px grid system

Typography

Inter

---

# 19. Testing Strategy

Frontend

* Component Tests
* Form Validation
* Route Testing
* Responsive Testing

Backend

* API Tests
* Authentication Tests
* AI Integration Tests
* Validation Tests

Every completed feature must pass testing before merge.

---

# 20. Logging

Development

Morgan

Production

Structured logging

Errors

Centralized logger

Never expose stack traces to users.

---

# 21. Environment Variables

Backend

```
PORT=

MONGO_URI=

JWT_SECRET=

JWT_REFRESH_SECRET=

GEMINI_API_KEY=

GROQ_API_KEY=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Frontend

```
VITE_API_URL=

VITE_GOOGLE_CLIENT_ID=
```

Never commit `.env` files.

---

# 22. Deployment

Frontend

Vercel

Backend

Render or Railway

Database

MongoDB Atlas

Storage

Cloudinary

Domain

HTTPS Required

---

# 23. Git Workflow

```
Create Feature Branch

↓

Develop

↓

Test

↓

Review

↓

Commit

↓

Push

↓

Merge
```

Commit Convention

```
feat:

fix:

refactor:

style:

docs:

test:

chore:
```

---

# 24. Coding Standards

* ESLint
* Prettier
* Async/Await
* No callback nesting
* Small reusable functions
* Feature-based modules
* Consistent naming
* Meaningful commit messages
* No duplicated code

---

# 25. AI Development Rules (Antigravity 2.0)

The multi-agent system must follow these constraints:

* Build production-ready code only.
* Complete one feature at a time.
* Run tests before marking a task complete.
* Commit every stable feature with a conventional Git commit message.
* Do not break existing functionality while adding new features.
* Prefer reusable components over duplicated implementations.
* Keep AI prompts modular and version-controlled.
* Document architectural decisions when introducing new services or dependencies.

---

# 26. Definition of Done (DoD)

A feature is complete only if:

* Functionality is fully implemented.
* UI matches the design system.
* Responsive on desktop, tablet, and mobile.
* Input validation is complete.
* Error handling is implemented.
* Unit and integration tests pass.
* API contracts are documented.
* Code follows project standards.
* No critical linting or formatting issues remain.
* Changes have been committed to Git with a conventional commit message.

---

# 27. Future Technical Enhancements

* Vector database for semantic skill matching
* Redis caching
* Background job queue (BullMQ)
* WebSocket notifications
* Resume version history
* GitHub profile integration
* LinkedIn import
* AI mock interview engine
* Kubernetes deployment
* CI/CD pipeline with GitHub Actions
* Docker containerization
* OpenTelemetry monitoring
* Prometheus + Grafana observability

---

# 28. Engineering Philosophy

Skill Compass should be developed as a maintainable, scalable, and production-grade application. Every technical decision should prioritize clarity, security, modularity, and long-term extensibility over short-term convenience. The architecture should support future growth without requiring major rewrites, while ensuring that AI integrations, backend services, and frontend components remain loosely coupled and easy to evolve.
