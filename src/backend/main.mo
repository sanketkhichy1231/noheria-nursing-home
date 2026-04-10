import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";

import AuthTypes "types/auth";
import DoctorTypes "types/doctors";
import AppointmentTypes "types/appointments";
import PatientTypes "types/patients";
import BlogTypes "types/blogs";
import SiteContentTypes "types/sitecontent";
import AuditTypes "types/audit";

import AuthMixin "mixins/auth-api";
import DoctorsMixin "mixins/doctors-api";
import AppointmentsMixin "mixins/appointments-api";
import PatientsMixin "mixins/patients-api";
import BlogsMixin "mixins/blogs-api";
import SiteContentMixin "mixins/sitecontent-api";
import AnalyticsMixin "mixins/analytics-api";
import AuditMixin "mixins/audit-api";

actor {
  // --- Authorization state (managed by caffeineai-authorization) ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- User profiles ---
  let userProfiles = Map.empty<Principal, AuthTypes.UserProfile>();

  // --- Doctors ---
  let doctors = Map.empty<Nat, DoctorTypes.Doctor>();
  var nextDoctorId : Nat = 1;

  // --- Appointments ---
  let appointments = Map.empty<Nat, AppointmentTypes.Appointment>();
  var nextAppointmentId : Nat = 1;

  // --- Patients ---
  let patients = Map.empty<Nat, PatientTypes.Patient>();
  var nextPatientId : Nat = 1;

  // --- Blogs ---
  let blogs = Map.empty<Nat, BlogTypes.Blog>();
  var nextBlogId : Nat = 1;

  // --- Site content (default seed values) ---
  var siteContent : SiteContentTypes.SiteContent = {
    heroTitle = "Noheria Nursing Home";
    heroTagline = "Quality Healthcare in Panchkula";
    heroIntro = "Trusted medical care for your family.";
    heroCtaText = "Book Appointment";
    services = [];
    testimonials = [];
    faqs = [];
    contactInfo = {
      address = "Panchkula, Haryana";
      phone = "";
      email = "";
      hours = "Mon-Sat: 9am - 8pm";
      mapUrl = "";
    };
  };

  // --- Audit logs ---
  let auditLogs = List.empty<AuditTypes.AuditLog>();
  var nextAuditId : Nat = 1;

  // --- ID counter wrappers (mutable boxed references for lib functions) ---
  let doctorIdRef = { var val = nextDoctorId };
  let appointmentIdRef = { var val = nextAppointmentId };
  let patientIdRef = { var val = nextPatientId };
  let blogIdRef = { var val = nextBlogId };
  let auditIdRef = { var val = nextAuditId };
  let siteContentRef = { var val = siteContent };

  // --- Mixin includes ---
  include AuthMixin(accessControlState, userProfiles, auditLogs, auditIdRef);
  include DoctorsMixin(accessControlState, doctors, doctorIdRef, auditLogs, auditIdRef);
  include AppointmentsMixin(accessControlState, appointments, doctors, patients, appointmentIdRef, patientIdRef, auditLogs, auditIdRef);
  include PatientsMixin(accessControlState, patients, appointments);
  include BlogsMixin(accessControlState, blogs, blogIdRef, auditLogs, auditIdRef);
  include SiteContentMixin(accessControlState, siteContentRef, auditLogs, auditIdRef);
  include AnalyticsMixin(accessControlState, appointments, doctors);
  include AuditMixin(accessControlState, auditLogs);
};
