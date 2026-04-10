module {
  public type AuditLog = {
    id : Nat;
    action : Text;
    userId : Text;
    timestamp : Int;
    details : Text;
  };
};
