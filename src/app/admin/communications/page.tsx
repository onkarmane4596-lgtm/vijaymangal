'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  FileText,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export default function CommunicationsCenterPage() {
  const patients = db.getPatients();

  const [recipientPhone, setRecipientPhone] = useState(patients[0]?.phone_number || '');
  const [selectedTemplate, setSelectedTemplate] = useState('followUp');
  const [customMessage, setCustomMessage] = useState(WHATSAPP_TEMPLATES.followUp);
  const [copied, setCopied] = useState(false);

  const templatesList = [
    {
      id: 'general',
      title: 'General Inquiry (चौकशी)',
      text: WHATSAPP_TEMPLATES.general,
    },
    {
      id: 'appointment',
      title: 'Appointment Availability (भेट पुष्टी)',
      text: WHATSAPP_TEMPLATES.appointment,
    },
    {
      id: 'followUp',
      title: 'Follow-up Due Reminder (पुढील भेट स्मरण)',
      text: WHATSAPP_TEMPLATES.followUp,
    },
    {
      id: 'coursePlanning',
      title: 'Course Planning & Renewal (उपचार नियोजन व नूतनीकरण)',
      text: WHATSAPP_TEMPLATES.coursePlanning,
    },
  ];

  const handleSelectTemplate = (id: string, text: string) => {
    setSelectedTemplate(id);
    setCustomMessage(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-[#25D366]" />
          <span>WhatsApp Communications Center</span>
        </h1>
        <p className="text-xs text-[#6b7280] mt-1">
          Official Marathi templates for patient follow-ups, appointment coordination, and treatment renewals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Template Selector */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-bold text-sm text-[#183d2b] uppercase tracking-wider text-xs">
            1. Official Marathi Templates
          </h2>

          <div className="space-y-3">
            {templatesList.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl.id, tpl.text)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedTemplate === tpl.id
                    ? 'border-[#25D366] bg-[#25D366]/5 shadow-xs'
                    : 'border-[#e6dfd3] bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-[#183d2b]">{tpl.title}</span>
                  {selectedTemplate === tpl.id && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#25D366] text-white font-bold">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#262820]/80 font-marathi-heading leading-relaxed">
                  &ldquo;{tpl.text}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed font-marathi-heading">
            * वैद्यकीय गोपनीयता नियम: व्हॉट्सअ‍ॅप मेसेजमध्ये रुग्णाचा वैयक्तिक आजार, संवेदनशील तपासण्या किंवा गुप्त माहिती स्वयंचलित पाठवू नये.
          </div>
        </div>

        {/* Right: Message Editor & Dispatcher */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-6">
          <h2 className="font-bold text-sm text-[#183d2b] uppercase tracking-wider text-xs">
            2. Compose & Send Message
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-[#183d2b]">
                Select Patient or Enter Phone Number
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                <select
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="p-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                >
                  <option value="">-- Choose registered patient --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.phone_number}>
                      {p.full_name} ({p.phone_number})
                    </option>
                  ))}
                </select>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Recipient 10-digit number"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5]"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-[#183d2b]">
                  Message Content (Marathi)
                </label>
                <button
                  onClick={handleCopy}
                  className="text-[#6517a3] hover:underline flex items-center gap-1 text-[11px]"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <textarea
                rows={5}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] font-marathi-heading text-sm leading-relaxed focus:ring-2 focus:ring-[#25D366]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#e6dfd3]">
              <span className="text-[11px] text-[#6b7280]">
                Clinic WhatsApp Sender: +91 {CLINIC_PHONE}
              </span>

              <a
                href={getWhatsAppUrl(customMessage, recipientPhone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs shadow-md transition-all active:scale-98 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Open in WhatsApp & Send</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
