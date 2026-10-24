'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  Clock,
  Plus,
  Phone,
  CheckCircle2,
  User,
  CalendarCheck,
  CalendarDays,
  MessageCircle,
  FileText,
  Stethoscope,
  ArrowRight,
  Search,
  Sparkles,
  X,
  RefreshCw,
  Repeat,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';
import { OpdQueueItem, OpdStatus, OpdVisitType } from '@/types/database';

export default function AdminOverviewDeskPage() {
  const [, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState<'opd' | 'appointments' | 'followups'>('opd');
  const [showWalkinModal, setShowWalkinModal] = useState(false);

  // Walk-in form state
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visitType, setVisitType] = useState<OpdVisitType>('consultation');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [selectedExistingId, setSelectedExistingId] = useState('');

  // Store data
  const metrics = db.getDashboardMetrics();
  const opdQueue = db.getTodayOpdQueue();
  const appointments = db.getAppointments();
  const followUpTasks = db.getFollowUpTasks();
  const patients = db.getPatients();
  const courses = db.getCourses();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  // Filter lists for today
  const pendingAppointments = appointments.filter((a) => a.status !== 'cancelled');
  const scheduledFollowups = followUpTasks.filter((t) => t.task_status === 'scheduled');

  // Handle adding new walk-in token
  const handleAddToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phoneNumber.trim()) return;

    db.addOpdToken({
      patient_id: selectedExistingId || undefined,
      patient_name: patientName.trim(),
      phone_number: phoneNumber.trim(),
      visit_type: visitType,
      status: 'waiting',
      queue_date: todayStr,
      arrival_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assigned_doctor: 'Dr. Supriya S. Kadam',
      vitals: {
        chief_complaint: chiefComplaint.trim() || undefined,
      },
    });

    setShowWalkinModal(false);
    setPatientName('');
    setPhoneNumber('');
    setChiefComplaint('');
    setSelectedExistingId('');
    setActiveTab('opd');
    setRefresh((r) => r + 1);
  };

  // Convert appointment to OPD token
  const handleAdmitAppointment = (apt: typeof appointments[0]) => {
    const existingPatient = patients.find(
      (p) => p.phone_number === apt.phone_number || p.full_name.toLowerCase() === apt.full_name.toLowerCase()
    );

    db.addOpdToken({
      patient_id: existingPatient ? existingPatient.id : undefined,
      patient_name: apt.full_name,
      phone_number: apt.phone_number,
      visit_type: 'consultation',
      status: 'waiting',
      queue_date: todayStr,
      arrival_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assigned_doctor: 'Dr. Supriya S. Kadam',
      vitals: {
        chief_complaint: `${apt.category}: ${apt.short_message || 'Online appointment booking'}`,
      },
    });

    db.updateAppointment(apt.id, { status: 'confirmed' });
    setActiveTab('opd');
    setRefresh((r) => r + 1);
  };

  // Status advancement
  const handleUpdateStatus = (id: string, newStatus: OpdStatus) => {
    db.updateOpdStatus(id, newStatus);
    setRefresh((r) => r + 1);
  };

  // Follow-up complete
  const handleCompleteFollowUp = (taskId: string) => {
    db.updateFollowUpTaskStatus(taskId, 'completed');
    setRefresh((r) => r + 1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Today's Header */}
      <div className="bg-gradient-to-r from-[#183d2b] via-[#21533b] to-[#183d2b] text-white p-6 sm:p-7 rounded-2xl shadow-sm border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d99136] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Clinic Desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mt-1 text-white">
            Today&apos;s Clinic Desk — Dr. Supriya S. Kadam
          </h1>
          <p className="text-xs text-white/75 mt-1">
            {todayFormatted} • Atpadi Practice
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowWalkinModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d99136] hover:bg-[#c47f2a] text-black text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ New Walk-in Token</span>
          </button>

          <Link
            href="/admin/prescriptions"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/20 transition-all"
          >
            <FileText className="w-4 h-4 text-[#d99136]" />
            <span>Prescriptions</span>
          </Link>
        </div>
      </div>

      {/* 4 Practical KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Waiting In Clinic */}
        <button
          onClick={() => setActiveTab('opd')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'opd'
              ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/30'
              : 'bg-white border-[#e6dfd3] hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <span className="font-semibold">Waiting in OPD</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#183d2b]">
              {metrics.opdWaiting}
            </span>
            <span className="text-xs text-amber-700 font-medium">Patients in waiting room</span>
          </div>
        </button>

        {/* In Doctor Cabin */}
        <button
          onClick={() => setActiveTab('opd')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'opd'
              ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-400/30'
              : 'bg-white border-[#e6dfd3] hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <span className="font-semibold">In Consultation</span>
            <Stethoscope className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
              {metrics.opdInConsult}
            </span>
            <span className="text-xs text-emerald-700 font-medium">Currently with Doctor</span>
          </div>
        </button>

        {/* Appointments Today */}
        <button
          onClick={() => setActiveTab('appointments')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'appointments'
              ? 'bg-purple-50/70 border-[#6517a3] ring-2 ring-purple-300'
              : 'bg-white border-[#e6dfd3] hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <span className="font-semibold">Today&apos;s Bookings</span>
            <CalendarCheck className="w-4 h-4 text-[#6517a3]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#6517a3]">
              {pendingAppointments.length}
            </span>
            <span className="text-xs text-[#6517a3] font-medium">Online Requests</span>
          </div>
        </button>

        {/* Follow-up Refills */}
        <button
          onClick={() => setActiveTab('followups')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeTab === 'followups'
              ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-300'
              : 'bg-white border-[#e6dfd3] hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <span className="font-semibold">Due Course Refills</span>
            <CalendarDays className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-700">
              {metrics.followUpsDueToday}
            </span>
            <span className="text-xs text-blue-700 font-medium">Medicine refill reminders</span>
          </div>
        </button>
      </div>

      {/* Main Tab Controls */}
      <div className="bg-white p-2 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('opd')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'opd'
              ? 'bg-[#183d2b] text-white shadow-xs'
              : 'text-[#6b7280] hover:bg-gray-100'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>1. Live OPD Queue ({opdQueue.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'appointments'
              ? 'bg-[#183d2b] text-white shadow-xs'
              : 'text-[#6b7280] hover:bg-gray-100'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>2. Appointment Bookings ({pendingAppointments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('followups')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'followups'
              ? 'bg-[#183d2b] text-white shadow-xs'
              : 'text-[#6b7280] hover:bg-gray-100'
          }`}
        >
          <Repeat className="w-4 h-4" />
          <span>3. Course Refill Reminders ({scheduledFollowups.length})</span>
        </button>
      </div>

      {/* TAB 1: Live OPD Queue */}
      {activeTab === 'opd' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-[#183d2b]">
              Today&apos;s In-Clinic Tokens
            </h2>
            <span className="text-xs text-[#6b7280]">
              Total: {opdQueue.length} | Waiting: {metrics.opdWaiting} | Completed: {opdQueue.filter(i => i.status === 'completed').length}
            </span>
          </div>

          {opdQueue.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-[#e6dfd3] p-12 text-center space-y-3">
              <Activity className="w-8 h-8 text-[#5b8e46] mx-auto opacity-40" />
              <p className="text-xs text-[#6b7280]">
                No patients currently registered in today&apos;s queue.
              </p>
              <button
                onClick={() => setShowWalkinModal(true)}
                className="px-4 py-2 rounded-xl bg-[#183d2b] text-white text-xs font-semibold hover:bg-[#254f39]"
              >
                + Create Walk-in Token
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {opdQueue.map((item) => {
                const isWaiting = item.status === 'waiting';
                const inConsult = item.status === 'in_consultation';
                const isDone = item.status === 'completed';

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                      inConsult
                        ? 'bg-emerald-50/50 border-emerald-400 ring-2 ring-emerald-400/20 shadow-xs'
                        : isWaiting
                        ? 'bg-white border-[#e6dfd3] shadow-xs'
                        : 'bg-gray-50 border-gray-200 opacity-75'
                    }`}
                  >
                    <div>
                      {/* Token Header */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-[#183d2b] text-[#d99136] text-xs font-extrabold font-mono">
                          Token #{item.token_number}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            inConsult
                              ? 'bg-emerald-600 text-white animate-pulse'
                              : isWaiting
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {inConsult ? 'In Cabin' : isWaiting ? 'Waiting' : 'Completed'}
                        </span>
                      </div>

                      {/* Patient Name & Details */}
                      <div className="mt-3">
                        <h3 className="font-bold text-sm text-[#183d2b] flex items-center justify-between">
                          <span>{item.patient_name}</span>
                          <span className="text-[11px] text-[#6b7280] font-normal">
                            Arrival: {item.arrival_time}
                          </span>
                        </h3>
                        <p className="text-xs text-[#6b7280] flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3 h-3 text-[#5b8e46]" />
                          <span>{item.phone_number}</span>
                        </p>
                      </div>

                      {/* Complaint / Reason */}
                      {item.vitals?.chief_complaint && (
                        <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-[#e6dfd3]/80 text-[11px] text-[#262820]">
                          <span className="font-semibold text-[#6517a3]">Complaint / Reason: </span>
                          <span>{item.vitals.chief_complaint}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-[#e6dfd3]/70 flex items-center justify-between gap-2">
                      {/* WhatsApp Button */}
                      <a
                        href={getWhatsAppUrl(
                          WHATSAPP_TEMPLATES.tokenAlert(item.patient_name, item.token_number),
                          item.phone_number
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54] flex items-center gap-1 text-xs font-semibold"
                        title="Send WhatsApp Token Notice"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>

                      <div className="flex items-center gap-1.5">
                        {isWaiting && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, 'in_consultation')}
                            className="px-3 py-1.5 rounded-xl bg-[#183d2b] hover:bg-[#254f39] text-white text-xs font-semibold"
                          >
                            Call in Cabin →
                          </button>
                        )}

                        {inConsult && (
                          <>
                            <Link
                              href={`/admin/prescriptions`}
                              className="px-2.5 py-1.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold flex items-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Prescription</span>
                            </Link>

                            <button
                              onClick={() => handleUpdateStatus(item.id, 'completed')}
                              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Done</span>
                            </button>
                          </>
                        )}

                        {isDone && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, 'waiting')}
                            className="text-[11px] text-[#6b7280] hover:text-[#183d2b] underline"
                          >
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Today's Appointments */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-[#183d2b]">
              Website Booking Requests
            </h2>
            <Link
              href="/admin/appointments"
              className="text-xs font-semibold text-[#6517a3] hover:underline flex items-center gap-1"
            >
              <span>Manage Calendar</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs divide-y divide-[#e6dfd3]/60 overflow-hidden">
            {pendingAppointments.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#6b7280]">
                No pending appointment requests.
              </div>
            ) : (
              pendingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#faf8f5]/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#183d2b]">
                        {apt.full_name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          apt.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b7280]">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#5b8e46]" />
                        {apt.phone_number}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#183d2b]">
                        <Clock className="w-3 h-3 text-[#6517a3]" />
                        Preferred: {apt.preferred_date} ({apt.preferred_time})
                      </span>
                    </div>

                    <p className="text-xs text-[#262820]/80">
                      Category: <strong className="text-[#6517a3]">{apt.category}</strong>
                      {apt.short_message && ` • "${apt.short_message}"`}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* WhatsApp */}
                    <a
                      href={getWhatsAppUrl(
                        WHATSAPP_TEMPLATES.todayAppointmentReminder(apt.full_name, apt.preferred_time),
                        apt.phone_number
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54] flex items-center gap-1 text-xs font-semibold"
                      title="Send WhatsApp Reminder"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                      <span className="hidden sm:inline">Reminder</span>
                    </a>

                    {/* Direct Admit to OPD */}
                    <button
                      onClick={() => handleAdmitAppointment(apt)}
                      className="px-3.5 py-2 rounded-xl bg-[#183d2b] hover:bg-[#254f39] text-white text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Admit to OPD →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Follow-ups / Course Refills */}
      {activeTab === 'followups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-[#183d2b]">
              Course Medicine Refill Reminders
            </h2>
            <Link
              href="/admin/courses"
              className="text-xs font-semibold text-[#6517a3] hover:underline flex items-center gap-1"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs divide-y divide-[#e6dfd3]/60 overflow-hidden">
            {scheduledFollowups.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#6b7280]">
                No course follow-ups or refills scheduled for today.
              </div>
            ) : (
              scheduledFollowups.map((task) => {
                const patient = patients.find((p) => p.id === task.patient_id);
                const course = courses.find((c) => c.id === task.course_id);

                return (
                  <div
                    key={task.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#faf8f5]/60 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#183d2b]">
                          {patient ? patient.full_name : 'Patient'}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-amber-100 text-amber-800">
                          {task.task_type.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#6b7280]">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#5b8e46]" />
                          {patient ? patient.phone_number : '-'}
                        </span>
                        <span className="text-amber-800 font-medium">
                          Due Date: {formatDate(task.due_date)}
                        </span>
                      </div>

                      <p className="text-xs text-[#262820]/80">
                        Course: <strong className="text-[#6517a3]">{course?.course_name || 'Ayurvedic Treatment'}</strong>
                        {task.internal_notes && ` • "${task.internal_notes}"`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* WhatsApp Refill Message */}
                      {patient && (
                        <a
                          href={getWhatsAppUrl(
                            WHATSAPP_TEMPLATES.courseRefillReminder(
                              patient.full_name,
                              course?.course_name || 'Ayurvedic Treatment'
                            ),
                            patient.phone_number
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54] flex items-center gap-1 text-xs font-semibold"
                          title="Send WhatsApp Refill Notice"
                        >
                          <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                          <span>Send Refill</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleCompleteFollowUp(task.id)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* MODAL: Simple Walk-in Patient Token Form */}
      {showWalkinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e6dfd3] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd3]">
              <div>
                <h3 className="font-bold text-base text-[#183d2b]">
                  + New Walk-in Patient Token
                </h3>
                <p className="text-xs text-[#6b7280]">
                  Quick check-in for arriving walk-in patient
                </p>
              </div>
              <button
                onClick={() => setShowWalkinModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-[#6b7280]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddToken} className="space-y-4 text-xs">
              {/* Optional: Pick existing patient */}
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Select Existing Patient (Optional)
                </label>
                <select
                  value={selectedExistingId}
                  onChange={(e) => {
                    const id = e.target.value;
                    setSelectedExistingId(id);
                    const p = patients.find((pat) => pat.id === id);
                    if (p) {
                      setPatientName(p.full_name);
                      setPhoneNumber(p.phone_number);
                    }
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
                >
                  <option value="">-- New patient or select from list --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.full_name} ({p.phone_number})
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sagar Shinde"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-semibold"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9822012345"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-mono"
                />
              </div>

              {/* Chief Complaint / Reason */}
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Chief Complaint / Reason for Visit
                </label>
                <input
                  type="text"
                  placeholder="e.g. Joint pain, chronic acidity, skin allergies..."
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-[#e6dfd3] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWalkinModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6b7280] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#183d2b] hover:bg-[#254f39] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Issue OPD Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
