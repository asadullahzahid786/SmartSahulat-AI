# SmartSahulat AI (اسمارٹ سہولت)

> **"Tell Us Your Problem. We'll Help You Take the Next Step."**  
> *From Citizen's Problem to a Practical Action Plan.*

SmartSahulat AI is a Generative AI-powered citizen assistant designed for Pakistani citizens. It enables citizens to describe everyday public-service grievances naturally in **Urdu (اردو)**, **English**, or **Roman Urdu**, and instantly transforms that confusion into a structured diagnosis, a document checklist, an immediate next action, and a formal, submission-ready complaint letter.

---

## 1. Problem Statement

Across Pakistan, millions of citizens navigate frustrating bureaucratic friction when dealing with public service breakdowns:
- **Excessive electricity billing & faulty meter readings** (LESCO, K-Electric, IESCO, MEPCO, etc.)
- **Severe Sui gas low pressure & water contamination** (SNGPL, SSGC, WASA)
- **Delays in identity and travel documents** (NADRA CNIC renewals, Passport backlogs)
- **Public hospital and healthcare entitlement disputes** (Sehat Sahulat card claim rejections)
- **Educational credential delays** (Degree attestation at HEC/BISE)
- **Labour rights and wage arrears** (EOBI pensions, withheld compensation)

Citizens often do not know:
1. Which official authority has jurisdiction.
2. What documents are legally mandatory before visiting an office.
3. What single immediate step to take first.
4. How to format an official written representation or complaint letter.

---

## 2. Solution: The 5-Step Journey

SmartSahulat AI implements a direct, action-oriented workflow:

```text
PROBLEM  →  UNDERSTAND  →  GUIDE  →  GENERATE  →  TAKE ACTION
   │             │            │           │              │
Citizen      AI Category  Realistic   Formal Urdu/     Immediate
Input In      & Summary    Causes &   English Letter   Actionable
Urdu/Eng                  Checklist   With Auto-Fill   Next Step
```

---

## 3. Key Features

- **Multilingual Natural Language Input**: Describe problems in English, pure Urdu (اردو script), or Roman Urdu (e.g., *"Mera bijli ka bill bohat zyada aya hai"*).
- **Supported Civic Domains**:
  1. Electricity / Utility (DISCOs & NEPRA)
  2. Gas / Water (SNGPL, SSGC, WASA, Municipalities)
  3. Government Services (NADRA, Passports, Excise, BISP)
  4. Education (HEC, BISE, Universities)
  5. Healthcare (Sehat Sahulat, Public Hospitals)
  6. Employment (Labour Department, EOBI, Pensions)
  7. General Public Complaints (Municipal administration & civic utilities)
- **Zero-Hallucination Guardrails**: Strictly avoids fabricating government gazettes, unverified telephone numbers, or non-existent circulars. Always advises verification with relevant departments.
- **"WHAT SHOULD I DO NEXT?" (Core Highlight)**: Provides the single most critical, immediate first step to prevent wasted trips and administrative runarounds.
- **Document Readiness Checklist**: Separates *Required* vs. *May Be Required* documents with interactive checkboxes.
- **Formal Complaint Generator**:
  - Available in formal **English** or formal **Urdu** (بخدمت جناب ایکسیئن / مجاز اتھارٹی).
  - One-click placeholder auto-fill for Name, CNIC, Consumer Reference, and Contact details.
  - Full in-browser text editing, copy-to-clipboard, print, and `.txt` download.
- **Guest-First & Private**: No mandatory user signup or login walls. Session history stays stored purely on the client browser via `localStorage`.

---

## 4. Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Backend / API**: Express 4 server integrated with Vite middleware for dev and production bundling.
- **Generative AI**: `@google/genai` TypeScript SDK with model `gemini-3.8-flash`.
- **Deployment Targets**: Google AI Studio, GitHub, and Vercel.

---

## 5. Project Architecture

```text
[ Browser / Client ]
        │  POST /api/analyze
        │  POST /api/generate-complaint
        ▼
[ Express Server (server.ts) ]
        │
        ├── Validate request payload (length, sanitization)
        ├── Detect language (English, Urdu script, Roman Urdu)
        ├── Call Google Gemini API (@google/genai SDK, gemini-3.8-flash)
        └── Safe structured fallback engine (if API key pending or rate-limited)
        │
        ▼
[ Structured JSON Response ]
        │
        ▼
[ Interactive Citizen Dashboard ]
        ├── Problem Detected & Category Badge
        ├── Summary & Potential Causes
        ├── Recommended Prioritised Steps
        ├── Document Readiness Checklist
        ├── "WHAT SHOULD I DO NEXT?" Card
        └── Complaint Application Editor (Copy / Print / TXT Download)
```

---

## 6. Directory Structure

```text
├── index.html                    # HTML entry point with fonts & metadata
├── metadata.json                 # AI Studio capability metadata
├── package.json                  # Scripts & dependencies
├── server.ts                     # Express server & server-side Gemini API endpoints
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build & Tailwind configuration
├── .env.example                  # Environment variable declarations
└── src/
    ├── main.tsx                  # React DOM mount
    ├── App.tsx                   # Main state & view coordinator
    ├── index.css                 # Tailwind CSS styles
    ├── types.ts                  # Shared TypeScript interfaces & types
    ├── data/
    │   ├── samples.ts            # Preset multilingual test problems
    │   └── categories.ts         # Metadata on the 7 supported categories & authorities
    └── components/
        ├── Navbar.tsx            # Header navigation & language switch
        ├── HeroInput.tsx         # Large problem input & test prompts
        ├── ResultDashboard.tsx   # Action plan & document checklist dashboard
        ├── ComplaintEditor.tsx   # Formal letter generator with auto-fill & export
        ├── HowItWorksView.tsx    # 6-step breakdown of the SmartSahulat workflow
        ├── CategoriesView.tsx    # Details on all supported Pakistani authorities
        ├── AboutView.tsx         # Mission, safety disclaimers, and privacy policy
        ├── HistoryDrawer.tsx     # Client-side session history drawer
        └── Footer.tsx            # Footer & legal disclaimers
```

---

## 7. Environment Variables

Create a `.env` file in the root directory:

```env
# Google Gemini API key for server-side AI calls
GEMINI_API_KEY=your_gemini_api_key_here

# App URL (optional, defaults to local port)
APP_URL=http://localhost:3000
```

> **Security Note**: Never prefix `GEMINI_API_KEY` with `VITE_`. All Gemini calls are kept strictly server-side inside `server.ts` to protect API keys from browser exposure.

---

## 8. Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start full-stack development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 9. Production Build & Deployment

```bash
# Compile client bundle and bundle server with esbuild
npm run build

# Start the compiled production server
npm start
```

### Deploying to Vercel / GitHub
1. Push repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: SmartSahulat AI"
   git branch -M main
   git remote add origin https://github.com/your-username/smartsahulat-ai.git
   git push -u origin main
   ```
2. Import repository on [Vercel](https://vercel.com).
3. Add `GEMINI_API_KEY` in Vercel Project Settings > Environment Variables.
4. Deploy!

---

## 10. Demo Test Scenarios

### Test 1: High Electricity Bill (English)
- **Input**: *"My electricity bill is three times higher this month. I don't understand why. What should I do?"*
- **Result**: Categorized under **Electricity / Utility**. Highlights meter reading discrepancies, slab tariffs, and FPA charges. Provides exact checklist (Bill copy, meter display photograph, CNIC) and an actionable next step to photograph the meter and contest with the SDO.

### Test 2: Bijli Ka Bill (Roman Urdu)
- **Input**: *"Mera bijli ka bill bohat zyada aya hai, mujhe samajh nahi aa rahi kya karun."*
- **Result**: Automatically identified as **Roman Urdu**. Yields a prioritized action plan and draft complaint.

### Test 3: Winter Gas Disruption (Urdu)
- **Input**: *"ہمارے علاقے میں گیس کا پریشر شدید کم ہے جس کی وجہ سے کھانا پکانا ممکن نہیں رہا۔"*
- **Result**: Categorized under **Gas / Water** with guidance for SNGPL/SSGC dispute registration.

---

## 11. Disclaimer

SmartSahulat AI provides general informational guidance and document drafting assistance. It does not replace official government instructions, statutory rules, or licensed professional legal advice. Procedures and requirements may vary by jurisdiction and department. Citizens should verify current requirements with the relevant official authority.
