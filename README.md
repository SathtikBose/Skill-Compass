# 🧭 Skill Compass

> **An AI-powered Early Warning System for Skill Decay & Career Drift**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![Gemini](https://img.shields.io/badge/AI-Gemini_API-4285F4)
![Groq](https://img.shields.io/badge/LLM-Groq_API-F55036)

---

## 📖 Overview

**Skill Compass** is an AI-powered career intelligence platform that helps **students** and **working professionals** understand how well their current skills align with the real job market.

Instead of discovering skill gaps during placements or job switches, Skill Compass continuously analyzes a user's skills against live industry requirements and provides actionable insights to stay competitive.

The platform introduces two unique perspectives:

* **Skill Decay** – for professionals whose skills are becoming outdated.
* **Skill Drift** – for students whose learning path is diverging from current industry expectations.

By leveraging AI, real job market data, and intelligent skill matching, Skill Compass provides users with a personalized roadmap to remain job-ready.

---

# 🚀 Problem Statement

Technology evolves rapidly, but most people don't realize their skills are becoming outdated until it's too late.

### Working Professionals

Professionals often spend years working on the same technologies while industry expectations continue to evolve.

The result:

* Failed interviews
* Difficult job transitions
* Unexpected layoffs
* Reduced employability

### Students

Students frequently learn outdated curricula or random online courses without understanding what employers currently demand.

This leads to:

* Placement failures
* Skill mismatch
* Poor interview performance
* Longer job search periods

Skill Compass solves this by acting as an **Early Warning System**, helping users identify skill gaps before they become career risks.

---

# 💡 Solution

Skill Compass compares a user's skills with real-world job requirements using AI and provides:

* 📊 Market Relevance Score
* ⚠️ Skill Decay / Drift Score
* 📈 Trending Skills
* 🎯 Personalized Learning Roadmap
* 📚 AI-generated Recommendations
* 📑 Evidence-backed Skill Analysis
* 📈 Historical Progress Tracking

---

# ✨ Core Features

## 👤 User Authentication

* Secure Login & Registration
* JWT Authentication
* Google OAuth (Optional)

---

## 🎯 Role Selection

Users choose:

* Student Mode
* Professional Mode

Then select their target role, such as:

* Frontend Developer
* Backend Developer
* Full Stack Developer
* Data Analyst
* AI Engineer
* DevOps Engineer
* UI/UX Designer

---

## 📝 Skill Input

Users can:

* Add skills manually
* Upload Resume (PDF)
* Import existing profile (Future Scope)

AI automatically extracts skills from uploaded resumes.

---

## 🤖 AI Skill Extraction

Using **Google Gemini API**, the platform extracts:

* Programming Languages
* Frameworks
* Libraries
* Databases
* Tools
* Platforms
* Soft Skills

Example:

Resume

↓

React

Node.js

MongoDB

Express

Docker

AWS

Git

---

## 📊 Market Skill Analysis

The backend compares user skills with current market demand by analyzing job descriptions.

The system identifies:

* Existing Skills
* Missing Skills
* Outdated Skills
* Emerging Skills

---

## 📈 Market Relevance Score

Every user receives a score indicating how closely their profile matches the current job market.

Example:

```
Market Relevance Score

82 / 100

Excellent Alignment
```

---

## ⚠️ Skill Decay Score

For professionals:

Measures how many important industry skills are missing compared to current market demand.

---

## 🎓 Skill Drift Score

For students:

Measures how far their learning path has drifted away from placement requirements.

---

## 📉 Skill Trends

Each detected skill is categorized as:

* 📈 Rising
* ➖ Stable
* 📉 Declining

Helping users prioritize what to learn next.

---

## 🎯 AI Gap Analysis

The platform identifies:

Top Missing Skills

Example:

```
1. TypeScript
2. Docker
3. Kubernetes
4. CI/CD
5. GraphQL
```

---

## 📚 Personalized Learning Roadmap

Using AI, Skill Compass recommends:

* What to learn next
* Learning priority
* Why it matters
* Beginner resources
* Official documentation

---

## 🤖 AI Career Assistant

Powered by **Groq API**, users can ask:

* Why is my score low?
* What should I learn next?
* How can I become a Full Stack Developer?
* Explain this technology.
* Create a learning roadmap.

---

## 📑 Evidence Trail

Unlike generic AI chatbots, every recommendation is backed by real evidence.

For every missing skill, users can view:

* Job Source
* Company
* Skill Mention
* Date
* Matching Job Description

This ensures complete transparency.

---

## 📈 Progress History

Skill Compass stores historical reports so users can monitor improvement over time.

Example:

```
Week 1

Score: 58

↓

Week 2

Score: 66

↓

Week 4

Score: 79

↓

Week 8

Score: 87
```

---

## 📤 Share Report

Users can generate and share:

* PDF Report
* Public Profile Card
* Progress Snapshot

---

# 🏗️ System Architecture

```
                    React + Vite

                          │

                          ▼

                  Node.js + Express

           ┌──────────────┴──────────────┐

           ▼                             ▼

      MongoDB                     AI Services

                                       │

                 ┌─────────────────────┴──────────────────┐

                 ▼                                        ▼

           Gemini API                              Groq API

      Skill Extraction                 Career Assistant

                 │

                 ▼

          Scoring Engine

                 │

                 ▼

         Recommendation Engine

                 │

                 ▼

            React Dashboard
```

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts

---

## Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* Cloudinary SDK

---

## Database

* MongoDB
* Mongoose

---

## AI

### Google Gemini API

Used for:

* Resume Parsing
* Skill Extraction
* Gap Analysis
* Learning Roadmap
* Skill Summarization

### Groq API

Used for:

* AI Career Assistant
* Fast Chat Responses
* Personalized Guidance

---

## Storage

Cloudinary

Stores:

* Resume PDFs
* Profile Images

---

# 📂 Project Structure

```
SkillCompass/

│

├── client/

│   ├── src/

│   ├── components/

│   ├── pages/

│   ├── hooks/

│   ├── utils/

│   └── assets/

│

├── server/

│   ├── controllers/

│   ├── routes/

│   ├── middleware/

│   ├── models/

│   ├── services/

│   ├── utils/

│   └── config/

│

├── uploads/

├── README.md

└── package.json
```

---

# 🎯 Future Roadmap

* LinkedIn Profile Import
* Resume Auto Analysis
* Browser Extension
* Weekly Skill Check Notifications
* Company Dashboard
* College Placement Dashboard
* AI Mock Interviews
* Certification Tracker
* GitHub Skill Analysis
* Personalized Learning Plans

---

# 🔒 Security

* JWT Authentication
* Password Hashing (bcrypt)
* Protected APIs
* Secure File Uploads
* Cloudinary Storage
* Environment Variable Protection

---

# 🌟 Why Skill Compass?

Unlike traditional career tools or AI chatbots, Skill Compass combines **live market insights, AI-powered skill extraction, transparent evidence, and historical tracking** to provide users with a measurable and actionable understanding of their career readiness.

It doesn't just tell users what they might be missing—it helps them understand **why**, **how**, and **what to do next**, empowering continuous learning in a rapidly evolving job market.

---

# 👨‍💻 Team

Built with ❤️ for developers, students, and professionals who want to stay ahead in an ever-changing tech landscape.

---

## 📄 License

This project is licensed under the **MIT License**.

---

> **"Stay Relevant. Stay Employable. Navigate Your Career with Skill Compass."** 🧭
