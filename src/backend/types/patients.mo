module {
  public type Patient = {
    id : Nat;
    name : Text;
    phone : Text;
    email : ?Text;
    appointmentIds : [Nat];
  };
};
