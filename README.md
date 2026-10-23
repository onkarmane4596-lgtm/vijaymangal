# विजयमंगल आयुर्वेद (Vijaymangal Ayurved)
## Premium Ayurvedic Website + Clinic Management Platform

**Location:** Main Road, Opposite Post Office, Near Vitthal Rukmini Temple, Atpadi, Sangli, Maharashtra  
**Practitioner:** डॉ. सुप्रिया श्रीप्रसाद कदम (Dr. Supriya Shreeprasad Kadam), एम. डी. (आयुर्वेद)  
**Contact:** +91 8263902142  
**Brand Philosophy:** शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प  
**Positioning:** आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा  

---

## 1. Architecture & Design

### A. Public Website (Marathi-First)
- **Language:** Professional Marathi (Devanagari typography with Google Fonts `Noto Serif Devanagari` and `Plus Jakarta Sans`).
- **Pages & Routes:**
  - `/` — Homepage with Hero, 4-step care process, 8 treatment categories, verified practitioner profile, Panchakarma therapy section, recurring care section, FAQs, contact and emergency advisory.
  - `/treatments` — Complete categorized treatment directory.
  - `/treatments/[slug]` — Dynamic category detail pages for all 8 categories with clinical boundaries, indications, and direct booking.
  - `/book-appointment` — Public appointment request form with phone normalization, Zod validation, and instant WhatsApp confirmation option.
  - `/about` — Clinic philosophy, Dr. Supriya Kadam's verified credentials, ethical standards.
  - `/contact` — Atpadi clinic address, direct phone, WhatsApp click-to-chat, and inquiry form.
- **Brand Palette:**
  - Ayurvedic Purple: `#6517A3`
  - Deep Forest Green: `#183D2B`
  - Botanical Green: `#5B8E46`
  - Saffron: `#D99136`
  - Warm Ivory: `#F7F4EA`

### B. Internal Management Dashboard (English-Only)
- **Language:** English exclusively across all navigation, form labels, tables, charts, alerts, and database identifiers.
- **Routes:**
  - `/login` — Staff authentication with role-based sign-in (`owner`, `practitioner`, `staff`).
  - `/admin` — Practice Overview with live KPIs, today's appointments queue, urgent follow-up tasks, and recent visits.
  - `/admin/patients` — Master Patient Directory with search by Name, Phone, or Patient ID (`VMA-YYYY-XXXX`), duplicate phone detection, and status filters.
  - `/admin/patients/new` — Patient registration form with clinical history, allergies, conventional medications, and communication consent.
  - `/admin/patients/[id]` — 360° Patient Profile with 6 interactive tabs:
    1. Overview & Medical Summary
    2. Treatment Courses (1-Month, 4-Month, Custom durations, renewal workflow)
    3. Monthly Visits Timeline (chronological consultation log with symptoms, adherence, assessment)
    4. Individualized Prescriptions (formulation builder, dosages, printable Rx view)
    5. Measurements & Vitals Chart (Recharts weight & BP trends over time)
    6. Follow-up Tasks & Calendar
  - `/admin/courses` — Treatment Courses Management with calendar-month duration calculations and renewal links.
  - `/admin/visits` — Clinical consultation logs and "Record Visit" structured assessment.
  - `/admin/prescriptions` — Individualized preparations and professional printable Rx view with clinic header.
  - `/admin/follow-ups` — Follow-up calendar with Daily Due, Overdue, Upcoming, and Completed views.
  - `/admin/appointments` — Public appointment request triage, confirmation, and scheduling.
  - `/admin/communications` — WhatsApp Communications Center with official Marathi templates ready to send.
  - `/admin/reports` — Practice analytics with charts on patient intake, course distribution, and category demand.
  - `/admin/staff` — Staff directory and Role-Based Access Control (RBAC) matrix.
  - `/admin/settings` — Editable clinic name, practitioner title, address, phone numbers, and working hours.
  - `/admin/audit-log` — Security & clinical event audit log.

---

## 2. Database Schema (Supabase PostgreSQL)

The database schema is fully defined in [`supabase/migrations/20261023_init_schema.sql`](file:///d:/websites/vijaymangal/supabase/migrations/20261023_init_schema.sql):

1. `profiles` — User authentication and role assignment (`owner`, `practitioner`, `staff`)
2. `clinic_settings` — Practice identity, contact numbers, address, and disclaimers
3. `services` — 8 primary consultation categories with Marathi & English names
4. `patients` — Master patient directory with unique patient number generator (`VMA-YYYY-XXXX`)
5. `courses` — 1-month, 4-month, and custom treatment programs with renewal tracking
6. `visits` — Structured monthly clinical visit evaluations
7. `patient_measurements` — Historical vital signs (weight, BP, pulse, sugar)
8. `prescriptions` — Individualized preparation records with versioning
9. `prescription_items` — Detailed ingredients, quantities, units, and dosage instructions
10. `follow_up_tasks` — Follow-up reminders with due dates and priority tags
11. `appointments` — Public booking requests and confirmed clinic visits
12. `communication_logs` — Outgoing and incoming WhatsApp / phone records
13. `audit_logs` — Immutable audit trail for clinical governance
14. `patient_consents` — Medical and communication consent logs
15. `payment_records` — Course and consultation financial records

### Row Level Security (RLS)
- Public visitors can only read active services and clinic settings, and submit appointment requests with status `requested`.
- All patient records, clinical notes, prescriptions, and staff profiles require authenticated staff access.
- Audit logs are append-only.

---

## 3. Getting Started & Development

### Prerequisites
- Node.js 18+ (tested on Node v22.18.0)
- npm or yarn

### Installation
```bash
# Clone the repository
cd d:/websites/vijaymangal

# Install dependencies
npm install --legacy-peer-deps

# Run locally in development mode
npm run dev

# Open in browser
# Public Website: http://localhost:3000
# Admin Dashboard: http://localhost:3000/admin (or /login)
```

---

## 4. Connecting Supabase Backend

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard and run the entire script in [`supabase/migrations/20261023_init_schema.sql`](file:///d:/websites/vijaymangal/supabase/migrations/20261023_init_schema.sql).
3. Create `.env.local` based on `.env.example`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```
4. The application automatically links to Supabase while seamlessly supporting local offline evaluation.

---

## 5. Deployment to Vercel

```bash
# Verify production build locally
npm run build

# Deploy via Vercel CLI
npx vercel
```
In your Vercel Project Settings, add the environment variables from `.env.example`.

---

## 6. Official Client Information Reference

- **Business Name:** विजयमंगल आयुर्वेद (Vijaymangal Ayurved)
- **Consulting Physician:** डॉ. सुप्रिया श्रीप्रसाद कदम (Dr. Supriya Shreeprasad Kadam)
- **Verified Degree:** एम. डी. (आयुर्वेद) — M. D. (Ayurveda)
- **Phone:** +91 8263902142
- **Address:** मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी, जि. सांगली, महाराष्ट्र
