import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import DoctorLib "../lib/doctors";
import AuditLib "../lib/audit";
import DoctorTypes "../types/doctors";
import AuditTypes "../types/audit";
import Common "../types/common";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  doctors : Map.Map<Nat, DoctorTypes.Doctor>,
  nextDoctorId : { var val : Nat },
  auditLogs : List.List<AuditTypes.AuditLog>,
  nextAuditId : { var val : Nat },
) {
  // Seed sample doctors on first access
  DoctorLib.seedSampleDoctors(doctors, nextDoctorId);

  public shared ({ caller }) func addDoctor(
    name : Text,
    specialization : Text,
    email : Text,
    phone : Text,
  ) : async Common.Result<Nat> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Only admins can add doctors");
    };
    let result = DoctorLib.addDoctor(doctors, nextDoctorId, name, specialization, email, phone);
    switch (result) {
      case (#ok(id)) {
        AuditLib.logAction(auditLogs, nextAuditId, "DOCTOR_ADDED", caller.toText(), "Added doctor: " # name # " (id=" # debug_show(id) # ")");
      };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func editDoctor(
    id : Nat,
    name : Text,
    specialization : Text,
    email : Text,
    phone : Text,
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Only admins can edit doctors");
    };
    let result = DoctorLib.editDoctor(doctors, id, name, specialization, email, phone);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "DOCTOR_EDITED", caller.toText(), "Edited doctor id=" # debug_show(id));
      };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func setDoctorAvailability(
    doctorId : Nat,
    availability : [DoctorTypes.AvailabilitySlot],
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Only admins can set doctor availability");
    };
    let result = DoctorLib.setDoctorAvailability(doctors, doctorId, availability);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "DOCTOR_AVAILABILITY_SET", caller.toText(), "Set availability for doctor id=" # debug_show(doctorId));
      };
      case (#err(_)) {};
    };
    result
  };

  public shared ({ caller }) func toggleDoctorOnlineStatus(
    doctorId : Nat,
    isOnline : Bool,
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Only admins can toggle doctor status");
    };
    let result = DoctorLib.toggleDoctorOnlineStatus(doctors, doctorId, isOnline);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "DOCTOR_STATUS_TOGGLED", caller.toText(), "Toggled online status for doctor id=" # debug_show(doctorId) # " to " # debug_show(isOnline));
      };
      case (#err(_)) {};
    };
    result
  };

  public query func getDoctors() : async [DoctorTypes.DoctorPublic] {
    DoctorLib.getDoctors(doctors)
  };

  public query func getDoctorById(id : Nat) : async ?DoctorTypes.Doctor {
    DoctorLib.getDoctorById(doctors, id)
  };
};
