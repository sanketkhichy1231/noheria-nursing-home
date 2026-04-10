import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import AuditLib "../lib/audit";
import AuditTypes "../types/audit";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  auditLogs : List.List<AuditTypes.AuditLog>,
) {
  public query ({ caller }) func getAuditLogs() : async [AuditTypes.AuditLog] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return [];
    };
    AuditLib.getAuditLogs(auditLogs)
  };

  public query ({ caller }) func getAuditLogsByUser(
    userId : Text
  ) : async [AuditTypes.AuditLog] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return [];
    };
    AuditLib.getAuditLogsByUser(auditLogs, userId)
  };
};
