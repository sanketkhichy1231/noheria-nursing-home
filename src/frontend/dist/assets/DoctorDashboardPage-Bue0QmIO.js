import { c as createLucideIcon, k as useAuth, j as jsxRuntimeExports, S as Stethoscope, L as Link } from "./index-b-kEL4Ku.js";
import { B as Badge } from "./badge-Cp-Au3f2.js";
import { B as Button } from "./button-P341Onhk.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BQUDAgz6.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { c as useUpdateAppointmentStatus, f as useAppointmentsByDoctor } from "./useAppointments-BfO9sWka.js";
import { u as useDoctors } from "./useDoctors-CjcpV6PW.js";
import { m as motion, C as Clock } from "./proxy-BI_OhE29.js";
import { C as CircleCheck, a as CircleX } from "./circle-x-GbdGq4GT.js";
import { R as RefreshCw } from "./refresh-cw-CKd7_hNY.js";
import { C as ChevronRight } from "./chevron-right-CHVKFiID.js";
import "./useMutation-DbJwC5eP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode);
const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
function getStatusBadge(status) {
  const map = {
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Approved: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-green-600/20 text-green-300 border-green-600/30",
    Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    Cancelled: "bg-muted text-muted-foreground border-border",
    Rescheduled: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  };
  return map[status] ?? "bg-muted text-muted-foreground border-border";
}
function KPICard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.4 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border surface-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-wider mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-foreground", children: value }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: sub })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2.5 rounded-lg ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) })
      ] }) }) })
    }
  );
}
function ScheduleRowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 p-4 border-b border-border last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-52" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded-md" })
  ] });
}
function ScheduleRow({
  appt,
  onAccept,
  onReject,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      className: "flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
      "data-ocid": "schedule-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-14 h-14 bg-accent/10 border border-accent/20 rounded-lg flex flex-col items-center justify-center shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 text-accent mb-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-[10px] font-semibold leading-tight text-center px-1", children: appt.slot })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-sm truncate", children: appt.patientName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs truncate mt-0.5", children: appt.problem }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-[11px] mt-0.5", children: [
            "📞 ",
            appt.phone
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: `text-xs border shrink-0 ${getStatusBadge(appt.status)}`,
            variant: "outline",
            children: appt.status
          }
        ),
        appt.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "h-8 px-3 bg-accent text-accent-foreground hover:bg-accent/90 text-xs",
              onClick: () => onAccept(appt.id),
              disabled: isPending,
              "data-ocid": "accept-btn",
              children: "Accept"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 px-3 border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs",
              onClick: () => onReject(appt.id),
              disabled: isPending,
              "data-ocid": "reject-btn",
              children: "Reject"
            }
          )
        ] })
      ]
    }
  );
}
function DoctorDashboardPage() {
  const { userProfile } = useAuth();
  const { data: doctors } = useDoctors();
  const updateStatus = useUpdateAppointmentStatus();
  const myDoctor = doctors == null ? void 0 : doctors.find((d) => d.name === (userProfile == null ? void 0 : userProfile.name));
  const doctorId = (myDoctor == null ? void 0 : myDoctor.id) ?? null;
  const {
    data: appointments = [],
    isLoading,
    isError,
    refetch
  } = useAppointmentsByDoctor(doctorId);
  const todayAppts = appointments.filter((a) => a.date === today);
  const pendingCount = appointments.filter(
    (a) => a.status === "Pending"
  ).length;
  const completedToday = todayAppts.filter(
    (a) => a.status === "Completed"
  ).length;
  const upcomingAppts = appointments.filter((a) => a.date > today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);
  const handleAccept = (id) => {
    updateStatus.mutate({ id, newStatus: "Approved", notes: null });
  };
  const handleReject = (id) => {
    updateStatus.mutate({ id, newStatus: "Rejected", notes: null });
  };
  const doctorName = (userProfile == null ? void 0 : userProfile.name) ?? "Doctor";
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gradient-to-r from-accent/15 via-card to-card border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-6 h-6 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground", children: [
              greeting,
              ", Dr. ",
              doctorName
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            }) }),
            myDoctor && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-accent text-xs font-medium mt-1", children: [
              myDoctor.specialization,
              " ·",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: myDoctor.isOnline ? "text-green-400" : "text-muted-foreground",
                  children: myDoctor.isOnline ? "● Online" : "○ Offline"
                }
              )
            ] })
          ] })
        ] }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          icon: CalendarCheck,
          label: "Today's Appointments",
          value: isLoading ? "—" : todayAppts.length,
          sub: today,
          color: "bg-accent/15 text-accent",
          delay: 0.05
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          icon: CalendarClock,
          label: "Pending Approvals",
          value: isLoading ? "—" : pendingCount,
          sub: "Awaiting your action",
          color: "bg-yellow-500/15 text-yellow-400",
          delay: 0.1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KPICard,
        {
          icon: CircleCheck,
          label: "Completed Today",
          value: isLoading ? "—" : completedToday,
          sub: "Consultations done",
          color: "bg-green-500/15 text-green-400",
          delay: 0.15
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2, duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-5 h-5 text-accent" }),
              "Today's Schedule",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-accent/20 text-accent border-accent/30 ml-1", children: todayAppts.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => refetch(),
                className: "text-muted-foreground hover:text-foreground h-8 gap-1.5",
                "data-ocid": "refresh-schedule",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                  "Refresh"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ScheduleRowSkeleton, {}, i)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", "data-ocid": "schedule-error", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-8 h-8 text-destructive mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Failed to load appointments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => refetch(),
                className: "mt-3",
                children: "Retry"
              }
            )
          ] }) : todayAppts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", "data-ocid": "schedule-empty", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "w-10 h-10 text-muted-foreground/40 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium text-sm", children: "No appointments scheduled for today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-xs mt-1", children: "Check upcoming appointments below" })
          ] }) : todayAppts.map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScheduleRow,
            {
              appt,
              onAccept: handleAccept,
              onReject: handleReject,
              isPending: updateStatus.isPending
            },
            appt.id.toString()
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3, duration: 0.4 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-lg text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-5 h-5 text-primary" }),
              "Upcoming Appointments",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm font-normal", children: "(next 5)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/doctor/appointments", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-accent hover:text-accent/80 h-8 gap-1",
                "data-ocid": "view-all-appointments",
                children: [
                  "View All",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5" })
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 border-b border-border last:border-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 flex-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
              ]
            },
            i
          )) }) : upcomingAppts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center", "data-ocid": "upcoming-empty", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No upcoming appointments" }) }) : upcomingAppts.map((appt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -6 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: 0.35 + i * 0.06 },
              className: "flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/20 transition-smooth",
              "data-ocid": "upcoming-row",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-xs w-20 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground text-[13px]", children: appt.date }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px]", children: appt.slot })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground text-sm font-medium truncate", children: appt.patientName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs truncate", children: appt.problem })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs border shrink-0 ${getStatusBadge(appt.status)}`,
                    variant: "outline",
                    children: appt.status
                  }
                )
              ]
            },
            appt.id.toString()
          )) })
        ] })
      }
    )
  ] });
}
export {
  DoctorDashboardPage as default
};
