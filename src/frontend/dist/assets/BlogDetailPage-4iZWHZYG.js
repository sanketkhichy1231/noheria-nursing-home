import { u as useParams, j as jsxRuntimeExports, L as Link } from "./index-b-kEL4Ku.js";
import { B as Badge } from "./badge-Cp-Au3f2.js";
import { B as Button } from "./button-P341Onhk.js";
import { C as Card, a as CardContent } from "./card-BQUDAgz6.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { a as useBlogById, u as usePublishedBlogs } from "./useBlogs-BPpLHOEo.js";
import { B as BookOpen, V as Video } from "./video-ClyrRza8.js";
import { A as ArrowLeft } from "./arrow-left-BvbUOs73.js";
import { m as motion, C as Clock } from "./proxy-BI_OhE29.js";
import { C as CalendarDays } from "./calendar-days-DEH2PRyn.js";
import { C as ChevronRight } from "./chevron-right-CHVKFiID.js";
import "./useMutation-DbJwC5eP.js";
function estimateReadTime(html) {
  const words = html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
function formatDate(timestamp) {
  return new Date(Number(timestamp) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
function getInitials(str) {
  return str.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
function BlogDetailPage() {
  const params = useParams({ strict: false });
  const blogId = params.id ? BigInt(params.id) : null;
  const { data: blog } = useBlogById(blogId);
  const { data: allBlogs, isLoading: blogsLoading } = usePublishedBlogs();
  const related = (allBlogs ?? []).filter((b) => b.id !== blogId && b.blogType === ((blog == null ? void 0 : blog.blogType) ?? "")).slice(0, 3);
  if (!blog && !blogsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
        style: { background: "#0f1624" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-14 h-14 text-white/20 mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-white mb-2", children: "Article Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 mb-6", children: "This article may have been removed or is unavailable." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-[#dc2626] hover:bg-[#e11d48] text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
            " Back to Home"
          ] }) })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "#0f1624" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-[#151e30] border-b border-white/8", children: [
      (blog == null ? void 0 : blog.imageUrl) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-72 md:h-96 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: blog.imageUrl,
            alt: blog.title,
            className: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0f1624] via-[#0f1624]/60 to-transparent" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 bg-gradient-to-br from-[#dc2626]/15 to-[#151e30]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 pb-10 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-2 text-white/50 hover:text-[#e11d48] text-sm transition-colors",
            "data-ocid": "back-to-home",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
              " Back to Home"
            ]
          }
        ) }),
        blog ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${blog.blogType === "Video" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30"}`,
                    children: blog.blogType === "Video" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-3 h-3 mr-1" }),
                      "Video"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3 mr-1" }),
                      "Article"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/40 text-xs flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
                  formatDate(blog.createdAt)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/40 text-xs flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                  estimateReadTime(blog.content),
                  " min read"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl", children: blog.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#dc2626]/25 flex items-center justify-center text-[#e11d48] font-bold text-sm shrink-0", children: blog.authorId ? getInitials(blog.authorId) : "NH" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold", children: "Noheria Medical Team" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: "Noheria Nursing Home, Panchkula" })
                ] })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-40 bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-3/4 bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-2/3 bg-white/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-44 bg-white/5" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "lg:col-span-2", children: blog ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.7, delay: 0.2 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-headings:font-display prose-a:text-[#e11d48] prose-strong:text-white prose-li:text-white/70 max-w-none text-base leading-relaxed",
                dangerouslySetInnerHTML: { __html: blog.content }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-sm", children: "Category:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30", children: blog.blogType })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "inline-flex items-center gap-2 px-5 py-2.5 bg-[#dc2626] hover:bg-[#e11d48] text-white rounded-lg text-sm font-semibold transition-smooth",
                  "data-ocid": "blog-book-appointment",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
                    " Book Appointment"
                  ]
                }
              ) })
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["bl1", "bl2", "bl3", "bl4", "bl5", "bl6", "bl7", "bl8"].map(
        (k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: `h-4 bg-white/5 ${i % 3 === 2 ? "w-3/4" : "w-full"}`
          },
          k
        )
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-white mb-4", children: "Related Articles" }),
        blogsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["r1", "r2", "r3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl bg-white/5" }, k)) }) : related.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm", children: "No related articles yet." }) : related.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "bg-[#1a2035] border-white/8 hover:border-[#dc2626]/40 transition-smooth group",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-[10px] ${b.blogType === "Video" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30"}`,
                    children: b.blogType
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/35 text-[10px]", children: formatDate(b.createdAt) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white text-sm font-semibold mb-2 line-clamp-2 group-hover:text-[#e11d48] transition-colors", children: b.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/blog/$id",
                  params: { id: b.id.toString() },
                  className: "inline-flex items-center gap-1 text-[#e11d48] text-xs font-semibold",
                  "data-ocid": `related-blog-${b.id}`,
                  children: [
                    "Read ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                  ]
                }
              )
            ] })
          },
          b.id.toString()
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#dc2626]/10 border-[#dc2626]/25 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-[#dc2626]/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5 text-[#e11d48]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-semibold text-sm mb-1", children: "Need a Consultation?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-xs mb-4", children: "Book an appointment with our specialist doctors today." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "w-full bg-[#dc2626] hover:bg-[#e11d48] text-white text-xs",
              "data-ocid": "sidebar-book-btn",
              children: "Book Now"
            }
          ) })
        ] }) })
      ] }) })
    ] }) })
  ] });
}
export {
  BlogDetailPage as default
};
