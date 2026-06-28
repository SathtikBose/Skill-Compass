
# Skill Compass

> AI Agent Operating Manual

Version: 1.0

---

# Purpose

This repository is designed to be developed using **Antigravity 2.0 Multi-Agent Development**.

Every AI agent must follow the rules in this document before making any modification.

This file is the highest-level operational guide for all coding agents.

---

# Primary Objective

Build **Skill Compass** as a **production-ready SaaS application**.

Do **not** build a prototype.

Do **not** take shortcuts.

Do **not** ignore documentation.

Every decision must prioritize:

* Maintainability
* Scalability
* Security
* Performance
* Readability

---

# Documentation Priority

Before coding, every agent must read the following files.

```text
README.md

docs/PRD.md

docs/TRD.md

docs/DESIGN.md

docs/SYSTEM_ARCHITECTURE.md

docs/APP_FLOW.md

docs/API_ENDPOINTS.md

docs/DATABASE_SCHEMA.md

docs/AI_PIPELINE.md

docs/BUILD_INSTRUCTIONS.md
```

Never implement features before reading the documentation.

---

# Project Stack

Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Recharts
* Framer Motion

Backend

* Node.js
* Express.js

Database

* MongoDB Atlas

Storage

* Cloudinary

Authentication

* JWT
* Google OAuth

AI

* Google Gemini
* Groq

---

# Development Principles

Always

* Production-ready
* Modular
* Reusable
* Tested
* Documented

Never

* Temporary code
* Duplicate logic
* Hardcoded secrets
* Inline business logic
* Skip testing

---

# Multi-Agent Roles

## 🏗 Architect Agent

Responsibilities

* Read documentation
* Plan implementation
* Review architecture
* Prevent bad design

Can modify

* Architecture
* Folder structure
* Documentation

Cannot

* Build UI
* Implement features directly

---

## 🎨 UI Agent

Responsibilities

* Stitch UI
* Tailwind
* Responsive Design
* Glassmorphism
* Accessibility

Must follow

DESIGN.md

Cannot

* Modify backend

---

## ⚛ Frontend Agent

Responsibilities

* React
* Routing
* API Integration
* State Management

Must never

* Write backend logic

---

## 🚀 Backend Agent

Responsibilities

* Express
* APIs
* Authentication
* Database
* Business Logic

Must follow

TRD.md

API_ENDPOINTS.md

DATABASE_SCHEMA.md

---

## 🤖 AI Agent

Responsibilities

* Gemini
* Groq
* Prompt Engineering
* AI Services

Must never

* Build UI

Prompt files only

```text
server/ai/prompts/
```

---

## 🧪 QA Agent

Responsibilities

* Unit Tests
* Integration Tests
* Regression
* Performance

May block merge if tests fail.

---

## 🔍 Code Review Agent

Responsibilities

* Code Quality
* Naming
* Architecture
* Documentation
* Duplication

Cannot approve code with critical issues.

---

# Development Workflow

Every feature follows:

```text
Understand

↓

Plan

↓

Implement

↓

Test

↓

Review

↓

Commit

↓

Continue
```

Never skip steps.

---

# Feature Ownership

Only one agent owns a feature at a time.

Example

Authentication

↓

Backend Agent

↓

Frontend Agent

↓

QA

↓

Review

↓

Merge

Avoid simultaneous modifications to the same files.

---

# Communication Rules

Before modifying shared files

↓

Check ownership

↓

Review dependencies

↓

Implement

↓

Notify completion

Never overwrite another agent's work without review.

---

# File Ownership

UI

```
client/components/
```

↓

UI Agent

Pages

```
client/pages/
```

↓

Frontend Agent

API

```
server/routes/
```

↓

Backend Agent

Services

```
server/services/
```

↓

Backend Agent

AI

```
server/ai/
```

↓

AI Agent

Docs

```
docs/
```

↓

Architect Agent

---

# Git Rules

Every stable feature

↓

Commit

Examples

```text
feat(auth): implement JWT login

feat(ai): integrate Gemini

feat(chat): add Groq assistant

fix(profile): resolve validation issue
```

Never leave stable code uncommitted.

---

# Testing Rules

Every feature requires

Frontend

✓ Rendering

✓ Navigation

✓ Responsive

Backend

✓ API

✓ Validation

✓ Authentication

AI

✓ Prompt

✓ JSON

✓ Retry

Database

✓ CRUD

✓ Relations

If tests fail

↓

Fix

↓

Retest

---

# Build Order

Always follow

1.

Initialization

↓

2.

Authentication

↓

3.

Profile

↓

4.

Resume Upload

↓

5.

Skills

↓

6.

AI

↓

7.

Analysis

↓

8.

Dashboard

↓

9.

History

↓

10.

Chat

↓

11.

Deployment

Do not change the order unless dependencies require it.

---

# Coding Rules

Always

* Small functions
* Reusable components
* Feature folders
* Async/Await
* Error handling

Never

* Callback hell
* Business logic in controllers
* Direct DB access from routes
* Inline prompts

---

# UI Rules

Use

Stitch

Theme

Dark

Glassmorphism

Minimal

Responsive

Accessible

Never use inline CSS.

---

# AI Rules

Gemini

Resume Parsing

Recommendations

Skill Extraction

Groq

Chat

Career Advice

Never mix responsibilities.

---

# Database Rules

Use Mongoose

timestamps:true

Indexes

Validation

Cloudinary URLs only

---

# Security Rules

Always

Helmet

CORS

Rate Limiting

JWT

bcrypt

Environment Variables

Never expose secrets.

---

# Performance Rules

Lazy Loading

Memoization

Pagination

Code Splitting

Debouncing

Avoid unnecessary renders.

---

# Merge Rules

Before merge

✓ Tests pass

✓ Build passes

✓ Documentation updated

✓ No conflicts

✓ Code reviewed

---

# Stop Conditions

Agents must stop immediately if

* Architecture conflict
* Documentation conflict
* Security concern
* Failing tests
* Unclear requirement

Return findings instead of guessing.

---

# Definition of Done

A task is complete only when

✓ Requirement implemented

✓ Responsive

✓ Accessible

✓ Tested

✓ Documented

✓ Reviewed

✓ Linted

✓ Committed

Otherwise

The task is **not complete**.

---

# Engineering Philosophy

Skill Compass should feel like software built by a professional SaaS engineering team.

Every AI agent should optimize for:

* Clean architecture
* Long-term maintainability
* Clear separation of concerns
* Reusable code
* Reliable testing
* Excellent developer experience

The goal is not simply to generate code—it is to collaboratively produce a secure, scalable, and production-ready application that any engineer can understand, extend, and deploy with confidence.
