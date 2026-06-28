# Skill Compass AI Architecture

**Version:** 2.0
**Status:** Production Ready
**AI Stack:** Google Gemini + Groq
**Backend:** Node.js + Express.js
**Database:** MongoDB Atlas

---

# 1. Purpose

This document defines the complete Artificial Intelligence architecture used in **Skill Compass**.

It explains:

* AI responsibilities
* AI workflow
* Prompt architecture
* Resume parsing
* Skill extraction
* Recommendation generation
* Career assistant
* Error handling
* Validation
* Cost optimization
* Future scalability

The AI system must remain **modular**, **testable**, and **replaceable**.

---

# 2. AI Design Philosophy

Skill Compass **does not rely on AI for everything**.

Business logic remains deterministic.

AI is only responsible for tasks requiring language understanding or reasoning.

Business Logic

* Authentication
* Database
* API
* Security
* Scoring Formula
* Authorization

AI Logic

* Resume Understanding
* Skill Extraction
* Skill Categorization
* Recommendation Generation
* Career Guidance
* Natural Language Responses

---

# 3. AI Architecture

```text
                        User

                          │

                          ▼

                  Resume / Skill Input

                          │

                          ▼

                 Validation Layer

                          │

                          ▼

                  AI Orchestrator

        ┌─────────────────┼──────────────────┐

        ▼                 ▼                  ▼

 Resume Parser      Skill Analyzer      Chat Assistant

    Gemini             Gemini              Groq

        │                 │                  │

        └────────────┬────┴──────────────────┘

                     ▼

             Response Validator

                     ▼

             Recommendation Engine

                     ▼

               MongoDB Storage

                     ▼

              Dashboard & Analytics
```

---

# 4. AI Responsibilities

## Google Gemini

Used for structured reasoning.

Responsibilities

* Resume Parsing
* Resume Summarization
* Skill Extraction
* Skill Categorization
* Skill Normalization
* Missing Skill Detection
* Learning Roadmap
* Recommendation Generation
* Report Summary

---

## Groq

Used for conversational interactions.

Responsibilities

* AI Career Assistant
* Career Advice
* Technology Explanations
* Resume Questions
* Follow-up Questions
* Personalized Learning Support

---

# 5. AI Service Layer

Directory Structure

```text
server/

ai/

├── providers/

│   ├── gemini.provider.ts

│   └── groq.provider.ts

│

├── prompts/

│   ├── resume.prompt.ts

│   ├── skills.prompt.ts

│   ├── recommendation.prompt.ts

│   ├── summary.prompt.ts

│   ├── roadmap.prompt.ts

│   └── chat.prompt.ts

│

├── validators/

├── parsers/

├── normalizers/

├── cache/

└── services/

    ├── resume.service.ts

    ├── skills.service.ts

    ├── recommendation.service.ts

    ├── scoring.service.ts

    ├── roadmap.service.ts

    └── chat.service.ts
```

Controllers must never communicate directly with Gemini or Groq.

---

# 6. Complete AI Workflow

```text
Resume Upload

↓

Cloudinary

↓

Extract Text

↓

Gemini Resume Parser

↓

Skill Normalization

↓

Market Skill Comparison

↓

Scoring Engine

↓

Recommendation Generator

↓

Evidence Generator

↓

MongoDB

↓

Dashboard

↓

Groq Career Assistant
```

---

# 7. Resume Parsing Pipeline

Step 1

User uploads resume.

↓

Cloudinary

↓

Secure URL

---

Step 2

Backend downloads PDF.

↓

Extract text

↓

Clean formatting

---

Step 3

Gemini Prompt

Task

Extract

* Skills
* Experience
* Education
* Certifications
* Projects

Output

JSON only.

Example

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

Step 4

Normalize skills.

Examples

```text
ReactJS

↓

React

Node

↓

Node.js

JS

↓

JavaScript

TS

↓

TypeScript
```

Only normalized values are stored.

---

# 8. Skill Categorization

Every extracted skill belongs to exactly one category.

Categories

* Programming Languages
* Frontend
* Backend
* Database
* DevOps
* Cloud
* AI / ML
* Mobile
* Testing
* Tools
* Soft Skills

Example

```json
{
  "Frontend": [
    "React",
    "Next.js"
  ],
  "Backend": [
    "Node.js"
  ],
  "Database": [
    "MongoDB"
  ]
}
```

---

# 9. Job Market Pipeline

Input

Target Role

↓

Job Data

↓

Text Cleaning

↓

Gemini Skill Extraction

↓

Normalization

↓

Deduplication

↓

Market Skill Database

Example

```json
[
  "React",
  "TypeScript",
  "Redux",
  "Docker",
  "Git",
  "Next.js"
]
```

---

# 10. Skill Matching Pipeline

Inputs

User Skills

Market Skills

↓

Normalize

↓

Compare

↓

Generate

* Matched Skills
* Missing Skills
* Extra Skills
* Coverage

Example

```text
User

React

Node.js

MongoDB

Market

React

Next.js

Docker

TypeScript

Matched

React

Missing

Next.js

Docker

TypeScript
```

---

# 11. Scoring Engine

The scoring engine is deterministic.

AI never calculates scores.

Formula

```text
Market Score

=

Matched Skills

÷

Required Skills

×

100
```

Additional metrics

* Market Score
* Skill Decay
* Skill Drift
* Skill Coverage
* Recommendation Priority

---

# 12. Recommendation Engine

Inputs

Missing Skills

↓

Gemini

↓

Generate

* Priority
* Importance
* Learning Time
* Difficulty
* Resources
* Why it Matters

Example

```json
{
  "skill": "Docker",
  "priority": "High",
  "difficulty": "Medium",
  "estimatedTime": "2 weeks",
  "reason": "Appears in 76% of current Full Stack roles."
}
```

---

# 13. Evidence Generation

Every recommendation should contain supporting evidence.

Stored Data

* Company
* Job Role
* Skill
* Source
* Job URL
* Matching Sentence
* Date

This enables transparent AI recommendations.

---

# 14. AI Career Assistant

Powered by Groq.

Capabilities

* Explain scores
* Career advice
* Learning roadmap
* Technology explanations
* Resume suggestions
* Interview preparation

Conversation Flow

```text
User

↓

Groq

↓

Response

↓

Store History

↓

Display
```

---

# 15. Prompt Engineering

Prompts must be version-controlled.

Never hardcode prompts.

Directory

```text
server/ai/prompts/
```

Each prompt includes

* Version
* Purpose
* Input Schema
* Output Schema
* Examples
* Validation Rules

---

# 16. Prompt Standards

Every prompt must

* Return structured JSON whenever possible
* Avoid Markdown
* Avoid unnecessary explanations
* Be deterministic
* Specify required fields
* Define expected output schema
* Handle malformed input gracefully

---

# 17. Response Validation

Every AI response must pass validation.

Checks

* Valid JSON
* Required fields
* Data types
* No empty arrays
* No duplicate skills
* Valid categories
* Sanitized values

Invalid responses trigger retries.

---

# 18. Retry Strategy

Gemini

Attempt 1

↓

Attempt 2

↓

Attempt 3

↓

Cached Result

↓

Graceful Error

Groq failures should not block the application.

---

# 19. AI Cache

Cache

* Resume Parsing
* Skill Extraction
* Skill Categories
* Recommendations
* Job Skills

Purpose

* Faster responses
* Lower API cost
* Reduced latency

---

# 20. Token Optimization

Never send

* Entire database records
* Duplicate skills
* Unnecessary resume sections

Instead send

* Clean structured data
* Normalized skills
* Required context only

---

# 21. AI Security

Never send

* Passwords
* JWT
* Internal IDs
* Authentication data
* Sensitive metadata

Only send data required for reasoning.

---

# 22. Logging

Log

* Request ID
* Model
* Prompt Version
* Latency
* Token Usage
* Success
* Failure
* Retry Count

Never log sensitive user content.

---

# 23. Error Handling

Possible failures

* Timeout
* Invalid JSON
* Rate Limit
* Network Error
* Model Unavailable
* Parsing Failure

Every failure must return a user-friendly message while recording detailed server logs.

---

# 24. Environment Variables

```text
GEMINI_API_KEY=

GEMINI_MODEL=

GROQ_API_KEY=

GROQ_MODEL=

AI_TIMEOUT=30000

AI_MAX_RETRIES=3
```

Never hardcode credentials.

---

# 25. Future AI Enhancements

Roadmap

* Semantic embeddings
* Vector search
* GitHub repository analysis
* LinkedIn profile analysis
* AI mock interviews
* Resume optimization
* Weekly AI reports
* Personalized learning plans
* Career forecasting
* AI-powered job matching

---

# 26. AI Principles

The AI layer must remain:

* Explainable
* Modular
* Replaceable
* Testable
* Cost-efficient
* Deterministic where possible

AI should enhance the application—not replace core business logic.

Every recommendation generated by AI should be transparent, reproducible where practical, and supported by real application data.

The objective is to provide trustworthy career guidance rather than opaque AI-generated opinions.
