import Map "mo:core/Map";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import AppointmentTypes "../types/appointments";
import DoctorTypes "../types/doctors";

module {
  public type AppointmentSummary = {
    total : Nat;
    pending : Nat;
    approved : Nat;
    completed : Nat;
    cancelled : Nat;
  };

  public type TrendEntry = {
    date : Text;
    count : Nat;
  };

  public func getAppointmentStats(
    appointments : Map.Map<Nat, AppointmentTypes.Appointment>
  ) : AppointmentSummary {
    var total = 0;
    var pending = 0;
    var approved = 0;
    var completed = 0;
    var cancelled = 0;

    appointments.values().forEach(func(a : AppointmentTypes.Appointment) {
      total += 1;
      if (a.status == "pending") { pending += 1 }
      else if (a.status == "approved") { approved += 1 }
      else if (a.status == "completed") { completed += 1 }
      else if (a.status == "cancelled") { cancelled += 1 };
    });

    { total; pending; approved; completed; cancelled };
  };

  public func getDoctorStats(
    appointments : Map.Map<Nat, AppointmentTypes.Appointment>,
    _doctors : Map.Map<Nat, DoctorTypes.Doctor>,
    doctorId : Nat,
  ) : DoctorTypes.AppointmentStats {
    var total = 0;
    var accepted = 0;
    var rejected = 0;
    var completed = 0;

    appointments.values().forEach(func(a : AppointmentTypes.Appointment) {
      if (a.doctorId == doctorId) {
        total += 1;
        if (a.status == "approved") { accepted += 1 }
        else if (a.status == "rejected") { rejected += 1 }
        else if (a.status == "completed") { completed += 1 };
      };
    });

    { total; accepted; rejected; completed };
  };

  // Returns appointment counts per day for the last N days.
  // Uses ISO date strings (YYYY-MM-DD) derived from appointment.date field.
  public func getAppointmentTrend(
    appointments : Map.Map<Nat, AppointmentTypes.Appointment>,
    days : Nat,
  ) : [TrendEntry] {
    // Build a map of date -> count from existing appointments
    let dateCountMap = Map.empty<Text, Nat>();

    appointments.values().forEach(func(a : AppointmentTypes.Appointment) {
      // appointment.date is stored as a date string (YYYY-MM-DD)
      let existing = switch (dateCountMap.get(a.date)) {
        case null 0;
        case (?n) n;
      };
      dateCountMap.add(a.date, existing + 1);
    });

    // Return all unique dates found (sorted entries from the map)
    let result = dateCountMap.entries()
      .map(func((date, count) : (Text, Nat)) : TrendEntry { { date; count } })
      .toArray();

    // Return up to `days` most recent entries — since we don't have a date library,
    // we rely on lexicographic sort of YYYY-MM-DD strings (ISO format sorts correctly)
    let sorted = result.sort(func(a : TrendEntry, b : TrendEntry) : { #less; #equal; #greater } {
      b.date.compare(a.date) // descending
    });

    if (sorted.size() <= days) { sorted }
    else { sorted.sliceToArray(0, days.toInt()) };
  };
};
