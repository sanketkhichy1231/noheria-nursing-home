module {
  public type AvailabilitySlot = {
    dayOfWeek : Text;
    startHour : Nat;
    endHour : Nat;
  };

  public type AppointmentStats = {
    total : Nat;
    accepted : Nat;
    rejected : Nat;
    completed : Nat;
  };

  public type Doctor = {
    id : Nat;
    name : Text;
    specialization : Text;
    email : Text;
    phone : Text;
    availability : [AvailabilitySlot];
    status : Text;
    isOnline : Bool;
    lastLogin : Int;
    appointmentStats : AppointmentStats;
  };

  public type DoctorPublic = {
    id : Nat;
    name : Text;
    specialization : Text;
    email : Text;
    phone : Text;
    availability : [AvailabilitySlot];
    status : Text;
    isOnline : Bool;
  };
};
