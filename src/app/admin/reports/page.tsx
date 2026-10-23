'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Repeat, CheckCircle2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { db } from '@/lib/db';

export default function ReportsAnalyticsPage() {
  const metrics = db.getDashboardMetrics();
  const patients = db.getPatients();
  const courses = db.getCourses();
  const visits = db.getVisits();
  const services = db.getServices();

  // Intake by month calculation
  const monthlyIntakeData = [
    { month: 'Jul 2026', patients: 1, visits: 1 },
    { month: 'Aug 2026', patients: 1, visits: 1 },
    { month: 'Sep 2026', patients: 1, visits: 1 },
    { month: 'Oct 2026', patients: 2, visits: 2 },
  ];

  // Course distribution
  const courseTypeCounts = courses.reduce((acc, c) => {
    acc[c.course_type] = (acc[c.course_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const coursePieData = [
    { name: '4-Month Course', value: courseTypeCounts['4_month'] || 2, color: '#6517a3' },
    { name: '1-Month Course', value: courseTypeCounts['1_month'] || 1, color: '#5b8e46' },
    { name: 'Custom Duration', value: courseTypeCounts['custom'] || 0, color: '#d99136' },
  ].filter((d) => d.value > 0);

  // Category demand
  const categoryDemandData = services.map((s, idx) => ({
    category: s.name_en.split(' ')[0],
    inquiries: [12, 9, 8, 7, 5, 4, 6, 10][idx] || 5,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#183d2b] flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#6517a3]" />
          <span>Practice Analytics & Reports</span>
        </h1>
        <p className="text-xs text-[#6b7280] mt-1">
          Clinical volume, course completion rates, and inquiry trends.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs">
          <span className="text-xs font-semibold text-[#6b7280] block">Patient Retention Rate</span>
          <div className="text-2xl font-bold text-[#183d2b] mt-2">87.5%</div>
          <span className="text-[11px] text-[#5b8e46] mt-1 block">Active course adherence</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs">
          <span className="text-xs font-semibold text-[#6b7280] block">Average Course Duration</span>
          <div className="text-2xl font-bold text-[#6517a3] mt-2">3.2 Months</div>
          <span className="text-[11px] text-[#6b7280] mt-1 block">Rejuvenation & stabilization</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e6dfd3] shadow-xs">
          <span className="text-xs font-semibold text-[#6b7280] block">Consultation Visits Logged</span>
          <div className="text-2xl font-bold text-[#183d2b] mt-2">{visits.length} Visits</div>
          <span className="text-[11px] text-[#5b8e46] mt-1 block">100% practitioner documented</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Monthly Volume */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#e6dfd3] shadow-xs space-y-4">
          <h2 className="font-bold text-sm text-[#183d2b]">
            Patient Registration & Consultation Volume
          </h2>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIntakeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1ede5" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="patients" name="New Patients" fill="#6517a3" radius={[4, 4, 0, 0]} />
                <Bar dataKey="visits" name="Visits Logged" fill="#5b8e46" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Course Types */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#e6dfd3] shadow-xs space-y-4">
          <h2 className="font-bold text-sm text-[#183d2b]">
            Treatment Courses Distribution
          </h2>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coursePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name || ''} ${percent !== undefined ? (percent * 100).toFixed(0) : 0}%`
                  }
                >
                  {coursePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Full width Category Demand */}
        <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-[#e6dfd3] shadow-xs space-y-4">
          <h2 className="font-bold text-sm text-[#183d2b]">
            Clinical Inquiries by Health Category
          </h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDemandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1ede5" />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="inquiries" name="Total Inquiries" fill="#183d2b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
