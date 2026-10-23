'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  UserPlus,
  ArrowLeft,
  AlertTriangle,
  Save,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { db } from '@/lib/db';
import { Gender, PatientStatus } from '@/types/database';

const patientSchema = z.object({
  fullName: z.string().min(2, 'Full name is required (at least 2 characters)'),
  phoneNumber: z
    .string()
    .min(10, 'Valid 10-digit Indian phone number is required')
    .regex(/^[0-9+ -]{10,15}$/, 'Invalid phone number format'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
  gender: z.enum(['male', 'female', 'other']),
  address: z.string().optional(),
  city: z.string().default('Atpadi'),
  referralSource: z.string().optional(),
  healthHistory: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  communicationConsent: z.boolean().default(true),
  patientStatus: z.enum(['active', 'completed', 'paused', 'inactive']),
});

type PatientFormData = z.infer<typeof patientSchema>;

export default function NewPatientPage() {
  const router = useRouter();
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  const existingPatients = db.getPatients();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      dateOfBirth: '',
      gender: 'male',
      address: '',
      city: 'Atpadi',
      referralSource: 'Walk-in / Atpadi Center',
      healthHistory: '',
      allergies: 'None reported',
      currentMedications: 'None',
      communicationConsent: true,
      patientStatus: 'active',
    },
  });

  const watchedPhone = watch('phoneNumber');

  // Check duplicate phone on blur or typing
  const handlePhoneCheck = (phone: string) => {
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length >= 10) {
      const match = existingPatients.find((p) => p.phone_number.includes(clean));
      if (match) {
        setDuplicateWarning(
          `Patient with phone ${clean} already registered as "${match.full_name}" (${match.patient_number}). Verify whether this is a renewal or duplicate entry.`
        );
      } else {
        setDuplicateWarning(null);
      }
    } else {
      setDuplicateWarning(null);
    }
  };

  const onSubmit = async (data: PatientFormData) => {
    const cleanPhone = data.phoneNumber.replace(/[^0-9]/g, '');

    const newPatient = db.createPatient({
      full_name: data.fullName,
      phone_number: cleanPhone,
      email: data.email || undefined,
      date_of_birth: data.dateOfBirth || undefined,
      gender: data.gender as Gender,
      address: data.address || undefined,
      city: data.city || 'Atpadi',
      registration_date: new Date().toISOString().split('T')[0],
      initial_consultation_date: new Date().toISOString().split('T')[0],
      referral_source: data.referralSource || undefined,
      health_history: data.healthHistory || undefined,
      allergies: data.allergies || undefined,
      current_medications: data.currentMedications || undefined,
      communication_consent: data.communicationConsent,
      patient_status: data.patientStatus as PatientStatus,
    });

    router.push(`/admin/patients/${newPatient.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/patients"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6517a3] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Patient Directory</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 sm:p-10 space-y-8">
        <div className="space-y-1 pb-4 border-b border-[#e6dfd3]">
          <h1 className="text-xl sm:text-2xl font-bold text-[#183d2b] flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-[#6517a3]" />
            <span>Register New Patient Profile</span>
          </h1>
          <p className="text-xs text-[#6b7280]">
            Create a unique master record in the Vijaymangal Ayurved database.
          </p>
        </div>

        {duplicateWarning && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>{duplicateWarning}</div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-xs sm:text-sm">
          {/* Section 1: Demographics */}
          <div className="space-y-4">
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#6517a3]">
              1. Demographics & Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Full Name (English) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Dattatray Shinde"
                    {...register('fullName')}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    placeholder="e.g. 9822012345"
                    {...register('phoneNumber')}
                    onBlur={(e) => handlePhoneCheck(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs text-red-600 mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  {...register('email')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Gender
                </label>
                <select
                  {...register('gender')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  placeholder="Street / Landmark / Village"
                  {...register('address')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Town / City
                </label>
                <input
                  type="text"
                  {...register('city')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Baseline */}
          <div className="space-y-4 pt-4 border-t border-[#e6dfd3]">
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#6517a3]">
              2. Baseline Clinical Information
            </h2>

            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Chief Health Complaints & Medical History
              </label>
              <textarea
                rows={3}
                placeholder="Chief symptoms, duration of illness, past surgeries or major conditions..."
                {...register('healthHistory')}
                className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Known Allergies
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dust, sulfa drugs, dairy (None reported)"
                  {...register('allergies')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Current Conventional Medications
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metformin 500mg, Telmisartan 40mg"
                  {...register('currentMedications')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Referral Source
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clinic Poster, Relative, Newspaper, Doctor"
                  {...register('referralSource')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                  Initial Patient Status
                </label>
                <select
                  {...register('patientStatus')}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
                >
                  <option value="active">Active (Under Assessment / Care)</option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consent */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register('communicationConsent')}
                className="rounded text-[#6517a3] focus:ring-[#6517a3]"
              />
              <span className="text-xs text-[#262820]/80">
                Patient has granted consent for appointment reminders, treatment course checkups, and clinic WhatsApp messaging.
              </span>
            </label>
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t border-[#e6dfd3] flex justify-end gap-3">
            <Link
              href="/admin/patients"
              className="px-5 py-2.5 rounded-xl border border-[#e6dfd3] bg-white text-xs font-semibold text-[#6b7280] hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white text-xs font-semibold shadow-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering...' : 'Save & Open Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
