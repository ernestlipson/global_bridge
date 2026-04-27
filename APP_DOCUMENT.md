# GlobalBridge Edu Consult — Application Document

## 1. Project Overview

**Name:** GlobalBridge Edu Consult
**Type:** SaaS Web Application
**Purpose:** An AI-powered platform that helps students (primarily from Ghana and West Africa) study abroad through visa interview simulation, university matching, scholarship guidance, document building, and full application tracking.

**Tagline:** "Your AI-powered gateway to studying abroad."

---

## 2. Tech Stack

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | Next.js 16 (App Router)          |
| Language         | TypeScript 5                      |
| UI Library       | React 19                          |
| Styling          | Tailwind CSS 4                    |
| Font             | Geist Sans / Geist Mono (Google) |
| Package Manager  | npm                               |
| Linting          | ESLint 9 + eslint-config-next     |
| AI Integration   | OpenAI API (planned)              |
| Auth             | TBD (NextAuth / custom JWT)       |
| Database         | TBD (PostgreSQL / Supabase)       |
| Deployment       | Vercel (planned)                  |

> **IMPORTANT:** This project uses **Next.js 16** which has breaking changes from earlier versions. Always consult `node_modules/next/dist/docs/` before writing any code.

---

## 3. Design System

### 3.1 Color Palette

| Token              | Value       | Usage                              |
| ------------------ | ----------- | ---------------------------------- |
| `--primary`        | `#2563EB`   | Primary blue (buttons, links, nav) |
| `--primary-dark`   | `#1D4ED8`   | Hover states, active elements      |
| `--primary-light`  | `#DBEAFE`   | Light blue backgrounds, badges     |
| `--accent`         | `#10B981`   | Green accent (success, growth)     |
| `--accent-light`   | `#D1FAE5`   | Green tinted backgrounds           |
| `--background`     | `#FFFFFF`   | Page background                    |
| `--surface`        | `#F8FAFC`   | Card/section background            |
| `--border`         | `#E2E8F0`   | Borders, dividers                  |
| `--text-primary`   | `#0F172A`   | Headings, primary text             |
| `--text-secondary` | `#475569`   | Body text, descriptions            |
| `--text-muted`     | `#94A3B8`   | Placeholder, disabled text         |
| `--danger`         | `#EF4444`   | Errors, rejection indicators       |
| `--warning`        | `#F59E0B`   | Warnings, pending states           |

### 3.2 Typography

- **Font Family:** Geist Sans (body), Geist Mono (code/data)
- **Headings:** font-semibold or font-bold
- **Body:** text-base (16px), leading-relaxed
- **Small/Caption:** text-sm (14px), text-muted

### 3.3 Design Principles

- Clean, modern SaaS dashboard aesthetic
- Professional and minimal — no visual clutter
- Mobile-first responsive design
- Rounded corners (rounded-lg / rounded-xl)
- Subtle shadows (shadow-sm / shadow-md)
- Consistent 4px/8px spacing grid

---

## 4. Project Structure

```
src/ is at project root (no src/ prefix — Next.js App Router convention)

app/
├── layout.tsx                    # Root layout (fonts, global providers)
├── page.tsx                      # Landing page (public marketing page)
├── globals.css                   # Global styles + Tailwind + CSS variables
│
├── (auth)/
│   ├── login/page.tsx            # Login page
│   └── register/page.tsx         # Signup/Register page
│
├── (dashboard)/
│   ├── layout.tsx                # Dashboard layout (sidebar + topbar)
│   ├── dashboard/page.tsx        # Dashboard home (overview)
│   ├── visa/page.tsx             # AI Visa Interview Trainer
│   ├── universities/page.tsx     # Smart University Matching
│   ├── scholarships/page.tsx     # Scholarship & Funding Engine
│   ├── documents/page.tsx        # AI SOP & Document Builder
│   ├── transcript/page.tsx       # Transcript Evaluation
│   ├── applications/page.tsx     # Application Tracker
│   ├── predeparture/page.tsx     # Pre-departure & Life Abroad Guide
│   ├── community/page.tsx        # Community & Social Proof
│   └── profile/page.tsx          # Student Profile
│
├── api/
│   ├── ai/route.ts               # AI endpoints (interview, SOP, matching)
│   └── auth/route.ts             # Auth endpoints
│
components/
├── ui/
│   ├── Button.tsx                # Reusable button component
│   ├── Input.tsx                 # Reusable input/textarea
│   ├── Card.tsx                  # Card wrapper component
│   ├── Badge.tsx                 # Status badges
│   ├── Modal.tsx                 # Modal/dialog component
│   ├── Select.tsx                # Dropdown select
│   ├── ProgressBar.tsx           # Progress indicator
│   └── Avatar.tsx                # User avatar
│
├── layout/
│   ├── Navbar.tsx                # Top navigation bar (public pages)
│   ├── Sidebar.tsx               # Dashboard sidebar navigation
│   ├── DashboardHeader.tsx       # Dashboard top bar (search, user menu)
│   └── Footer.tsx                # Footer (public pages)
│
├── landing/
│   ├── Hero.tsx                  # Hero section
│   ├── Features.tsx              # Features grid
│   ├── Testimonials.tsx          # Student testimonials
│   ├── Pricing.tsx               # Pricing plans
│   └── CTA.tsx                   # Call-to-action section
│
features/
├── visa/
│   ├── InterviewSimulator.tsx    # Voice/text interview UI
│   ├── FeedbackPanel.tsx         # AI feedback display
│   ├── QuestionCard.tsx          # Individual question card
│   └── types.ts                  # Visa feature types
│
├── auth/
│   ├── LoginForm.tsx             # Login form component
│   ├── RegisterForm.tsx          # Register form component
│   └── types.ts                  # Auth types
│
├── universities/
│   ├── UniversityCard.tsx        # University result card
│   ├── FilterPanel.tsx           # Filter sidebar/controls
│   ├── MatchResults.tsx          # Match results list
│   └── types.ts                  # University types
│
├── scholarships/
│   ├── ScholarshipCard.tsx       # Scholarship result card
│   ├── BudgetCalculator.tsx      # Budget + affordability tool
│   └── types.ts                  # Scholarship types
│
├── documents/
│   ├── SOPBuilder.tsx            # SOP generator UI
│   ├── CVBuilder.tsx             # CV builder UI
│   └── types.ts                  # Document types
│
├── transcript/
│   ├── TranscriptUpload.tsx      # Transcript file upload UI
│   ├── EvaluationResult.tsx      # Evaluation results display
│   └── types.ts                  # Transcript feature types
│
├── applications/
│   ├── ApplicationTimeline.tsx   # Status timeline component
│   ├── ApplicationCard.tsx       # Individual application card
│   └── types.ts                  # Application types
│
├── profile/
│   ├── ProfileForm.tsx           # Profile setup/edit form
│   └── types.ts                  # Profile types
│
lib/
├── utils.ts                      # General utility functions
├── openai.ts                     # OpenAI API client configuration
├── constants.ts                  # App-wide constants
└── dummy-data.ts                 # Dummy/mock data for development
│
hooks/
├── useAuth.ts                    # Authentication hook
├── useProfile.ts                 # Profile data hook
└── useInterview.ts               # Interview session hook
│
types/
├── index.ts                      # Shared TypeScript types/interfaces
│
styles/
└── (empty — using Tailwind + globals.css)

public/
├── logo.svg                      # GlobalBridge logo
├── icons/                        # Static icons
└── images/                       # Static images
```

---

## 5. Pages & Routes

### 5.1 Public Pages

| Route        | Page            | Description                                                  |
| ------------ | --------------- | ------------------------------------------------------------ |
| `/`          | Landing Page    | Hero, features, testimonials, pricing, CTA                   |
| `/login`     | Login           | Email/password login form                                    |
| `/register`  | Register        | Signup form with name, email, password, country              |

### 5.2 Dashboard Pages (Authenticated)

| Route              | Page                  | Description                                          |
| ------------------ | --------------------- | ---------------------------------------------------- |
| `/dashboard`       | Dashboard Home        | Overview cards, stats, quick actions                 |
| `/visa`            | Visa Interview Trainer| AI mock interview simulator with feedback            |
| `/universities`    | University Matching   | AI-powered university recommendations                |
| `/scholarships`    | Scholarship Finder    | Scholarship search + budget calculator               |
| `/documents`       | Document Builder      | SOP, CV, recommendation letter generator             |
| `/transcript`      | Transcript Evaluation | Upload & evaluate academic transcripts with AI       |
| `/applications`    | Application Tracker   | Track application status across universities         |
| `/predeparture`    | Pre-departure Guide   | Checklists, tips, cultural guides                    |
| `/community`       | Community             | Student stories, alumni chat, groups                 |
| `/profile`         | Student Profile       | Academic profile, budget, goals, preferences         |

### 5.3 API Routes

| Endpoint       | Method | Description                                    |
| -------------- | ------ | ---------------------------------------------- |
| `/api/ai`      | POST   | AI operations (interview Q&A, SOP gen, match)  |
| `/api/auth`    | POST   | Login, register, session management            |

---

## 6. Feature Specifications

### 6.1 AI Visa Interview Trainer (CORE — Killer Feature)

**Priority:** P0 — Must Have

The #1 differentiator. Visa rejection is the biggest pain point for Ghanaian students.

**Functionality:**

- Realistic visa interview simulation via text (voice planned for v2)
- Ghana-specific and country-specific questions (US B1/F1, UK Tier 4, Canada study permit)
- AI-generated follow-up questions based on student responses
- Real-time feedback after each answer:
  - **Confidence Score** (0–100)
  - **Clarity Score** (0–100)
  - **Red Flags** detected (vague answers, inconsistencies, weak ties to home country)
- Mock rejection with detailed explanation of why
- Session replay with improvement suggestions
- Interview readiness score (overall)
- Practice modes: Quick (5 questions), Standard (10), Full simulation (15+)

**UI Elements:**

- Chat-like interface for Q&A
- Side panel showing real-time scores
- Progress bar showing interview completion
- Summary card at end with scores + recommendations

**Dummy Data (for development):**

```
Questions: 15+ Ghana-specific visa interview questions
Sample feedback: Pre-written AI feedback for demo
Scores: Randomized confidence/clarity scores
```

---

### 6.2 Student Profile Engine

**Priority:** P0

Think LinkedIn + CV + Application tracker combined.

**Input Fields:**

- Full name, date of birth, nationality
- Academic background (university, GPA, degree, field)
- English proficiency (IELTS/TOEFL score or "No test yet")
- Budget range (in GHS and auto-convert to USD/GBP/EUR/CAD)
- Career goals (text + dropdown categories)
- Preferred countries (multi-select: UK, USA, Canada, Australia, Germany, etc.)
- Preferred program level (Bachelors, Masters, PhD)
- Work experience (years, field)

**AI Output:**

- Recommended countries (ranked by fit)
- Recommended universities (top 5–10)
- Acceptance probability score (Low / Medium / High)
- Suggested improvements to increase chances

---

### 6.3 Smart University Matching

**Priority:** P0

**Features:**

- AI suggests 5–10 universities based on student profile
- Each university card shows:
  - University name + country + logo
  - Program name
  - Tuition (annual, in USD)
  - Acceptance rate
  - Visa success likelihood
  - Scholarship availability badge
- Filter controls:
  - Budget range slider
  - Country filter
  - "Scholarships Available" toggle
  - "No IELTS Required" toggle
  - "Affordable Programs" quick filter
- Sort by: Best Match, Lowest Tuition, Highest Acceptance Rate

**Dummy Data:**

```
20 universities across UK, USA, Canada, Germany, Australia
Tuition: $5,000 — $45,000 range
Programs: Computer Science, Business, Engineering, Medicine, etc.
```

---

### 6.4 AI SOP & Document Builder

**Priority:** P1

**Documents Supported:**

- **Statement of Purpose (SOP):** AI-generated based on profile, goals, and target university
- **CV/Resume:** Structured academic CV builder
- **Recommendation Letter Drafts:** Template-based drafts student can share with referees

**Features:**

- Step-by-step wizard UI
- AI tone adjustment (formal, confident, humble)
- Grammar check indicator
- Download as PDF
- Edit and regenerate sections

---

### 6.5 Transcript Evaluation

**Priority:** P1

Helps students understand how their academic credentials translate across different education systems — critical for applications to universities in the UK, US, Canada, and Europe.

**Features:**

- Upload transcript (PDF/image) for AI analysis
- GPA conversion across grading systems:
  - Ghana (1st Class, 2nd Upper, etc.) → US 4.0 scale
  - Ghana → UK classification
  - Ghana → ECTS (Europe)
  - Other West African systems supported
- Credential equivalency assessment:
  - How the degree is recognized in the target country
  - Whether additional credential evaluation services are needed (e.g., WES, ENIC-NARIC)
- Course-level breakdown:
  - Subject areas mapped to target program requirements
  - Prerequisite gap identification
- Eligibility checks:
  - "Does your transcript meet the minimum for this university?" — AI answer
  - Comparison against target university requirements
- Recommendations:
  - Suggested credential evaluation agencies
  - Tips to strengthen weak areas
  - Additional certifications to consider
- Download evaluation report as PDF

**UI Elements:**

- Drag-and-drop upload area
- Progress indicator during AI analysis
- Results displayed as a structured report card
- Side-by-side original vs. converted grades
- Eligibility badge per university (Meets / Partially Meets / Below Requirement)

**Dummy Data (for development):**

```
Sample Ghana university transcript (BSc Computer Science, CGPA 3.4/4.0)
Pre-computed GPA conversions for 5 grading systems
3 sample university eligibility checks
```

---

### 6.6 Scholarship & Funding Engine

**Priority:** P1

**Features:**

- Scholarship search with filters (country, field, amount, deadline)
- Each scholarship card shows:
  - Name, provider, amount, deadline
  - Eligibility summary
  - "Apply" link
- Budget Calculator:
  - Input: Tuition + living expenses + travel
  - Output: Total cost breakdown
  - Currency converter (GHS ↔ USD/GBP/EUR/CAD)
- **"Can You Afford This Program?"** — AI-powered affordability assessment
- Loan matching (informational)

**Dummy Data:**

```
15+ scholarships (Chevening, Commonwealth, DAAD, Fulbright, etc.)
Budget scenarios for 5 countries
```

---

### 6.7 Visa Success System

**Priority:** P1

**Features:**

- Document checklist (per country, per visa type)
  - Items: Passport, Admission letter, Financial proof, etc.
  - Checkboxes with progress tracking
- Financial proof calculator:
  - Input: Tuition + living cost + duration
  - Output: Minimum bank balance required
- Bank statement validator (guidance, not actual validation):
  - Tips on statement format, age of funds, etc.
- **Visa Success Probability Score** (based on profile completeness + interview readiness)
- **Interview Readiness Score** (tied to visa interview practice)

---

### 6.8 Application Tracker Dashboard

**Priority:** P1

**Features:**

- Add and track multiple university applications
- Each application shows:
  - University name + program
  - Current status stage
  - Key dates (submitted, deadline, decision date)
- Status timeline stages:

  ```
  Research → Applied → Admission → CAS/I-20 → Visa → Pre-departure → Travel
  ```

- Status badge colors:
  - Pending (yellow), Accepted (green), Rejected (red), In Progress (blue)
- Summary stats at top: Total Applied, Offers Received, Visa Status

---

### 6.9 Pre-departure & Life Abroad Guide

**Priority:** P2

**Content Sections:**

- Accommodation tips (per country)
- Packing checklist (interactive, checkable)
- Airport process guide (step-by-step)
- Cultural training tips
- Part-time job advice (per country, visa work rules)
- Emergency contacts and resources

**UI:** Card-based layout with expandable sections.

---

### 6.10 Community & Social Proof

**Priority:** P2

**Features:**

- Student success stories (card layout with photo, name, university, quote)
- Alumni Q&A section (ask someone already in UK/Canada/etc.)
- Group discussions (forum-style, future: WhatsApp integration)
- Video testimonials (embedded YouTube/hosted)

**Dummy Data:**

```
6-8 student testimonial cards with photos, quotes, universities
```

---

### 6.11 Admin Panel (Future — v2)

**Priority:** P3

- Manage student accounts
- Track revenue & subscriptions
- Assign counselors to students
- Chat with users
- Analytics dashboard (signups, conversions, popular features)

---

## 7. Monetization Model

### Freemium Tiers

| Feature                  | Free        | Premium (Paid) |
| ------------------------ | ----------- | -------------- |
| Profile creation         | ✅          | ✅             |
| Basic university search  | ✅ (3 results) | ✅ (unlimited) |
| Mock interview           | ✅ (1 session) | ✅ (unlimited) |
| Visa interview trainer   | ❌          | ✅             |
| SOP/CV builder           | ❌          | ✅             |
| Scholarship matching     | ❌          | ✅             |
| Transcript evaluation    | ✅ (1 eval) | ✅ (unlimited) |
| Application tracker      | ✅ (3 apps) | ✅ (unlimited) |
| Document downloads       | ❌          | ✅             |
| Premium counseling       | ❌          | ✅             |

**Pricing (planned):**

- Free Tier: $0
- Student Plan: ~$15/month or ~$99/year
- Premium Plan: ~$29/month (includes 1-on-1 counseling)

---

## 8. Dashboard Layout

### Sidebar Navigation Items

```
📊 Dashboard          → /dashboard
🎤 Visa Interview     → /visa
🎓 Universities       → /universities
💰 Scholarships       → /scholarships
📄 Documents          → /documents
� Transcript         → /transcript
�📋 Applications       → /applications
✈️  Pre-departure      → /predeparture
👥 Community          → /community
👤 Profile            → /profile
```

### Dashboard Home Cards (Overview)

| Card                    | Content                                     |
| ----------------------- | ------------------------------------------- |
| Interview Readiness     | Score (e.g., 72/100) + "Practice Now" CTA   |
| Applications            | 3 Applied, 1 Offer + "View All" link        |
| Visa Status             | Current stage + probability score            |
| Recommended Universities| Top 3 matches + "See More" link              |
| Upcoming Deadlines      | Next 3 deadlines with dates                 |
| Scholarship Matches     | 2 new matches + "Browse" link               |

---

## 9. Component Conventions

- **File naming:** PascalCase for components (`Button.tsx`), camelCase for utilities (`utils.ts`)
- **Exports:** Named exports for components, default exports only for pages
- **Props:** Define prop interfaces above component, suffix with `Props` (e.g., `ButtonProps`)
- **Styling:** Tailwind CSS utility classes. No CSS modules. Use `cn()` utility from `lib/utils.ts` for conditional classes
- **State:** React hooks for local state. Context API or Zustand for shared state (TBD)
- **Data fetching:** Server Components by default. Client Components only when needed (interactivity, hooks)

### `cn()` Utility

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 10. Dummy Data Strategy

All pages should render with realistic dummy data during development. Dummy data lives in `lib/dummy-data.ts` and is imported by page components.

**Data includes:**

- 20 universities with tuition, acceptance rates, locations
- 15 scholarships with amounts, deadlines, eligibility
- Sample transcript evaluation with GPA conversions
- 15 visa interview questions (Ghana-specific)
- 8 student testimonials
- 5 sample applications with status timelines
- Pre-departure checklists for UK, USA, Canada
- Sample student profile

---

## 11. Responsive Breakpoints

| Breakpoint | Width    | Layout                                    |
| ---------- | -------- | ----------------------------------------- |
| `sm`       | 640px    | Stack to side-by-side transitions          |
| `md`       | 768px    | Sidebar collapses to hamburger on mobile   |
| `lg`       | 1024px   | Full sidebar visible                       |
| `xl`       | 1280px   | Max content width, centered                |

- Dashboard sidebar: hidden on mobile (hamburger toggle), visible on `lg+`
- Cards: 1 column on mobile, 2 on `md`, 3 on `lg+`

---

## 12. Key User Flows

### Flow 1: New Student Onboarding

```
Landing Page → Register → Profile Setup (wizard) → Dashboard
```

### Flow 2: Visa Interview Practice

```
Dashboard → Visa Interview → Select Country/Visa Type → Start Interview → Answer Questions → View Feedback → View Score → Retry or Exit
```

### Flow 3: University Matching

```
Dashboard → Universities → Apply Filters → View Matches → Click University Card → View Details → Save / Apply
```

### Flow 4: Application Tracking

```
Dashboard → Applications → Add New Application → Fill Details → Track Status → Update Stage
```

---

## 13. Environment Variables (Planned)

```env
OPENAI_API_KEY=           # OpenAI API key for AI features
DATABASE_URL=             # Database connection string
NEXTAUTH_SECRET=          # Auth secret key
NEXTAUTH_URL=             # App base URL
NEXT_PUBLIC_APP_URL=      # Public app URL
```

---

## 14. Development Phases

### Phase 1 — MVP (Current)

- [x] Project setup (Next.js 16 + Tailwind 4 + TypeScript)
- [ ] Landing page
- [ ] Login / Register pages
- [ ] Dashboard layout (sidebar + header)
- [ ] Dashboard home with overview cards
- [ ] Student Profile page
- [ ] Visa Interview Trainer (text-based, with dummy AI responses)
- [ ] University Matching page (with dummy data)
- [ ] Scholarship page (with dummy data)
- [ ] All pages use dummy data, no backend

### Phase 2 — AI Integration

- [ ] Connect OpenAI API for interview simulation
- [ ] AI-powered SOP generator
- [ ] AI university matching engine
- [ ] Scholarship recommendation engine

### Phase 3 — Backend & Auth

- [ ] Database setup
- [ ] User authentication (login/register)
- [ ] Persistent user profiles
- [ ] Application tracking with database

### Phase 4 — Advanced Features

- [ ] Voice-based interview simulation
- [ ] Document builder (SOP, CV, recommendation letter)
- [ ] Visa success system (document checklist, financial calculator)
- [ ] Community features
- [ ] Admin panel

### Phase 5 — Launch

- [ ] Payment integration (Stripe / Paystack for Ghana)
- [ ] Production deployment on Vercel
- [ ] Analytics and monitoring
- [ ] SEO optimization

---

## 15. Target Audience

- **Primary:** Ghanaian students (18–35) seeking to study abroad
- **Secondary:** West African students (Nigeria, Kenya, etc.)
- **Tertiary:** Education consultants managing multiple students

**Key Pain Points:**

1. Visa rejection (lack of preparation, weak answers)
2. Overwhelm finding the right university and program
3. Scholarship discovery is fragmented
4. Application process is confusing and untracked
5. SOP writing is difficult without guidance
6. Financial planning for studying abroad is unclear

---

*This document serves as the single source of truth for building GlobalBridge Edu Consult. All AI agents and developers should reference this when implementing features.*
