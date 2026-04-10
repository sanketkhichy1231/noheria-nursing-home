import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Types "../types/auth";
import Common "../types/common";

module {
  public type UserProfile = Types.UserProfile;

  public func registerUser(
    profiles : Map.Map<Principal, Types.UserProfile>,
    principal : Principal,
    name : Text,
    email : Text,
    role : Types.UserRole,
  ) : Common.Result<()> {
    if (name.size() == 0) {
      return #err("Name cannot be empty");
    };
    let profile : Types.UserProfile = {
      principal;
      name;
      email;
      role;
      createdAt = Time.now();
    };
    profiles.add(principal, profile);
    #ok(())
  };

  public func getCurrentUser(
    profiles : Map.Map<Principal, Types.UserProfile>,
    principal : Principal,
  ) : ?Types.UserProfile {
    profiles.get(principal)
  };

  public func updateUserRole(
    profiles : Map.Map<Principal, Types.UserProfile>,
    adminPrincipal : Principal,
    targetPrincipal : Principal,
    newRole : Types.UserRole,
  ) : Common.Result<()> {
    switch (profiles.get(adminPrincipal)) {
      case null { #err("Admin user not found") };
      case (?admin) {
        switch (admin.role) {
          case (#admin) {
            switch (profiles.get(targetPrincipal)) {
              case null { #err("Target user not found") };
              case (?target) {
                profiles.add(targetPrincipal, { target with role = newRole });
                #ok(())
              };
            };
          };
          case (_) { #err("Unauthorized: Only admins can update roles") };
        };
      };
    };
  };
};
