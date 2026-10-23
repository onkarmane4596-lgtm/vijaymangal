'use client';

import React from 'react';
import { ShieldAlert, ShieldCheck, Clock, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AuditLogPage() {
  const sampleAuditLogs = [
    {
      id: 'log-001',
      action: 'PATIENT_REGISTERED',
      entity: 'Patient: Rahul Narayan Patil (VMA-2026-0001)',
      user: 'Dr. Supriya Shreeprasad Kadam',
      ip: '103.21.124.89 (Atpadi)',
      timestamp: '2026-10-23T15:45:00Z',
      status: 'success',
    },
    {
      id: 'log-002',
      action: 'COURSE_ASSIGNED',
      entity: 'Course: Sandhivata Rejuvenation Program (4-Month)',
      user: 'Dr. Supriya Shreeprasad Kadam',
      ip: '103.21.124.89 (Atpadi)',
      timestamp: '2026-10-23T15:50:00Z',
      status: 'success',
    },
    {
      id: 'log-003',
      action: 'PRESCRIPTION_DISPENSED',
      entity: 'Rx Version #3 for VMA-2026-0001',
      user: 'Dr. Supriya Shreeprasad Kadam',
      ip: '103.21.124.89 (Atpadi)',
      timestamp: '2026-10-23T16:00:00Z',
      status: 'success',
    },
    {
      id: 'log-004',
      action: 'APPOINTMENT_CONFIRMED',
      entity: 'Appointment ID: apt-001',
      user: 'Clinic Staff Desk',
      ip: '103.21.124.89 (Atpadi)',
      timestamp: '2026-10-23T16:15:00Z',
      status: 'success',
    },
    {
      id: 'log-005',
      action: 'SETTINGS_UPDATED',
      entity: 'Clinic Working Hours & Contact Numbers',
      user: 'Dr. Supriya Shreeprasad Kadam',
      ip: '103.21.124.89 (Atpadi)',
      timestamp: '2026-10-23T16:30:00Z',
      status: 'success',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[#183d2b]" />
          <span>Security & Clinical Audit Trail</span>
        </h1>
        <p className="text-xs text-[#6b7280] mt-1">
          Immutable logging of patient data access, prescription authorizations, and administrative events.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Clinical Data Governance:</span> Audit logs are append-only. No user can alter or delete clinical access records, ensuring healthcare accountability and compliance with medical record regulations.
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#faf8f5] text-[#6b7280] font-semibold border-b border-[#e6dfd3] uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Action Event</th>
                <th className="p-3.5">Entity / Resource</th>
                <th className="p-3.5">Operator</th>
                <th className="p-3.5">Network IP</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]/60 text-[#262820]">
              {sampleAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#faf8f5]/60">
                  <td className="p-3.5 text-[#6b7280] font-mono whitespace-nowrap">
                    {formatDate(log.timestamp)} 16:30 IST
                  </td>
                  <td className="p-3.5 font-bold text-[#6517a3]">
                    {log.action}
                  </td>
                  <td className="p-3.5 font-medium">{log.entity}</td>
                  <td className="p-3.5 text-[#6b7280] flex items-center gap-1.5 mt-2">
                    <User className="w-3.5 h-3.5" />
                    <span>{log.user}</span>
                  </td>
                  <td className="p-3.5 text-[#6b7280] font-mono text-[11px]">{log.ip}</td>
                  <td className="p-3.5">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
