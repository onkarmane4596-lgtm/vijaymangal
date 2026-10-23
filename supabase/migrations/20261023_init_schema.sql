-- Vijaymangal Ayurved (विजयमंगल आयुर्वेद)
-- Initial PostgreSQL Database Schema & Security Policies
-- Compatible with Supabase PostgreSQL

-- 1. Enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Clean drops if refreshing
-- DROP TABLE IF EXISTS payment_records CASCADE;
-- DROP TABLE IF EXISTS patient_consents CASCADE;
-- DROP TABLE IF EXISTS audit_logs CASCADE;
-- DROP TABLE IF EXISTS communication_logs CASCADE;
-- DROP TABLE IF EXISTS follow_up_tasks CASCADE;
-- DROP TABLE IF EXISTS prescription_items CASCADE;
-- DROP TABLE IF EXISTS prescriptions CASCADE;
-- DROP TABLE IF EXISTS patient_measurements CASCADE;
-- DROP TABLE IF EXISTS visits CASCADE;
-- DROP TABLE IF EXISTS courses CASCADE;
-- DROP TABLE IF EXISTS appointments CASCADE;
-- DROP TABLE IF EXISTS patients CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS clinic_settings CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;

-- 3. PROFILES TABLE (linked to auth.users in Supabase)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('owner', 'practitioner', 'staff')),
    phone TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CLINIC SETTINGS TABLE (Single row configuration)
CREATE TABLE IF NOT EXISTS clinic_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_name_mr TEXT NOT NULL DEFAULT 'विजयमंगल आयुर्वेद',
    clinic_name_en TEXT NOT NULL DEFAULT 'Vijaymangal Ayurved',
    practitioner_name_mr TEXT NOT NULL DEFAULT 'डॉ. सुप्रिया श्रीप्रसाद कदम',
    practitioner_name_en TEXT NOT NULL DEFAULT 'Dr. Supriya Shreeprasad Kadam',
    qualification_mr TEXT NOT NULL DEFAULT 'एम. डी. (आयुर्वेद)',
    qualification_en TEXT NOT NULL DEFAULT 'M. D. (Ayurveda)',
    phone_number TEXT NOT NULL DEFAULT '8263902142',
    phone_display TEXT NOT NULL DEFAULT '+91 8263902142',
    address_mr TEXT NOT NULL DEFAULT 'मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी',
    address_en TEXT NOT NULL DEFAULT 'Main Road, Opposite Post Office, Near Vitthal Rukmini Temple, Atpadi, Maharashtra',
    city TEXT NOT NULL DEFAULT 'Atpadi',
    state TEXT NOT NULL DEFAULT 'Maharashtra',
    tagline_mr TEXT NOT NULL DEFAULT 'शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प',
    positioning_mr TEXT NOT NULL DEFAULT 'आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा',
    working_hours_mr TEXT NOT NULL DEFAULT 'सकाळी ९:०० ते दु. १:०० | सायं. ४:०० ते रात्री ८:००',
    working_hours_en TEXT NOT NULL DEFAULT 'Morning 9:00 AM - 1:00 PM | Evening 4:00 PM - 8:00 PM',
    emergency_notice_mr TEXT NOT NULL DEFAULT 'तात्काळ आणि गंभीर वैद्यकीय आणीबाणीसाठी त्वरित नजीकच्या रुग्णालयाशी किंवा आपत्कालीन वैद्यकीय सेवेशी संपर्क साधावा.',
    emergency_notice_en TEXT NOT NULL DEFAULT 'For acute or life-threatening emergencies, immediately contact your nearest hospital emergency services.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SERVICES TABLE (Categorized catalog)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    headline_mr TEXT NOT NULL,
    description_mr TEXT NOT NULL,
    details_mr TEXT,
    indications_mr JSONB DEFAULT '[]'::jsonb,
    advisory_mr TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    practitioner_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PATIENTS TABLE (Master Patient Index)
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    address TEXT,
    city TEXT DEFAULT 'Atpadi',
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    initial_consultation_date DATE DEFAULT CURRENT_DATE,
    referral_source TEXT,
    health_history TEXT,
    allergies TEXT,
    current_medications TEXT,
    communication_consent BOOLEAN DEFAULT TRUE,
    patient_status TEXT NOT NULL DEFAULT 'active' CHECK (patient_status IN ('active', 'completed', 'paused', 'inactive')),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_patients_search ON patients(full_name, phone_number, patient_number);

-- 7. COURSES TABLE (1-month, 4-month, custom treatment courses)
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    course_name TEXT NOT NULL,
    course_type TEXT NOT NULL CHECK (course_type IN ('1_month', '4_month', 'custom')),
    duration_months INT NOT NULL DEFAULT 1,
    duration_days INT NOT NULL DEFAULT 30,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    planned_end_date DATE NOT NULL,
    course_status TEXT NOT NULL DEFAULT 'active' CHECK (course_status IN ('active', 'completed', 'paused', 'cancelled')),
    agreed_price NUMERIC(10, 2) DEFAULT 0.00,
    payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
    follow_up_frequency TEXT DEFAULT 'monthly',
    previous_course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    internal_notes TEXT,
    practitioner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_courses_patient ON courses(patient_id, course_status);

-- 8. VISITS TABLE (Structured monthly clinical visits)
CREATE TABLE IF NOT EXISTS visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    visit_number INT NOT NULL DEFAULT 1,
    course_month INT NOT NULL DEFAULT 1,
    patient_reported_symptoms TEXT,
    reported_adherence TEXT CHECK (reported_adherence IN ('regular', 'mostly_regular', 'irregular', 'discontinued')),
    reported_improvements TEXT,
    reported_adverse_effects TEXT,
    practitioner_assessment TEXT NOT NULL,
    practitioner_notes TEXT,
    next_follow_up_date DATE,
    practitioner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_visits_patient ON visits(patient_id, visit_date);

-- 9. PATIENT MEASUREMENTS TABLE (Vital statistics & progress tracking)
CREATE TABLE IF NOT EXISTS patient_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    visit_id UUID REFERENCES visits(id) ON DELETE SET NULL,
    measurement_date DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg NUMERIC(5, 2),
    blood_pressure TEXT,
    pulse_bpm INT,
    blood_sugar NUMERIC(6, 2),
    bmi NUMERIC(4, 1),
    waist_cm NUMERIC(5, 1),
    notes TEXT,
    recorded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_measurements_patient ON patient_measurements(patient_id, measurement_date);

-- 10. PRESCRIPTIONS TABLE (Individualized Ayurvedic preparations)
CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    visit_id UUID REFERENCES visits(id) ON DELETE SET NULL,
    version_number INT NOT NULL DEFAULT 1,
    approval_status TEXT NOT NULL DEFAULT 'approved' CHECK (approval_status IN ('draft', 'approved', 'dispensed', 'cancelled')),
    practitioner_notes TEXT,
    prescribed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    valid_until DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. PRESCRIPTION ITEMS TABLE (Medicine items inside preparation)
CREATE TABLE IF NOT EXISTS prescription_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id) ON DELETE CASCADE,
    medicine_name TEXT NOT NULL,
    composition TEXT,
    prescribed_quantity NUMERIC(8, 2) NOT NULL,
    quantity_unit TEXT NOT NULL DEFAULT 'grams' CHECK (quantity_unit IN ('grams', 'ml', 'tablets', 'capsules', 'packets', 'bottles')),
    dose_instructions TEXT NOT NULL,
    frequency TEXT NOT NULL,
    duration_instructions TEXT,
    instructions_mr TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. FOLLOW-UP TASKS TABLE (Clinic reminders & workflow calendar)
CREATE TABLE IF NOT EXISTS follow_up_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    visit_id UUID REFERENCES visits(id) ON DELETE SET NULL,
    due_date DATE NOT NULL,
    task_status TEXT NOT NULL DEFAULT 'scheduled' CHECK (task_status IN ('scheduled', 'completed', 'overdue', 'cancelled')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    task_type TEXT NOT NULL DEFAULT 'visit_followup' CHECK (task_type IN ('visit_followup', 'course_renewal', 'progress_check', 'prescription_refill')),
    administrative_notes TEXT,
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_tasks_due_status ON follow_up_tasks(due_date, task_status);

-- 13. APPOINTMENTS TABLE (Public booking requests & clinic appointments)
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    patient_number TEXT,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    category TEXT NOT NULL,
    patient_type TEXT NOT NULL DEFAULT 'new' CHECK (patient_type IN ('new', 'existing')),
    short_message TEXT,
    status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'confirmed', 'completed', 'cancelled', 'rescheduled')),
    confirmed_date DATE,
    confirmed_time TEXT,
    admin_notes TEXT,
    consent_agreed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_appointments_date_status ON appointments(preferred_date, status);

-- 14. COMMUNICATION LOGS TABLE (WhatsApp, calls, notifications)
CREATE TABLE IF NOT EXISTS communication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    channel TEXT NOT NULL DEFAULT 'whatsapp' CHECK (channel IN ('whatsapp', 'phone', 'sms')),
    message_type TEXT NOT NULL CHECK (message_type IN ('inquiry', 'appointment', 'follow_up', 'course_renewal', 'general')),
    content TEXT NOT NULL,
    recipient_phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'logged')),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. AUDIT LOGS TABLE (Security & clinical accountability)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. PATIENT CONSENTS TABLE
CREATE TABLE IF NOT EXISTS patient_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL,
    agreed BOOLEAN NOT NULL DEFAULT TRUE,
    agreed_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    recorded_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- 17. PAYMENT RECORDS TABLE
CREATE TABLE IF NOT EXISTS payment_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'upi', 'card', 'bank_transfer')),
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    receipt_number TEXT UNIQUE,
    notes TEXT,
    recorded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_up_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_records ENABLE ROW LEVEL SECURITY;

-- Public read access for active services and clinic settings
CREATE POLICY "Public read clinic settings" ON clinic_settings FOR SELECT USING (true);
CREATE POLICY "Public read active services" ON services FOR SELECT USING (is_active = true);

-- Public insert access for appointment requests
CREATE POLICY "Public create appointment request" ON appointments FOR INSERT WITH CHECK (
    status = 'requested' AND
    full_name IS NOT NULL AND
    phone_number IS NOT NULL AND
    preferred_date IS NOT NULL
);

-- Staff/Practitioner/Owner full access to clinical and management tables
CREATE POLICY "Staff all access profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff update clinic settings" ON clinic_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage patients" ON patients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage courses" ON courses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage visits" ON visits FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage measurements" ON patient_measurements FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage prescriptions" ON prescriptions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage prescription items" ON prescription_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage tasks" ON follow_up_tasks FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage appointments" ON appointments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage communication logs" ON communication_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff view audit logs" ON audit_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Staff insert audit logs" ON audit_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Staff manage consents" ON patient_consents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Staff manage payments" ON payment_records FOR ALL USING (auth.role() = 'authenticated');

-- SEED DATA INSERTION
INSERT INTO clinic_settings (
    clinic_name_mr, clinic_name_en, practitioner_name_mr, practitioner_name_en,
    qualification_mr, qualification_en, phone_number, phone_display,
    address_mr, address_en, city, state, tagline_mr, positioning_mr
) VALUES (
    'विजयमंगल आयुर्वेद', 'Vijaymangal Ayurved', 'डॉ. सुप्रिया श्रीप्रसाद कदम', 'Dr. Supriya Shreeprasad Kadam',
    'एम. डी. (आयुर्वेद)', 'M. D. (Ayurveda)', '8263902142', '+91 8263902142',
    'मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी',
    'Main Road, Opposite Post Office, Near Vitthal Rukmini Temple, Atpadi, Maharashtra',
    'Atpadi', 'Maharashtra',
    'शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प',
    'आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा'
) ON CONFLICT DO NOTHING;

-- Seed Service Catalog
INSERT INTO services (slug, category, name_mr, name_en, headline_mr, description_mr, details_mr, indications_mr, advisory_mr, display_order)
VALUES
(
    'joint-health',
    'musculoskeletal',
    'सांधे, हाडे आणि मणक्यांचे आरोग्य',
    'Joint, Bone and Spine Care',
    'सांधे, हाडे आणि मणक्यांच्या आरोग्यासाठी मार्गदर्शन',
    'सांधेदुखी, संधिवात आणि मणक्यांशी संबंधित तक्रारींसाठी वैयक्तिक आरोग्यविषयक सल्ला आणि योग्य उपचारपद्धतींबाबत मार्गदर्शन.',
    'वातदोष संतुलनावर आधारित नैसर्गिक उपचार, औषधोपचार आणि स्नेहन-स्वेदन यांसारख्या आवश्यक पंचकर्म उपचारांद्वारे मणक्यांचे व सांध्यांचे आरोग्य सुधारण्यासाठी मार्गदर्शन दिले जाते.',
    '["आमवात (Rheumatoid Concerns)", "संधिवात (Osteoarthritis)", "मणक्याचे विकार (Cervical / Lumbar Spondylosis)", "सांधेदुखी व हालचालींमधील कडकपणा"]'::jsonb,
    'टीप: संरचनात्मक गंभीर विकृती किंवा तीव्र वेदनांसाठी योग्य तपासणी आवश्यक असते. कोणत्याही उपचारात हमी दिली जात नाही.',
    1
),
(
    'metabolic-health',
    'metabolic',
    'वजन आणि सर्वांगीण आरोग्य व्यवस्थापन',
    'Metabolic & Weight Management',
    'वजन आणि सर्वांगीण आरोग्य',
    'वजन व्यवस्थापन आणि चयापचयाशी संबंधित आरोग्यविषयक गरजांसाठी वैयक्तिक सल्ला.',
    'आहार, दिनचर्या, अग्निदीपन आणि प्रकृतीनुसार तयार केलेल्या औषधी योजनांद्वारे निरोगी वजन व चयापचय संतुलित राखण्यास साहाय्य केले जाते.',
    '["वजन कमी करणे (Weight Management)", "वजन वाढविणे (Healthy Weight Gain)", "मधुमेह पूरक जीवनशैली मार्गदर्शन", "रक्तदाब व थायरॉईड संबंधी जीवनशैली सल्ला"]'::jsonb,
    'टीप: मधुमेह, रक्तदाब आणि थायरॉईडसाठी सुरू असलेली अ‍ॅलोपॅथिक औषधे डॉक्टरांच्या सल्ल्याशिवाय बंद करू नयेत. आयुर्वेद सल्ला पूरक म्हणून उपयुक्त ठरतो.',
    2
),
(
    'digestive-health',
    'digestive',
    'पचनसंस्था आणि पोटाचे आरोग्य',
    'Digestive and Abdominal Health',
    'पचनसंस्था आणि पोटाच्या आरोग्यासाठी मार्गदर्शन',
    'पचनसंस्थेशी संबंधित तक्रारी, आम्लपित्त आणि इतर पोटाच्या समस्यांसाठी वैयक्तिक आरोग्यविषयक सल्ला.',
    'अग्निमांद्य, आम्लपित्त, गॅसेस, बद्धकोष्ठता आणि मूळव्याध यांसारख्या पचनाच्या तक्रारींवर शास्त्रीय आयुर्वेदिक औषधोपचार आणि पथ्य-अपथ्य मार्गदर्शन दिले जाते.',
    '["आम्लपित्त (Acidity)", "शीतपित्त (Allergic Rashes / Hives)", "बद्धकोष्ठता व गॅसेस", "मूळव्याध (Piles Support)", "मुतखडा व पित्ताशयातील खडे याबाबत आरोग्य सल्ला"]'::jsonb,
    'टीप: मुतखडा अथवा पित्ताशयातील खड्यांच्या तीव्र दुखण्यात तात्काळ आधुनिक वैद्यकीय तपासणी आवश्यक ठरू शकते.',
    3
),
(
    'womens-health',
    'womens_health',
    'महिलांचे आरोग्य आणि गर्भसंस्कार',
    'Women''s Health and Family Wellness',
    'महिलांचे आरोग्य आणि कुटुंबकल्याण',
    'महिलांच्या आरोग्याशी संबंधित प्रश्न, PCOS/PCOD आणि गर्भसंस्कारासाठी वैयक्तिक मार्गदर्शन.',
    'ऋतुचक्र नियमन, मासिक पाळीच्या तक्रारी, हार्मोनल संतुलन, गर्भसंस्कार आणि वंध्यत्वाशी संबंधित संवेदनशील व शास्त्रोक्त सल्ला.',
    '["स्त्रीरोग व मासिक पाळीच्या समस्या", "PCOS / PCOD संबंधित तक्रारी", "गर्भसंस्कार (Prenatal Ayurvedic Guidance)", "वंध्यत्वाशी संबंधित वैयक्तिक सल्ला व मार्गदर्शन"]'::jsonb,
    'टीप: वंध्यत्व अथवा गर्भधारणेच्या बाबतीत कोणत्याही हमीचे दावे केले जात नाहीत; शास्त्रोक्त पद्धतीने प्रकृती सुधारण्यावर भर दिला जातो.',
    4
),
(
    'mental-wellness',
    'mental_wellness',
    'मानसिक स्वास्थ्य आणि मुलांचे कल्याण',
    'Mental Wellness and Child Well-being',
    'मानसिक स्वास्थ्य आणि मुलांचे कल्याण',
    'मानसिक स्वास्थ्य आणि एकाग्रतेशी संबंधित चिंतांबाबत संवेदनशील, वैयक्तिक मार्गदर्शन.',
    'मेध्य रसायने, शिरोधारा, मनःशांतीसाठी योग-प्राणायाम सल्ला आणि लहान मुलांमधील एकाग्रता व स्मरणशक्ती वाढीसाठी शास्त्रीय मार्गदर्शन.',
    '["मानसिक तणाव व आजारांशी संबंधित मार्गदर्शन", "डिप्रेशन व निद्रानाश संबंधी तक्रारी", "लहान मुलांमधील एकाग्रतेचा अभाव (Focus & Memory)"]'::jsonb,
    'टीप: तीव्र मानसिक आजारांसाठी मानसोपचार तज्ज्ञांचा सल्ला घेणे आवश्यक आहे.',
    5
),
(
    'respiratory-care',
    'respiratory',
    'सामान्य व श्वसनसंस्था आरोग्य तक्रारी',
    'Respiratory & Common Concerns',
    'सामान्य आरोग्यविषयक तक्रारी',
    'सामान्य आरोग्यविषयक तक्रारींसाठी योग्य तपासणी, वैयक्तिक सल्ला आणि आवश्यकतेनुसार पुढील वैद्यकीय मार्गदर्शन.',
    'ऋतुबदलामुळे होणारे आजार, रोगप्रतिकारशक्तीचा अभाव, वारंवार होणारी सर्दी-खोकला व दम्याच्या त्रासावर आयुर्वेदिक प्रतिकारशक्ती वाढवणारे उपचार.',
    '["दमा (Bronchial Asthma Support)", "वारंवार होणारा ताप व सर्दी", "डोकेदुखी व मायग्रेन", "रोगप्रतिकारशक्ती संवर्धन"]'::jsonb,
    'टीप: तीव्र श्वास लागणे किंवा सतत उच्च ताप असल्यास तातडीने आपत्कालीन रुग्णालयात संपर्क साधावा.',
    6
),
(
    'skin-hair-care',
    'dermatology',
    'केस, त्वचा आणि नैसर्गिक सौंदर्यनिगा',
    'Skin, Hair & Natural Aesthetics',
    'केस, त्वचा आणि नैसर्गिक आरोग्यनिगा',
    'केस आणि त्वचेच्या आरोग्यासाठी वैयक्तिक मार्गदर्शन तसेच योग्य आयुर्वेदिक निगा पद्धतींबाबत माहिती.',
    'रक्तशुद्धी, त्वचारोग, केस गळणे, कोंडा, अकाली पांढरे होणे यांवर प्रकृतीनुसार लेप, तैल आणि अंतर्गत औषधोपचारांचे नियोजन.',
    '["केस गळणे व कोंडा", "त्वचेचे विकार (Psoriasis / Eczema Support)", "सौंदर्य व नैसर्गिक कांती", "शरीर शुद्धीकरण (Detoxification Guidance)"]'::jsonb,
    'टीप: चमत्कारिक परिणामांचे दावे न करता नैसर्गिक पद्धतीने धातू व रक्ताच्या शुद्धीवर भर दिला जातो.',
    7
),
(
    'panchakarma-consultation',
    'ayurveda_core',
    'नाडी परीक्षण व पंचकर्म चिकित्सा',
    'Pulse Diagnosis & Panchakarma',
    'वैयक्तिक आयुर्वेदिक सल्ला व पंचकर्म',
    'आपली प्रकृती, आरोग्यविषयक गरजा आणि वैयक्तिक परिस्थिती समजून घेऊन आयुर्वेदिक सल्ला व उपचारपद्धतींबाबत मार्गदर्शन.',
    'त्रिदोष (वात, पित्त, कफ) स्थिती जाणण्यासाठी नाडी परीक्षण, प्रकृती परीक्षण आणि आवश्यकतेनुसार वमन, विरेचन, बस्ति, नस्य, रक्तमोक्षण यांसारख्या पंचकर्म उपचारांचे नियोजन.',
    '["नाडी परीक्षण (Traditional Pulse Diagnosis)", "पंचकर्म चिकित्सा (Panchakarma Therapies)", "वैयक्तिक औषधोपचार नियोजन", "पक्षाघात (लकवा) पुनर्वसन मार्गदर्शन"]'::jsonb,
    'टीप: अचानक उद्भवणारा पक्षाघात किंवा स्ट्रोक असल्यास तात्काळ आपत्कालीन न्यूरोलॉजी रुग्णालयात दाखल करावे.',
    8
)
ON CONFLICT (slug) DO UPDATE SET
    name_mr = EXCLUDED.name_mr,
    headline_mr = EXCLUDED.headline_mr,
    description_mr = EXCLUDED.description_mr,
    details_mr = EXCLUDED.details_mr,
    indications_mr = EXCLUDED.indications_mr;
