import {
  ClinicSettings,
  Service,
  Patient,
  Course,
  Visit,
  PatientMeasurement,
  Prescription,
  FollowUpTask,
  Appointment,
  Profile,
  OpdQueueItem,
  AuditLog,
  CommunicationLog,
} from '@/types/database';
import {
  initialClinicSettings,
  initialServices,
  initialPatients,
  initialCourses,
  initialVisits,
  initialMeasurements,
  initialPrescriptions,
  initialFollowUpTasks,
  initialAppointments,
  initialProfiles,
  initialOpdQueue,
  initialAuditLogs,
  initialCommunicationLogs,
} from './initial-data';

// In-memory / browser persistent state store
class MemoryDataStore {
  private settings: ClinicSettings = { ...initialClinicSettings };
  private services: Service[] = [...initialServices];
  private patients: Patient[] = [...initialPatients];
  private courses: Course[] = [...initialCourses];
  private visits: Visit[] = [...initialVisits];
  private measurements: PatientMeasurement[] = [...initialMeasurements];
  private prescriptions: Prescription[] = [...initialPrescriptions];
  private followUpTasks: FollowUpTask[] = [...initialFollowUpTasks];
  private appointments: Appointment[] = [...initialAppointments];
  private profiles: Profile[] = [...initialProfiles];
  private opdQueue: OpdQueueItem[] = [...initialOpdQueue];
  private auditLogs: AuditLog[] = [...initialAuditLogs];
  private communicationLogs: CommunicationLog[] = [...initialCommunicationLogs];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('vma_data_store');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.patients) this.patients = parsed.patients;
          if (parsed.courses) this.courses = parsed.courses;
          if (parsed.visits) this.visits = parsed.visits;
          if (parsed.measurements) this.measurements = parsed.measurements;
          if (parsed.prescriptions) this.prescriptions = parsed.prescriptions;
          if (parsed.followUpTasks) this.followUpTasks = parsed.followUpTasks;
          if (parsed.appointments) this.appointments = parsed.appointments;
          if (parsed.settings) this.settings = parsed.settings;
          if (parsed.profiles) this.profiles = parsed.profiles;
          if (parsed.opdQueue) this.opdQueue = parsed.opdQueue;
          if (parsed.auditLogs) this.auditLogs = parsed.auditLogs;
          if (parsed.communicationLogs) this.communicationLogs = parsed.communicationLogs;
        }
      } catch (e) {
        console.error('Failed to parse localStorage data', e);
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      try {
        const data = {
          settings: this.settings,
          patients: this.patients,
          courses: this.courses,
          visits: this.visits,
          measurements: this.measurements,
          prescriptions: this.prescriptions,
          followUpTasks: this.followUpTasks,
          appointments: this.appointments,
          profiles: this.profiles,
          opdQueue: this.opdQueue,
          auditLogs: this.auditLogs,
          communicationLogs: this.communicationLogs,
        };
        localStorage.setItem('vma_data_store', JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
    }
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return [...this.auditLogs].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  logAction(
    action: string,
    entity_type: string,
    entity_id: string,
    details?: Record<string, unknown>,
    userId = 'prof-001'
  ): AuditLog {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user_id: userId,
      action,
      entity_type,
      entity_id,
      details,
      ip_address: '103.21.124.89 (Atpadi Desk)',
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(newLog);
    this.saveToStorage();
    return newLog;
  }

  // Settings
  getClinicSettings(): ClinicSettings {
    return { ...this.settings };
  }

  updateClinicSettings(partial: Partial<ClinicSettings>): ClinicSettings {
    this.settings = { ...this.settings, ...partial, updated_at: new Date().toISOString() };
    this.logAction('SETTINGS_UPDATED', 'settings', this.settings.id, partial);
    this.saveToStorage();
    return { ...this.settings };
  }

  // Services
  getServices(): Service[] {
    return [...this.services].sort((a, b) => a.display_order - b.display_order);
  }

  getServiceBySlug(slug: string): Service | undefined {
    return this.services.find((s) => s.slug === slug);
  }

  // Patients
  getPatients(): Patient[] {
    return [...this.patients].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  getPatientById(id: string): Patient | undefined {
    return this.patients.find((p) => p.id === id);
  }

  createPatient(data: Omit<Patient, 'id' | 'patient_number' | 'created_at' | 'updated_at'>): Patient {
    const year = new Date().getFullYear();
    const count = this.patients.length + 1;
    const patient_number = `VMA-${year}-${String(count).padStart(4, '0')}`;
    const newPatient: Patient = {
      ...data,
      id: `pat-${Date.now()}`,
      patient_number,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.patients.unshift(newPatient);
    this.logAction('PATIENT_REGISTERED', 'patient', newPatient.id, {
      name: newPatient.full_name,
      patient_number: newPatient.patient_number,
      phone: newPatient.phone_number,
    });
    this.saveToStorage();
    return newPatient;
  }

  updatePatient(id: string, partial: Partial<Patient>): Patient | undefined {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.patients[index] = {
      ...this.patients[index],
      ...partial,
      updated_at: new Date().toISOString(),
    };
    this.logAction('PATIENT_UPDATED', 'patient', id, partial);
    this.saveToStorage();
    return { ...this.patients[index] };
  }

  // Courses
  getCourses(): Course[] {
    return [...this.courses];
  }

  getCoursesByPatientId(patientId: string): Course[] {
    return this.courses
      .filter((c) => c.patient_id === patientId)
      .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  }

  createCourse(data: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Course {
    const newCourse: Course = {
      ...data,
      id: `crs-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.courses.unshift(newCourse);
    this.logAction('COURSE_ASSIGNED', 'course', newCourse.id, {
      patient_id: newCourse.patient_id,
      name: newCourse.course_name,
      duration: newCourse.duration_months,
      price: newCourse.agreed_price,
    });
    this.saveToStorage();
    return newCourse;
  }

  updateCourse(id: string, partial: Partial<Course>): Course | undefined {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    this.courses[index] = {
      ...this.courses[index],
      ...partial,
      updated_at: new Date().toISOString(),
    };
    this.logAction('COURSE_UPDATED', 'course', id, partial);
    this.saveToStorage();
    return { ...this.courses[index] };
  }

  renewCourse(previousCourseId: string, durationMonths: number, agreedPrice: number): Course | undefined {
    const prev = this.courses.find((c) => c.id === previousCourseId);
    if (!prev) return undefined;

    // mark previous course as completed
    this.updateCourse(previousCourseId, { course_status: 'completed' });

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + durationMonths);

    const renewal: Course = {
      id: `crs-${Date.now()}`,
      patient_id: prev.patient_id,
      course_name: `${prev.course_name} (Renewal)`,
      course_type: durationMonths === 1 ? '1_month' : durationMonths === 4 ? '4_month' : 'custom',
      duration_months: durationMonths,
      duration_days: durationMonths * 30,
      start_date: startDate.toISOString().split('T')[0],
      planned_end_date: endDate.toISOString().split('T')[0],
      course_status: 'active',
      agreed_price: agreedPrice,
      payment_status: 'unpaid',
      follow_up_frequency: prev.follow_up_frequency,
      previous_course_id: previousCourseId,
      internal_notes: `Renewed following successful completion of course ${prev.id}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.courses.unshift(renewal);

    // Schedule next follow-up task
    const nextFollowUp = new Date(startDate);
    nextFollowUp.setMonth(nextFollowUp.getMonth() + 1);
    this.createFollowUpTask({
      patient_id: prev.patient_id,
      course_id: renewal.id,
      due_date: nextFollowUp.toISOString().split('T')[0],
      task_status: 'scheduled',
      priority: 'medium',
      task_type: 'visit_followup',
      administrative_notes: `Month 1 visit for renewed course`,
    });

    this.logAction('COURSE_RENEWED', 'course', renewal.id, {
      previousCourseId,
      durationMonths,
      agreedPrice,
    });

    this.saveToStorage();
    return renewal;
  }

  // Visits
  getVisits(): Visit[] {
    return [...this.visits];
  }

  getVisitsByPatientId(patientId: string): Visit[] {
    return this.visits
      .filter((v) => v.patient_id === patientId)
      .sort((a, b) => new Date(b.visit_date).getTime() - new Date(a.visit_date).getTime());
  }

  createVisit(data: Omit<Visit, 'id' | 'created_at' | 'updated_at'>): Visit {
    const newVisit: Visit = {
      ...data,
      id: `vst-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.visits.unshift(newVisit);

    // If next follow up date provided, create follow up task
    if (data.next_follow_up_date) {
      this.createFollowUpTask({
        patient_id: data.patient_id,
        course_id: data.course_id,
        visit_id: newVisit.id,
        due_date: data.next_follow_up_date,
        task_status: 'scheduled',
        priority: 'high',
        task_type: 'visit_followup',
        administrative_notes: `Scheduled during Visit #${data.visit_number}`,
      });
    }

    this.logAction('VISIT_LOGGED', 'visit', newVisit.id, {
      patient_id: data.patient_id,
      visit_number: newVisit.visit_number,
      next_date: data.next_follow_up_date,
    });

    this.saveToStorage();
    return newVisit;
  }

  // Measurements
  getMeasurementsByPatientId(patientId: string): PatientMeasurement[] {
    return this.measurements
      .filter((m) => m.patient_id === patientId)
      .sort((a, b) => new Date(a.measurement_date).getTime() - new Date(b.measurement_date).getTime());
  }

  addMeasurement(data: Omit<PatientMeasurement, 'id' | 'created_at'>): PatientMeasurement {
    const newMeas: PatientMeasurement = {
      ...data,
      id: `meas-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.measurements.push(newMeas);
    this.saveToStorage();
    return newMeas;
  }

  // Prescriptions
  getPrescriptions(): Prescription[] {
    return [...this.prescriptions].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  getPrescriptionsByPatientId(patientId: string): Prescription[] {
    return this.prescriptions
      .filter((p) => p.patient_id === patientId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createPrescription(data: Omit<Prescription, 'id' | 'created_at' | 'updated_at'>): Prescription {
    const newRx: Prescription = {
      ...data,
      id: `rx-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.prescriptions.unshift(newRx);
    this.logAction('PRESCRIPTION_CREATED', 'prescription', newRx.id, {
      patient_id: data.patient_id,
      version: newRx.version_number,
      items_count: newRx.items?.length || 0,
    });
    this.saveToStorage();
    return newRx;
  }

  // Follow-up tasks
  getFollowUpTasks(): FollowUpTask[] {
    return [...this.followUpTasks].map((task) => {
      const patient = this.patients.find((p) => p.id === task.patient_id);
      return { ...task, patient };
    });
  }

  createFollowUpTask(data: Omit<FollowUpTask, 'id' | 'created_at' | 'updated_at'>): FollowUpTask {
    const newTask: FollowUpTask = {
      ...data,
      id: `tsk-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.followUpTasks.unshift(newTask);
    this.logAction('FOLLOWUP_SCHEDULED', 'task', newTask.id, {
      patient_id: data.patient_id,
      due_date: data.due_date,
    });
    this.saveToStorage();
    return newTask;
  }

  updateFollowUpTaskStatus(id: string, status: FollowUpTask['task_status']): FollowUpTask | undefined {
    const index = this.followUpTasks.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    this.followUpTasks[index] = {
      ...this.followUpTasks[index],
      task_status: status,
      completed_at: status === 'completed' ? new Date().toISOString() : undefined,
      updated_at: new Date().toISOString(),
    };
    this.logAction('FOLLOWUP_STATUS_CHANGED', 'task', id, { status });
    this.saveToStorage();
    return { ...this.followUpTasks[index] };
  }

  // Appointments
  getAppointments(): Appointment[] {
    return [...this.appointments].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  createAppointment(data: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Appointment {
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.appointments.unshift(newApt);
    this.logAction('APPOINTMENT_REQUESTED', 'appointment', newApt.id, {
      patient: newApt.full_name,
      date: newApt.preferred_date,
    });
    this.saveToStorage();
    return newApt;
  }

  updateAppointment(id: string, partial: Partial<Appointment>): Appointment | undefined {
    const index = this.appointments.findIndex((a) => a.id === id);
    if (index === -1) return undefined;
    this.appointments[index] = {
      ...this.appointments[index],
      ...partial,
      updated_at: new Date().toISOString(),
    };
    this.logAction('APPOINTMENT_UPDATED', 'appointment', id, partial);
    this.saveToStorage();
    return { ...this.appointments[index] };
  }

  // Staff Profiles
  getProfiles(): Profile[] {
    return [...this.profiles];
  }

  createProfile(data: Omit<Profile, 'id' | 'created_at' | 'updated_at'>): Profile {
    const newProf: Profile = {
      ...data,
      id: `prof-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.profiles.push(newProf);
    this.logAction('STAFF_ADDED', 'staff', newProf.id, { name: newProf.full_name, role: newProf.role });
    this.saveToStorage();
    return newProf;
  }

  updateProfile(id: string, partial: Partial<Profile>): Profile | undefined {
    const idx = this.profiles.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.profiles[idx] = {
      ...this.profiles[idx],
      ...partial,
      updated_at: new Date().toISOString(),
    };
    this.logAction('STAFF_UPDATED', 'staff', id, partial);
    this.saveToStorage();
    return { ...this.profiles[idx] };
  }

  deleteProfile(id: string): boolean {
    const idx = this.profiles.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    const removed = this.profiles.splice(idx, 1)[0];
    this.logAction('STAFF_REMOVED', 'staff', id, { name: removed.full_name });
    this.saveToStorage();
    return true;
  }

  // OPD Queue Management
  getOpdQueue(): OpdQueueItem[] {
    return [...this.opdQueue].sort((a, b) => a.token_number - b.token_number);
  }

  getTodayOpdQueue(): OpdQueueItem[] {
    const todayStr = new Date().toISOString().split('T')[0];
    return this.opdQueue
      .filter((item) => item.queue_date === todayStr)
      .sort((a, b) => a.token_number - b.token_number);
  }

  addOpdToken(
    data: Omit<OpdQueueItem, 'id' | 'token_number' | 'created_at' | 'updated_at'> & { token_number?: number }
  ): OpdQueueItem {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayTokens = this.opdQueue.filter((item) => item.queue_date === (data.queue_date || todayStr));
    const nextTokenNum =
      data.token_number ||
      (todayTokens.length > 0 ? Math.max(...todayTokens.map((t) => t.token_number)) + 1 : 1);

    const newItem: OpdQueueItem = {
      ...data,
      id: `opd-${Date.now()}`,
      token_number: nextTokenNum,
      queue_date: data.queue_date || todayStr,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.opdQueue.push(newItem);
    this.logAction('OPD_TOKEN_ISSUED', 'opd_queue', newItem.id, {
      token: nextTokenNum,
      patient: newItem.patient_name,
      type: newItem.visit_type,
    });
    this.saveToStorage();
    return newItem;
  }

  updateOpdStatus(id: string, status: OpdQueueItem['status']): OpdQueueItem | undefined {
    const idx = this.opdQueue.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;

    const updates: Partial<OpdQueueItem> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (status === 'in_consultation' && !this.opdQueue[idx].called_at) {
      updates.called_at = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (status === 'completed') {
      updates.completed_at = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    this.opdQueue[idx] = { ...this.opdQueue[idx], ...updates };
    this.logAction('OPD_STATUS_CHANGED', 'opd_queue', id, { status });
    this.saveToStorage();
    return { ...this.opdQueue[idx] };
  }

  updateOpdVitals(id: string, vitals: OpdQueueItem['vitals']): OpdQueueItem | undefined {
    const idx = this.opdQueue.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    this.opdQueue[idx] = {
      ...this.opdQueue[idx],
      vitals: { ...(this.opdQueue[idx].vitals || {}), ...vitals },
      updated_at: new Date().toISOString(),
    };
    this.saveToStorage();
    return { ...this.opdQueue[idx] };
  }

  deleteOpdToken(id: string): boolean {
    const idx = this.opdQueue.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    this.opdQueue.splice(idx, 1);
    this.saveToStorage();
    return true;
  }

  // Communication Logs & Automated Dispatch
  getCommunicationLogs(): CommunicationLog[] {
    return [...this.communicationLogs].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  logCommunication(data: Omit<CommunicationLog, 'id' | 'created_at'>): CommunicationLog {
    const newLog: CommunicationLog = {
      ...data,
      id: `comm-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.communicationLogs.unshift(newLog);
    this.logAction('COMMUNICATION_DISPATCHED', 'communication', newLog.id, {
      recipient: newLog.recipient_phone,
      channel: newLog.channel,
      type: newLog.message_type,
    });
    this.saveToStorage();
    return newLog;
  }

  // Analytics & Metrics
  getDashboardMetrics() {
    const totalPatients = this.patients.length;
    const activePatients = this.patients.filter((p) => p.patient_status === 'active').length;
    const activeCourses = this.courses.filter((c) => c.course_status === 'active').length;
    const todayStr = new Date().toISOString().split('T')[0];
    const followUpsDueToday = this.followUpTasks.filter(
      (t) => t.due_date <= todayStr && t.task_status === 'scheduled'
    ).length;
    const pendingAppointments = this.appointments.filter((a) => a.status === 'requested').length;
    const visitsThisMonth = this.visits.length;

    const todayOpd = this.opdQueue.filter((o) => o.queue_date === todayStr);
    const opdWaiting = todayOpd.filter((o) => o.status === 'waiting').length;
    const opdInConsult = todayOpd.filter((o) => o.status === 'in_consultation').length;
    const opdTotal = todayOpd.length;

    return {
      totalPatients,
      activePatients,
      activeCourses,
      followUpsDueToday,
      pendingAppointments,
      visitsThisMonth,
      opdWaiting,
      opdInConsult,
      opdTotal,
    };
  }
}

// Global singleton instance
export const db = new MemoryDataStore();
