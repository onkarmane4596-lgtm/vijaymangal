'use client';

import React, { useState } from 'react';
import { UserCog, ShieldCheck, Mail, Phone, Plus, Check } from 'lucide-react';
import { initialProfiles } from '@/lib/db/initial-data';
import { Profile, UserRole } from '@/types/database';

export default function StaffManagementPage() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [showAddModal, setShowAddModal] = useState(false);

  // New staff form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('staff');
  const [phone, setPhone] = useState('');

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newStaff: Profile = {
      id: `prof-${Date.now()}`,
      full_name: name,
      email,
      role,
      phone,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setProfiles([...profiles, newStaff]);
    setShowAddModal(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
            <UserCog className="w-6 h-6 text-[#183d2b]" />
            <span>Staff Directory & Access Control</span>
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Manage authenticated clinic accounts, roles (Owner, Practitioner, Staff), and permissions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#183d2b] hover:bg-[#262820] text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-[#6517a3]/10 text-[#6517a3]">
                  Role: {p.role}
                </span>
                <h3 className="font-bold text-base text-[#183d2b] mt-1.5">{p.full_name}</h3>
                <div className="text-xs text-[#6b7280] flex items-center gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{p.email}</span>
                </div>
                {p.phone && (
                  <div className="text-xs text-[#6b7280] flex items-center gap-1 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{p.phone}</span>
                  </div>
                )}
              </div>

              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  p.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {p.is_active ? 'Active' : 'Disabled'}
              </span>
            </div>

            <div className="pt-3 border-t border-[#e6dfd3] text-xs text-[#6b7280] flex justify-between items-center">
              <span>Access Level: {p.role === 'owner' ? 'Full SuperAdmin' : p.role === 'practitioner' ? 'Clinical & Prescriptions' : 'Front Desk & Appointments'}</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Verified</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4 text-xs">
        <h2 className="font-bold text-sm text-[#183d2b]">
          Role-Based Access Control (RBAC) Permissions Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#faf8f5] text-[#6b7280] border-b border-[#e6dfd3]">
              <tr>
                <th className="p-2.5">Feature Module</th>
                <th className="p-2.5">Owner (Dr. Supriya)</th>
                <th className="p-2.5">Practitioner</th>
                <th className="p-2.5">Front Desk Staff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6dfd3]/60">
              <tr>
                <td className="p-2.5 font-semibold">Patient Master Records</td>
                <td className="p-2.5 text-emerald-600 font-bold">Full Access</td>
                <td className="p-2.5 text-emerald-600 font-bold">Full Access</td>
                <td className="p-2.5 text-emerald-600 font-bold">Create / Read</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Individualized Prescriptions</td>
                <td className="p-2.5 text-emerald-600 font-bold">Author & Approve</td>
                <td className="p-2.5 text-emerald-600 font-bold">Author & Approve</td>
                <td className="p-2.5 text-[#6b7280]">Dispense View Only</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Public Appointments Queue</td>
                <td className="p-2.5 text-emerald-600 font-bold">Full Access</td>
                <td className="p-2.5 text-emerald-600 font-bold">Full Access</td>
                <td className="p-2.5 text-emerald-600 font-bold">Full Access</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold">Clinic Configuration & Catalog</td>
                <td className="p-2.5 text-emerald-600 font-bold">Full Access</td>
                <td className="p-2.5 text-[#6b7280]">Read Only</td>
                <td className="p-2.5 text-[#6b7280]">Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">Add Staff Member</h3>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Supriya Kadam / Amit Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="staff@vijaymangal.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="staff">Front Desk Staff</option>
                    <option value="practitioner">Practitioner</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="8263902142"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#183d2b] text-white rounded-xl font-semibold"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
