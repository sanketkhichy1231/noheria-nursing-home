import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Types "../types/blogs";
import Common "../types/common";

module {
  public func createBlog(
    blogs : Map.Map<Nat, Types.Blog>,
    nextId : { var val : Nat },
    caller : Principal,
    title : Text,
    content : Text,
    imageUrl : Text,
    blogType : Text,
  ) : Common.Result<Nat> {
    let id = nextId.val;
    nextId.val := id + 1;
    let now = Time.now();
    let blog : Types.Blog = {
      id;
      title;
      content;
      imageUrl;
      blogType;
      status = "draft";
      authorId = caller.toText();
      createdAt = now;
      updatedAt = now;
    };
    blogs.add(id, blog);
    #ok(id);
  };

  public func editBlog(
    blogs : Map.Map<Nat, Types.Blog>,
    _caller : Principal,
    id : Nat,
    title : Text,
    content : Text,
    imageUrl : Text,
    blogType : Text,
  ) : Common.Result<()> {
    switch (blogs.get(id)) {
      case null { #err("Blog not found") };
      case (?blog) {
        if (blog.status == "deleted") {
          #err("Cannot edit a deleted blog");
        } else {
          blogs.add(id, { blog with title; content; imageUrl; blogType; updatedAt = Time.now() });
          #ok(());
        };
      };
    };
  };

  public func deleteBlog(
    blogs : Map.Map<Nat, Types.Blog>,
    id : Nat,
  ) : Common.Result<()> {
    switch (blogs.get(id)) {
      case null { #err("Blog not found") };
      case (?blog) {
        blogs.add(id, { blog with status = "deleted"; updatedAt = Time.now() });
        #ok(());
      };
    };
  };

  public func publishBlog(
    blogs : Map.Map<Nat, Types.Blog>,
    id : Nat,
  ) : Common.Result<()> {
    switch (blogs.get(id)) {
      case null { #err("Blog not found") };
      case (?blog) {
        if (blog.status == "deleted") {
          #err("Cannot publish a deleted blog");
        } else {
          blogs.add(id, { blog with status = "published"; updatedAt = Time.now() });
          #ok(());
        };
      };
    };
  };

  public func unpublishBlog(
    blogs : Map.Map<Nat, Types.Blog>,
    id : Nat,
  ) : Common.Result<()> {
    switch (blogs.get(id)) {
      case null { #err("Blog not found") };
      case (?blog) {
        if (blog.status == "deleted") {
          #err("Cannot unpublish a deleted blog");
        } else {
          blogs.add(id, { blog with status = "draft"; updatedAt = Time.now() });
          #ok(());
        };
      };
    };
  };

  public func getPublishedBlogs(
    blogs : Map.Map<Nat, Types.Blog>
  ) : [Types.Blog] {
    blogs.values()
      .filter(func(b : Types.Blog) : Bool { b.status == "published" })
      .toArray();
  };

  public func getAllBlogs(
    blogs : Map.Map<Nat, Types.Blog>
  ) : [Types.Blog] {
    blogs.values()
      .filter(func(b : Types.Blog) : Bool { b.status != "deleted" })
      .toArray();
  };

  // Seed sample blogs (called once at init time)
  public func seedBlogs(
    blogs : Map.Map<Nat, Types.Blog>,
    nextId : { var val : Nat },
  ) {
    let now = Time.now();
    let sample1 : Types.Blog = {
      id = nextId.val;
      title = "Maternity Care: What to Expect During Your Pregnancy Journey";
      content = "Pregnancy is one of the most beautiful experiences in life. At Noheria Nursing Home, we provide comprehensive maternity care throughout all trimesters. Regular prenatal checkups help monitor both mother and baby health. Our experienced team of gynecologists ensures safe delivery through both normal and assisted methods. Nutrition guidance, birth planning, and postpartum support are all part of our holistic maternity program. We encourage expecting mothers to attend our free prenatal classes every Saturday morning.";
      imageUrl = "";
      blogType = "blog";
      status = "published";
      authorId = "admin";
      createdAt = now;
      updatedAt = now;
    };
    blogs.add(nextId.val, sample1);
    nextId.val := nextId.val + 1;

    let sample2 : Types.Blog = {
      id = nextId.val;
      title = "Pediatric Health: Keeping Your Child Healthy from Birth to Adolescence";
      content = "Children's health requires special attention at every stage of development. At Noheria Nursing Home, our pediatric department specializes in newborn care, vaccinations, developmental assessments, and treatment of childhood illnesses. We follow the National Immunization Schedule to ensure your child receives all essential vaccines on time. Our pediatricians are trained in neonatal intensive care and handle premature births with great expertise. Early detection of developmental delays, nutritional deficiencies, and common childhood conditions is key to ensuring a healthy future for your child.";
      imageUrl = "";
      blogType = "blog";
      status = "published";
      authorId = "admin";
      createdAt = now;
      updatedAt = now;
    };
    blogs.add(nextId.val, sample2);
    nextId.val := nextId.val + 1;
  };
};
