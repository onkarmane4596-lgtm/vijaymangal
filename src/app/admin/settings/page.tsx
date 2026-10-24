'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Settings, Save, CheckCircle2, ShieldAlert, UserCog, BarChart3 } from 'lucide-react';
import { db } from '@/lib/db';
import { ClinicSettings } from '@/types/database';

export default function ClinicSettingsPage() {
  const currentSettings = db.getClinicSettings();
  const [settings, setSettings] = useState<ClinicSettings>(currentSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.updateClinicSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#183d2b]" />
          <span>Clinic Settings & Practice Management</span>
        </h1>
        <p className="text-xs text-[#6b7280] mt-1">
          Practice identity, consultation hours, staff accounts, analytics, and security audit log.
        </p>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e6dfd3] pb-3 text-xs">
        <Link
          href="/admin/settings"
          className="px-3.5 py-1.5 rounded-lg bg-[#183d2b] text-white font-bold flex items-center gap-1.5"
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
          className="px-3.5 py-1.5 rounded-lg bg-white border border-[#e6dfd3] text-[#6b7280] hover:text-[#183d2b] font-medium flex items-center gap-1.5"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>4. Audit Trail</span>
        </Link>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Clinic settings successfully updated across the entire platform.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 sm:p-10 space-y-8 text-xs sm:text-sm">
        
        {/* Section 1: Practice Names */}
        <div className="space-y-4">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[#6517a3]">
            1. Brand Identity & Names
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1 font-marathi-heading">
                Clinic Name (मराठी)
              </label>
              <input
                type="text"
                value={settings.clinic_name_mr}
                onChange={(e) => setSettings({ ...settings, clinic_name_mr: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-marathi-heading"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Clinic Name (English)
              </label>
              <input
                type="text"
                value={settings.clinic_name_en}
                onChange={(e) => setSettings({ ...settings, clinic_name_en: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1 font-marathi-heading">
                Practitioner Name (मराठी)
              </label>
              <input
                type="text"
                value={settings.practitioner_name_mr}
                onChange={(e) => setSettings({ ...settings, practitioner_name_mr: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-marathi-heading"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Practitioner Name (English)
              </label>
              <input
                type="text"
                value={settings.practitioner_name_en}
                onChange={(e) => setSettings({ ...settings, practitioner_name_en: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1 font-marathi-heading">
                Verified Qualification (मराठी)
              </label>
              <input
                type="text"
                value={settings.qualification_mr}
                onChange={(e) => setSettings({ ...settings, qualification_mr: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-marathi-heading"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Qualification (English)
              </label>
              <input
                type="text"
                value={settings.qualification_en}
                onChange={(e) => setSettings({ ...settings, qualification_en: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Location */}
        <div className="space-y-4 pt-4 border-t border-[#e6dfd3]">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[#6517a3]">
            2. Contact & Clinic Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Clinic Phone Number (Digits only)
              </label>
              <input
                type="text"
                value={settings.phone_number}
                onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Display Phone
              </label>
              <input
                type="text"
                value={settings.phone_display}
                onChange={(e) => setSettings({ ...settings, phone_display: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183d2b] mb-1 font-marathi-heading">
              Provisional Clinic Address (मराठी)
            </label>
            <input
              type="text"
              value={settings.address_mr}
              onChange={(e) => setSettings({ ...settings, address_mr: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-marathi-heading"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183d2b] mb-1">
              Address (English)
            </label>
            <input
              type="text"
              value={settings.address_en}
              onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183d2b] mb-1 font-marathi-heading">
              Consultation Working Hours (मराठी)
            </label>
            <input
              type="text"
              value={settings.working_hours_mr}
              onChange={(e) => setSettings({ ...settings, working_hours_mr: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-marathi-heading"
            />
          </div>
        </div>

        {/* Section 3: Tagline & Emergency Notice */}
        <div className="space-y-4 pt-4 border-t border-[#e6dfd3]">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[#6517a3]">
            3. Philosophy & Emergency Notice
          </h2>
          <div>
            <label className="block text-xs font-semibold text-[#183d2b] mb-1 font-marathi-heading">
              Brand Philosophy Tagline (मराठी)
            </label>
            <input
              type="text"
              value={settings.tagline_mr}
              onChange={(e) => setSettings({ ...settings, tagline_mr: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-marathi-heading"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#183d2b] mb-1 font-marathi-heading">
              Emergency Guidance Notice (मराठी)
            </label>
            <textarea
              rows={2}
              value={settings.emergency_notice_mr}
              onChange={(e) => setSettings({ ...settings, emergency_notice_mr: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs font-marathi-heading"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#e6dfd3] flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Clinic Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
