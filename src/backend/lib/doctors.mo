import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/doctors";
import Common "../types/common";

module {
  let defaultStats : Types.AppointmentStats = {
    total = 0;
    accepted = 0;
    rejected = 0;
    completed = 0;
  };

  let defaultAvailability : [Types.AvailabilitySlot] = [
    { dayOfWeek = "Monday"; startHour = 9; endHour = 17 },
    { dayOfWeek = "Tuesday"; startHour = 9; endHour = 17 },
    { dayOfWeek = "Wednesday"; startHour = 9; endHour = 17 },
    { dayOfWeek = "Thursday"; startHour = 9; endHour = 17 },
    { dayOfWeek = "Friday"; startHour = 9; endHour = 17 },
    { dayOfWeek = "Saturday"; startHour = 9; endHour = 13 },
  ];

  public func seedSampleDoctors(
    doctors : Map.Map<Nat, Types.Doctor>,
    nextId : { var val : Nat },
  ) : () {
    if (not doctors.isEmpty()) { return };
    let id1 = nextId.val;
    nextId.val := id1 + 1;
    doctors.add(
      id1,
      {
        id = id1;
        name = "Dr. Sushma Noheria";
        specialization = "Gynecologist / Maternity";
        email = "sushma@noherianursinghome.com";
        phone = "";
        availability = defaultAvailability;
        status = "active";
        isOnline = true;
        lastLogin = Time.now();
        appointmentStats = defaultStats;
      },
    );
    let id2 = nextId.val;
    nextId.val := id2 + 1;
    doctors.add(
      id2,
      {
        id = id2;
        name = "Dr. V K Noheria";
        specialization = "Pediatrician";
        email = "vk@noherianursinghome.com";
        phone = "";
        availability = defaultAvailability;
        status = "active";
        isOnline = true;
        lastLogin = Time.now();
        appointmentStats = defaultStats;
      },
    );
  };

  public func addDoctor(
    doctors : Map.Map<Nat, Types.Doctor>,
    nextId : { var val : Nat },
    name : Text,
    specialization : Text,
    email : Text,
    phone : Text,
  ) : Common.Result<Nat> {
    if (name.size() == 0) { return #err("Name cannot be empty") };
    if (specialization.size() == 0) { return #err("Specialization cannot be empty") };
    let id = nextId.val;
    nextId.val := id + 1;
    doctors.add(
      id,
      {
        id;
        name;
        specialization;
        email;
        phone;
        availability = [];
        status = "active";
        isOnline = false;
        lastLogin = Time.now();
        appointmentStats = defaultStats;
      },
    );
    #ok(id)
  };

  public func editDoctor(
    doctors : Map.Map<Nat, Types.Doctor>,
    id : Nat,
    name : Text,
    specialization : Text,
    email : Text,
    phone : Text,
  ) : Common.Result<()> {
    switch (doctors.get(id)) {
      case null { #err("Doctor not found") };
      case (?doc) {
        doctors.add(id, { doc with name; specialization; email; phone });
        #ok(())
      };
    };
  };

  public func setDoctorAvailability(
    doctors : Map.Map<Nat, Types.Doctor>,
    doctorId : Nat,
    availability : [Types.AvailabilitySlot],
  ) : Common.Result<()> {
    switch (doctors.get(doctorId)) {
      case null { #err("Doctor not found") };
      case (?doc) {
        doctors.add(doctorId, { doc with availability });
        #ok(())
      };
    };
  };

  public func toggleDoctorOnlineStatus(
    doctors : Map.Map<Nat, Types.Doctor>,
    doctorId : Nat,
    isOnline : Bool,
  ) : Common.Result<()> {
    switch (doctors.get(doctorId)) {
      case null { #err("Doctor not found") };
      case (?doc) {
        doctors.add(doctorId, { doc with isOnline });
        #ok(())
      };
    };
  };

  public func getDoctors(
    doctors : Map.Map<Nat, Types.Doctor>
  ) : [Types.DoctorPublic] {
    doctors.values().map<Types.Doctor, Types.DoctorPublic>(func(doc) {
      {
        id = doc.id;
        name = doc.name;
        specialization = doc.specialization;
        email = doc.email;
        phone = doc.phone;
        availability = doc.availability;
        status = doc.status;
        isOnline = doc.isOnline;
      }
    }).toArray()
  };

  public func getDoctorById(
    doctors : Map.Map<Nat, Types.Doctor>,
    id : Nat,
  ) : ?Types.Doctor {
    doctors.get(id)
  };

  public func updateDoctorStats(
    doctors : Map.Map<Nat, Types.Doctor>,
    doctorId : Nat,
    newStatus : Text,
  ) : () {
    switch (doctors.get(doctorId)) {
      case null {};
      case (?doc) {
        let oldStats = doc.appointmentStats;
        let updatedStats : Types.AppointmentStats = switch (newStatus) {
          case ("approved") {
            { oldStats with total = oldStats.total + 1; accepted = oldStats.accepted + 1 }
          };
          case ("rejected") {
            { oldStats with total = oldStats.total + 1; rejected = oldStats.rejected + 1 }
          };
          case ("completed") {
            { oldStats with completed = oldStats.completed + 1 }
          };
          case (_) { oldStats };
        };
        doctors.add(doctorId, { doc with appointmentStats = updatedStats });
      };
    };
  };
};
