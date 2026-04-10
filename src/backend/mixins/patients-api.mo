import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import PatientLib "../lib/patients";
import PatientTypes "../types/patients";
import AppointmentTypes "../types/appointments";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  patients : Map.Map<Nat, PatientTypes.Patient>,
  appointments : Map.Map<Nat, AppointmentTypes.Appointment>,
) {
  public query ({ caller }) func getPatients() : async [PatientTypes.Patient] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return [];
    };
    PatientLib.getPatients(patients)
  };

  public query ({ caller }) func getPatientHistory(
    patientId : Nat
  ) : async [AppointmentTypes.Appointment] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return [];
    };
    PatientLib.getPatientHistory(patients, appointments, patientId)
  };

  public query ({ caller }) func getPatientByPhone(
    phone : Text
  ) : async ?PatientTypes.Patient {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return null;
    };
    PatientLib.getPatientByPhone(patients, phone)
  };
};
