
# Skill Compass

**Version:** 1.0

---

# User Journey

The application follows a guided journey from onboarding to continuous career improvement.

```text
Landing Page

↓

Authentication

↓

Profile Setup

↓

Skill Collection

↓

AI Analysis

↓

Dashboard

↓

Continuous Improvement
```

---

# 1. Landing Page

The user sees:

* Hero Section
* Features
* Benefits
* How it Works
* Call to Action

Primary CTA

```text
Get Started
```

---

# 2. Authentication

Options

* Email + Password
* Google Login

After successful login

↓

Create JWT

↓

Redirect

↓

Dashboard

---

# 3. First-Time User Flow

```text
Create Account

↓

Choose Mode

↓

Student

or

Professional

↓

Target Role

↓

Continue
```

---

# 4. Resume Upload

User chooses

* Upload Resume

or

* Skip

If uploaded

↓

Cloudinary

↓

Gemini

↓

Extract Skills

↓

Save Skills

---

# 5. Manual Skill Entry

If resume skipped

↓

Add Skills

↓

Save

↓

Continue

---

# 6. Dashboard

Initial dashboard displays

* Welcome Card
* Market Score
* Empty Analytics
* Start Analysis Button

---

# 7. Skill Analysis

User clicks

```text
Analyze My Skills
```

Flow

```text
Load User Skills

↓

Fetch Market Skills

↓

Compare

↓

Calculate Scores

↓

Generate Recommendations

↓

Store Report

↓

Refresh Dashboard
```

---

# 8. Analysis Results

Display

* Market Relevance Score
* Decay / Drift Score
* Strengths
* Weaknesses
* Missing Skills
* Trending Skills
* AI Summary

---

# 9. Recommendations

Every recommendation includes

* Skill
* Priority
* Why It Matters
* Estimated Learning Time
* Learning Resources

---

# 10. Evidence Trail

User clicks

```text
View Evidence
```

Displays

* Job Title
* Company
* Source
* Matching Sentence
* Date

---

# 11. History

Every completed analysis

↓

Saved

↓

Timeline

↓

Charts

↓

Progress Tracking

---

# 12. AI Career Assistant

User opens chat

↓

Ask Question

↓

Groq

↓

Response

↓

Conversation Saved

---

# 13. Profile Management

User can

* Update Profile
* Change Role
* Upload New Resume
* Manage Skills
* Change Password
* Delete Account

---

# 14. Notifications

Future feature

Weekly reminders

↓

Run New Analysis

↓

Compare Scores

---

# Screen Flow

```text
Landing

↓

Login

↓

Profile Setup

↓

Resume Upload

↓

Skill Review

↓

Dashboard

↓

Analysis

↓

Results

↓

Recommendations

↓

History

↓

AI Chat

↓

Settings
```

---

# Analysis Sequence

```text
Click Analyze

↓

Backend

↓

Gemini

↓

Skill Extraction

↓

Market Comparison

↓

Scoring

↓

Recommendations

↓

Database

↓

Dashboard
```

---

# AI Chat Flow

```text
User

↓

Question

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

# Error Flow

Resume Upload Failed

↓

Retry

↓

Skip

↓

Continue

---

AI Failed

↓

Retry

↓

Cached Response

↓

Friendly Error

---

Unauthorized

↓

Redirect Login

---

# Loading States

Every async action must display

* Skeleton UI
* Progress Indicator
* Friendly Loading Message

Never show a blank screen.

---

# Success States

* Account Created
* Resume Uploaded
* Skills Saved
* Analysis Complete
* Report Generated
* Profile Updated

Each action triggers a toast notification.

---

# Empty States

No Resume

↓

Upload Resume

No Skills

↓

Add Skills

No Reports

↓

Run First Analysis

No Chat

↓

Ask AI Assistant

---

# Future Flow

```text
GitHub Import

↓

LinkedIn Import

↓

Resume

↓

Unified Skill Profile

↓

AI Analysis

↓

Career Forecast

↓

Mock Interview

↓

Learning Path

↓

Weekly Reports
```

---

# Complete User Lifecycle

```text
Visit Website

↓

Create Account

↓

Verify Identity

↓

Complete Profile

↓

Upload Resume

↓

Extract Skills

↓

Run Analysis

↓

Receive Score

↓

Learn Missing Skills

↓

Improve Score

↓

Track Progress

↓

Repeat Weekly
```

---

# Application Philosophy

Skill Compass is designed as a continuous career companion rather than a one-time resume analyzer.

Every interaction should encourage users to:

* Understand their current market position.
* Improve incrementally.
* Track measurable progress.
* Build confidence through transparent, AI-assisted guidance.

The application should always make the next best action clear, reducing friction and helping users maintain long-term career readiness.
