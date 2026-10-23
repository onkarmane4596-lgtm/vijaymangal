'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { db } from '@/lib/db';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';
import {
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Send,
} from 'lucide-react';

const appointmentSchema = z.object({
  fullName: z.string().min(2, 'कृपया आपले पूर्ण नाव प्रविष्ट करा (किमान २ अक्षरे)'),
  phone: z
    .string()
    .min(10, 'कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा')
    .regex(/^[0-9+ -]{10,15}$/, 'वैध मोबाईल नंबर आवश्यक आहे'),
  email: z.string().email('कृपया वैध ईमेल प्रविष्ट करा').optional().or(z.literal('')),
  preferredDate: z.string().min(1, 'कृपया तारीख निवडा'),
  preferredTime: z.string().min(1, 'कृपया वेळ निवडा'),
  category: z.string().min(1, 'कृपया सल्ला विभाग निवडा'),
  patientType: z.enum(['new', 'existing']),
  shortMessage: z.string().max(300, 'संदेश ३०० अक्षरांपेक्षा जास्त नसावा').optional(),
  consentAgreed: z.boolean().refine((val) => val === true, {
    message: 'कृपया क्लिनिकशी संपर्काची संमती द्या',
  }),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

function AppointmentFormContent() {
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get('category') || '';
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<AppointmentFormData | null>(null);

  const services = db.getServices();

  // Get tomorrow's date string for date picker min
  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      preferredDate: today,
      preferredTime: 'सकाळी १०:०० ते ११:००',
      category: defaultCategory || services[0]?.name_mr || 'सांधे, हाडे आणि मणक्यांचे आरोग्य',
      patientType: 'new',
      shortMessage: '',
      consentAgreed: true,
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    // Normalize phone number
    const cleanPhone = data.phone.replace(/[^0-9]/g, '');

    // Save to repository (local store + Supabase sync)
    db.createAppointment({
      full_name: data.fullName,
      phone_number: cleanPhone,
      email: data.email || undefined,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      category: data.category,
      patient_type: data.patientType,
      short_message: data.shortMessage,
      status: 'requested',
      consent_agreed: true,
    });

    setSubmittedData(data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6517a3] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>मुख्यपृष्ठावर परत जा</span>
        </Link>
      </div>

      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e6dfd3] shadow-md space-y-8">
          {/* Header */}
          <div className="space-y-2 border-b border-[#e6dfd3] pb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-[#6517a3]/10 text-[#6517a3] text-xs font-bold uppercase tracking-wider">
              सल्लामसलत पूर्वनोंदणी (Appointment Request)
            </span>
            <h1 className="font-marathi-heading text-2xl sm:text-3xl font-bold text-[#183d2b]">
              आपली आयुर्वेदिक भेट निश्चित करा
            </h1>
            <p className="text-sm text-[#262820]/75 font-marathi-heading leading-relaxed">
              खालील तपशील भरा. क्लिनिकतर्फे आपल्या मोबाईलवर संपर्क साधून उपलब्ध वेळेनुसार भेट निश्चित केली जाईल.
            </p>
            <div className="p-3 rounded-xl bg-[#faf8f5] text-xs text-[#6b7280] font-marathi-heading flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5b8e46]" />
              <span>
                डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद) | क्लिनिक फोन: +91 82639 02142
              </span>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                रुग्णाचे पूर्ण नाव (Full Name) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="उदा. राहुल नारायण पाटील"
                  {...register('fullName')}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                    errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#e6dfd3] bg-[#faf8f5]'
                  } text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3] transition-colors`}
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-marathi-heading">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName.message}</span>
                </p>
              )}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                  मोबाईल नंबर (Phone Number) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    placeholder="उदा. 9822012345"
                    {...register('phone')}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                      errors.phone ? 'border-red-500 bg-red-50/20' : 'border-[#e6dfd3] bg-[#faf8f5]'
                    } text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3] transition-colors`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1 font-marathi-heading">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone.message}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                  ईमेल आयडी (ऐच्छिक - Email)
                </label>
                <input
                  type="email"
                  placeholder="rahul@example.com"
                  {...register('email')}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3] transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-red-600 mt-1 font-marathi-heading">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                  अपेक्षित तारीख (Preferred Date) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    min={today}
                    {...register('preferredDate')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-xs text-red-600 mt-1 font-marathi-heading">
                    {errors.preferredDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                  अपेक्षित वेळ (Preferred Time Slot) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <select
                    {...register('preferredTime')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                  >
                    <option value="सकाळी ९:३० ते १०:३०">सकाळी ९:३० ते १०:३०</option>
                    <option value="सकाळी १०:३० ते ११:३०">सकाळी १०:३० ते ११:३०</option>
                    <option value="सकाळी ११:३० ते १२:३०">सकाळी ११:३० ते १२:३०</option>
                    <option value="सायंकाळी ४:३० ते ५:३०">सायंकाळी ४:३० ते ५:३०</option>
                    <option value="सायंकाळी ५:३० ते ६:३०">सायंकाळी ५:३० ते ६:३०</option>
                    <option value="सायंकाळी ६:३० ते ७:३०">सायंकाळी ६:३० ते ७:३०</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category & Patient Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                  आरोग्य विभाग / तक्रार प्रकार *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                >
                  {services.map((srv) => (
                    <option key={srv.slug} value={srv.name_mr}>
                      {srv.name_mr}
                    </option>
                  ))}
                  <option value="इतर सामान्य सल्ला">इतर सामान्य सल्ला</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                  रुग्ण प्रकार *
                </label>
                <div className="flex items-center gap-6 h-[42px]">
                  <label className="flex items-center gap-2 text-sm text-[#262820] font-marathi-heading cursor-pointer">
                    <input
                      type="radio"
                      value="new"
                      {...register('patientType')}
                      className="text-[#6517a3] focus:ring-[#6517a3]"
                    />
                    <span>नवीन रुग्ण (New)</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#262820] font-marathi-heading cursor-pointer">
                    <input
                      type="radio"
                      value="existing"
                      {...register('patientType')}
                      className="text-[#6517a3] focus:ring-[#6517a3]"
                    />
                    <span>पुन्हा भेट (Follow-up)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Optional Short Message */}
            <div>
              <label className="block text-sm font-semibold text-[#183d2b] font-marathi-heading mb-1.5">
                काही विशिष्ट लक्षणे किंवा संदेश (ऐच्छिक)
              </label>
              <textarea
                rows={3}
                placeholder="उदा. गेल्या २ महिन्यांपासून सांधेदुखीचा त्रास आहे..."
                {...register('shortMessage')}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
              />
              <p className="text-[11px] text-[#6b7280] mt-1 font-marathi-heading">
                * कृपया सार्वजनिक अर्जामध्ये अतिसंवेदनशील वैद्यकीय इतिहास टाकू नये.
              </p>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('consentAgreed')}
                  className="mt-1 rounded text-[#6517a3] focus:ring-[#6517a3]"
                />
                <span className="text-xs text-[#262820]/80 font-marathi-heading leading-relaxed">
                  मी विजयमंगल आयुर्वेद क्लिनिकला माझ्या दिलेल्या क्रमांकावर अपॉइंटमेंट निश्चिती व आरोग्य सल्ल्याबाबत फोन किंवा WhatsApp द्वारे संपर्क साधण्याची संमती देत आहे.
                </span>
              </label>
              {errors.consentAgreed && (
                <p className="text-xs text-red-600 mt-1 font-marathi-heading">
                  {errors.consentAgreed.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#e6dfd3]">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'नोंदणी करत आहे...' : 'अपॉइंटमेंट विनंती सादर करा'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Clear Success State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#5b8e46]/30 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#5b8e46]/15 text-[#5b8e46] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#5b8e46]/10 text-[#183d2b] text-xs font-bold uppercase tracking-wider">
              विनंती नोंदवली गेली आहे (Request Received)
            </span>
            <h2 className="font-marathi-heading text-2xl sm:text-3xl font-bold text-[#183d2b]">
              आपली अपॉइंटमेंट विनंती स्वीकारली गेली आहे!
            </h2>
            <p className="text-sm text-[#262820]/75 font-marathi-heading max-w-lg mx-auto leading-relaxed">
              धन्यवाद {submittedData?.fullName}. क्लिनिकतर्फे आपल्या {submittedData?.phone} या क्रमांकावर लवकरच संपर्क करून उपलब्धतेनुसार भेट अंतिम केली जाईल.
            </p>
          </div>

          {/* Submission Details Summary */}
          {submittedData && (
            <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6dfd3] max-w-md mx-auto text-left text-xs sm:text-sm space-y-1.5 font-marathi-heading">
              <div className="flex justify-between py-1 border-b border-[#e6dfd3]/60">
                <span className="text-[#6b7280]">अपेक्षित तारीख:</span>
                <span className="font-semibold text-[#183d2b]">{submittedData.preferredDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e6dfd3]/60">
                <span className="text-[#6b7280]">अपेक्षित वेळ:</span>
                <span className="font-semibold text-[#183d2b]">{submittedData.preferredTime}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#6b7280]">आरोग्य विभाग:</span>
                <span className="font-semibold text-[#6517a3]">{submittedData.category}</span>
              </div>
            </div>
          )}

          <div className="p-3 bg-[#fff6e8] border border-[#d99136]/30 rounded-xl max-w-md mx-auto text-xs text-[#262820]/80 font-marathi-heading">
            * ही केवळ प्राथमिक विनंती आहे. प्रत्यक्ष डॉक्टरांच्या उपलब्धतेनुसार वेळ निश्चित झाल्यानंतरच अपॉइंटमेंट अंतिम मानली जाईल.
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {submittedData && (
              <a
                href={getWhatsAppUrl(
                  WHATSAPP_TEMPLATES.appointmentWithDetails(
                    submittedData.fullName,
                    submittedData.preferredDate,
                    submittedData.category
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-all shadow-xs w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp वर थेट पुष्टी करा</span>
              </a>
            )}

            <button
              onClick={() => {
                setIsSubmitted(false);
                setSubmittedData(null);
              }}
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#faf8f5] border border-[#e6dfd3] text-[#183d2b] text-sm font-semibold hover:bg-[#f1ede5] transition-all w-full sm:w-auto"
            >
              दुसरी अपॉइंटमेंट नोंदवा
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#183d2b] text-white text-sm font-semibold hover:bg-[#262820] transition-all w-full sm:w-auto"
            >
              मुख्यपृष्ठाकडे परत जा
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Header />
      <main className="grow">
        <Suspense fallback={<div className="p-12 text-center text-sm">लोड होत आहे...</div>}>
          <AppointmentFormContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
