'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  MessageCircle,
  Calendar,
  AlertCircle,
  Activity,
} from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';
import { Appointment, AppointmentStatus } from '@/types/database';

export default function AppointmentsManagerPage() {
  const [, setRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');

  const appointments = db.getAppointments();
  const todayOpd = db.getTodayOpdQueue();

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone_number.includes(searchTerm) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id: string, status: AppointmentStatus) => {
    db.updateAppointment(id, {
      status,
      confirmed_date: status === 'confirmed' ? new Date().toISOString().split('T')[0] : undefined,
    });
    setRefresh((r) => r + 1);
  };

  const handleAdmitToOpd = (apt: Appointment) => {
    const existing = todayOpd.find(
      (o) => o.phone_number === apt.phone_number || o.patient_name === apt.full_name
    );
    if (existing) {
      alert(`Patient is already checked in with Token #${existing.token_number} (${existing.status})`);
      return;
    }

    const token = db.addOpdToken({
      patient_id: apt.patient_id,
      patient_name: apt.full_name,
      phone_number: apt.phone_number,
      visit_type: apt.patient_type === 'new' ? 'consultation' : 'course_followup',
      status: 'waiting',
      queue_date: new Date().toISOString().split('T')[0],
      arrival_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assigned_doctor: 'Dr. Supriya S. Kadam',
      notes: `Pre-booked appointment for ${apt.category}. Note: ${apt.short_message || 'None'}`,
    });

    db.updateAppointment(apt.id, { status: 'confirmed' });
    alert(`Token #${token.token_number} issued for ${apt.full_name}! Added to today's OPD Desk.`);
    setRefresh((r) => r + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-emerald-600" />
            <span>Appointment Requests & Schedule</span>
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Manage public consultation requests submitted via the Marathi website.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient name, phone, or category..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['all', 'requested', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                statusFilter === status
                  ? 'bg-[#183d2b] text-white'
                  : 'bg-[#faf8f5] text-[#6b7280] hover:bg-[#e6dfd3]/60'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-[#e6dfd3] text-center text-xs text-[#6b7280]">
            No appointments matching your criteria.
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#183d2b]">{apt.full_name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      apt.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : apt.status === 'requested'
                        ? 'bg-amber-100 text-amber-800'
                        : apt.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {apt.status}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#f5ebff] text-[#6517a3] font-semibold">
                    {apt.patient_type === 'new' ? 'New Patient' : 'Follow-up Patient'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[#6b7280]">
                  <span className="flex items-center gap-1 font-semibold text-[#262820]">
                    <Phone className="w-3.5 h-3.5 text-[#5b8e46]" />
                    {apt.phone_number}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#6517a3]" />
                    Preferred: <strong>{apt.preferred_date}</strong> ({apt.preferred_time})
                  </span>
                  <span>
                    Category: <strong className="text-[#6517a3]">{apt.category}</strong>
                  </span>
                </div>

                {apt.short_message && (
                  <p className="text-[#262820]/80 italic bg-[#faf8f5] p-2.5 rounded-lg border border-[#e6dfd3]/60 max-w-2xl">
                    Patient Note: &ldquo;{apt.short_message}&rdquo;
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
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
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54] font-semibold"
                  title="WhatsApp Confirmation"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                {/* Admit to Today's OPD Button */}
                {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                  <button
                    onClick={() => handleAdmitToOpd(apt)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#183d2b] hover:bg-[#254f39] text-white font-semibold shadow-xs"
                    title="Admit patient to today's live OPD queue & issue token"
                  >
                    <Activity className="w-3.5 h-3.5 text-[#d99136]" />
                    <span>Admit to OPD</span>
                  </button>
                )}

                {apt.status === 'requested' && (
                  <button
                    onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm</span>
                  </button>
                )}

                {apt.status === 'confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus(apt.id, 'completed')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#183d2b] hover:bg-[#262820] text-white font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Completed</span>
                  </button>
                )}

                {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                  <button
                    onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-semibold"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
