module {
  public type UserRole = { #admin; #doctor; #staff };

  public type UserProfile = {
    principal : Principal;
    name : Text;
    email : Text;
    role : UserRole;
    createdAt : Int;
  };
};
