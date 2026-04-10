import { r as reactExports, j as jsxRuntimeExports } from "./index-b-kEL4Ku.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BQUDAgz6.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { u as useAppointmentStats, a as useAppointmentTrend, R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Line, B as BarChart, d as Legend, c as Bar } from "./useAnalytics-CJg6BJx7.js";
import { b as useAppointments } from "./useAppointments-BfO9sWka.js";
import { u as useDoctors } from "./useDoctors-CjcpV6PW.js";
import "./useMutation-DbJwC5eP.js";
const PERIOD_OPTIONS = [
  { label: "7 Days", value: "7" },
  { label: "30 Days", value: "30" },
  { label: "90 Days", value: "90" }
];
function KpiCard({
  label,
  value,
  sub,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wider font-medium", children: label }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold text-foreground mt-1", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: sub })
  ] }) });
}
const TOOLTIP_STYLE = {
  background: "oklch(var(--card))",
  border: "1px solid oklch(var(--border))",
  borderRadius: "8px",
  color: "oklch(var(--foreground))",
  fontSize: 12
};
function AdminAnalyticsPage() {
  const [period, setPeriod] = reactExports.useState("30");
  const { data: stats, isLoading: loadingStats } = useAppointmentStats();
  const { data: trend, isLoading: loadingTrend } = useAppointmentTrend(
    BigInt(Number(period))
  );
  const { data: appointments, isLoading: loadingAppts } = useAppointments();
  const { data: doctors, isLoading: loadingDoctors } = useDoctors();
  const total = Number((stats == null ? void 0 : stats.total) ?? 0);
  const completed = Number((stats == null ? void 0 : stats.completed) ?? 0);
  const pending = Number((stats == null ? void 0 : stats.pending) ?? 0);
  const cancelled = Number((stats == null ? void 0 : stats.cancelled) ?? 0);
  const completionRate = total > 0 ? Math.round(completed / total * 100) : 0;
  const trendData = (trend == null ? void 0 : trend.map((t) => ({ date: t.date.slice(5), count: Number(t.count) }))) ?? [];
  const doctorStats = (doctors == null ? void 0 : doctors.map((doc) => {
    const docAppts = (appointments == null ? void 0 : appointments.filter((a) => a.doctorId === doc.id)) ?? [];
    const totalD = docAppts.length;
    const acceptedD = docAppts.filter(
      (a) => a.status === "Approved"
    ).length;
    const rejectedD = docAppts.filter(
      (a) => a.status === "Rejected"
    ).length;
    const completedD = docAppts.filter(
      (a) => a.status === "Completed"
    ).length;
    const pendingD = docAppts.filter((a) => a.status === "Pending").length;
    const rate = totalD > 0 ? Math.round(completedD / totalD * 100) : 0;
    return {
      name: doc.name,
      specialization: doc.specialization,
      total: totalD,
      accepted: acceptedD,
      rejected: rejectedD,
      completed: completedD,
      pending: pendingD,
      rate
    };
  }).sort((a, b) => b.total - a.total)) ?? [];
  const barData = doctorStats.slice(0, 8).map((d) => ({
    name: d.name.split(" ").pop() ?? d.name,
    Total: d.total,
    Completed: d.completed,
    Pending: d.pending,
    Rejected: d.rejected
  }));
  const tickStyle = { fill: "oklch(var(--muted-foreground))", fontSize: 11 };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin-analytics", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Performance metrics and insights" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "analytics-kpis",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Total Appointments",
              value: String(total),
              loading: loadingStats
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Completion Rate",
              value: `${completionRate}%`,
              sub: `${completed} completed`,
              loading: loadingStats
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Pending",
              value: String(pending),
              loading: loadingStats
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Cancelled",
              value: String(cancelled),
              loading: loadingStats
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Appointment Trend" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-1 bg-muted rounded-md p-0.5",
              "data-ocid": "period-selector",
              children: PERIOD_OPTIONS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setPeriod(value),
                  className: `px-2.5 py-1 text-xs font-medium rounded transition-colors ${period === value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`,
                  children: label
                },
                value
              ))
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingTrend ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trendData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: tickStyle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: tickStyle, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingDoctors || loadingAppts ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: barData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(var(--border))"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: tickStyle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: tickStyle, allowDecimals: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: TOOLTIP_STYLE }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Legend,
            {
              wrapperStyle: {
                fontSize: 11,
                color: "oklch(var(--muted-foreground))"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "Total",
              fill: "oklch(var(--primary))",
              name: "Total",
              radius: [3, 3, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "Completed",
              fill: "oklch(var(--accent))",
              name: "Completed",
              radius: [3, 3, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "Pending",
              fill: "#f59e0b",
              name: "Pending",
              radius: [3, 3, 0, 0]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Bar,
            {
              dataKey: "Rejected",
              fill: "#ef4444",
              name: "Rejected",
              radius: [3, 3, 0, 0]
            }
          )
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Doctor Statistics" }) }),
      loadingDoctors || loadingAppts ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-medium", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-medium", children: "Accepted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-medium", children: "Rejected" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-medium", children: "Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 font-medium", children: "Rate" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: doctorStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 6,
            className: "py-8 text-center text-muted-foreground text-sm",
            children: "No data available"
          }
        ) }) : doctorStats.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border hover:bg-muted/30 transition-colors",
            "data-ocid": "analytics-doctor-row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: d.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: d.specialization })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono text-sm text-foreground", children: d.total }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono text-sm text-green-400", children: d.accepted }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono text-sm text-destructive", children: d.rejected }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono text-sm text-accent", children: d.completed }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `inline-block px-2 py-0.5 rounded text-xs font-medium ${d.rate >= 70 ? "bg-green-500/20 text-green-400" : d.rate >= 40 ? "bg-yellow-500/20 text-yellow-400" : "bg-destructive/20 text-destructive"}`,
                  children: [
                    d.rate,
                    "%"
                  ]
                }
              ) })
            ]
          },
          d.name
        )) })
      ] }) })
    ] })
  ] });
}
export {
  AdminAnalyticsPage as default
};
