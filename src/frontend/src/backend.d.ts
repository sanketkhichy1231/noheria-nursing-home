import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Blog {
    id: bigint;
    status: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: bigint;
    blogType: string;
    updatedAt: bigint;
    imageUrl: string;
}
export interface FAQ {
    id: bigint;
    question: string;
    order: bigint;
    answer: string;
}
export interface AuditLog {
    id: bigint;
    action: string;
    userId: string;
    timestamp: bigint;
    details: string;
}
export interface AppointmentSummary {
    total: bigint;
    cancelled: bigint;
    pending: bigint;
    completed: bigint;
    approved: bigint;
}
export interface AppointmentStats {
    total: bigint;
    completed: bigint;
    rejected: bigint;
    accepted: bigint;
}
export interface TrendEntry {
    date: string;
    count: bigint;
}
export interface AvailabilitySlot {
    endHour: bigint;
    dayOfWeek: string;
    startHour: bigint;
}
export type Result_1 = {
    __kind__: "ok";
    ok: bigint;
} | {
    __kind__: "err";
    err: string;
};
export interface Patient {
    id: bigint;
    appointmentIds: Array<bigint>;
    name: string;
    email?: string;
    phone: string;
}
export interface DoctorPublic {
    id: bigint;
    status: string;
    name: string;
    isOnline: boolean;
    email: string;
    availability: Array<AvailabilitySlot>;
    specialization: string;
    phone: string;
}
export interface ServiceCard {
    id: bigint;
    title: string;
    order: bigint;
    icon: string;
    description: string;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface Doctor {
    id: bigint;
    status: string;
    appointmentStats: AppointmentStats;
    name: string;
    isOnline: boolean;
    email: string;
    availability: Array<AvailabilitySlot>;
    specialization: string;
    phone: string;
    lastLogin: bigint;
}
export interface SiteContent {
    contactInfo: ContactInfo;
    faqs: Array<FAQ>;
    heroCtaText: string;
    heroIntro: string;
    testimonials: Array<Testimonial>;
    heroTitle: string;
    services: Array<ServiceCard>;
    heroTagline: string;
}
export interface Appointment {
    id: bigint;
    status: string;
    doctorId: bigint;
    date: string;
    createdAt: bigint;
    slot: string;
    updatedAt: bigint;
    notes: string;
    patientName: string;
    phone: string;
    problem: string;
}
export interface ContactInfo {
    hours: string;
    email: string;
    address: string;
    mapUrl: string;
    phone: string;
}
export interface UserProfile {
    principal: Principal;
    name: string;
    createdAt: bigint;
    role: UserRole;
    email: string;
}
export interface Testimonial {
    id: bigint;
    name: string;
    role: string;
    text: string;
    rating: bigint;
}
export enum UserRole {
    admin = "admin",
    doctor = "doctor",
    staff = "staff"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDoctor(name: string, specialization: string, email: string, phone: string): Promise<Result_1>;
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    createAppointment(patientName: string, phone: string, problem: string, date: string, slot: string, doctorId: bigint | null): Promise<Result_1>;
    createBlog(title: string, content: string, imageUrl: string, blogType: string): Promise<Result_1>;
    deleteAppointment(id: bigint): Promise<Result>;
    deleteBlog(id: bigint): Promise<Result>;
    editBlog(id: bigint, title: string, content: string, imageUrl: string, blogType: string): Promise<Result>;
    editDoctor(id: bigint, name: string, specialization: string, email: string, phone: string): Promise<Result>;
    getAllBlogs(): Promise<Array<Blog>>;
    getAppointmentStats(): Promise<AppointmentSummary>;
    getAppointmentTrend(days: bigint): Promise<Array<TrendEntry>>;
    getAppointments(statusFilter: string | null, doctorIdFilter: bigint | null): Promise<Array<Appointment>>;
    getAppointmentsByDoctor(doctorId: bigint): Promise<Array<Appointment>>;
    getAuditLogs(): Promise<Array<AuditLog>>;
    getAuditLogsByUser(userId: string): Promise<Array<AuditLog>>;
    getAvailableSlots(date: string, doctorId: bigint | null): Promise<Array<string>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getCurrentUser(): Promise<UserProfile | null>;
    getDoctorById(id: bigint): Promise<Doctor | null>;
    getDoctorStats(doctorId: bigint): Promise<AppointmentStats>;
    getDoctors(): Promise<Array<DoctorPublic>>;
    getPatientByPhone(phone: string): Promise<Patient | null>;
    getPatientHistory(patientId: bigint): Promise<Array<Appointment>>;
    getPatients(): Promise<Array<Patient>>;
    getPublishedBlogs(): Promise<Array<Blog>>;
    getSiteContent(): Promise<SiteContent>;
    isCallerAdmin(): Promise<boolean>;
    publishBlog(id: bigint): Promise<Result>;
    registerUser(principal: Principal, name: string, email: string, role: UserRole): Promise<Result>;
    rescheduleAppointment(id: bigint, newDate: string, newSlot: string, newDoctorId: bigint | null): Promise<Result>;
    saveCallerUserProfile(name: string, email: string): Promise<Result>;
    setDoctorAvailability(doctorId: bigint, availability: Array<AvailabilitySlot>): Promise<Result>;
    toggleDoctorOnlineStatus(doctorId: bigint, isOnline: boolean): Promise<Result>;
    unpublishBlog(id: bigint): Promise<Result>;
    updateAppointmentStatus(id: bigint, newStatus: string, notes: string | null): Promise<Result>;
    updateContactInfo(address: string, phone: string, email: string, hours: string, mapUrl: string): Promise<Result>;
    updateFAQs(faqs: Array<FAQ>): Promise<Result>;
    updateHeroSection(heroTitle: string, heroTagline: string, heroIntro: string, heroCtaText: string): Promise<Result>;
    updateServices(services: Array<ServiceCard>): Promise<Result>;
    updateTestimonials(testimonials: Array<Testimonial>): Promise<Result>;
    updateUserRole(targetPrincipal: Principal, newRole: UserRole): Promise<Result>;
}
