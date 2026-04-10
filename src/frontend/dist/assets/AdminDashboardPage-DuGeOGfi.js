import { j as jsxRuntimeExports, C as Calendar, U as Users, F as FileText, L as Link } from "./index-b-kEL4Ku.js";
import { B as Badge } from "./badge-Cp-Au3f2.js";
import { B as Button } from "./button-P341Onhk.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BQUDAgz6.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { u as useAppointmentStats, a as useAppointmentTrend, R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Line, B as BarChart, c as Bar } from "./useAnalytics-CJg6BJx7.js";
import { b as useAppointments } from "./useAppointments-BfO9sWka.js";
import { b as useAllBlogs } from "./useBlogs-BPpLHOEo.js";
import { u as useDoctors } from "./useDoctors-CjcpV6PW.js";
import { C as CircleCheckBig } from "./circle-check-big-C9Rp5mYm.js";
import "./useMutation-DbJwC5eP.js";
function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
  green = false,
  loading = false
}) {
  const colorClass = green ? "text-green-400" : accent ? "text-accent" : "text-foreground";
  const bgClass = green ? "bg-green-500/20" : accent ? "bg-accent/20" : "bg-muted";
  const iconClass = green ? "text-green-400" : accent ? "text-accent" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wider font-medium", children: label }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `text-3xl font-display font-bold mt-1 ${colorClass}`,
          children: value
        }
      ),
      sub && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: sub })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2.5 rounded-lg ${bgClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconClass}` }) })
  ] }) }) });
}
function AdminDashboardPage() {
  const { data: appointments, isLoading: loadingAppts } = useAppointments();
  const { data: doctors, isLoading: loadingDoctors } = useDoctors();
  const { data: blogs, isLoading: loadingBlogs } = useAllBlogs();
  const { data: stats, isLoading: loadingStats } = useAppointmentStats();
  const { data: trend, isLoading: loadingTrend } = useAppointmentTrend(
    BigInt(7)
  );
  const pendingCount = (appointments == null ? void 0 : appointments.filter((a) => a.status === "Pending").length) ?? 0;
  const activeDoctors = (doctors == null ? void 0 : doctors.filter((d) => d.isOnline).length) ?? 0;
  const publishedBlogs = (blogs == null ? void 0 : blogs.filter((b) => b.status === "Published").length) ?? 0;
  const trendData = (trend == null ? void 0 : trend.map((t) => ({
    date: t.date.slice(5),
    count: Number(t.count)
  }))) ?? [];
  const doctorBarData = (doctors == null ? void 0 : doctors.slice(0, 8).map((d) => ({
    name: d.name.split(" ").slice(-1)[0],
    total: (appointments == null ? void 0 : appointments.filter((a) => a.doctorId === d.id).length) ?? 0,
    completed: (appointments == null ? void 0 : appointments.filter(
      (a) => a.doctorId === d.id && a.status === "Completed"
    ).length) ?? 0
  }))) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin-dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Welcome back — here's your facility overview" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "dashboard-kpis",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: Calendar,
              label: "Total Appointments",
              value: loadingAppts ? "—" : (appointments == null ? void 0 : appointments.length) ?? 0,
              sub: `${pendingCount} pending`,
              loading: loadingAppts
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: CircleCheckBig,
              label: "Pending Approvals",
              value: loadingAppts ? "—" : pendingCount,
              accent: true,
              loading: loadingAppts
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: Users,
              label: "Active Doctors",
              value: loadingDoctors ? "—" : activeDoctors,
              sub: `of ${(doctors == null ? void 0 : doctors.length) ?? 0} total`,
              green: true,
              loading: loadingDoctors
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              icon: FileText,
              label: "Published Blogs",
              value: loadingBlogs ? "—" : publishedBlogs,
              sub: `${(blogs == null ? void 0 : blogs.length) ?? 0} total`,
              loading: loadingBlogs
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Appointment Trend (Last 7 Days)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingTrend ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trendData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "date",
              tick: {
                fill: "oklch(var(--muted-foreground))",
                fontSize: 11
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: {
                fill: "oklch(var(--muted-foreground))",
                fontSize: 11
              },
              allowDecimals: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border))",
                borderRadius: "8px",
                color: "oklch(var(--foreground))",
                fontSize: 12
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "count",
              stroke: "oklch(var(--accent))",
              strokeWidth: 2,
              dot: { fill: "oklch(var(--accent))", r: 4 },
              name: "Appointments"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Doctor Performance" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingDoctors || loadingAppts ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: doctorBarData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: {
                fill: "oklch(var(--muted-foreground))",
                fontSize: 11
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: {
                fill: "oklch(var(--muted-foreground))",
                fontSize: 11
              },
              allowDecimals: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: {
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border))",
                borderRadius: "8px",
                color: "oklch(var(--foreground))",
                fontSize: 12
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "total",
              fill: "oklch(var(--primary))",
              name: "Total",
              radius: [3, 3, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "completed",
              fill: "oklch(var(--accent))",
              name: "Completed",
              radius: [3, 3, 0, 0]
            }
          )
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2 bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Appointment Summary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingStats ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            label: "Total",
            value: (stats == null ? void 0 : stats.total) ?? 0,
            color: "text-foreground"
          },
          {
            label: "Approved",
            value: (stats == null ? void 0 : stats.approved) ?? 0,
            color: "text-green-400"
          },
          {
            label: "Pending",
            value: (stats == null ? void 0 : stats.pending) ?? 0,
            color: "text-yellow-400"
          },
          {
            label: "Completed",
            value: (stats == null ? void 0 : stats.completed) ?? 0,
            color: "text-green-300"
          },
          {
            label: "Cancelled",
            value: (stats == null ? void 0 : stats.cancelled) ?? 0,
            color: "text-destructive"
          }
        ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-1 border-b border-border last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `${color} border-current font-mono`,
                  children: String(value)
                }
              )
            ]
          },
          label
        )) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Quick Actions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/appointments", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90",
              "data-ocid": "quick-view-appointments",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 mr-2" }),
                "View Appointments"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/doctors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "secondary",
              className: "w-full justify-start",
              "data-ocid": "quick-manage-doctors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2" }),
                "Manage Doctors"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/blog", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "secondary",
              className: "w-full justify-start",
              "data-ocid": "quick-blog-cms",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 mr-2" }),
                "Blog CMS"
              ]
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboardPage as default
};
