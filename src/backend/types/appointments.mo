module {
  public type AppointmentStatus = {
    #pending;
    #approved;
    #rejected;
    #completed;
    #cancelled;
    #rescheduled;
  };

  public type Appointment = {
    id : Nat;
    patientName : Text;
    phone : Text;
    problem : Text;
    date : Text;
    slot : Text;
    doctorId : Nat;
    status : Text;
    notes : Text;
    createdAt : Int;
    updatedAt : Int;
  };
};
