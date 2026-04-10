import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import SiteContentLib "../lib/sitecontent";
import AuditLib "../lib/audit";
import SiteContentTypes "../types/sitecontent";
import AuditTypes "../types/audit";
import Common "../types/common";
import List "mo:core/List";

mixin (
  accessControlState : AccessControl.AccessControlState,
  siteContent : { var val : SiteContentTypes.SiteContent },
  auditLogs : List.List<AuditTypes.AuditLog>,
  nextAuditId : { var val : Nat },
) {
  public query func getSiteContent() : async SiteContentTypes.SiteContent {
    SiteContentLib.getSiteContent(siteContent);
  };

  public shared ({ caller }) func updateHeroSection(
    heroTitle : Text,
    heroTagline : Text,
    heroIntro : Text,
    heroCtaText : Text,
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can update site content");
    };
    let result = SiteContentLib.updateHeroSection(siteContent, heroTitle, heroTagline, heroIntro, heroCtaText);
    AuditLib.logAction(auditLogs, nextAuditId, "site_content_updated", caller.toText(), "Hero section updated");
    result;
  };

  public shared ({ caller }) func updateServices(
    services : [SiteContentTypes.ServiceCard]
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can update site content");
    };
    let result = SiteContentLib.updateServices(siteContent, services);
    AuditLib.logAction(auditLogs, nextAuditId, "site_content_updated", caller.toText(), "Services updated");
    result;
  };

  public shared ({ caller }) func updateTestimonials(
    testimonials : [SiteContentTypes.Testimonial]
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can update site content");
    };
    let result = SiteContentLib.updateTestimonials(siteContent, testimonials);
    AuditLib.logAction(auditLogs, nextAuditId, "site_content_updated", caller.toText(), "Testimonials updated");
    result;
  };

  public shared ({ caller }) func updateFAQs(
    faqs : [SiteContentTypes.FAQ]
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can update site content");
    };
    let result = SiteContentLib.updateFAQs(siteContent, faqs);
    AuditLib.logAction(auditLogs, nextAuditId, "site_content_updated", caller.toText(), "FAQs updated");
    result;
  };

  public shared ({ caller }) func updateContactInfo(
    address : Text,
    phone : Text,
    email : Text,
    hours : Text,
    mapUrl : Text,
  ) : async Common.Result<()> {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      return #err("Unauthorized: only admin can update site content");
    };
    let result = SiteContentLib.updateContactInfo(siteContent, address, phone, email, hours, mapUrl);
    AuditLib.logAction(auditLogs, nextAuditId, "site_content_updated", caller.toText(), "Contact info updated");
    result;
  };
};
