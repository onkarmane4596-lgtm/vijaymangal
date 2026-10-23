'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Stethoscope, Plus, Search, Calendar, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export default function VisitsLogPage() {
  const [, setRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const visits = db.getVisits();
  const patients = db.getPatients();

  // New Visit State
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [courseMonth, setCourseMonth] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [adherence, setAdherence] = useState<'regular' | 'mostly_regular' | 'irregular' | 'discontinued'>('regular');
  const [improvements, setImprovements] = useState('');
  const [assessment, setAssessment] = useState('');
  const [notes, setNotes] = useState('');
  const [nextDate, setNextDate] = useState('');

  const filteredVisits = visits.filter((v) => {
    const patient = patients.find((p) => p.id === v.patient_id);
    return (
      (patient && patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      v.practitioner_assessment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSaveVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;

    db.createVisit({
      patient_id: patientId,
      visit_date: new Date().toISOString().split('T')[0],
      visit_number: visits.length + 1,
      course_month: Number(courseMonth),
      patient_reported_symptoms: symptoms,
      reported_adherence: adherence,
      reported_improvements: improvements,
      practitioner_assessment: assessment,
      practitioner_notes: notes,
      next_follow_up_date: nextDate || undefined,
    });

    setShowModal(false);
    setRefresh((r) => r + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-[#183d2b]" />
            <span>Clinical Consultation Visits</span>
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Chronological records of monthly patient visits, symptoms, adherence, and practitioner notes.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#183d2b] hover:bg-[#262820] text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Record New Visit</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6dfd3] shadow-xs">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient name or assessment notes..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
          />
        </div>
      </div>

      {/* Visits List */}
      <div className="space-y-4">
        {filteredVisits.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#e6dfd3] text-center text-xs text-[#6b7280]">
            No visits found. Click &ldquo;Record New Visit&rdquo; to log a consultation.
          </div>
        ) : (
          filteredVisits.map((v) => {
            const patient = patients.find((p) => p.id === v.patient_id);
            return (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e6dfd3]">
                  <div>
                    <span className="text-xs text-[#6b7280] block">Patient:</span>
                    {patient ? (
                      <Link
                        href={`/admin/patients/${patient.id}`}
                        className="font-bold text-base text-[#183d2b] hover:text-[#6517a3] flex items-center gap-1"
                      >
                        <span>{patient.full_name}</span>
                        <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                      </Link>
                    ) : (
                      <span className="font-bold">Unknown Patient</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-[#6517a3]/10 text-[#6517a3] font-semibold">
                      Visit #{v.visit_number} (Month {v.course_month})
                    </span>
                    <span className="text-[#6b7280] font-medium">
                      Date: {formatDate(v.visit_date)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-semibold text-[#6b7280] block">Reported Symptoms:</span>
                    <p className="text-[#262820] mt-0.5">{v.patient_reported_symptoms || 'None'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#6b7280] block">Improvements / Adherence:</span>
                    <p className="text-[#5b8e46] font-medium mt-0.5">
                      {v.reported_improvements || 'None'} ({v.reported_adherence?.replace('_', ' ')})
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#faf8f5] text-xs space-y-1">
                  <span className="font-bold text-[#183d2b] block">Practitioner Clinical Assessment:</span>
                  <p className="text-[#262820]/90 italic">&ldquo;{v.practitioner_assessment}&rdquo;</p>
                  {v.practitioner_notes && (
                    <p className="text-[#6b7280] text-[11px] pt-1">Notes: {v.practitioner_notes}</p>
                  )}
                </div>

                {v.next_follow_up_date && (
                  <div className="text-[11px] text-[#6517a3] font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Next Scheduled Visit: {formatDate(v.next_follow_up_date)}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Record Visit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">Record Clinical Consultation</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSaveVisit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select Patient *</label>
                <select
                  required
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
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
                <label className="block font-semibold mb-1">Course Month</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={courseMonth}
                  onChange={(e) => setCourseMonth(Number(e.target.value))}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Patient Reported Symptoms *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Pain level, joint mobility, digestive status..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Adherence</label>
                  <select
                    value={adherence}
                    onChange={(e) => setAdherence(e.target.value as typeof adherence)}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="regular">Regular</option>
                    <option value="mostly_regular">Mostly Regular</option>
                    <option value="irregular">Irregular</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Improvements</label>
                  <input
                    type="text"
                    placeholder="e.g. 40% reduction in stiffness"
                    value={improvements}
                    onChange={(e) => setImprovements(e.target.value)}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Practitioner Assessment *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Clinical assessment and pulse diagnosis findings..."
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Next Follow-up Due Date</label>
                <input
                  type="date"
                  value={nextDate}
                  onChange={(e) => setNextDate(e.target.value)}
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
                  className="px-4 py-1.5 bg-[#183d2b] text-white rounded-xl font-semibold"
                >
                  Save Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
