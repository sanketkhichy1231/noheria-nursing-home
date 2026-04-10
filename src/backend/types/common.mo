module {
  public type Result<T> = { #ok : T; #err : Text };
  public type Timestamp = Int;
  public type UserId = Principal;
};
