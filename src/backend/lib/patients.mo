import Map "mo:core/Map";
import Types "../types/patients";
import AppointmentTypes "../types/appointments";
import Common "../types/common";

module {
  public func getPatients(
    patients : Map.Map<Nat, Types.Patient>
  ) : [Types.Patient] {
    patients.values().toArray()
  };

  public func getPatientHistory(
    patients : Map.Map<Nat, Types.Patient>,
    appointments : Map.Map<Nat, AppointmentTypes.Appointment>,
    patientId : Nat,
  ) : [AppointmentTypes.Appointment] {
    switch (patients.get(patientId)) {
      case null { [] };
      case (?patient) {
        patient.appointmentIds.filterMap(func(aid : Nat) : ?AppointmentTypes.Appointment {
          appointments.get(aid)
        })
      };
    };
  };

  public func getPatientByPhone(
    patients : Map.Map<Nat, Types.Patient>,
    phone : Text,
  ) : ?Types.Patient {
    patients.values().find(func(p) { p.phone == phone })
  };

  public func upsertPatient(
    patients : Map.Map<Nat, Types.Patient>,
    nextId : { var val : Nat },
    name : Text,
    phone : Text,
    email : ?Text,
    appointmentId : Nat,
  ) : Nat {
    // Check if patient with this phone already exists
    let existing = patients.values().find(func(p) { p.phone == phone });
    switch (existing) {
      case (?patient) {
        // Append the new appointment ID if not already present
        let alreadyLinked = patient.appointmentIds.find(func(id : Nat) : Bool { id == appointmentId });
        switch (alreadyLinked) {
          case null {
            patients.add(patient.id, {
              patient with
              appointmentIds = patient.appointmentIds.concat([appointmentId])
            });
          };
          case (_) {};
        };
        patient.id
      };
      case null {
        let id = nextId.val;
        nextId.val := id + 1;
        patients.add(id, {
          id;
          name;
          phone;
          email;
          appointmentIds = [appointmentId];
        });
        id
      };
    };
  };
};
