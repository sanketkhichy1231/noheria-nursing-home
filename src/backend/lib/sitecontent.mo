import Types "../types/sitecontent";
import Common "../types/common";

module {
  public func getSiteContent(
    content : { var val : Types.SiteContent }
  ) : Types.SiteContent {
    content.val;
  };

  public func updateHeroSection(
    content : { var val : Types.SiteContent },
    heroTitle : Text,
    heroTagline : Text,
    heroIntro : Text,
    heroCtaText : Text,
  ) : Common.Result<()> {
    content.val := { content.val with heroTitle; heroTagline; heroIntro; heroCtaText };
    #ok(());
  };

  public func updateServices(
    content : { var val : Types.SiteContent },
    services : [Types.ServiceCard],
  ) : Common.Result<()> {
    content.val := { content.val with services };
    #ok(());
  };

  public func updateTestimonials(
    content : { var val : Types.SiteContent },
    testimonials : [Types.Testimonial],
  ) : Common.Result<()> {
    content.val := { content.val with testimonials };
    #ok(());
  };

  public func updateFAQs(
    content : { var val : Types.SiteContent },
    faqs : [Types.FAQ],
  ) : Common.Result<()> {
    content.val := { content.val with faqs };
    #ok(());
  };

  public func updateContactInfo(
    content : { var val : Types.SiteContent },
    address : Text,
    phone : Text,
    email : Text,
    hours : Text,
    mapUrl : Text,
  ) : Common.Result<()> {
    content.val := { content.val with contactInfo = { address; phone; email; hours; mapUrl } };
    #ok(());
  };

  // Returns default rich site content for Noheria Nursing Home
  public func defaultSiteContent() : Types.SiteContent {
    {
      heroTitle = "Noheria Nursing Home";
      heroTagline = "30+ Years of Excellence in Maternity & Child Care";
      heroIntro = "Noheria Nursing Home has been serving families in Panchkula and surrounding areas since 1994. Established with a vision to provide compassionate, high-quality medical care, we specialize in maternity services, normal delivery, neonatal care, and comprehensive pediatric health. Our state-of-the-art facility in Sector 16, Panchkula is staffed by experienced doctors and dedicated healthcare professionals committed to your family's wellbeing.";
      heroCtaText = "Book an Appointment";
      services = [
        { id = 1; title = "Maternity Care"; description = "Comprehensive prenatal, antenatal, and postnatal care for expecting mothers. Regular checkups, nutrition guidance, and birth planning by expert gynecologists."; icon = "baby"; order = 1 },
        { id = 2; title = "Normal Delivery"; description = "Safe, natural childbirth supported by experienced obstetricians and trained nursing staff. We prioritize the health and comfort of both mother and newborn."; icon = "heart"; order = 2 },
        { id = 3; title = "Neonatal Care"; description = "Specialized care for newborns including premature babies. Our NICU-equipped unit handles critical neonatal conditions with round-the-clock monitoring."; icon = "shield"; order = 3 },
        { id = 4; title = "Pediatric Care"; description = "Complete child healthcare from birth to adolescence — vaccinations, developmental assessments, illness treatment, and growth monitoring."; icon = "stethoscope"; order = 4 },
        { id = 5; title = "24x7 Emergency"; description = "Emergency medical services available around the clock. Our rapid response team is always ready to handle obstetric and pediatric emergencies."; icon = "ambulance"; order = 5 },
      ];
      testimonials = [
        { id = 1; name = "Priya Sharma"; role = "Mother of two"; text = "Noheria Nursing Home gave me the most wonderful birthing experience. The staff was extremely caring and the doctors were professional throughout my pregnancy. I highly recommend them to every expecting mother in Panchkula."; rating = 5 },
        { id = 2; name = "Rajesh Kumar"; role = "Parent"; text = "Our newborn required NICU care and the team at Noheria acted with incredible speed and expertise. The nurses kept us informed at every step. We are forever grateful for saving our baby's life."; rating = 5 },
      ];
      faqs = [
        { id = 1; question = "What services does Noheria Nursing Home offer?"; answer = "We specialize in maternity care, normal delivery, neonatal and NICU care, comprehensive pediatric health, and 24x7 emergency services. Our team of expert gynecologists and pediatricians serves families across Panchkula."; order = 1 },
        { id = 2; question = "How can I book an appointment?"; answer = "You can book an appointment online through our website or call us directly at our front desk. Walk-in appointments are also welcome during our regular working hours."; order = 2 },
        { id = 3; question = "What are your working hours?"; answer = "Our OPD is open Monday to Saturday from 9:00 AM to 8:00 PM. Emergency services are available 24 hours a day, 7 days a week."; order = 3 },
        { id = 4; question = "Do you have facilities for high-risk pregnancies?"; answer = "Yes, we are fully equipped to manage high-risk pregnancies. Our experienced team handles complications with care and has access to advanced monitoring equipment and an NICU for critical neonatal care."; order = 4 },
        { id = 5; question = "Where are you located?"; answer = "We are located at SCO 10, Sector 16, Panchkula, Haryana. We are easily accessible by road and have ample parking available for patients and their families."; order = 5 },
      ];
      contactInfo = {
        address = "SCO 10, Sector 16, Panchkula, Haryana - 134113";
        phone = "+91-172-2560000";
        email = "info@noherianursinghome.com";
        hours = "OPD: Mon-Sat 9:00 AM - 8:00 PM | Emergency: 24x7";
        mapUrl = "https://maps.google.com/?q=SCO+10+Sector+16+Panchkula+Haryana";
      };
    };
  };
};
