'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  Phone,
  MessageCircle,
  ExternalLink,
  AlertTriangle,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';
import { PatientStatus } from '@/types/database';

export default function PatientsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PatientStatus>('all');

  const patients = db.getPatients();

  // Search filter by Name, Phone, or Patient Number
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone_number.includes(searchTerm) ||
      patient.patient_number.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || patient.patient_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Check for potential duplicate phone numbers
  const phoneCounts = patients.reduce((acc, p) => {
    acc[p.phone_number] = (acc[p.phone_number] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const duplicatePhones = Object.keys(phoneCounts).filter(
    (phone) => phoneCounts[phone] > 1
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
            <Users className="w-6 h-6 text-[#6517a3]" />
            <span>Patient Master Directory</span>
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Search, manage medical history, treatment courses, and follow-ups.
          </p>
        </div>

        <Link
          href="/admin/patients/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Patient</span>
        </Link>
      </div>

      {/* Duplicate warning notification if duplicates found */}
      {duplicatePhones.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Potential Duplicate Phone Numbers Detected:</span>{' '}
            Found {duplicatePhones.length} phone number(s) shared across multiple patient files ({duplicatePhones.join(', ')}). Review profiles to ensure records are not overwritten.
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient name, phone, or VMA number..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'active', 'completed', 'paused', 'inactive'] as const).map((status) => (
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

      {/* Patients Data Table */}
      <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#faf8f5] border-b border-[#e6dfd3] text-[#6b7280] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Patient ID</th>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Phone Number</th>
                <th className="py-3.5 px-4">Gender / Age</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Registered</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]/60 text-[#262820]">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#6b7280]">
                    No patients matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-[#faf8f5]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#6517a3]">
                      {p.patient_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/admin/patients/${p.id}`}
                        className="font-bold text-[#183d2b] hover:text-[#6517a3] hover:underline flex items-center gap-1.5"
                      >
                        <span>{p.full_name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#6b7280]" />
                      </Link>
                      <span className="text-[11px] text-[#6b7280] block truncate max-w-xs">
                        {p.health_history || 'No recorded history'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-[#262820]">
                        <Phone className="w-3 h-3 text-[#5b8e46]" />
                        <span>{p.phone_number}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 capitalize text-[#6b7280]">
                      {p.gender || 'Not specified'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          p.patient_status === 'active'
                            ? 'bg-emerald-100 text-emerald-700'
                            : p.patient_status === 'completed'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {p.patient_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#6b7280]">
                      {formatDate(p.registration_date)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general, p.phone_number)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075e54]"
                          title="WhatsApp Chat"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        </a>
                        <Link
                          href={`/admin/patients/${p.id}`}
                          className="px-2.5 py-1 rounded-lg bg-[#183d2b] hover:bg-[#262820] text-white font-medium text-[11px]"
                        >
                          View 360° Profile
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-[#faf8f5] border-t border-[#e6dfd3] text-xs text-[#6b7280] flex justify-between items-center">
          <span>Showing {filteredPatients.length} of {patients.length} total patients</span>
          <span>Atpadi Clinic Database</span>
        </div>
      </div>
    </div>
  );
}
