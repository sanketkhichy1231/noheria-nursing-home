import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/appointments";
import DoctorTypes "../types/doctors";
import Common "../types/common";

module {
  let allSlots : [Text] = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  ];

  func isSlotBooked(
    appointments : Map.Map<Nat, Types.Appointment>,
    date : Text,
    slot : Text,
    doctorId : Nat,
  ) : Bool {
    appointments.any(func(_, appt) {
      appt.date == date and appt.slot == slot and appt.doctorId == doctorId
        and appt.status != "cancelled" and appt.status != "rejected"
    })
  };

  func findAvailableDoctor(
    appointments : Map.Map<Nat, Types.Appointment>,
    doctors : Map.Map<Nat, DoctorTypes.Doctor>,
    date : Text,
    slot : Text,
  ) : ?Nat {
    var found : ?Nat = null;
    label search for ((id, doc) in doctors.entries()) {
      if (doc.status == "active" and not isSlotBooked(appointments, date, slot, id)) {
        found := ?id;
        break search;
      };
    };
    found
  };

  public func createAppointment(
    appointments : Map.Map<Nat, Types.Appointment>,
    doctors : Map.Map<Nat, DoctorTypes.Doctor>,
    nextId : { var val : Nat },
    patientName : Text,
    phone : Text,
    problem : Text,
    date : Text,
    slot : Text,
    doctorId : ?Nat,
  ) : Common.Result<Nat> {
    if (patientName.size() == 0) { return #err("Patient name cannot be empty") };
    if (phone.size() == 0) { return #err("Phone cannot be empty") };
    if (date.size() == 0) { return #err("Date cannot be empty") };
    if (slot.size() == 0) { return #err("Slot cannot be empty") };

    let validSlot = allSlots.find(func(s : Text) : Bool { s == slot });
    switch (validSlot) {
      case null { return #err("Invalid time slot") };
      case (_) {};
    };

    let resolvedDoctorId : Nat = switch (doctorId) {
      case (?did) {
        switch (doctors.get(did)) {
          case null { return #err("Doctor not found") };
          case (?_) {
            if (isSlotBooked(appointments, date, slot, did)) {
              return #err("Selected slot is already booked for this doctor");
            };
            did
          };
        };
      };
      case null {
        switch (findAvailableDoctor(appointments, doctors, date, slot)) {
          case null { return #err("No available doctor for this slot") };
          case (?did) { did };
        };
      };
    };

    let id = nextId.val;
    nextId.val := id + 1;
    let now = Time.now();
    appointments.add(
      id,
      {
        id;
        patientName;
        phone;
        problem;
        date;
        slot;
        doctorId = resolvedDoctorId;
        status = "pending";
        notes = "";
        createdAt = now;
        updatedAt = now;
      },
    );
    #ok(id)
  };

  public func getAppointments(
    appointments : Map.Map<Nat, Types.Appointment>,
    statusFilter : ?Text,
    doctorIdFilter : ?Nat,
  ) : [Types.Appointment] {
    appointments.values().filter(func(appt) {
      let statusMatch = switch (statusFilter) {
        case null { true };
        case (?s) { appt.status == s };
      };
      let doctorMatch = switch (doctorIdFilter) {
        case null { true };
        case (?did) { appt.doctorId == did };
      };
      statusMatch and doctorMatch
    }).toArray()
  };

  public func getAppointmentsByDoctor(
    appointments : Map.Map<Nat, Types.Appointment>,
    doctorId : Nat,
  ) : [Types.Appointment] {
    appointments.values().filter(func(appt) { appt.doctorId == doctorId }).toArray()
  };

  public func updateAppointmentStatus(
    appointments : Map.Map<Nat, Types.Appointment>,
    id : Nat,
    newStatus : Text,
    notes : ?Text,
  ) : Common.Result<()> {
    switch (appointments.get(id)) {
      case null { #err("Appointment not found") };
      case (?appt) {
        let updatedNotes = switch (notes) {
          case null { appt.notes };
          case (?n) { n };
        };
        appointments.add(id, { appt with status = newStatus; notes = updatedNotes; updatedAt = Time.now() });
        #ok(())
      };
    };
  };

  public func rescheduleAppointment(
    appointments : Map.Map<Nat, Types.Appointment>,
    id : Nat,
    newDate : Text,
    newSlot : Text,
    newDoctorId : ?Nat,
  ) : Common.Result<()> {
    switch (appointments.get(id)) {
      case null { #err("Appointment not found") };
      case (?appt) {
        let resolvedDoctorId = switch (newDoctorId) {
          case null { appt.doctorId };
          case (?did) { did };
        };
        if (isSlotBooked(appointments, newDate, newSlot, resolvedDoctorId)) {
          return #err("New slot is already booked for the doctor");
        };
        appointments.add(id, {
          appt with
          date = newDate;
          slot = newSlot;
          doctorId = resolvedDoctorId;
          status = "rescheduled";
          updatedAt = Time.now();
        });
        #ok(())
      };
    };
  };

  public func deleteAppointment(
    appointments : Map.Map<Nat, Types.Appointment>,
    id : Nat,
  ) : Common.Result<()> {
    switch (appointments.get(id)) {
      case null { #err("Appointment not found") };
      case (?_) {
        appointments.remove(id);
        #ok(())
      };
    };
  };

  public func getAvailableSlots(
    appointments : Map.Map<Nat, Types.Appointment>,
    doctors : Map.Map<Nat, DoctorTypes.Doctor>,
    date : Text,
    doctorId : ?Nat,
  ) : [Text] {
    switch (doctorId) {
      case (?did) {
        allSlots.filter(func(slot : Text) : Bool {
          not isSlotBooked(appointments, date, slot, did)
        })
      };
      case null {
        // Return slots where at least one doctor is available
        allSlots.filter(func(slot : Text) : Bool {
          doctors.any(func(_, doc) {
            doc.status == "active" and not isSlotBooked(appointments, date, slot, doc.id)
          })
        })
      };
    };
  };
};
