// Re-export backend types for use throughout the app
export type {
  Appointment,
  AppointmentStats,
  AppointmentSummary,
  AuditLog,
  AvailabilitySlot,
  Blog,
  ContactInfo,
  Doctor,
  DoctorPublic,
  FAQ,
  Patient,
  Result,
  Result_1,
  ServiceCard,
  SiteContent,
  Testimonial,
  TrendEntry,
  UserProfile,
} from "../backend";

export { UserRole, UserRole__1 } from "../backend";

// Enums for appointment/blog status (mirroring backend string values)
export const AppointmentStatus = {
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
  Completed: "Completed",
  Cancelled: "Cancelled",
  Rescheduled: "Rescheduled",
} as const;

export type AppointmentStatusType =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const BlogType = {
  Blog: "Blog",
  Video: "Video",
} as const;

export type BlogTypeValue = (typeof BlogType)[keyof typeof BlogType];

export const BlogStatus = {
  Draft: "Draft",
  Published: "Published",
} as const;

export type BlogStatusValue = (typeof BlogStatus)[keyof typeof BlogStatus];

export const DoctorStatus = {
  Active: "Active",
  Inactive: "Inactive",
} as const;

export type DoctorStatusValue =
  (typeof DoctorStatus)[keyof typeof DoctorStatus];

// Role strings used in the app
export type AppRole = "admin" | "doctor" | "staff" | "guest";

// Utility type for form inputs
export interface AppointmentFormInput {
  patientName: string;
  phone: string;
  problem: string;
  date: string;
  slot: string;
  doctorId: bigint | null;
}

export interface DoctorFormInput {
  name: string;
  specialization: string;
  email: string;
  phone: string;
}

export interface BlogFormInput {
  title: string;
  content: string;
  imageUrl: string;
  blogType: string;
}
