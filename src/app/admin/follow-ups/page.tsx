'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Plus,
  CheckCircle2,
  Clock,
  MessageCircle,
  AlertTriangle,
  ChevronRight,
  Filter,
  Activity,
} from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';
import { FollowUpTask } from '@/types/database';

export default function FollowUpsCalendarPage() {
  const [, setRefresh] = useState(0);
  const [tab, setTab] = useState<'today' | 'overdue' | 'upcoming' | 'completed'>('today');
  const [showModal, setShowModal] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const allTasks = db.getFollowUpTasks();
  const patients = db.getPatients();

  // New task form state
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [dueDate, setDueDate] = useState(todayStr);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [notes, setNotes] = useState('Monthly progress checkup and medicine review');

  const handleAdmitFollowupToOpd = (task: FollowUpTask) => {
    const pat = task.patient || patients.find((p) => p.id === task.patient_id);
    if (!pat) return;

    const todayOpd = db.getTodayOpdQueue();
    const existing = todayOpd.find((o) => o.patient_id === pat.id);
    if (existing) {
      alert(`${pat.full_name} is already in today's OPD with Token #${existing.token_number}`);
      return;
    }

    const token = db.addOpdToken({
      patient_id: pat.id,
      patient_name: pat.full_name,
      phone_number: pat.phone_number,
      visit_type: 'course_followup',
      status: 'waiting',
      arrival_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assigned_doctor: 'Dr. Supriya S. Kadam',
      notes: `Follow-up visit for ${task.administrative_notes || 'Scheduled course checkup'}`,
    });

    alert(`Token #${token.token_number} issued for ${pat.full_name}! Added to today's OPD Desk.`);
    setRefresh((r) => r + 1);
  };

  // Filter tasks by tab
  const filteredTasks = allTasks.filter((t) => {
    if (tab === 'today') {
      return t.due_date === todayStr && t.task_status === 'scheduled';
    }
    if (tab === 'overdue') {
      return t.due_date < todayStr && t.task_status === 'scheduled';
    }
    if (tab === 'upcoming') {
      return t.due_date > todayStr && t.task_status === 'scheduled';
    }
    if (tab === 'completed') {
      return t.task_status === 'completed';
    }
    return true;
  });

  const handleMarkComplete = (taskId: string) => {
    db.updateFollowUpTaskStatus(taskId, 'completed');
    setRefresh((r) => r + 1);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !dueDate) return;

    db.createFollowUpTask({
      patient_id: patientId,
      due_date: dueDate,
      task_status: 'scheduled',
      priority,
      task_type: 'visit_followup',
      administrative_notes: notes,
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
            <CalendarDays className="w-6 h-6 text-amber-500" />
            <span>Follow-up Calendar & Reminders</span>
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Track daily due reviews, course renewal tasks, and patient communication.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Follow-up</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#e6dfd3] overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'today', label: 'Due Today', color: 'text-amber-600' },
          { id: 'overdue', label: 'Overdue Reminders', color: 'text-red-600' },
          { id: 'upcoming', label: 'Upcoming Calendar', color: 'text-[#183d2b]' },
          { id: 'completed', label: 'Completed Log', color: 'text-emerald-600' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id as typeof tab)}
            className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer ${
              tab === item.id
                ? 'bg-white border-t-2 border-x border-[#e6dfd3] border-t-[#6517a3] text-[#6517a3] font-bold shadow-xs'
                : 'text-[#6b7280] hover:text-[#183d2b]'
            }`}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-[#e6dfd3] text-center text-xs text-[#6b7280]">
            No follow-up tasks currently in this view.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const patient = task.patient || patients.find((p) => p.id === task.patient_id);
            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {patient ? (
                      <Link
                        href={`/admin/patients/${patient.id}`}
                        className="font-bold text-sm text-[#183d2b] hover:text-[#6517a3] hover:underline"
                      >
                        {patient.full_name} ({patient.patient_number})
                      </Link>
                    ) : (
                      <span className="font-bold">Unknown Patient</span>
                    )}

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        task.priority === 'urgent'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'high'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <p className="text-[#262820]/80">
                    {task.administrative_notes || 'Follow-up consultation due'}
                  </p>

                  <div className="text-[11px] text-[#6b7280] flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-[#183d2b]">
                      <Clock className="w-3.5 h-3.5 text-[#5b8e46]" />
                      Due Date: {task.due_date}
                    </span>
                    {task.completed_at && (
                      <span className="text-emerald-700">
                        Completed: {formatDate(task.completed_at)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {patient && (
                    <a
                      href={getWhatsAppUrl(WHATSAPP_TEMPLATES.followUp, patient.phone_number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#075e54] font-semibold text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                      <span>WhatsApp Follow-up</span>
                    </a>
                  )}

                  {task.task_status !== 'completed' && (
                    <button
                      onClick={() => handleAdmitFollowupToOpd(task)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#183d2b] hover:bg-[#254f39] text-white font-semibold text-xs shadow-xs"
                      title="Patient arrived at clinic - issue OPD token"
                    >
                      <Activity className="w-3.5 h-3.5 text-[#d99136]" />
                      <span>Admit to OPD</span>
                    </button>
                  )}

                  {task.task_status !== 'completed' && (
                    <button
                      onClick={() => handleMarkComplete(task.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Done</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Schedule Follow-up */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">Schedule Follow-up Task</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
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
                <label className="block font-semibold mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as typeof priority)}
                  className="w-full p-2 border rounded-xl"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Administrative Notes</label>
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
