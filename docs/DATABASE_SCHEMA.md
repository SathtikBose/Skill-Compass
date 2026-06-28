# 🗄️ Database Schema Documentation

# Skill Compass

**Database:** MongoDB Atlas
**ODM:** Mongoose
**Version:** 1.0

---

# Overview

Skill Compass uses **MongoDB** as its primary database.

Collections are designed to:

* Keep user data normalized
* Support AI-generated reports
* Track historical progress
* Store recommendation history
* Enable analytics
* Scale efficiently

---

# Database Collections

```text
users

profiles

skills

reports

jobSnapshots

recommendations

chatHistories

notifications

settings

auditLogs
```

---

# Entity Relationship

```text
User
│
├── Profile (1:1)
│
├── Skills (1:N)
│
├── Reports (1:N)
│
├── Recommendations (1:N)
│
├── Chat History (1:N)
│
├── Notifications (1:N)
│
└── Settings (1:1)
```

---

# 1. Users Collection

Collection

```text
users
```

Purpose

Stores authentication information.

Schema

```javascript
{
    _id:ObjectId,

    name:String,

    email:String,

    password:String,

    provider:{
        type:String,
        enum:["local","google"]
    },

    avatar:String,

    emailVerified:Boolean,

    lastLogin:Date,

    createdAt:Date,

    updatedAt:Date
}
```

Indexes

```text
email (Unique)
```

---

# 2. Profiles Collection

Collection

```text
profiles
```

Purpose

Stores user profile information.

Schema

```javascript
{
    _id:ObjectId,

    userId:ObjectId,

    mode:{
        type:String,
        enum:[
            "student",
            "professional"
        ]
    },

    targetRole:String,

    experience:Number,

    education:String,

    university:String,

    company:String,

    location:String,

    bio:String,

    resumeUrl:String,

    createdAt:Date,

    updatedAt:Date
}
```

Relationship

```text
User

1

↓

1

Profile
```

---

# 3. Skills Collection

Collection

```text
skills
```

Purpose

Stores all user skills.

Schema

```javascript
{
    _id:ObjectId,

    userId:ObjectId,

    name:String,

    category:String,

    proficiency:{
        type:Number,
        min:1,
        max:5
    },

    source:{
        type:String,
        enum:[
            "manual",
            "resume",
            "ai"
        ]
    },

    verified:Boolean,

    createdAt:Date,

    updatedAt:Date
}
```

Example

```javascript
{
    name:"React",

    category:"Frontend",

    proficiency:4,

    source:"resume"
}
```

Indexes

```text
userId

name
```

---

# 4. Reports Collection

Collection

```text
reports
```

Purpose

Stores every skill analysis.

Schema

```javascript
{
    _id:ObjectId,

    userId:ObjectId,

    targetRole:String,

    mode:String,

    marketScore:Number,

    decayScore:Number,

    driftScore:Number,

    missingSkills:[String],

    matchedSkills:[String],

    strengths:[String],

    weaknesses:[String],

    generatedAt:Date
}
```

Example

```javascript
{
    marketScore:82,

    decayScore:18,

    driftScore:0,

    missingSkills:[
        "Docker",
        "TypeScript"
    ]
}
```

Indexes

```text
userId

generatedAt
```

---

# 5. Job Snapshots Collection

Collection

```text
jobSnapshots
```

Purpose

Stores processed job market data used during analysis.

Schema

```javascript
{
    _id:ObjectId,

    role:String,

    company:String,

    source:String,

    jobUrl:String,

    location:String,

    extractedSkills:[String],

    rawDescription:String,

    analyzedAt:Date
}
```

Purpose

Avoid repeated AI extraction.

Cache job skills.

---

# 6. Recommendations Collection

Collection

```text
recommendations
```

Purpose

Stores AI-generated learning recommendations.

Schema

```javascript
{
    _id:ObjectId,

    reportId:ObjectId,

    userId:ObjectId,

    title:String,

    description:String,

    priority:Number,

    estimatedHours:Number,

    resources:[
        {
            title:String,

            url:String,

            type:String
        }
    ],

    completed:Boolean,

    createdAt:Date
}
```

---

# 7. Chat History Collection

Collection

```text
chatHistories
```

Purpose

Stores conversations with AI Assistant.

Schema

```javascript
{
    _id:ObjectId,

    userId:ObjectId,

    role:String,

    message:String,

    model:String,

    createdAt:Date
}
```

Example

```javascript
{
    role:"user",

    message:"How can I improve my score?",

    model:"groq"
}
```

---

# 8. Notifications Collection

Collection

```text
notifications
```

Purpose

Stores user notifications.

Schema

```javascript
{
    _id:ObjectId,

    userId:ObjectId,

    title:String,

    description:String,

    type:String,

    read:Boolean,

    createdAt:Date
}
```

---

# 9. Settings Collection

Collection

```text
settings
```

Purpose

Stores user preferences.

Schema

```javascript
{
    _id:ObjectId,

    userId:ObjectId,

    theme:String,

    emailNotifications:Boolean,

    weeklyReports:Boolean,

    aiSuggestions:Boolean
}
```

---

# 10. Audit Logs Collection

Collection

```text
auditLogs
```

Purpose

Tracks important system events.

Schema

```javascript
{
    _id:ObjectId,

    userId:ObjectId,

    action:String,

    ip:String,

    userAgent:String,

    createdAt:Date
}
```

Examples

* Login
* Password Change
* Report Generated
* Resume Uploaded

---

# Embedded Objects

## Learning Resource

```javascript
{
    title:String,

    url:String,

    type:String
}
```

---

## Evidence

```javascript
{
    company:String,

    role:String,

    sentence:String,

    source:String,

    date:Date
}
```

Embedded inside Reports.

---

# Index Strategy

Users

```text
email
```

Profiles

```text
userId
```

Skills

```text
userId

name
```

Reports

```text
userId

generatedAt
```

Recommendations

```text
userId

reportId
```

Chat History

```text
userId

createdAt
```

Job Snapshots

```text
role

analyzedAt
```

Notifications

```text
userId

read
```

---

# Relationships

```text
User

↓

Profile

↓

Skills

↓

Reports

↓

Recommendations
```

Chat History

↓

User

Notifications

↓

User

Settings

↓

User

---

# Data Flow

```text
Register

↓

User

↓

Profile

↓

Upload Resume

↓

Cloudinary

↓

Gemini

↓

Skills Collection

↓

Run Analysis

↓

Reports

↓

Recommendations

↓

Dashboard
```

---

# Soft Delete Strategy

Collections supporting soft delete should include:

```javascript
{
    isDeleted:Boolean,

    deletedAt:Date
}
```

Applicable to:

* Profiles
* Reports
* Recommendations
* Notifications

Authentication records should remain intact.

---

# Timestamps

Every collection should include:

```javascript
createdAt

updatedAt
```

Use Mongoose timestamps:

```javascript
timestamps:true
```

---

# Validation Rules

Email

Unique

Required

Password

Minimum 8 characters

Target Role

Required

Skill Name

Required

Market Score

0–100

Proficiency

1–5

Recommendation Priority

1–5

---

# File Storage Strategy

Database stores only URLs.

Files remain in Cloudinary.

Example

```javascript
{
    resumeUrl:"https://res.cloudinary.com/..."
}
```

---

# Future Collections

The schema is designed to support additional features without major restructuring.

Potential collections include:

* `learningPaths`
* `mockInterviews`
* `interviewResults`
* `githubProfiles`
* `linkedinImports`
* `certifications`
* `badges`
* `leaderboards`
* `organizations`
* `teams`
* `jobApplications`
* `marketTrends`

---

# Database Best Practices

* Use ObjectId references for related collections.
* Store only Cloudinary URLs, never binary files.
* Enable Mongoose timestamps on every schema.
* Create indexes for frequently queried fields.
* Validate all incoming data before persistence.
* Use transactions for multi-document operations when required.
* Keep collections focused on a single responsibility.
* Archive or purge historical AI data periodically if storage becomes a concern.
* Never expose internal MongoDB identifiers directly in public APIs unless required.
* Keep schema changes backward compatible through versioned migrations.

---

# Schema Design Philosophy

The Skill Compass database is designed around scalability, maintainability, and clear separation of concerns. Authentication, user profiles, AI-generated analyses, recommendations, and chat history are isolated into dedicated collections to simplify development and future expansion while remaining optimized for MongoDB's document-oriented architecture.

The design balances normalization with selective embedding, ensuring efficient queries today while providing flexibility for advanced features such as GitHub integration, LinkedIn imports, AI mock interviews, organization dashboards, and large-scale analytics in future releases.
