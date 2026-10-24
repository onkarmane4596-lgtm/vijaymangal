// Database entity types for Vijaymangal Ayurved

export type UserRole = 'owner' | 'practitioner' | 'staff';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClinicSettings {
  id: string;
  clinic_name_mr: string;
  clinic_name_en: string;
  practitioner_name_mr: string;
  practitioner_name_en: string;
  qualification_mr: string;
  qualification_en: string;
  phone_number: string;
  phone_display: string;
  address_mr: string;
  address_en: string;
  city: string;
  state: string;
  tagline_mr: string;
  positioning_mr: string;
  working_hours_mr: string;
  working_hours_en: string;
  emergency_notice_mr: string;
  emergency_notice_en: string;
  updated_at: string;
}

export interface Service {
  id: string;
  slug: string;
  category: string;
  name_mr: string;
  name_en: string;
  headline_mr: string;
  description_mr: string;
  details_mr?: string;
  indications_mr: string[];
  advisory_mr?: string;
  display_order: number;
  is_active: boolean;
  practitioner_approved: boolean;
  created_at: string;
  updated_at: string;
}

export type PatientStatus = 'active' | 'completed' | 'paused' | 'inactive';
export type Gender = 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  patient_number: string;
  full_name: string;
  phone_number: string;
  email?: string;
  date_of_birth?: string;
  gender?: Gender;
  address?: string;
  city?: string;
  registration_date: string;
  initial_consultation_date?: string;
  referral_source?: string;
  health_history?: string;
  allergies?: string;
  current_medications?: string;
  communication_consent: boolean;
  patient_status: PatientStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export type CourseType = '1_month' | '4_month' | 'custom';
export type CourseStatus = 'active' | 'completed' | 'paused' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid';

export interface Course {
  id: string;
  patient_id: string;
  course_name: string;
  course_type: CourseType;
  duration_months: number;
  duration_days: number;
  start_date: string;
  planned_end_date: string;
  course_status: CourseStatus;
  agreed_price: number;
  payment_status: PaymentStatus;
  follow_up_frequency: string;
  previous_course_id?: string;
  internal_notes?: string;
  practitioner_id?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export type ReportedAdherence = 'regular' | 'mostly_regular' | 'irregular' | 'discontinued';

export interface Visit {
  id: string;
  patient_id: string;
  course_id?: string;
  visit_date: string;
  visit_number: number;
  course_month: number;
  patient_reported_symptoms?: string;
  reported_adherence?: ReportedAdherence;
  reported_improvements?: string;
  reported_adverse_effects?: string;
  practitioner_assessment: string;
  practitioner_notes?: string;
  next_follow_up_date?: string;
  practitioner_id?: string;
  created_at: string;
  updated_at: string;
}

export interface PatientMeasurement {
  id: string;
  patient_id: string;
  visit_id?: string;
  measurement_date: string;
  weight_kg?: number;
  blood_pressure?: string;
  pulse_bpm?: number;
  blood_sugar?: number;
  bmi?: number;
  waist_cm?: number;
  notes?: string;
  recorded_by?: string;
  created_at: string;
}

export type PrescriptionStatus = 'draft' | 'approved' | 'dispensed' | 'cancelled';
export type QuantityUnit = 'grams' | 'ml' | 'tablets' | 'capsules' | 'packets' | 'bottles';

export interface Prescription {
  id: string;
  patient_id: string;
  course_id?: string;
  visit_id?: string;
  version_number: number;
  approval_status: PrescriptionStatus;
  practitioner_notes?: string;
  prescribed_by?: string;
  valid_until?: string;
  created_at: string;
  updated_at: string;
  items?: PrescriptionItem[];
}

export interface PrescriptionItem {
  id: string;
  prescription_id: string;
  medicine_name: string;
  composition?: string;
  prescribed_quantity: number;
  quantity_unit: QuantityUnit;
  dose_instructions: string;
  frequency: string;
  duration_instructions?: string;
  instructions_mr?: string;
  display_order: number;
  created_at: string;
}

export type TaskStatus = 'scheduled' | 'completed' | 'overdue' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType = 'visit_followup' | 'course_renewal' | 'progress_check' | 'prescription_refill';

export interface FollowUpTask {
  id: string;
  patient_id: string;
  course_id?: string;
  visit_id?: string;
  due_date: string;
  task_status: TaskStatus;
  priority: TaskPriority;
  task_type: TaskType;
  administrative_notes?: string;
  assigned_to?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
}

export type AppointmentStatus = 'requested' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
export type PatientType = 'new' | 'existing';

export interface Appointment {
  id: string;
  patient_id?: string;
  patient_number?: string;
  full_name: string;
  phone_number: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
  category: string;
  patient_type: PatientType;
  short_message?: string;
  status: AppointmentStatus;
  confirmed_date?: string;
  confirmed_time?: string;
  admin_notes?: string;
  consent_agreed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommunicationLog {
  id: string;
  patient_id?: string;
  channel: 'whatsapp' | 'phone' | 'sms';
  message_type: 'inquiry' | 'appointment' | 'follow_up' | 'course_renewal' | 'general';
  content: string;
  recipient_phone: string;
  status: 'sent' | 'failed' | 'logged';
  created_by?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

export interface PaymentRecord {
  id: string;
  patient_id: string;
  course_id?: string;
  amount: number;
  payment_method: 'cash' | 'upi' | 'card' | 'bank_transfer';
  payment_date: string;
  receipt_number?: string;
  notes?: string;
  recorded_by?: string;
  created_at: string;
}

export type OpdStatus = 'waiting' | 'in_consultation' | 'dispensing' | 'completed' | 'cancelled';
export type OpdVisitType = 'consultation' | 'course_followup' | 'panchakarma' | 'medicine_refill' | 'emergency';

export interface OpdVitals {
  bp?: string;
  pulse_bpm?: number;
  weight_kg?: number;
  nadi_assessment?: string;
  chief_complaint?: string;
}

export interface OpdQueueItem {
  id: string;
  token_number: number;
  patient_id?: string;
  patient_name: string;
  phone_number: string;
  visit_type: OpdVisitType;
  status: OpdStatus;
  vitals?: OpdVitals;
  queue_date: string;
  arrival_time: string;
  called_at?: string;
  completed_at?: string;
  assigned_doctor: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
