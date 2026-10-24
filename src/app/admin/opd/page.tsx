'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  Plus,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText,
  Stethoscope,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  Send,
  Sparkles,
  RefreshCw,
  X,
  History,
  HeartPulse,
} from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';
import { OpdQueueItem, OpdStatus, OpdVisitType } from '@/types/database';

export default function DailyOpdDeskPage() {
  const [, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState<'queue' | 'automated_dispatch' | 'history'>('queue');
  const [statusFilter, setStatusFilter] = useState<'all' | OpdStatus>('all');
  const [showNewTokenModal, setShowNewTokenModal] = useState(false);
  const [showVitalsModal, setShowVitalsModal] = useState<OpdQueueItem | null>(null);

  // Data from store
  const opdItems = db.getTodayOpdQueue();
  const patients = db.getPatients();
  const appointments = db.getAppointments();
  const followUpTasks = db.getFollowUpTasks();
  const commLogs = db.getCommunicationLogs();

  const todayStr = new Date().toISOString().split('T')[0];

  // Token Modal State
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visitType, setVisitType] = useState<OpdVisitType>('consultation');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [bp, setBp] = useState('');
  const [pulse, setPulse] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');

  // Vitals edit state
  const [editBp, setEditBp] = useState('');
  const [editPulse, setEditPulse] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editNadi, setEditNadi] = useState('');
  const [editComplaint, setEditComplaint] = useState('');

  // Metric counts
  const waitingCount = opdItems.filter((i) => i.status === 'waiting').length;
  const inConsultCount = opdItems.filter((i) => i.status === 'in_consultation').length;
  const dispensingCount = opdItems.filter((i) => i.status === 'dispensing').length;
  const completedCount = opdItems.filter((i) => i.status === 'completed').length;

  // Filtered queue
  const filteredQueue = opdItems.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  // Handle patient selection for token
  const handleSelectExistingPatient = (id: string) => {
    setSelectedPatientId(id);
    const p = patients.find((pat) => pat.id === id);
    if (p) {
      setPatientName(p.full_name);
      setPhoneNumber(p.phone_number);
    }
  };

  // Submit new token
  const handleIssueToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phoneNumber.trim()) return;

    db.addOpdToken({
      patient_id: selectedPatientId || undefined,
      patient_name: patientName.trim(),
      phone_number: phoneNumber.trim(),
      visit_type: visitType,
      status: 'waiting',
      queue_date: todayStr,
      arrival_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assigned_doctor: 'Dr. Supriya S. Kadam',
      vitals: {
        bp: bp.trim() || undefined,
        pulse_bpm: pulse ? Number(pulse) : undefined,
        weight_kg: weight ? Number(weight) : undefined,
        chief_complaint: chiefComplaint.trim() || undefined,
      },
      notes: notes.trim() || undefined,
    });

    // Reset and close
    setShowNewTokenModal(false);
    setSelectedPatientId('');
    setPatientName('');
    setPhoneNumber('');
    setChiefComplaint('');
    setBp('');
    setPulse('');
    setWeight('');
    setNotes('');
    setRefresh((r) => r + 1);
  };

  // Status transitions
  const handleStatusChange = (id: string, newStatus: OpdStatus) => {
    db.updateOpdStatus(id, newStatus);
    setRefresh((r) => r + 1);
  };

  // Open Vitals Modal
  const openVitalsModal = (item: OpdQueueItem) => {
    setShowVitalsModal(item);
    setEditBp(item.vitals?.bp || '');
    setEditPulse(item.vitals?.pulse_bpm?.toString() || '');
    setEditWeight(item.vitals?.weight_kg?.toString() || '');
    setEditNadi(item.vitals?.nadi_assessment || '');
    setEditComplaint(item.vitals?.chief_complaint || '');
  };

  // Save Vitals
  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showVitalsModal) return;

    db.updateOpdVitals(showVitalsModal.id, {
      bp: editBp.trim() || undefined,
      pulse_bpm: editPulse ? Number(editPulse) : undefined,
      weight_kg: editWeight ? Number(editWeight) : undefined,
      nadi_assessment: editNadi.trim() || undefined,
      chief_complaint: editComplaint.trim() || undefined,
    });

    // Also record measurement if patient_id exists
    if (showVitalsModal.patient_id) {
      db.addMeasurement({
        patient_id: showVitalsModal.patient_id,
        measurement_date: todayStr,
        blood_pressure: editBp.trim() || undefined,
        pulse_bpm: editPulse ? Number(editPulse) : undefined,
        weight_kg: editWeight ? Number(editWeight) : undefined,
        notes: `Recorded at OPD Desk: ${editComplaint}`,
      });
    }

    setShowVitalsModal(null);
    setRefresh((r) => r + 1);
  };

  // Quick WhatsApp token notification
  const sendTokenNotification = (item: OpdQueueItem) => {
    const text = `नमस्कार ${item.patient_name}, विजयमंगल आयुर्वेदमध्ये आपला आजचा टोकन क्र. #${item.token_number} आहे. डॉ. सुप्रिया कदम यांच्याकडे पुढील १० मिनिटांत आपली वेळ येईल. कृपया क्लिनिकमध्ये उपस्थित राहावे.\n- विजयमंगल आयुर्वेद, आटपाडी (संपर्क: ${CLINIC_PHONE})`;
    db.logCommunication({
      patient_id: item.patient_id,
      channel: 'whatsapp',
      message_type: 'appointment',
      content: text,
      recipient_phone: item.phone_number,
      status: 'sent',
    });
    window.open(getWhatsAppUrl(text, item.phone_number), '_blank');
    setRefresh((r) => r + 1);
  };

  // Automated dispatch targets for today
  const todayAppointments = appointments.filter(
    (a) => a.preferred_date === todayStr || a.confirmed_date === todayStr
  );
  const dueFollowups = followUpTasks.filter(
    (t) => t.due_date <= todayStr && t.task_status === 'scheduled'
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#183d2b]" />
              <span>Daily OPD & Patient Flow Desk</span>
            </h1>
          </div>
          <p className="text-xs text-[#6b7280] mt-1 font-marathi-heading">
            दैनिक ओपीडी टोकन, प्रत्यक्ष रुग्ण प्रवाह, नाडी-तपासणी नोंदी आणि स्वयंचलित सूचना व्यवस्थापन.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowNewTokenModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#183d2b] hover:bg-[#254f39] text-white text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 text-[#d99136]" />
            <span>Issue OPD Token (नवीन टोकन)</span>
          </button>
        </div>
      </div>

      {/* KPI Counters: Live Clinic Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
              Waiting in OPD
            </div>
            <div className="text-2xl font-extrabold text-[#183d2b] mt-0.5">
              {waitingCount}
            </div>
            <div className="text-[10px] text-amber-600 font-marathi-heading">प्रतिक्षेत</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
              In Consultation
            </div>
            <div className="text-2xl font-extrabold text-[#183d2b] mt-0.5">
              {inConsultCount}
            </div>
            <div className="text-[10px] text-blue-600 font-marathi-heading">तपासणी सुरू</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
              Pharmacy / Dispensing
            </div>
            <div className="text-2xl font-extrabold text-[#183d2b] mt-0.5">
              {dispensingCount}
            </div>
            <div className="text-[10px] text-purple-600 font-marathi-heading">औषध वाटप</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
            <HeartPulse className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Completed Today
            </div>
            <div className="text-2xl font-extrabold text-[#183d2b] mt-0.5">
              {completedCount}
            </div>
            <div className="text-[10px] text-emerald-600 font-marathi-heading">पूर्ण झालेले रुग्ण</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="border-b border-[#e6dfd3] flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('queue')}
            className={`pb-3 px-3 text-xs font-bold transition-all relative ${
              activeTab === 'queue'
                ? 'text-[#183d2b] border-b-2 border-[#183d2b]'
                : 'text-[#6b7280] hover:text-[#183d2b]'
            }`}
          >
            <span>Live OPD Queue ({opdItems.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('automated_dispatch')}
            className={`pb-3 px-3 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'automated_dispatch'
                ? 'text-[#183d2b] border-b-2 border-[#183d2b]'
                : 'text-[#6b7280] hover:text-[#183d2b]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d99136]" />
            <span>Automated Daily Dispatch ({todayAppointments.length + dueFollowups.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-3 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'text-[#183d2b] border-b-2 border-[#183d2b]'
                : 'text-[#6b7280] hover:text-[#183d2b]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Dispatch Audit Log ({commLogs.length})</span>
          </button>
        </div>

        {activeTab === 'queue' && (
          <div className="flex items-center gap-1.5 pb-2">
            {(['all', 'waiting', 'in_consultation', 'dispensing', 'completed'] as const).map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize transition-all ${
                    statusFilter === st
                      ? 'bg-[#183d2b] text-white shadow-xs'
                      : 'bg-white border border-[#e6dfd3] text-[#6b7280] hover:bg-gray-50'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Tab 1: Live OPD Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          {filteredQueue.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-[#e6dfd3] p-12 text-center space-y-3">
              <Activity className="w-10 h-10 text-[#6b7280] mx-auto opacity-50" />
              <h3 className="text-base font-bold text-[#183d2b]">No Patients in this Queue</h3>
              <p className="text-xs text-[#6b7280] max-w-sm mx-auto">
                No patients match the selected filter for today. Click &quot;Issue OPD Token&quot; to check in walk-in or booked patients.
              </p>
              <button
                onClick={() => setShowNewTokenModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#183d2b] text-white text-xs font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Issue First Token</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQueue.map((item) => {
                const statusColors = {
                  waiting: 'bg-amber-50 text-amber-800 border-amber-200',
                  in_consultation: 'bg-blue-50 text-blue-800 border-blue-200',
                  dispensing: 'bg-purple-50 text-purple-800 border-purple-200',
                  completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                  cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
                };

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Top Token Header */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-[#183d2b] text-[#f7f4ea] text-xs font-extrabold flex items-center justify-center">
                            #{item.token_number}
                          </span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              statusColors[item.status]
                            }`}
                          >
                            {item.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#6b7280] flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.arrival_time}</span>
                        </span>
                      </div>

                      {/* Patient Name & Type */}
                      <div>
                        <h3 className="font-bold text-sm text-[#183d2b] flex items-center gap-1.5">
                          {item.patient_name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[#6b7280] mt-0.5">
                          <Phone className="w-3 h-3" />
                          <span>{item.phone_number}</span>
                          <span>•</span>
                          <span className="capitalize text-[#59846f] font-semibold">
                            {item.visit_type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Vitals Summary Pill */}
                      <div className="mt-3.5 p-2.5 rounded-xl bg-[#faf8f5] border border-[#e6dfd3]/70 text-[11px] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[#6b7280] font-medium">Preliminary Vitals:</span>
                          <button
                            onClick={() => openVitalsModal(item)}
                            className="text-[#6517a3] hover:underline font-bold text-[10px]"
                          >
                            {item.vitals?.bp || item.vitals?.pulse_bpm ? 'Edit Vitals' : '+ Record Vitals'}
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[#262820]">
                          {item.vitals?.bp && <span>BP: <b>{item.vitals.bp}</b></span>}
                          {item.vitals?.pulse_bpm && <span>Pulse: <b>{item.vitals.pulse_bpm} bpm</b></span>}
                          {item.vitals?.weight_kg && <span>Wt: <b>{item.vitals.weight_kg} kg</b></span>}
                          {item.vitals?.nadi_assessment && (
                            <span className="text-[#59846f]">Nadi: <b>{item.vitals.nadi_assessment}</b></span>
                          )}
                          {!item.vitals?.bp && !item.vitals?.pulse_bpm && (
                            <span className="text-[#9ca3af] italic">No vitals logged yet</span>
                          )}
                        </div>
                        {item.vitals?.chief_complaint && (
                          <div className="text-[11px] text-[#183d2b] font-marathi-heading mt-1 border-t border-[#e6dfd3]/40 pt-1">
                            तक्रार: {item.vitals.chief_complaint}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Operational Action Footer */}
                    <div className="mt-4 pt-3 border-t border-[#e6dfd3]/80 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        {/* WhatsApp Token Ping */}
                        <button
                          onClick={() => sendTokenNotification(item)}
                          title="Send turn notification via WhatsApp"
                          className="p-2 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {/* State transitions */}
                        {item.status === 'waiting' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'in_consultation')}
                            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                          >
                            <Stethoscope className="w-3.5 h-3.5" />
                            <span>Call to Doctor</span>
                          </button>
                        )}

                        {item.status === 'in_consultation' && (
                          <div className="flex items-center gap-1.5 flex-1">
                            {item.patient_id && (
                              <Link
                                href={`/admin/patients/${item.patient_id}`}
                                className="py-2 px-2.5 rounded-xl border border-[#183d2b] text-[#183d2b] hover:bg-[#183d2b] hover:text-white font-semibold text-xs transition-all"
                                title="Open patient chart"
                              >
                                Chart
                              </Link>
                            )}
                            <button
                              onClick={() => handleStatusChange(item.id, 'dispensing')}
                              className="flex-1 py-2 px-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1"
                            >
                              <span>Pharmacy Refill</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {item.status === 'dispensing' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'completed')}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Dispensed & Complete</span>
                          </button>
                        )}

                        {item.status === 'completed' && (
                          <span className="flex-1 text-center text-xs font-semibold text-emerald-700 py-1.5 bg-emerald-50 rounded-xl">
                            ✓ Session Finished
                          </span>
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

      {/* Tab 2: Automated Daily Dispatch & Reminders */}
      {activeTab === 'automated_dispatch' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 p-4 sm:p-6 rounded-2xl border border-emerald-200">
            <h2 className="text-sm sm:text-base font-bold text-[#183d2b] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d99136]" />
              <span>Smart Clinic Dispatch Queue for Today ({todayStr})</span>
            </h2>
            <p className="text-xs text-[#262820]/80 mt-1">
              Automated reminders calculated from real patient appointments and course follow-up schedules. Click to preview and send with 1 click.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section A: Today's Appointments */}
            <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#183d2b] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>1. Today&apos;s Appointments ({todayAppointments.length})</span>
                </h3>
              </div>

              {todayAppointments.length === 0 ? (
                <p className="text-xs text-[#6b7280] italic py-4">No appointments scheduled for today.</p>
              ) : (
                <div className="space-y-3">
                  {todayAppointments.map((apt) => {
                    const reminderMsg = `नमस्कार ${apt.full_name}, विजयमंगल आयुर्वेदमध्ये आपली आज भेट निश्चित आहे (वेळ: ${apt.preferred_time}). कृपया वेळेत उपस्थित राहावे.\n- डॉ. सुप्रिया कदम, आटपाडी (+91 ${CLINIC_PHONE})`;
                    return (
                      <div
                        key={apt.id}
                        className="p-3.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-[#183d2b]">{apt.full_name}</div>
                          <div className="text-[11px] text-[#6b7280]">
                            वेळ: {apt.preferred_time} • {apt.category}
                          </div>
                        </div>

                        <a
                          href={getWhatsAppUrl(reminderMsg, apt.phone_number)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            db.logCommunication({
                              channel: 'whatsapp',
                              message_type: 'appointment',
                              content: reminderMsg,
                              recipient_phone: apt.phone_number,
                              status: 'sent',
                            });
                            setRefresh((r) => r + 1);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-[11px] shrink-0"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Remind</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Section B: Course Follow-ups & Refills Due */}
            <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#183d2b] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-600" />
                  <span>2. Course Follow-ups & Refills Due ({dueFollowups.length})</span>
                </h3>
              </div>

              {dueFollowups.length === 0 ? (
                <p className="text-xs text-[#6b7280] italic py-4">No follow-ups due today.</p>
              ) : (
                <div className="space-y-3">
                  {dueFollowups.map((task) => {
                    const pat = task.patient || patients.find((p) => p.id === task.patient_id);
                    const renewalMsg = `नमस्कार ${pat?.full_name || 'रुग्ण'}, विजयमंगल आयुर्वेद येथील आपल्या उपचार कोर्सची पुढील तपासणी व औषध नूतनीकरण तारीख ${task.due_date} आहे. वेळेत येऊन नाडी तपासणी करून घ्यावी.\n- डॉ. सुप्रिया कदम (+91 ${CLINIC_PHONE})`;

                    return (
                      <div
                        key={task.id}
                        className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-[#183d2b]">{pat?.full_name || 'Patient'}</div>
                          <div className="text-[11px] text-[#6b7280] font-marathi-heading">
                            तारीख: {task.due_date} • {task.administrative_notes || 'मासिक तपासणी'}
                          </div>
                        </div>

                        {pat?.phone_number && (
                          <a
                            href={getWhatsAppUrl(renewalMsg, pat.phone_number)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              db.logCommunication({
                                patient_id: pat.id,
                                channel: 'whatsapp',
                                message_type: 'follow_up',
                                content: renewalMsg,
                                recipient_phone: pat.phone_number,
                                status: 'sent',
                              });
                              setRefresh((r) => r + 1);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-[11px] shrink-0"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Send Refill Alert</span>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dispatch History & Audit Log */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[#e6dfd3] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#183d2b]">Patient Dispatch & Notification Log</h2>
              <p className="text-xs text-[#6b7280] mt-0.5">
                Timestamped audit record of all clinic communications sent to patients.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#faf8f5] text-[#183d2b] border-b border-[#e6dfd3] font-bold">
                <tr>
                  <th className="p-3.5">Time</th>
                  <th className="p-3.5">Recipient</th>
                  <th className="p-3.5">Channel</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Message Excerpt</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6dfd3]">
                {commLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50">
                    <td className="p-3.5 text-[#6b7280] whitespace-nowrap">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="p-3.5 font-bold text-[#183d2b] whitespace-nowrap">
                      +91 {log.recipient_phone}
                    </td>
                    <td className="p-3.5 capitalize text-[#25D366] font-semibold">
                      {log.channel}
                    </td>
                    <td className="p-3.5 capitalize text-[#183d2b]">
                      {log.message_type.replace('_', ' ')}
                    </td>
                    <td className="p-3.5 text-[#262820]/80 font-marathi-heading max-w-xs truncate">
                      {log.content}
                    </td>
                    <td className="p-3.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal 1: Issue New OPD Token */}
      {showNewTokenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-[#e6dfd3] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd3]">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#183d2b] text-[#d99136] flex items-center justify-center font-bold text-xs">
                  #
                </span>
                <h2 className="text-base font-bold text-[#183d2b]">
                  Issue New OPD Token (टोकन तयार करा)
                </h2>
              </div>
              <button
                onClick={() => setShowNewTokenModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueToken} className="space-y-4 text-xs">
              {/* Pick registered or enter walk-in */}
              <div>
                <label className="block font-semibold mb-1 text-[#183d2b]">
                  Registered Patient (पर्यायी - आधीचे रुग्ण)
                </label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => handleSelectExistingPatient(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                >
                  <option value="">-- Choose registered patient or enter walk-in below --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.full_name} ({p.patient_number}) - {p.phone_number}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">
                    Phone Number (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">
                    Visit Purpose (भेटीचे स्वरूप)
                  </label>
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value as OpdVisitType)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  >
                    <option value="consultation">First Consultation (पहिली तपासणी)</option>
                    <option value="course_followup">Course Follow-up (कोर्स तपासणी)</option>
                    <option value="medicine_refill">Medicine Refill (औषध गोळा करणे)</option>
                    <option value="panchakarma">Panchakarma Care (पंचकर्म)</option>
                    <option value="emergency">Urgent / Acute (तातडीचे)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">
                    Chief Complaint (मुख्य तक्रार)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. सांधेदुखी, अपचन, पित्त"
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] font-marathi-heading"
                  />
                </div>
              </div>

              {/* Preliminary Vitals */}
              <div className="p-3 bg-[#fdfaf5] rounded-xl border border-[#e6dfd3]/80 space-y-2">
                <span className="font-bold text-[11px] text-[#59846f] uppercase">
                  Reception Vitals (तपासणी - ऐच्छिक)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="BP (120/80)"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="p-2 rounded-lg border border-[#e6dfd3] bg-white text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Pulse (bpm)"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    className="p-2 rounded-lg border border-[#e6dfd3] bg-white text-xs"
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="p-2 rounded-lg border border-[#e6dfd3] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-[#e6dfd3]">
                <button
                  type="button"
                  onClick={() => setShowNewTokenModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#e6dfd3] hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#183d2b] hover:bg-[#254f39] text-white font-semibold shadow-xs"
                >
                  Confirm & Issue Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Vitals Modal */}
      {showVitalsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-[#e6dfd3] shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#e6dfd3]">
              <div>
                <h2 className="text-base font-bold text-[#183d2b]">
                  Log Vitals for #{showVitalsModal.token_number} {showVitalsModal.patient_name}
                </h2>
                <p className="text-[11px] text-[#6b7280]">
                  Record clinical measurements for today&apos;s visit.
                </p>
              </div>
              <button
                onClick={() => setShowVitalsModal(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVitals} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">Blood Pressure</label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={editBp}
                    onChange={(e) => setEditBp(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">Pulse (BPM)</label>
                  <input
                    type="number"
                    placeholder="72"
                    value={editPulse}
                    onChange={(e) => setEditPulse(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="68.5"
                    value={editWeight}
                    onChange={(e) => setEditWeight(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-[#183d2b]">Nadi / Dosha</label>
                  <input
                    type="text"
                    placeholder="उदा. Vata-Pitta"
                    value={editNadi}
                    onChange={(e) => setEditNadi(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#183d2b]">Chief Complaint</label>
                <input
                  type="text"
                  placeholder="रुग्णाची तक्रार"
                  value={editComplaint}
                  onChange={(e) => setEditComplaint(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] font-marathi-heading"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-[#e6dfd3]">
                <button
                  type="button"
                  onClick={() => setShowVitalsModal(null)}
                  className="px-4 py-2 rounded-xl border border-[#e6dfd3] hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#183d2b] hover:bg-[#254f39] text-white font-semibold shadow-xs"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
