module {
  public type ServiceCard = {
    id : Nat;
    title : Text;
    description : Text;
    icon : Text;
    order : Nat;
  };

  public type Testimonial = {
    id : Nat;
    name : Text;
    role : Text;
    text : Text;
    rating : Nat;
  };

  public type FAQ = {
    id : Nat;
    question : Text;
    answer : Text;
    order : Nat;
  };

  public type ContactInfo = {
    address : Text;
    phone : Text;
    email : Text;
    hours : Text;
    mapUrl : Text;
  };

  public type SiteContent = {
    heroTitle : Text;
    heroTagline : Text;
    heroIntro : Text;
    heroCtaText : Text;
    services : [ServiceCard];
    testimonials : [Testimonial];
    faqs : [FAQ];
    contactInfo : ContactInfo;
  };
};
