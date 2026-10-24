'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Users,
  ArrowLeft,
  Phone,
  Calendar,
  Repeat,
  Stethoscope,
  FileText,
  Activity,
  CheckCircle2,
  Clock,
  Printer,
  Plus,
  MessageCircle,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { db } from '@/lib/db';
import { formatDate, formatCurrency } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';
import { CourseType, QuantityUnit } from '@/types/database';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PatientProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const [, setRefresh] = useState(0);

  const patient = db.getPatientById(id);
  const courses = db.getCoursesByPatientId(id);
  const visits = db.getVisitsByPatientId(id);
  const measurements = db.getMeasurementsByPatientId(id);
  const prescriptions = db.getPrescriptionsByPatientId(id);
  const tasks = db.getFollowUpTasks().filter((t) => t.patient_id === id);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'courses' | 'visits' | 'prescriptions' | 'charts' | 'tasks'
  >('overview');

  // Modals
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showRxModal, setShowRxModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedRx, setSelectedRx] = useState(prescriptions[0] || null);

  // New Visit Form State
  const [newVisitData, setNewVisitData] = useState({
    courseMonth: 1,
    symptoms: '',
    adherence: 'regular' as const,
    improvements: '',
    adverseEffects: 'None',
    assessment: '',
    notes: '',
    nextFollowUpDate: '',
  });

  // New Course Form State
  const [newCourseData, setNewCourseData] = useState({
    courseName: 'Sandhivata & Joint Rejuvenation Program',
    courseType: '4_month' as CourseType,
    durationMonths: 4,
    agreedPrice: 6000,
    internalNotes: '',
  });

  // New Prescription Item Form State
  const [newRxData, setNewRxData] = useState({
    medicineName: '',
    composition: '',
    quantity: 100,
    unit: 'grams' as const,
    doseInstructions: '1 teaspoon twice daily with warm water',
    frequency: 'Twice daily',
    notes: '',
  });

  if (!patient) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-bold text-[#183d2b]">Patient Not Found</h2>
        <Link href="/admin/patients" className="text-xs text-[#6517a3] underline mt-2 block">
          Return to Patients Directory
        </Link>
      </div>
    );
  }

  // Handle Recording New Visit
  const handleSaveVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const activeCourse = courses.find((c) => c.course_status === 'active');
    const visitNumber = visits.length + 1;

    db.createVisit({
      patient_id: patient.id,
      course_id: activeCourse?.id,
      visit_date: new Date().toISOString().split('T')[0],
      visit_number: visitNumber,
      course_month: Number(newVisitData.courseMonth),
      patient_reported_symptoms: newVisitData.symptoms,
      reported_adherence: newVisitData.adherence,
      reported_improvements: newVisitData.improvements,
      reported_adverse_effects: newVisitData.adverseEffects,
      practitioner_assessment: newVisitData.assessment,
      practitioner_notes: newVisitData.notes,
      next_follow_up_date: newVisitData.nextFollowUpDate || undefined,
    });

    setShowVisitModal(false);
    setRefresh((r) => r + 1);
  };

  // Handle Creating New Course
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + Number(newCourseData.durationMonths));

    db.createCourse({
      patient_id: patient.id,
      course_name: newCourseData.courseName,
      course_type: newCourseData.courseType,
      duration_months: Number(newCourseData.durationMonths),
      duration_days: Number(newCourseData.durationMonths) * 30,
      start_date: startDate.toISOString().split('T')[0],
      planned_end_date: endDate.toISOString().split('T')[0],
      course_status: 'active',
      agreed_price: Number(newCourseData.agreedPrice),
      payment_status: 'unpaid',
      follow_up_frequency: 'monthly',
      internal_notes: newCourseData.internalNotes,
    });

    setShowCourseModal(false);
    setRefresh((r) => r + 1);
  };

  // Handle Course Renewal
  const handleRenewCourse = (courseId: string) => {
    if (confirm('Renew this course for an additional 4-month cycle?')) {
      db.renewCourse(courseId, 4, 6000);
      setRefresh((r) => r + 1);
    }
  };

  // Handle Creating Prescription
  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    const activeCourse = courses.find((c) => c.course_status === 'active');
    const versionNumber = prescriptions.length + 1;

    const newRx = db.createPrescription({
      patient_id: patient.id,
      course_id: activeCourse?.id,
      version_number: versionNumber,
      approval_status: 'approved',
      practitioner_notes: newRxData.notes,
      items: [
        {
          id: `rxi-${Date.now()}`,
          prescription_id: '',
          medicine_name: newRxData.medicineName,
          composition: newRxData.composition,
          prescribed_quantity: Number(newRxData.quantity),
          quantity_unit: newRxData.unit,
          dose_instructions: newRxData.doseInstructions,
          frequency: newRxData.frequency,
          display_order: 1,
          created_at: new Date().toISOString(),
        },
      ],
    });

    setSelectedRx(newRx);
    setShowRxModal(false);
    setRefresh((r) => r + 1);
  };

  // Chart data format
  const chartData = measurements.map((m) => ({
    date: formatDate(m.measurement_date),
    weight: m.weight_kg,
    bp: m.blood_pressure ? parseInt(m.blood_pressure.split('/')[0]) : null,
  }));

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/patients"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6517a3] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Patients Directory</span>
        </Link>
      </div>

      {/* Patient Header Card */}
      <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#6517a3]/10 text-[#6517a3]">
                {patient.patient_number}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#183d2b]">
                {patient.full_name}
              </h1>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  patient.patient_status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {patient.patient_status}
              </span>
            </div>

            <div className="text-xs text-[#6b7280] flex flex-wrap items-center gap-4 pt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#5b8e46]" />
                <span>{patient.phone_number}</span>
              </span>
              <span>Gender: <strong className="capitalize text-[#262820]">{patient.gender || '-'}</strong></span>
              <span>City: <strong className="text-[#262820]">{patient.city || 'Atpadi'}</strong></span>
              <span>Registered: <strong className="text-[#262820]">{formatDate(patient.registration_date)}</strong></span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.followUp, patient.phone_number)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54] text-xs font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                const todayOpd = db.getTodayOpdQueue();
                const existing = todayOpd.find((o) => o.patient_id === patient.id);
                if (existing) {
                  alert(`${patient.full_name} is already checked in with Token #${existing.token_number}`);
                  return;
                }
                const token = db.addOpdToken({
                  patient_id: patient.id,
                  patient_name: patient.full_name,
                  phone_number: patient.phone_number,
                  visit_type: 'course_followup',
                  status: 'waiting',
                  queue_date: new Date().toISOString().split('T')[0],
                  arrival_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  assigned_doctor: 'Dr. Supriya S. Kadam',
                  notes: 'Direct check-in from patient profile.',
                });
                alert(`Token #${token.token_number} issued! ${patient.full_name} added to today's OPD Queue.`);
                setRefresh((r) => r + 1);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#183d2b] hover:bg-[#254f39] text-white text-xs font-semibold shadow-xs"
              title="Issue OPD Token for today's visit"
            >
              <Activity className="w-3.5 h-3.5 text-[#d99136]" />
              <span>+ Issue OPD Token</span>
            </button>

            <button
              onClick={() => setShowVisitModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold shadow-xs"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>+ Log Visit</span>
            </button>

            <button
              onClick={() => setShowCourseModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold shadow-xs"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>+ New Course</span>
            </button>

            <button
              onClick={() => setShowRxModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>+ Prescription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#e6dfd3] overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview & History', icon: Users },
          { id: 'courses', label: `Treatment Courses (${courses.length})`, icon: Repeat },
          { id: 'visits', label: `Monthly Visits (${visits.length})`, icon: Stethoscope },
          { id: 'prescriptions', label: `Prescriptions (${prescriptions.length})`, icon: FileText },
          { id: 'charts', label: `Measurements & Vitals (${measurements.length})`, icon: Activity },
          { id: 'tasks', label: `Follow-up Tasks (${tasks.length})`, icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white border-t-2 border-x border-[#e6dfd3] border-t-[#6517a3] text-[#6517a3] shadow-xs'
                  : 'text-[#6b7280] hover:text-[#183d2b]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-[#183d2b] uppercase tracking-wider text-xs">
                Clinical Summary & Chief Complaints
              </h3>
              <p className="text-xs sm:text-sm text-[#262820]/80 leading-relaxed bg-[#faf8f5] p-4 rounded-xl border border-[#e6dfd3]">
                {patient.health_history || 'No baseline clinical history recorded yet.'}
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4">
              <h3 className="font-bold text-sm text-[#183d2b] uppercase tracking-wider text-xs">
                Safety & Pharmacological Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200">
                  <span className="font-bold text-red-800 block mb-1">Known Allergies:</span>
                  <span className="text-[#262820]">{patient.allergies || 'None reported'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200">
                  <span className="font-bold text-blue-800 block mb-1">Current Conventional Medications:</span>
                  <span className="text-[#262820]">{patient.current_medications || 'None'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-3 text-xs">
              <h3 className="font-bold text-[#183d2b] uppercase tracking-wider text-xs pb-2 border-b border-[#e6dfd3]">
                Demographics & Registration
              </h3>
              <div className="space-y-2 text-[#262820]">
                <div>
                  <span className="text-[#6b7280] block text-[11px]">Address:</span>
                  <span>{patient.address || 'Atpadi, Maharashtra'}</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[11px]">Referral Source:</span>
                  <span>{patient.referral_source || 'Direct Clinic Visit'}</span>
                </div>
                <div>
                  <span className="text-[#6b7280] block text-[11px]">Communication Consent:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp / Calls Authorized</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Treatment Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-[#183d2b]">
              Assigned Ayurvedic Treatment Courses
            </h3>
            <button
              onClick={() => setShowCourseModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6517a3] text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-[#e6dfd3] text-center text-xs text-[#6b7280]">
              No treatment courses created yet. Click &ldquo;Add Course&rdquo; to begin a 1-month or 4-month program.
            </div>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#183d2b]">
                        {course.course_name}
                      </h4>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          course.course_status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {course.course_status}
                      </span>
                    </div>
                    <p className="text-xs text-[#6b7280] mt-0.5">
                      Type: <strong>{course.course_type.replace('_', ' ')}</strong> ({course.duration_months} Months / {course.duration_days} Days)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {course.course_status === 'active' && (
                      <button
                        onClick={() => handleRenewCourse(course.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#183d2b] hover:bg-[#262820] text-white text-xs font-semibold"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Renew Course</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#faf8f5] text-xs">
                  <div>
                    <span className="text-[#6b7280] block text-[11px]">Start Date:</span>
                    <span className="font-semibold text-[#183d2b]">{formatDate(course.start_date)}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block text-[11px]">Planned End Date:</span>
                    <span className="font-semibold text-[#183d2b]">{formatDate(course.planned_end_date)}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block text-[11px]">Agreed Price:</span>
                    <span className="font-semibold text-[#6517a3]">{formatCurrency(course.agreed_price)}</span>
                  </div>
                  <div>
                    <span className="text-[#6b7280] block text-[11px]">Payment Status:</span>
                    <span className="font-semibold uppercase text-[#5b8e46]">{course.payment_status}</span>
                  </div>
                </div>

                {course.internal_notes && (
                  <p className="text-xs text-[#262820]/80 italic">
                    Notes: &ldquo;{course.internal_notes}&rdquo;
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Monthly Visits Timeline */}
      {activeTab === 'visits' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-[#183d2b]">
              Chronological Clinical Visits
            </h3>
            <button
              onClick={() => setShowVisitModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#183d2b] text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record New Visit</span>
            </button>
          </div>

          {visits.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-[#e6dfd3] text-center text-xs text-[#6b7280]">
              No clinical visits logged yet. Click &ldquo;Record New Visit&rdquo; to document a consultation.
            </div>
          ) : (
            <div className="relative border-l-2 border-[#5b8e46]/40 ml-4 pl-6 space-y-6">
              {visits.map((v) => (
                <div
                  key={v.id}
                  className="relative bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-5 space-y-3"
                >
                  {/* Timeline bullet icon */}
                  <div className="absolute -left-[35px] top-4 w-4 h-4 rounded-full bg-[#5b8e46] border-2 border-white shadow-xs" />

                  <div className="flex items-center justify-between pb-2 border-b border-[#e6dfd3]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#183d2b]">
                        Visit #{v.visit_number}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#6517a3]/10 text-[#6517a3] font-semibold">
                        Course Month {v.course_month}
                      </span>
                    </div>
                    <span className="text-xs text-[#6b7280]">
                      {formatDate(v.visit_date)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-semibold text-[#6b7280] block">Patient Reported Symptoms:</span>
                      <p className="text-[#262820] mt-0.5">{v.patient_reported_symptoms || 'None recorded'}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#6b7280] block">Reported Improvements:</span>
                      <p className="text-[#5b8e46] font-medium mt-0.5">{v.reported_improvements || 'None recorded'}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#faf8f5] rounded-xl text-xs space-y-1">
                    <span className="font-bold text-[#183d2b] block">Practitioner Assessment:</span>
                    <p className="text-[#262820]/90 italic">{v.practitioner_assessment}</p>
                    {v.practitioner_notes && (
                      <p className="text-[#6b7280] text-[11px] pt-1">Notes: {v.practitioner_notes}</p>
                    )}
                  </div>

                  {v.next_follow_up_date && (
                    <div className="text-[11px] text-[#6517a3] font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Next Follow-up Due: {formatDate(v.next_follow_up_date)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-[#183d2b]">
              Individualized Ayurvedic Formulations
            </h3>
            <button
              onClick={() => setShowRxModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Compose Prescription</span>
            </button>
          </div>

          {prescriptions.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-[#e6dfd3] text-center text-xs text-[#6b7280]">
              No prescriptions saved for this patient. Click &ldquo;Compose Prescription&rdquo; to create one.
            </div>
          ) : (
            prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd3]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#183d2b]">
                      Prescription Version #{rx.version_number}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                      {rx.approval_status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedRx(rx);
                        setShowPrintModal(true);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e6dfd3] bg-white hover:bg-gray-50 text-xs font-semibold text-[#183d2b]"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Prescription</span>
                    </button>
                  </div>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f5] text-[#6b7280] font-semibold border-b border-[#e6dfd3]">
                      <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">Medicine / Preparation</th>
                        <th className="p-2">Composition</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Dosage Instructions</th>
                        <th className="p-2">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6dfd3]/60">
                      {(rx.items || []).map((item, idx) => (
                        <tr key={item.id || idx}>
                          <td className="p-2">{idx + 1}</td>
                          <td className="p-2 font-bold text-[#183d2b]">
                            {item.medicine_name}
                          </td>
                          <td className="p-2 text-[#6b7280]">
                            {item.composition || '-'}
                          </td>
                          <td className="p-2 font-semibold">
                            {item.prescribed_quantity} {item.quantity_unit}
                          </td>
                          <td className="p-2 text-[#262820]">
                            {item.dose_instructions}
                            {item.instructions_mr && (
                              <span className="block text-[11px] text-[#6517a3] font-marathi-heading mt-0.5">
                                {item.instructions_mr}
                              </span>
                            )}
                          </td>
                          <td className="p-2 font-medium">{item.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {rx.practitioner_notes && (
                  <p className="text-xs text-[#6b7280] italic">
                    Dietary Advisory: &ldquo;{rx.practitioner_notes}&rdquo;
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 5: Measurements & Progress Charts */}
      {activeTab === 'charts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4">
            <h3 className="font-bold text-sm text-[#183d2b]">
              Weight & Vital Statistics Timeline (Progress Tracking)
            </h3>
            <p className="text-xs text-[#6b7280]">
              Visual history of recorded patient metrics across monthly visits.
            </p>

            <div className="h-64 w-full pt-4">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1ede5" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      name="Weight (kg)"
                      stroke="#6517a3"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-[#6b7280]">
                  No measurement data recorded yet for charts.
                </div>
              )}
            </div>
          </div>

          {/* Measurements Table */}
          <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf8f5] text-[#6b7280] font-semibold border-b border-[#e6dfd3]">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Weight (kg)</th>
                  <th className="p-3">Blood Pressure</th>
                  <th className="p-3">Pulse (bpm)</th>
                  <th className="p-3">Blood Sugar</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6dfd3]/60">
                {measurements.map((m) => (
                  <tr key={m.id}>
                    <td className="p-3 font-semibold">{formatDate(m.measurement_date)}</td>
                    <td className="p-3 font-bold text-[#6517a3]">{m.weight_kg ? `${m.weight_kg} kg` : '-'}</td>
                    <td className="p-3">{m.blood_pressure || '-'}</td>
                    <td className="p-3">{m.pulse_bpm ? `${m.pulse_bpm} bpm` : '-'}</td>
                    <td className="p-3">{m.blood_sugar ? `${m.blood_sugar} mg/dL` : '-'}</td>
                    <td className="p-3 text-[#6b7280]">{m.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Follow-up Tasks */}
      {activeTab === 'tasks' && (
        <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4">
          <h3 className="font-bold text-sm text-[#183d2b]">
            Scheduled Follow-up Reminders & Calls
          </h3>

          {tasks.length === 0 ? (
            <p className="text-xs text-[#6b7280]">No tasks currently scheduled for this patient.</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e6dfd3] flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#183d2b]">
                        Due Date: {task.due_date}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          task.task_status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {task.task_status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6b7280] mt-0.5">
                      {task.administrative_notes || 'Monthly review task'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getWhatsAppUrl(WHATSAPP_TEMPLATES.followUp, patient.phone_number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#075e54]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal 1: Log Visit Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">
                Record Clinical Consultation Visit
              </h3>
              <button
                onClick={() => setShowVisitModal(false)}
                className="text-xs text-[#6b7280] hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVisit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Course Month</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={newVisitData.courseMonth}
                  onChange={(e) =>
                    setNewVisitData({ ...newVisitData, courseMonth: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Patient Reported Symptoms</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Pain intensity, morning stiffness..."
                  value={newVisitData.symptoms}
                  onChange={(e) =>
                    setNewVisitData({ ...newVisitData, symptoms: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Adherence</label>
                <select
                  value={newVisitData.adherence}
                  onChange={(e) =>
                    setNewVisitData({
                      ...newVisitData,
                      adherence: e.target.value as typeof newVisitData.adherence,
                    })
                  }
                  className="w-full p-2 border rounded-xl"
                >
                  <option value="regular">Regular</option>
                  <option value="mostly_regular">Mostly Regular</option>
                  <option value="irregular">Irregular</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Reported Improvements</label>
                <input
                  type="text"
                  placeholder="e.g. 50% pain reduction, better mobility"
                  value={newVisitData.improvements}
                  onChange={(e) =>
                    setNewVisitData({ ...newVisitData, improvements: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Practitioner Assessment *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Clinical assessment and pulse findings..."
                  value={newVisitData.assessment}
                  onChange={(e) =>
                    setNewVisitData({ ...newVisitData, assessment: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Next Follow-up Date</label>
                <input
                  type="date"
                  value={newVisitData.nextFollowUpDate}
                  onChange={(e) =>
                    setNewVisitData({ ...newVisitData, nextFollowUpDate: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowVisitModal(false)}
                  className="px-3 py-1.5 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#183d2b] text-white rounded-xl font-semibold"
                >
                  Save Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: New Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">
                Assign Treatment Course
              </h3>
              <button onClick={() => setShowCourseModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Course Name</label>
                <input
                  type="text"
                  required
                  value={newCourseData.courseName}
                  onChange={(e) =>
                    setNewCourseData({ ...newCourseData, courseName: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Duration (Months)</label>
                  <select
                    value={newCourseData.durationMonths}
                    onChange={(e) =>
                      setNewCourseData({
                        ...newCourseData,
                        durationMonths: Number(e.target.value),
                        courseType: Number(e.target.value) === 1 ? '1_month' : '4_month',
                      })
                    }
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="1">1 Month Course</option>
                    <option value="4">4 Month Course</option>
                    <option value="2">2 Months (Custom)</option>
                    <option value="6">6 Months (Custom)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Agreed Price (₹)</label>
                  <input
                    type="number"
                    value={newCourseData.agreedPrice}
                    onChange={(e) =>
                      setNewCourseData({
                        ...newCourseData,
                        agreedPrice: Number(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={newCourseData.internalNotes}
                  onChange={(e) =>
                    setNewCourseData({ ...newCourseData, internalNotes: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="px-3 py-1.5 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#6517a3] text-white rounded-xl font-semibold"
                >
                  Assign Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Prescription Composer */}
      {showRxModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">
                Compose Individualized Preparation
              </h3>
              <button onClick={() => setShowRxModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSavePrescription} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Medicine / Preparation Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vatamangal Special Churna"
                  value={newRxData.medicineName}
                  onChange={(e) =>
                    setNewRxData({ ...newRxData, medicineName: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Composition / Herbs</label>
                <input
                  type="text"
                  placeholder="e.g. Shallaki, Ashwagandha, Rasna, Shunthi"
                  value={newRxData.composition}
                  onChange={(e) =>
                    setNewRxData({ ...newRxData, composition: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    value={newRxData.quantity}
                    onChange={(e) =>
                      setNewRxData({ ...newRxData, quantity: Number(e.target.value) })
                    }
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Unit</label>
                  <select
                    value={newRxData.unit}
                    onChange={(e) =>
                      setNewRxData({
                        ...newRxData,
                        unit: e.target.value as typeof newRxData.unit,
                      })
                    }
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="grams">grams</option>
                    <option value="ml">ml</option>
                    <option value="tablets">tablets</option>
                    <option value="capsules">capsules</option>
                    <option value="bottles">bottles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Dosage Instructions</label>
                <input
                  type="text"
                  value={newRxData.doseInstructions}
                  onChange={(e) =>
                    setNewRxData({ ...newRxData, doseInstructions: e.target.value })
                  }
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRxModal(false)}
                  className="px-3 py-1.5 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 text-white rounded-xl font-semibold"
                >
                  Save & Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Professional Printable Prescription View */}
      {showPrintModal && selectedRx && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Print Header */}
            <div className="text-center border-b-2 border-[#183d2b] pb-4 space-y-1">
              <h2 className="font-marathi-heading font-bold text-2xl text-[#183d2b]">
                विजयमंगल आयुर्वेद (Vijaymangal Ayurved)
              </h2>
              <p className="text-xs font-semibold text-[#6517a3]">
                डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद)
              </p>
              <p className="text-[11px] text-[#6b7280]">
                मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी, जि. सांगली | फोन: +91 82639 02142
              </p>
            </div>

            {/* Patient Details Row */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-[#faf8f5] p-3 rounded-xl border border-[#e6dfd3]">
              <div>
                <p><strong>Patient ID:</strong> {patient.patient_number}</p>
                <p><strong>Patient Name:</strong> {patient.full_name}</p>
              </div>
              <div className="text-right">
                <p><strong>Date:</strong> {formatDate(selectedRx.created_at)}</p>
                <p><strong>Phone:</strong> {patient.phone_number}</p>
              </div>
            </div>

            {/* Rx Symbol & Items */}
            <div className="space-y-3">
              <div className="font-serif font-bold text-xl text-[#183d2b]">℞</div>
              <table className="w-full text-left text-xs border border-[#e6dfd3]">
                <thead className="bg-[#f1ede5] text-[#183d2b]">
                  <tr>
                    <th className="p-2 border">Medicine</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Dosage & Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedRx.items || []).map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2 border font-bold">{item.medicine_name}</td>
                      <td className="p-2 border">{item.prescribed_quantity} {item.quantity_unit}</td>
                      <td className="p-2 border">{item.dose_instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-xs text-[#6b7280] italic">
              Dietary Instructions: Take medicines with lukewarm water. Maintain healthy dietary routine.
            </div>

            <div className="pt-8 border-t flex justify-between items-center text-xs">
              <span>Authorized Signature: Dr. Supriya S. Kadam</span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-[#183d2b] text-white font-semibold"
                >
                  Print Window
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2 rounded-xl border bg-gray-100 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
