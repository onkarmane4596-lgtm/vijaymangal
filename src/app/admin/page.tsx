'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Repeat,
  Stethoscope,
  CalendarDays,
  CalendarCheck,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Plus,
} from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';

export default function AdminOverviewPage() {
  const [, setRefresh] = useState(0);

  const metrics = db.getDashboardMetrics();
  const appointments = db.getAppointments().slice(0, 5);
  const followUpTasks = db.getFollowUpTasks().filter((t) => t.task_status === 'scheduled').slice(0, 5);
  const visits = db.getVisits().slice(0, 4);

  const handleTaskComplete = (taskId: string) => {
    db.updateFollowUpTaskStatus(taskId, 'completed');
    setRefresh((prev) => prev + 1);
  };

  const handleAppointmentStatus = (id: string, status: 'confirmed' | 'completed' | 'cancelled') => {
    db.updateAppointment(id, { status });
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#183d2b]">
            Clinic Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#6b7280] mt-1">
            Real-time patient courses, monthly follow-ups, and clinic schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/patients/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6517a3] text-white text-xs font-semibold hover:bg-[#490f77] shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Patient</span>
          </Link>

          <Link
            href="/admin/visits"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#183d2b] text-white text-xs font-semibold hover:bg-[#262820] shadow-xs"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Record Visit</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Patients */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#6b7280]">
            <span className="text-xs font-semibold">Total Patients</span>
            <Users className="w-4 h-4 text-[#5b8e46]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#183d2b]">
              {metrics.totalPatients}
            </span>
            <span className="text-[11px] text-[#5b8e46] block mt-0.5">
              {metrics.activePatients} Active Care Plans
            </span>
          </div>
        </div>

        {/* Active Courses */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#6b7280]">
            <span className="text-xs font-semibold">Active Courses</span>
            <Repeat className="w-4 h-4 text-[#6517a3]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#6517a3]">
              {metrics.activeCourses}
            </span>
            <span className="text-[11px] text-[#6b7280] block mt-0.5">
              1-Mo & 4-Mo Programs
            </span>
          </div>
        </div>

        {/* Visits Recorded */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#6b7280]">
            <span className="text-xs font-semibold">Visits Logged</span>
            <Stethoscope className="w-4 h-4 text-[#183d2b]" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#183d2b]">
              {metrics.visitsThisMonth}
            </span>
            <span className="text-[11px] text-[#6b7280] block mt-0.5">
              Clinical consultations
            </span>
          </div>
        </div>

        {/* Follow-ups Due */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#6b7280]">
            <span className="text-xs font-semibold">Follow-ups Due</span>
            <CalendarDays className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-amber-600">
              {metrics.followUpsDueToday}
            </span>
            <span className="text-[11px] text-amber-700 block mt-0.5">
              Requires contact today
            </span>
          </div>
        </div>

        {/* Appointment Requests */}
        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col justify-between col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-[#6b7280]">
            <span className="text-xs font-semibold">New Bookings</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-600">
              {metrics.pendingAppointments}
            </span>
            <span className="text-[11px] text-emerald-700 block mt-0.5">
              From Marathi Website
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Appointments & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Appointment Requests */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd3]">
            <div>
              <h2 className="font-bold text-base text-[#183d2b]">
                Public Appointment Requests
              </h2>
              <p className="text-xs text-[#6b7280]">
                Submitted via patient-facing booking form
              </p>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs font-semibold text-[#6517a3] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {appointments.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#6b7280]">
                No appointment requests currently waiting.
              </div>
            ) : (
              appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 rounded-xl bg-[#faf8f5] border border-[#e6dfd3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#183d2b]">
                        {apt.full_name}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          apt.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : apt.status === 'requested'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <div className="text-[#6b7280] flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#5b8e46]" />
                        {apt.phone_number}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#6517a3]" />
                        {apt.preferred_date} ({apt.preferred_time})
                      </span>
                    </div>

                    <p className="text-[11px] text-[#262820]/75">
                      Category: <strong className="text-[#6517a3]">{apt.category}</strong>
                      {apt.short_message && ` • "${apt.short_message}"`}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={getWhatsAppUrl(
                        WHATSAPP_TEMPLATES.appointmentWithDetails(
                          apt.full_name,
                          apt.preferred_date,
                          apt.category
                        ),
                        apt.phone_number
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54]"
                      title="Contact on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                    </a>

                    {apt.status === 'requested' && (
                      <button
                        onClick={() => handleAppointmentStatus(apt.id, 'confirmed')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px]"
                      >
                        Confirm
                      </button>
                    )}

                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => handleAppointmentStatus(apt.id, 'completed')}
                        className="px-2.5 py-1.5 rounded-lg bg-[#183d2b] hover:bg-[#262820] text-white font-semibold text-[11px]"
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Follow-up Tasks */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd3]">
            <div>
              <h2 className="font-bold text-base text-[#183d2b]">
                Clinical Follow-ups
              </h2>
              <p className="text-xs text-[#6b7280]">
                Scheduled course reviews & visits
              </p>
            </div>
            <Link
              href="/admin/follow-ups"
              className="text-xs font-semibold text-[#6517a3] hover:underline flex items-center gap-1"
            >
              <span>Calendar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {followUpTasks.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#6b7280]">
                All scheduled follow-ups are completed.
              </div>
            ) : (
              followUpTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl bg-[#faf8f5] border border-[#e6dfd3] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#183d2b]">
                        {task.patient?.full_name || 'Patient'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase">
                        Due: {task.due_date}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6b7280]">
                      {task.administrative_notes || 'Regular follow-up check'}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {task.patient && (
                      <a
                        href={getWhatsAppUrl(
                          WHATSAPP_TEMPLATES.followUp,
                          task.patient.phone_number
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075e54]"
                        title="Send WhatsApp Follow-up"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      </a>
                    )}
                    <button
                      onClick={() => handleTaskComplete(task.id)}
                      className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                      title="Mark as Completed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Recent Visits Section */}
      <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd3]">
          <div>
            <h2 className="font-bold text-base text-[#183d2b]">
              Recent Clinical Consultations
            </h2>
            <p className="text-xs text-[#6b7280]">
              Recorded monthly progress & clinical notes
            </p>
          </div>
          <Link
            href="/admin/visits"
            className="text-xs font-semibold text-[#6517a3] hover:underline"
          >
            All Visits ({visits.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visits.map((v) => (
            <div
              key={v.id}
              className="p-4 rounded-xl bg-[#faf8f5] border border-[#e6dfd3] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#183d2b]">
                  Visit #{v.visit_number} (Month {v.course_month})
                </span>
                <span className="text-[10px] text-[#6b7280]">
                  {formatDate(v.visit_date)}
                </span>
              </div>
              <p className="text-[#262820]/80 italic">
                &ldquo;{v.practitioner_assessment}&rdquo;
              </p>
              {v.reported_adherence && (
                <div className="text-[11px] text-[#5b8e46] font-medium">
                  Adherence: {v.reported_adherence.replace('_', ' ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
