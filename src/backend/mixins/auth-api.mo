import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import AuthLib "../lib/auth";
import AuditLib "../lib/audit";
import AuthTypes "../types/auth";
import AuditTypes "../types/audit";
import Common "../types/common";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Principal, AuthTypes.UserProfile>,
  auditLogs : List.List<AuditTypes.AuditLog>,
  nextAuditId : { var val : Nat },
) {
  public shared ({ caller }) func registerUser(
    principal : Principal,
    name : Text,
    email : Text,
    role : AuthTypes.UserRole,
  ) : async Common.Result<()> {
    // Only admin can register users with specific roles; anyone can self-register as staff
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    if (caller != principal and not isAdmin) {
      return #err("Unauthorized: Cannot register other users");
    };
    let result = AuthLib.registerUser(userProfiles, principal, name, email, role);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "USER_REGISTERED", caller.toText(), "Registered user: " # name);
      };
      case (#err(_)) {};
    };
    result
  };

  public query ({ caller }) func getCurrentUser() : async ?AuthTypes.UserProfile {
    AuthLib.getCurrentUser(userProfiles, caller)
  };

  public shared ({ caller }) func updateUserRole(
    targetPrincipal : Principal,
    newRole : AuthTypes.UserRole,
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: Only admins can update roles");
    };
    let result = AuthLib.updateUserRole(userProfiles, caller, targetPrincipal, newRole);
    switch (result) {
      case (#ok(_)) {
        AuditLib.logAction(auditLogs, nextAuditId, "ROLE_UPDATED", caller.toText(), "Updated role for: " # targetPrincipal.toText());
      };
      case (#err(_)) {};
    };
    result
  };

  public query ({ caller }) func getCallerUserProfile() : async ?AuthTypes.UserProfile {
    AuthLib.getCurrentUser(userProfiles, caller)
  };

  public shared ({ caller }) func saveCallerUserProfile(
    name : Text,
    email : Text,
  ) : async Common.Result<()> {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      return #err("Unauthorized: Must be logged in to save profile");
    };
    let existing = AuthLib.getCurrentUser(userProfiles, caller);
    let role : AuthTypes.UserRole = switch (existing) {
      case (?p) { p.role };
      case null { #staff };
    };
    let _ = AuthLib.registerUser(userProfiles, caller, name, email, role);
    AuditLib.logAction(auditLogs, nextAuditId, "PROFILE_SAVED", caller.toText(), "Saved profile for: " # name);
    #ok(())
  };
};
