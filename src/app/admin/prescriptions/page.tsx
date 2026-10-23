'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Printer, Search, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Prescription } from '@/types/database';

export default function PrescriptionsManagementPage() {
  const [, setRefresh] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [printRx, setPrintRx] = useState<Prescription | null>(null);

  const patients = db.getPatients();
  // Get all prescriptions across patients
  const allPrescriptions = patients.flatMap((p) => db.getPrescriptionsByPatientId(p.id));

  // Form State
  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [medicineName, setMedicineName] = useState('');
  const [composition, setComposition] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [unit, setUnit] = useState<'grams' | 'ml' | 'tablets' | 'capsules' | 'packets' | 'bottles'>('grams');
  const [dosage, setDosage] = useState('1 teaspoon twice daily with warm water');
  const [frequency, setFrequency] = useState('Twice daily');
  const [notes, setNotes] = useState('Take after meals. Avoid excessive sour/fermented foods.');

  const filteredPrescriptions = allPrescriptions.filter((rx) => {
    const patient = patients.find((p) => p.id === rx.patient_id);
    return (
      (patient && patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (rx.items && rx.items.some((i) => i.medicine_name.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  const handleCreateRx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !medicineName) return;

    const newRx = db.createPrescription({
      patient_id: patientId,
      version_number: 1,
      approval_status: 'approved',
      practitioner_notes: notes,
      items: [
        {
          id: `rxi-${Date.now()}`,
          prescription_id: '',
          medicine_name: medicineName,
          composition: composition,
          prescribed_quantity: Number(quantity),
          quantity_unit: unit,
          dose_instructions: dosage,
          frequency: frequency,
          display_order: 1,
          created_at: new Date().toISOString(),
        },
      ],
    });

    setShowModal(false);
    setPrintRx(newRx);
    setRefresh((r) => r + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
            <FileText className="w-6 h-6 text-amber-600" />
            <span>Prescription Records & Formulations</span>
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Individualized Ayurvedic preparations, dosage schedules, and printable clinical summaries.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Compose Prescription</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-[#e6dfd3] shadow-xs">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient name or preparation..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:ring-2 focus:ring-[#6517a3]"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredPrescriptions.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-[#e6dfd3] text-center text-xs text-[#6b7280]">
            No prescription records found.
          </div>
        ) : (
          filteredPrescriptions.map((rx) => {
            const patient = patients.find((p) => p.id === rx.patient_id);
            return (
              <div
                key={rx.id}
                className="bg-white rounded-2xl border border-[#e6dfd3] shadow-xs p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#e6dfd3]">
                  <div>
                    <span className="text-xs text-[#6b7280] block">Patient:</span>
                    {patient ? (
                      <Link
                        href={`/admin/patients/${patient.id}`}
                        className="font-bold text-base text-[#183d2b] hover:text-[#6517a3] hover:underline"
                      >
                        {patient.full_name} ({patient.patient_number})
                      </Link>
                    ) : (
                      'Unknown Patient'
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase">
                      {rx.approval_status}
                    </span>
                    <span className="text-xs text-[#6b7280]">
                      {formatDate(rx.created_at)}
                    </span>
                    <button
                      onClick={() => setPrintRx(rx)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e6dfd3] bg-white hover:bg-gray-50 text-xs font-semibold text-[#183d2b]"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf8f5] text-[#6b7280] border-b border-[#e6dfd3]">
                      <tr>
                        <th className="p-2">Medicine / Preparation</th>
                        <th className="p-2">Composition</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Dosage Instructions</th>
                        <th className="p-2">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e6dfd3]/60">
                      {(rx.items || []).map((item, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold text-[#183d2b]">{item.medicine_name}</td>
                          <td className="p-2 text-[#6b7280]">{item.composition || '-'}</td>
                          <td className="p-2 font-semibold">{item.prescribed_quantity} {item.quantity_unit}</td>
                          <td className="p-2">{item.dose_instructions}</td>
                          <td className="p-2 font-medium">{item.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {rx.practitioner_notes && (
                  <p className="text-xs text-[#6b7280] italic">
                    Diet & Routine Notes: &ldquo;{rx.practitioner_notes}&rdquo;
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Compose Rx */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#e6dfd3]">
              <h3 className="font-bold text-base text-[#183d2b]">Compose Individualized Preparation</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateRx} className="space-y-3 text-xs">
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
                <label className="block font-semibold mb-1">Medicine Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amlapitta Shamani Yog"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Herbal Composition</label>
                <input
                  type="text"
                  placeholder="e.g. Yashtimadhu, Kamdudha, Shatavari, Shankha Bhasma"
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as typeof unit)}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="grams">grams</option>
                    <option value="ml">ml</option>
                    <option value="tablets">tablets</option>
                    <option value="capsules">capsules</option>
                    <option value="bottles">bottles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Dosage Instructions</label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
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
                  className="px-4 py-1.5 bg-amber-600 text-white rounded-xl font-semibold"
                >
                  Save & Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Prescription Modal */}
      {printRx && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="text-center border-b-2 border-[#183d2b] pb-4 space-y-1">
              <h2 className="font-marathi-heading font-bold text-2xl text-[#183d2b]">
                विजयमंगल आयुर्वेद (Vijaymangal Ayurved)
              </h2>
              <p className="text-xs font-semibold text-[#6517a3]">
                डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद)
              </p>
              <p className="text-[11px] text-[#6b7280]">
                मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी, जि. सांगली | फोन: +91 82639 02142
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-serif font-bold text-xl text-[#183d2b]">℞</div>
              <table className="w-full text-left text-xs border border-[#e6dfd3]">
                <thead className="bg-[#faf8f5]">
                  <tr>
                    <th className="p-2 border">Medicine</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Dosage Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  {(printRx.items || []).map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2 border font-bold">{item.medicine_name}</td>
                      <td className="p-2 border">{item.prescribed_quantity} {item.quantity_unit}</td>
                      <td className="p-2 border">{item.dose_instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-8 border-t flex justify-between items-center text-xs">
              <span>Authorized Signature: Dr. Supriya S. Kadam</span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-[#183d2b] text-white font-semibold"
                >
                  Print Window
                </button>
                <button
                  onClick={() => setPrintRx(null)}
                  className="px-4 py-2 rounded-xl border bg-gray-100 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
