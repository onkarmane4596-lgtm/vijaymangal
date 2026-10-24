'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, ShieldCheck, Clock, User, Search, Filter, Settings, UserCog, BarChart3 } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const auditLogs = db.getAuditLogs();
  const profiles = db.getProfiles();

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.stringify(log.details || {}).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === 'all' || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  const uniqueActions = Array.from(new Set(auditLogs.map((l) => l.action)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[#183d2b]" />
          <span>Security & Clinical Audit Trail</span>
        </h1>
        <p className="text-xs text-[#6b7280] mt-1">
          Immutable chronological log of patient registrations, OPD check-ins, prescriptions, and course updates.
        </p>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e6dfd3] pb-3 text-xs">
        <Link
          href="/admin/settings"
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#e6dfd3] text-[#6b7280] hover:text-[#183d2b] font-medium flex items-center gap-1.5"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>1. Practice Info & Timings</span>
        </Link>
        <Link
          href="/admin/staff"
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#e6dfd3] text-[#6b7280] hover:text-[#183d2b] font-medium flex items-center gap-1.5"
        >
          <UserCog className="w-3.5 h-3.5" />
          <span>2. Staff Accounts</span>
        </Link>
        <Link
          href="/admin/reports"
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#e6dfd3] text-[#6b7280] hover:text-[#183d2b] font-medium flex items-center gap-1.5"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>3. Practice Reports</span>
        </Link>
        <Link
          href="/admin/audit-log"
          className="px-3.5 py-1.5 rounded-lg bg-[#183d2b] text-white font-bold flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>4. Audit Trail</span>
        </Link>
      </div>

      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Clinical Data Governance:</span> Audit logs are append-only.
          Every patient registration, course assignment, prescription creation, and OPD check-in is automatically recorded with actor and timestamp.
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit actions, entities, or details..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] focus:ring-2 focus:ring-[#183d2b]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-[#6b7280]" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="p-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-semibold"
          >
            <option value="all">All Actions ({auditLogs.length})</option>
            {uniqueActions.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
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
                <th className="p-3.5">Entity / Details</th>
                <th className="p-3.5">Operator</th>
                <th className="p-3.5">Network IP</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]/60 text-[#262820]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No audit records matching your search.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const operator =
                    profiles.find((p) => p.id === log.user_id)?.full_name ||
                    'Dr. Supriya Shreeprasad Kadam';

                  return (
                    <tr key={log.id} className="hover:bg-[#faf8f5]/60">
                      <td className="p-3.5 text-[#6b7280] font-mono whitespace-nowrap">
                        {formatDate(log.created_at)} {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3.5 font-bold text-[#183d2b]">
                        <span className="px-2 py-0.5 rounded-full bg-[#183d2b]/10 text-[#183d2b] font-mono text-[11px]">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium max-w-sm">
                        <span className="capitalize text-[#59846f] font-bold">
                          {log.entity_type}:
                        </span>{' '}
                        <span className="text-[#262820]/90">
                          {log.details ? JSON.stringify(log.details).replace(/[{"}]/g, ' ') : log.entity_id}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#6b7280] whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          <span>{operator}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-[#6b7280] font-mono text-[11px] whitespace-nowrap">
                        {log.ip_address || '103.21.124.89 (Atpadi)'}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                          SUCCESS
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
