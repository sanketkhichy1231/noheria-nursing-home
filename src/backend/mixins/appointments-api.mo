import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import AppointmentLib "../lib/appointments";
import PatientLib "../lib/patients";
import AuditLib "../lib/audit";
import AppointmentTypes "../types/appointments";
import DoctorTypes "../types/doctors";
import PatientTypes "../types/patients";
import AuditTypes "../types/audit";
import Common "../types/common";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  appointments : Map.Map<Nat, AppointmentTypes.Appointment>,
  doctors : Map.Map<Nat, DoctorTypes.Doctor>,
  patients : Map.Map<Nat, PatientTypes.Patient>,
  nextAppointmentId : { var val : Nat },
  nextPatientId : { var val : Nat },
  auditLogs : List.List<AuditTypes.AuditLog>,
  nextAuditId : { var val : Nat },
) {
  public shared ({ caller }) func createAppointment(
    patientName : Text,
    phone : Text,
    problem : Text,
    date : Text,
    slot : Text,
    doctorId : ?Nat,
  ) : async Common.Result<Nat> {
    let result = AppointmentLib.createAppointment(
      appointments, doctors, nextAppointmentId,
      patientName, phone, problem, date, slot, doctorId,
    );
    switch (result) {
      case (#ok(apptId)) {
        ignore PatientLib.upsertPatient(patients, nextPatientId, patientName, phone, null, apptId);
        AuditLib.logAction(auditLogs, nextAuditId, "CREATE_APPOINTMENT",
          caller.toText(), "Appointment #" # debug_show(apptId) # " created for " # patientName);
        #ok(apptId)
      };
      case (#err(msg)) { #err(msg) };
    }
  };

  public query ({ caller }) func getAppointments(
    statusFilter : ?Text,
    doctorIdFilter : ?Nat,
  ) : async [AppointmentTypes.Appointment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return [];
    };
    AppointmentLib.getAppointments(appointments, statusFilter, doctorIdFilter)
  };

  public query ({ caller }) func getAppointmentsByDoctor(
    doctorId : Nat
  ) : async [AppointmentTypes.Appointment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return [];
    };
    AppointmentLib.getAppointmentsByDoctor(appointments, doctorId)
  };

  public shared ({ caller }) func updateAppointmentStatus(
    id : Nat,
    newStatus : Text,
    notes : ?Text,
  ) : async Common.Result<()> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: Login required");
    };
    let validStatuses = ["pending", "approved", "rejected", "completed", "cancelled", "rescheduled"];
    let isValid = validStatuses.find(func(s : Text) : Bool { s == newStatus });
    switch (isValid) {
      case null { return #err("Invalid status value: " # newStatus) };
      case (_) {};
    };
    let result = AppointmentLib.updateAppointmentStatus(appointments, id, newStatus, notes);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "UPDATE_APPOINTMENT_STATUS",
          caller.toText(), "Appointment #" # debug_show(id) # " status set to " # newStatus);
      };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func rescheduleAppointment(
    id : Nat,
    newDate : Text,
    newSlot : Text,
    newDoctorId : ?Nat,
  ) : async Common.Result<()> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: Login required");
    };
    if (newDate.size() == 0) { return #err("Date cannot be empty") };
    if (newSlot.size() == 0) { return #err("Slot cannot be empty") };
    let result = AppointmentLib.rescheduleAppointment(appointments, id, newDate, newSlot, newDoctorId);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "RESCHEDULE_APPOINTMENT",
          caller.toText(), "Appointment #" # debug_show(id) # " rescheduled to " # newDate # " " # newSlot);
      };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func deleteAppointment(
    id : Nat
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Admin only");
    };
    let result = AppointmentLib.deleteAppointment(appointments, id);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "DELETE_APPOINTMENT",
          caller.toText(), "Appointment #" # debug_show(id) # " deleted");
      };
      case (#err(_)) {};
    };
    result
  };

  public query func getAvailableSlots(
    date : Text,
    doctorId : ?Nat,
  ) : async [Text] {
    AppointmentLib.getAvailableSlots(appointments, doctors, date, doctorId)
  };
};
