# Skill Compass

**Version:** 1.0

---

# Purpose

This document defines the mandatory development workflow for Skill Compass.

Every developer, AI agent, and automation tool must follow these instructions throughout the project lifecycle.

These rules are **non-negotiable** and exist to ensure the project remains production-ready, maintainable, and stable.

---

# Golden Rules

## Rule 1 — Production First

Every feature must be built as production-ready software.

Never write temporary code.

Never write demo-only implementations.

Never ignore scalability.

Every component should be reusable.

---

## Rule 2 — Build One Feature At A Time

Never build multiple unrelated features simultaneously.

Workflow

```text
Choose Feature

↓

Plan

↓

Implement

↓

Test

↓

Fix Bugs

↓

Commit

↓

Proceed
```

---

## Rule 3 — Never Skip Testing

Before marking any task complete:

✅ Compile successfully

✅ Run lint

✅ Run tests

✅ Verify responsive UI

✅ Verify API

✅ Verify edge cases

If anything fails

↓

Fix

↓

Test Again

---

## Rule 4 — Git Commit Policy

Every stable feature must be committed.

Never continue development with uncommitted stable code.

Commit format

```text
feat(auth): implement JWT authentication

feat(profile): create profile management

feat(ai): integrate Gemini skill extraction

feat(chat): add Groq AI assistant

fix(api): resolve report generation bug

refactor(ui): improve dashboard cards

docs(api): update endpoint documentation
```

---

## Rule 5 — Preserve Existing Features

Never break working functionality.

Before adding new code

↓

Run regression tests

↓

Verify existing pages

↓

Merge safely

---

# Development Workflow

Every feature follows this lifecycle.

```text
Read Documentation

↓

Understand Requirement

↓

Plan Architecture

↓

Create Branch

↓

Build Feature

↓

Test

↓

Review

↓

Commit

↓

Merge

↓

Proceed
```

---

# Documentation Order

Before coding, understand these documents.

1.

README.md

↓

2.

PRD.md

↓

3.

TRD.md

↓

4.

DESIGN.md

↓

5.

SYSTEM_ARCHITECTURE.md

↓

6.

DATABASE_SCHEMA.md

↓

7.

API_ENDPOINTS.md

↓

8.

AI_PIPELINE.md

↓

9.

APP_FLOW.md

Only then begin implementation.

---

# Development Phases

## Phase 1

Project Initialization

Tasks

* Initialize Git
* Create repository structure
* Configure Vite
* Configure Express
* Configure MongoDB
* Configure Tailwind
* Configure ESLint
* Configure Prettier
* Configure Husky (optional)
* Configure environment variables

Test

Application boots successfully.

Commit

```text
chore(init): initialize project structure
```

---

## Phase 2

Authentication

Tasks

* JWT
* Login
* Register
* Google OAuth
* Protected Routes
* Logout

Tests

* Login
* Logout
* Invalid credentials
* Token expiration
* Google login

Commit

```text
feat(auth): implement authentication module
```

---

## Phase 3

User Profile

Tasks

* Profile page
* Resume upload
* Cloudinary
* Skill input
* Role selection

Test

* Resume upload
* Profile update
* Validation

Commit

```text
feat(profile): add profile management
```

---

## Phase 4

AI Integration

Tasks

* Gemini
* Resume parser
* Skill extraction
* Normalization
* Recommendations

Tests

* Resume parsing
* JSON validation
* Error handling

Commit

```text
feat(ai): integrate Gemini pipeline
```

---

## Phase 5

Analysis Engine

Tasks

* Skill comparison
* Market score
* Decay score
* Drift score

Tests

* Scoring
* Edge cases
* Empty skills

Commit

```text
feat(analysis): implement scoring engine
```

---

## Phase 6

Dashboard

Tasks

* Charts
* Analytics
* History
* Recommendations

Tests

* Responsive UI
* Chart rendering
* API loading

Commit

```text
feat(dashboard): build analytics dashboard
```

---

## Phase 7

AI Chat

Tasks

* Groq integration
* Chat UI
* Streaming responses
* Chat history

Commit

```text
feat(chat): add AI career assistant
```

---

## Phase 8

Production

Tasks

* Performance
* Optimization
* Error handling
* Logging
* Security

Commit

```text
chore(release): production optimization
```

---

# UI Development Rules

UI is generated using

**Stitch + Antigravity 2.0**

Requirements

* Dark Theme
* Glassmorphism
* Minimal
* Premium
* Responsive
* Accessible

Never use inline styles.

Never duplicate components.

Always reuse UI primitives.

---

# Frontend Rules

React

* Functional Components
* Hooks Only
* Feature-based structure
* Lazy Loading
* Code Splitting

Never place API calls directly inside UI components.

Always use service files.

---

# Backend Rules

Pattern

```text
Route

↓

Middleware

↓

Controller

↓

Service

↓

Model
```

Controllers

↓

Thin

Services

↓

Business Logic

Never access MongoDB directly from controllers.

---

# AI Rules

Gemini

Only

* Resume Parsing
* Recommendations
* Skill Extraction

Groq

Only

* AI Chat
* Career Guidance

Never mix responsibilities.

---

# Database Rules

Use Mongoose.

Every schema

```javascript
timestamps:true
```

Validation required.

Indexes where appropriate.

Never store files.

Only Cloudinary URLs.

---

# Security Rules

Always

* Validate input
* Sanitize input
* Hash passwords
* Verify JWT
* Hide secrets
* Use environment variables

Never commit

.env

---

# Testing Checklist

Frontend

□ Components

□ Forms

□ Navigation

□ Responsive

Backend

□ APIs

□ Validation

□ Authentication

□ AI

Database

□ CRUD

□ Relations

□ Indexes

---

# Quality Checklist

Before commit

□ Lint passes

□ Tests pass

□ No console errors

□ No warnings

□ Mobile works

□ Desktop works

□ Dark mode works

□ API documented

□ Types consistent

□ No duplicated code

---

# Code Review Checklist

Ask

Can this component be reused?

Is this scalable?

Is the naming clear?

Can another developer understand this?

Is the logic separated correctly?

---

# Branch Strategy

```text
main

↓

develop

↓

feature/auth

feature/profile

feature/dashboard

feature/ai

feature/chat
```

Never commit directly to

main

---

# Commit Frequency

Commit whenever:

* A page is completed.
* A backend module is stable.
* Tests pass.
* Bugs are fixed.
* Documentation changes.
* Refactoring is complete.

Do not wait until the end of the day.

---

# Error Handling

Every async function must

try

↓

catch

↓

Return standardized error

↓

Log error

Never expose stack traces.

---

# Performance Rules

Use

Lazy Loading

Memoization

Pagination

Image Optimization

Debouncing

Throttling

Code Splitting

Avoid unnecessary re-renders.

---

# Accessibility

Every page must include

Keyboard navigation

ARIA labels

Focus states

Proper contrast

Semantic HTML

---

# Deployment Checklist

Before production

□ Environment variables configured

□ MongoDB connected

□ Cloudinary connected

□ Gemini configured

□ Groq configured

□ Google OAuth working

□ HTTPS enabled

□ API tested

□ Build successful

□ Lighthouse > 90

---

# Definition of Done

A feature is complete only if:

✓ Requirement implemented

✓ Responsive

✓ Accessible

✓ Tested

✓ Documented

✓ Reviewed

✓ Linted

✓ Production-ready

✓ Git committed

If any item is incomplete

↓

The feature is **not complete**.

---

# Antigravity 2.0 Multi-Agent Workflow

The multi-agent system should operate with clearly defined responsibilities to minimize conflicts and maximize parallel progress.

### 🧠 Architect Agent

Responsibilities

* Analyze requirements
* Plan implementation
* Define folder structure
* Review architecture

Never write UI.

---

### 🎨 UI/UX Agent

Responsibilities

* Build layouts using Stitch
* Create reusable components
* Follow DESIGN.md
* Ensure responsiveness

Never implement backend logic.

---

### ⚛️ Frontend Agent

Responsibilities

* React pages
* Routing
* State management
* API integration

Must consume backend APIs only.

---

### 🚀 Backend Agent

Responsibilities

* Express APIs
* Business logic
* Authentication
* Database operations

Must follow TRD.md and API contracts.

---

### 🤖 AI Agent

Responsibilities

* Gemini integration
* Groq integration
* Prompt engineering
* AI services

Never implement UI.

---

### 🧪 QA Agent

Responsibilities

* Unit testing
* Integration testing
* Regression testing
* Performance checks

Blocks merges if critical issues exist.

---

### 🔍 Code Review Agent

Responsibilities

* Review pull requests
* Enforce coding standards
* Detect duplicated logic
* Ensure production readiness

No code should reach `main` without passing review.

---

# Build Philosophy

Skill Compass is a production-grade AI SaaS application—not a hackathon prototype.

Every implementation decision should prioritize:

* Maintainability over shortcuts.
* Reusability over duplication.
* Clarity over cleverness.
* Security over convenience.
* Testing over assumptions.
* Documentation over tribal knowledge.

The objective is to produce a codebase that any developer—or AI agent—can understand, extend, and deploy with confidence.
