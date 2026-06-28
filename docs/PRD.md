# Skill Compass

### AI-Powered Career Intelligence & Skill Gap Analysis Platform

**Version:** 1.0
**Status:** Planning Phase
**Project Type:** Production-Ready Full Stack Web Application
**Development Methodology:** AI-Assisted Multi-Agent Development (Antigravity 2.0)

---

# 1. Project Vision

Skill Compass is an AI-powered platform that helps students and professionals continuously measure how well their skills align with current industry demands.

Instead of discovering missing skills during placements or interviews, users receive early warnings, personalized recommendations, and measurable progress tracking based on real-world job market expectations.

The goal is to transform career growth from reactive to proactive.

---

# 2. Objectives

The platform should enable users to:

* Understand current market relevance.
* Detect outdated or missing skills.
* Track improvement over time.
* Receive AI-powered recommendations.
* View transparent evidence supporting every recommendation.
* Stay aligned with changing industry trends.

---

# 3. Target Users

## Students

* College Students
* Final Year Students
* Fresh Graduates
* Bootcamp Learners

### Goals

* Prepare for placements
* Learn relevant technologies
* Improve employability

---

## Professionals

* Software Engineers
* Developers
* Data Analysts
* DevOps Engineers
* AI Engineers

### Goals

* Prevent skill decay
* Prepare for career switches
* Stay market-ready

---

# 4. Development Principles

The project must follow these rules throughout development.

## Rule 1 — Production Ready

Every feature should be built as if it will be deployed to production.

Requirements:

* Clean architecture
* Modular code
* Proper folder structure
* Environment variables
* Secure authentication
* Error handling
* Validation
* Logging
* Responsive design
* Accessibility
* Reusable components

No prototype-quality code.

---

## Rule 2 — Stable Git Workflow

After every stable milestone:

* Test feature
* Fix issues
* Commit changes

Commit messages should follow:

```
feat(auth): implement JWT authentication

feat(ai): add Gemini skill extraction

fix(dashboard): resolve score rendering issue

refactor(api): optimize scoring engine
```

Never continue development with uncommitted stable code.

---

## Rule 3 — Test Before Proceeding

Every completed feature must pass:

* Functional testing
* UI testing
* API testing
* Error handling
* Mobile responsiveness

Only after passing tests should development continue.

---

## Rule 4 — UI/UX Standards

UI should feel modern, premium and minimal.

### Theme

* Dark Mode
* Glassmorphism
* Clean spacing
* Soft shadows
* Smooth animations
* Rounded corners
* Consistent typography
* Minimal distractions

Inspired by:

* Linear
* Vercel
* Raycast
* Notion
* Apple

---

## Rule 5 — AI-Assisted Development

Use **Antigravity 2.0 Multi-Agent System** for accelerated development.

Suggested agent responsibilities:

### UI Agent

* Components
* Responsive Layouts
* Accessibility
* Animation

### Frontend Agent

* React Architecture
* State Management
* Routing
* API Integration

### Backend Agent

* Express APIs
* Authentication
* Validation
* Database Integration

### AI Agent

* Gemini prompts
* Groq integration
* Prompt optimization
* Skill extraction
* Recommendations

### QA Agent

* Test flows
* Regression testing
* Bug detection
* Edge case validation

### Code Review Agent

* Code quality
* Performance
* Security
* Best practices

---

# 5. Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts
* React Hook Form
* Zod
* Framer Motion

---

## UI Builder

**Stitch**

Design and generate production-ready UI using Stitch with Antigravity 2.0 workflows.

---

## Backend

* Node.js
* Express.js
* JWT
* Google OAuth
* Multer
* Cloudinary SDK

---

## Database

MongoDB

Mongoose ODM

---

## AI

### Gemini API

Responsibilities:

* Resume Parsing
* Skill Extraction
* Gap Analysis
* Learning Suggestions
* Recommendation Generation

---

### Groq API

Responsibilities:

* AI Career Assistant
* Fast Conversations
* Career Guidance
* Question Answering

---

## Storage

Cloudinary

Used for:

* Resume PDFs
* Profile Images

---

# 6. Authentication

Authentication must include:

* Email & Password
* JWT Authentication
* Google OAuth Login
* Secure Password Hashing (bcrypt)
* Refresh Token Strategy
* Protected Routes
* Role-Based Authorization

---

# 7. Functional Requirements

## User Management

Users should be able to:

* Register
* Login
* Logout
* Update Profile
* Upload Resume
* Delete Account

---

## Resume Upload

Accept:

* PDF

Automatically extract:

* Skills
* Experience
* Projects
* Technologies

---

## Skill Input

Users can:

* Add skills manually
* Edit skills
* Delete skills
* Categorize skills

---

## Target Role

Examples:

* Frontend Developer
* Backend Developer
* Full Stack Developer
* Data Scientist
* DevOps Engineer
* AI Engineer

---

## Skill Analysis

Compare:

User Skills

↓

Market Skills

↓

Missing Skills

↓

Score

---

## Dashboard

Dashboard must display:

* Profile Summary
* Skill Compass Score
* Skill Decay Score
* Skill Drift Score
* Trending Skills
* Missing Skills
* Learning Roadmap
* Progress History
* AI Insights

---

## AI Recommendations

Generate:

* Learning roadmap
* Top priorities
* Difficulty level
* Estimated learning time
* Recommended resources

---

## Evidence Trail

Every recommendation must include:

* Source
* Job Title
* Company
* Matching Sentence
* Date
* Confidence

---

## History

Store every analysis.

Users should compare:

Previous

↓

Current

↓

Improvement

---

## Charts

Use **Recharts**.

Required charts:

* Skill Score Trend
* Skill Category Distribution
* Learning Progress
* Weekly Improvement
* Market Demand Trend

---

# 8. Non-Functional Requirements

Performance:

* Fast page loads
* Optimized API responses
* Lazy loading
* Code splitting

Security:

* JWT
* HTTPS-ready
* Secure cookies
* Input validation
* Rate limiting
* Helmet
* CORS
* XSS protection

Scalability:

* Modular architecture
* Reusable services
* Feature-based folders

Maintainability:

* ESLint
* Prettier
* Consistent naming
* Documentation
* Typed interfaces (where applicable)

---

# 9. Folder Structure

```
skill-compass/

client/
    src/
        components/
        pages/
        layouts/
        hooks/
        services/
        context/
        utils/
        assets/
        styles/

server/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    ai/
    utils/
    validators/

docs/

README.md

PRD.md
```

---

# 10. API Modules

Authentication

Users

Resume

Skills

Dashboard

Recommendations

History

Analytics

AI Chat

Evidence

---

# 11. UI Pages

Landing Page

Authentication

Dashboard

Profile

Skill Analysis

History

Recommendations

Evidence Trail

Settings

404

---

# 12. Design System

Colors:

* Background: Near Black
* Surface: Frosted Glass
* Accent: Cyan / Blue
* Success: Emerald
* Warning: Amber
* Error: Red

Typography:

* Inter

Border Radius:

* Large

Animation:

* Smooth
* Subtle
* Professional

Icons:

* Lucide React

---

# 13. Testing Strategy

Every feature must include:

* Unit Testing
* API Testing
* Integration Testing
* Manual Testing
* Mobile Testing
* Edge Case Testing

No feature is considered complete until tests pass.

---

# 14. Git Workflow

```
Develop Feature

↓

Test

↓

Review

↓

Commit

↓

Push

↓

Continue
```

Never skip testing before committing.

---

# 15. Deployment

Frontend

* Vercel

Backend

* Render / Railway

Database

* MongoDB Atlas

Storage

* Cloudinary

Environment

* `.env`

---

# 16. Success Criteria

The MVP is considered complete when users can:

* Create an account
* Authenticate securely
* Upload a resume
* Extract skills with AI
* Analyze skills against job market requirements
* View relevance, decay, or drift scores
* Receive AI-generated recommendations
* Explore evidence supporting recommendations
* Track progress over time
* Chat with the AI Career Assistant
* Use the application on desktop and mobile devices

---

# 17. Future Enhancements

* LinkedIn Import
* GitHub Profile Analysis
* AI Mock Interviews
* Browser Extension
* Weekly Skill Reports
* Team Dashboard
* College Placement Dashboard
* Resume Builder
* Skill Certifications
* Learning Path Automation

---

# 18. Development Philosophy

Every feature should answer these questions before implementation:

1. Is it production-ready?
2. Is the UI intuitive and accessible?
3. Has it been tested?
4. Has it been committed to Git after stabilization?
5. Does it align with the minimal glassmorphism design system?
6. Is the code modular, reusable, and maintainable?
7. Does it enhance the user's ability to understand and improve their career readiness?

If the answer to any of these is "No", the feature is not complete.
