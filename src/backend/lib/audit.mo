import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/audit";

module {
  public func logAction(
    logs : List.List<Types.AuditLog>,
    nextId : { var val : Nat },
    action : Text,
    userId : Text,
    details : Text,
  ) : () {
    let id = nextId.val;
    nextId.val := id + 1;
    logs.add({
      id;
      action;
      userId;
      timestamp = Time.now();
      details;
    });
  };

  public func getAuditLogs(
    logs : List.List<Types.AuditLog>
  ) : [Types.AuditLog] {
    logs.toArray()
  };

  public func getAuditLogsByUser(
    logs : List.List<Types.AuditLog>,
    userId : Text,
  ) : [Types.AuditLog] {
    logs.filter(func(log) { log.userId == userId }).toArray()
  };
};
