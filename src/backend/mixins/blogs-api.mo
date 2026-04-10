import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import BlogLib "../lib/blogs";
import AuditLib "../lib/audit";
import BlogTypes "../types/blogs";
import AuditTypes "../types/audit";
import Common "../types/common";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  blogs : Map.Map<Nat, BlogTypes.Blog>,
  nextBlogId : { var val : Nat },
  auditLogs : List.List<AuditTypes.AuditLog>,
  nextAuditId : { var val : Nat },
) {
  public shared ({ caller }) func createBlog(
    title : Text,
    content : Text,
    imageUrl : Text,
    blogType : Text,
  ) : async Common.Result<Nat> {
    // Must be admin
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can create blogs");
    };
    let result = BlogLib.createBlog(blogs, nextBlogId, caller, title, content, imageUrl, blogType);
    switch (result) {
      case (#ok(id)) {
        AuditLib.logAction(auditLogs, nextAuditId, "blog_created", caller.toText(), "Blog id=" # id.toText() # " title=" # title);
      };
      case _ {};
    };
    result;
  };

  public shared ({ caller }) func editBlog(
    id : Nat,
    title : Text,
    content : Text,
    imageUrl : Text,
    blogType : Text,
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can edit blogs");
    };
    let result = BlogLib.editBlog(blogs, caller, id, title, content, imageUrl, blogType);
    switch (result) {
      case (#ok()) {
        AuditLib.logAction(auditLogs, nextAuditId, "blog_edited", caller.toText(), "Blog id=" # id.toText());
      };
      case _ {};
    };
    result;
  };

  public shared ({ caller }) func deleteBlog(id : Nat) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can delete blogs");
    };
    let result = BlogLib.deleteBlog(blogs, id);
    switch (result) {
      case (#ok()) {
        AuditLib.logAction(auditLogs, nextAuditId, "blog_deleted", caller.toText(), "Blog id=" # id.toText());
      };
      case _ {};
    };
    result;
  };

  public shared ({ caller }) func publishBlog(id : Nat) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can publish blogs");
    };
    let result = BlogLib.publishBlog(blogs, id);
    switch (result) {
      case (#ok()) {
        AuditLib.logAction(auditLogs, nextAuditId, "blog_published", caller.toText(), "Blog id=" # id.toText());
      };
      case _ {};
    };
    result;
  };

  public shared ({ caller }) func unpublishBlog(id : Nat) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can unpublish blogs");
    };
    let result = BlogLib.unpublishBlog(blogs, id);
    switch (result) {
      case (#ok()) {
        AuditLib.logAction(auditLogs, nextAuditId, "blog_unpublished", caller.toText(), "Blog id=" # id.toText());
      };
      case _ {};
    };
    result;
  };

  public query func getPublishedBlogs() : async [BlogTypes.Blog] {
    BlogLib.getPublishedBlogs(blogs);
  };

  public query ({ caller }) func getAllBlogs() : async [BlogTypes.Blog] {
    BlogLib.getAllBlogs(blogs);
  };
};
