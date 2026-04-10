import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import AnalyticsLib "../lib/analytics";
import AppointmentTypes "../types/appointments";
import DoctorTypes "../types/doctors";

mixin (
  accessControlState : AccessControl.AccessControlState,
  appointments : Map.Map<Nat, AppointmentTypes.Appointment>,
  doctors : Map.Map<Nat, DoctorTypes.Doctor>,
) {
  public query ({ caller }) func getAppointmentStats() : async AnalyticsLib.AppointmentSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return { total = 0; pending = 0; approved = 0; completed = 0; cancelled = 0 };
    };
    AnalyticsLib.getAppointmentStats(appointments)
  };

  public query ({ caller }) func getDoctorStats(
    doctorId : Nat
  ) : async DoctorTypes.AppointmentStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return { total = 0; accepted = 0; rejected = 0; completed = 0 };
    };
    AnalyticsLib.getDoctorStats(appointments, doctors, doctorId)
  };

  public query ({ caller }) func getAppointmentTrend(
    days : Nat
  ) : async [AnalyticsLib.TrendEntry] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return [];
    };
    AnalyticsLib.getAppointmentTrend(appointments, days)
  };
};
