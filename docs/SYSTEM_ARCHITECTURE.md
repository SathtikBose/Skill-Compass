
# Skill Compass

**Architecture Version:** 1.0

---

# Overview

Skill Compass follows a modern layered architecture with clear separation of concerns.

The system consists of six independent layers:

```text
Client Layer

↓

API Layer

↓

Business Layer

↓

AI Layer

↓

Data Layer

↓

Infrastructure Layer
```

---

# High-Level Architecture

```text
                    User

                     │

                     ▼

          React + Vite Frontend

                     │

         Axios HTTPS Requests

                     │

                     ▼

             Express REST API

                     │

      ┌──────────────┼───────────────┐

      ▼              ▼               ▼

 Authentication   AI Services     Business Logic

      │              │               │

      ▼              ▼               ▼

 JWT/OAuth      Gemini + Groq     Services

      │                              │

      └──────────────┬───────────────┘

                     ▼

                MongoDB Atlas

                     │

                     ▼

                Cloudinary
```

---

# Frontend Architecture

Technology

* React
* Vite
* Tailwind CSS
* React Router
* Recharts
* Framer Motion

Architecture

```text
Pages

↓

Layouts

↓

Components

↓

Hooks

↓

API Services

↓

Backend
```

The frontend must never contain business logic.

---

# Backend Architecture

Pattern

```text
Routes

↓

Middleware

↓

Controllers

↓

Services

↓

Repositories (Mongoose)

↓

MongoDB
```

Controllers should only coordinate requests and responses.

Business logic belongs inside services.

---

# AI Layer

Gemini

* Resume Parsing
* Skill Extraction
* Recommendation Generation

Groq

* Career Assistant
* Interactive Chat

Both providers are wrapped behind a common AI service layer.

---

# Data Layer

Collections

* users
* profiles
* skills
* reports
* recommendations
* chatHistories
* jobSnapshots
* notifications

Only services interact with the database.

---

# Authentication Flow

```text
Login

↓

JWT

↓

HTTP Only Cookie / Bearer Token

↓

Protected Routes

↓

Authorized Request
```

Google OAuth follows the same flow after identity verification.

---

# Analysis Pipeline

```text
Upload Resume

↓

Cloudinary

↓

Text Extraction

↓

Gemini

↓

Normalize Skills

↓

Market Comparison

↓

Scoring Engine

↓

Recommendations

↓

Store Report

↓

Dashboard
```

---

# Dashboard Data Flow

```text
Dashboard Request

↓

Backend

↓

Latest Report

↓

Analytics

↓

Recommendations

↓

Response

↓

React

↓

Charts
```

---

# Deployment Architecture

```text
React

↓

Vercel

↓

HTTPS

↓

Render

↓

MongoDB Atlas

↓

Cloudinary

↓

Gemini

↓

Groq
```

---

# Folder Dependency Rules

Frontend

```text
Pages

↓

Components

↓

Hooks

↓

Services
```

Backend

```text
Routes

↓

Controllers

↓

Services

↓

Models
```

No circular dependencies.

---

# Security Architecture

* JWT Authentication
* Google OAuth
* Helmet
* Rate Limiting
* Input Validation
* Password Hashing
* Environment Variables
* CORS
* XSS Protection

---

# Logging

Every request should generate:

* Request ID
* User ID
* Endpoint
* Response Time
* Status Code

AI requests additionally log:

* Model
* Latency
* Token Usage
* Retry Count

---

# Scalability

The architecture supports:

* Redis
* Queue Workers
* Vector Databases
* Microservices
* Kubernetes
* WebSockets

without changing the frontend.

---

# Engineering Principles

* Modular
* Reusable
* Testable
* Scalable
* Maintainable
* AI-agnostic
* Production-ready
