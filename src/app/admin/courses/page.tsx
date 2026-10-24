'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Repeat,
  Search,
  Plus,
  RefreshCw,
  Calendar,
  CheckCircle2,
  ChevronRight,
  User,
  MessageCircle,
} from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate, formatCurrency } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';
import { CourseStatus } from '@/types/database';

export default function CoursesManagementPage() {
  const [, setRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CourseStatus>('all');
  const [showModal, setShowModal] = useState(false);

  const courses = db.getCourses();
  const patients = db.getPatients();

  // Create course form state
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [courseName, setCourseName] = useState('Sandhivata & Joint Care Program');
  const [durationMonths, setDurationMonths] = useState(4);
  const [price, setPrice] = useState(6000);
  const [notes, setNotes] = useState('');

  const filteredCourses = courses.filter((c) => {
    const patient = patients.find((p) => p.id === c.patient_id);
    const matchesSearch =
      c.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient && patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || c.course_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + Number(durationMonths));

    db.createCourse({
      patient_id: selectedPatientId,
      course_name: courseName,
      course_type: durationMonths === 1 ? '1_month' : durationMonths === 4 ? '4_month' : 'custom',
      duration_months: Number(durationMonths),
      duration_days: Number(durationMonths) * 30,
      start_date: startDate.toISOString().split('T')[0],
      planned_end_date: endDate.toISOString().split('T')[0],
      course_status: 'active',
      agreed_price: Number(price),
      payment_status: 'unpaid',
      follow_up_frequency: 'monthly',
      internal_notes: notes,
    });

    setShowModal(false);
    setRefresh((r) => r + 1);
  };

  const handleRenew = (courseId: string) => {
    if (confirm('Renew this course for an additional 4-month cycle?')) {
      db.renewCourse(courseId, 4, 6000);
      setRefresh((r) => r + 1);
    }
  };

  const handleTogglePayment = (courseId: string, current: string) => {
    const nextStatus = current === 'paid' ? 'unpaid' : current === 'unpaid' ? 'paid' : 'unpaid';
    db.updateCourse(courseId, { payment_status: nextStatus });
    setRefresh((r) => r + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
            <Repeat className="w-6 h-6 text-[#6517a3]" />
            <span>Ayurvedic Treatment Courses</span>
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Manage 1-month and 4-month programs, monthly visit cycles, and renewals.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Treatment Course</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by course or patient name..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'active', 'completed', 'paused'] as const).map((status) => (
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

      {/* Courses Table */}
      <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#faf8f5] border-b border-[#e6dfd3] text-[#6b7280] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Patient</th>
                <th className="py-3.5 px-4">Course Name & Type</th>
                <th className="py-3.5 px-4">Timeline</th>
                <th className="py-3.5 px-4">Price & Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]/60">
              {filteredCourses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#6b7280]">
                    No courses matching your filter.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((c) => {
                  const patient = patients.find((p) => p.id === c.patient_id);
                  return (
                    <tr key={c.id} className="hover:bg-[#faf8f5]/60">
                      <td className="py-3.5 px-4 font-bold text-[#183d2b]">
                        {patient ? (
                          <Link
                            href={`/admin/patients/${patient.id}`}
                            className="hover:text-[#6517a3] hover:underline"
                          >
                            {patient.full_name}
                            <span className="block text-[10px] text-[#6b7280] font-mono">
                              {patient.patient_number}
                            </span>
                          </Link>
                        ) : (
                          'Unknown Patient'
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#183d2b] block">{c.course_name}</span>
                        <span className="text-[11px] text-[#6517a3]">
                          {c.course_type.replace('_', ' ')} ({c.duration_months} Months)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-[#6b7280]">
                        <div>Start: {formatDate(c.start_date)}</div>
                        <div>End: {formatDate(c.planned_end_date)}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#183d2b]">
                          {formatCurrency(c.agreed_price)}
                        </div>
                        <button
                          onClick={() => handleTogglePayment(c.id, c.payment_status)}
                          title="Click to toggle Paid / Unpaid"
                          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                            c.payment_status === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                        >
                          {c.payment_status} ✎
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            c.course_status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {c.course_status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {patient && (
                            <a
                              href={getWhatsAppUrl(
                                WHATSAPP_TEMPLATES.courseRefillReminder(
                                  patient.full_name,
                                  c.course_name
                                ),
                                patient.phone_number
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54] flex items-center gap-1 text-[11px] font-semibold"
                              title="Send WhatsApp medicine refill notice"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                              <span className="hidden sm:inline">Send Refill</span>
                            </a>
                          )}
                          {c.course_status === 'active' && (
                            <button
                              onClick={() => handleRenew(c.id)}
                              className="px-2.5 py-1 rounded-lg bg-[#5b8e46]/15 hover:bg-[#5b8e46]/25 text-[#183d2b] font-semibold text-[11px]"
                            >
                              Renew
                            </button>
                          )}
                          {patient && (
                            <Link
                              href={`/admin/patients/${patient.id}`}
                              className="px-2.5 py-1 rounded-lg bg-[#183d2b] text-white font-medium text-[11px]"
                            >
                              Profile
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Course */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">Create Treatment Course</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Patient *</label>
                <select
                  required
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.full_name} ({p.patient_number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Course Name *</label>
                <input
                  type="text"
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Duration</label>
                  <select
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="1">1 Month Program</option>
                    <option value="4">4 Month Program</option>
                    <option value="2">2 Months (Custom)</option>
                    <option value="6">6 Months (Custom)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Agreed Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#6517a3] text-white rounded-xl font-semibold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
