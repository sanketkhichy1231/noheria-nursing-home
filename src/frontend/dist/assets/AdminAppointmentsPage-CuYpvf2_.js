import { r as reactExports, j as jsxRuntimeExports } from "./index-b-kEL4Ku.js";
import { u as ue } from "./index-BgcjeN31.js";
import { B as Button } from "./button-P341Onhk.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BQUDAgz6.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BtRoBSsK.js";
import { L as Label, I as Input } from "./label-CjzLGgCs.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as ChevronUp } from "./select-DMrDbi7R.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { b as useAppointments, c as useUpdateAppointmentStatus, d as useDeleteAppointment, e as useRescheduleAppointment } from "./useAppointments-BfO9sWka.js";
import { u as useDoctors } from "./useDoctors-CjcpV6PW.js";
import { R as RefreshCw } from "./refresh-cw-CKd7_hNY.js";
import { T as Trash2 } from "./trash-2-Dv5ZttQN.js";
import { C as ChevronDown } from "./chevron-down-BhCoQgzK.js";
import "./index-DYySJRn_.js";
import "./index-DJNBLJT4.js";
import "./useMutation-DbJwC5eP.js";
const STATUS_COLORS = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Approved: "bg-green-500/20 text-green-400 border-green-500/30",
  Rejected: "bg-destructive/20 text-destructive border-destructive/30",
  Completed: "bg-green-600/20 text-green-300 border-green-600/30",
  Cancelled: "bg-muted text-muted-foreground border-border",
  Rescheduled: "bg-primary/20 text-primary border-primary/30"
};
const STATUS_FILTERS = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Completed",
  "Cancelled"
];
function RescheduleModal({
  appointment,
  doctors,
  onClose
}) {
  const [newDate, setNewDate] = reactExports.useState(appointment.date);
  const [newSlot, setNewSlot] = reactExports.useState(appointment.slot);
  const [doctorId, setDoctorId] = reactExports.useState(appointment.doctorId.toString());
  const reschedule = useRescheduleAppointment();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reschedule.mutateAsync({
        id: appointment.id,
        newDate,
        newSlot,
        newDoctorId: doctorId ? BigInt(doctorId) : null
      });
      ue.success("Appointment rescheduled");
      onClose();
    } catch {
      ue.error("Failed to reschedule");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Reschedule Appointment" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Patient" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium text-sm mt-1", children: appointment.patientName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "newDate", children: "New Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "newDate",
            type: "date",
            value: newDate,
            onChange: (e) => setNewDate(e.target.value),
            className: "bg-background",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "newSlot", children: "New Time Slot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "newSlot",
            value: newSlot,
            onChange: (e) => setNewSlot(e.target.value),
            placeholder: "e.g. 09:00 - 09:30",
            className: "bg-background",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Doctor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: doctorId, onValueChange: setDoctorId, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select doctor" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: doctors.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: d.id.toString(), children: [
            d.name,
            " — ",
            d.specialization
          ] }, d.id.toString())) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: reschedule.isPending,
            className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90",
            children: reschedule.isPending ? "Saving…" : "Reschedule"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" })
      ] })
    ] })
  ] }) });
}
function AppointmentRow({
  appt,
  doctors
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [rescheduleOpen, setRescheduleOpen] = reactExports.useState(false);
  const updateStatus = useUpdateAppointmentStatus();
  const deleteAppt = useDeleteAppointment();
  const doctor = doctors.find((d) => d.id === appt.doctorId);
  const handleStatus = async (status) => {
    try {
      await updateStatus.mutateAsync({
        id: appt.id,
        newStatus: status.toLowerCase(),
        notes: null
      });
      ue.success(`Appointment ${status.toLowerCase()}`);
    } catch {
      ue.error("Failed to update status");
    }
  };
  const handleDelete = async () => {
    if (!confirm("Delete this appointment?")) return;
    try {
      await deleteAppt.mutateAsync(appt.id);
      ue.success("Appointment deleted");
    } catch {
      ue.error("Failed to delete");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border hover:bg-muted/30 transition-colors",
        "data-ocid": `appt-row-${appt.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: appt.patientName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: appt.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: (doctor == null ? void 0 : doctor.name) ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: appt.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: appt.slot })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs border font-medium ${STATUS_COLORS[appt.status] ?? "bg-muted text-muted-foreground"}`,
              children: appt.status
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            appt.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10",
                  onClick: () => handleStatus("Approved"),
                  disabled: updateStatus.isPending,
                  "data-ocid": "appt-approve-btn",
                  children: "Approve"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10",
                  onClick: () => handleStatus("Rejected"),
                  disabled: updateStatus.isPending,
                  "data-ocid": "appt-reject-btn",
                  children: "Reject"
                }
              )
            ] }),
            (appt.status === "Approved" || appt.status === "Rescheduled") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10",
                onClick: () => handleStatus("Completed"),
                disabled: updateStatus.isPending,
                "data-ocid": "appt-complete-btn",
                children: "Complete"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs",
                onClick: () => setRescheduleOpen(true),
                "data-ocid": "appt-reschedule-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10",
                onClick: handleDelete,
                disabled: deleteAppt.isPending,
                "data-ocid": "appt-delete-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-1 text-muted-foreground hover:text-foreground",
                onClick: () => setExpanded(!expanded),
                "aria-label": "Toggle details",
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/20 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { colSpan: 5, className: "px-4 py-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Problem:" }),
      " ",
      appt.problem || "—",
      "  ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Notes:" }),
      " ",
      appt.notes || "None"
    ] }) }),
    rescheduleOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RescheduleModal,
      {
        appointment: appt,
        doctors,
        onClose: () => setRescheduleOpen(false)
      }
    )
  ] });
}
function AdminAppointmentsPage() {
  const [statusFilter, setStatusFilter] = reactExports.useState("All");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const {
    data: appointments,
    isLoading,
    error,
    refetch
  } = useAppointments(statusFilter === "All" ? null : statusFilter);
  const { data: doctors = [] } = useDoctors();
  const filtered = (appointments == null ? void 0 : appointments.filter((a) => {
    if (search && !a.patientName.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (dateFrom && a.date < dateFrom) return false;
    if (dateTo && a.date > dateTo) return false;
    return true;
  })) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin-appointments", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Appointments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage all patient appointments" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Search Patient" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search by name…",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "bg-background h-8 text-sm w-44",
            "data-ocid": "appt-search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "bg-background h-8 text-sm w-36",
              "data-ocid": "appt-status-filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: STATUS_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateFrom,
            onChange: (e) => setDateFrom(e.target.value),
            className: "bg-background h-8 text-sm w-36",
            "data-ocid": "appt-date-from"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateTo,
            onChange: (e) => setDateTo(e.target.value),
            className: "bg-background h-8 text-sm w-36",
            "data-ocid": "appt-date-to"
          }
        )
      ] }),
      (dateFrom || dateTo || search) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8",
          onClick: () => {
            setDateFrom("");
            setDateTo("");
            setSearch("");
          },
          children: "Clear"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 px-4 pt-4 flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-muted-foreground", children: [
          filtered.length,
          " appointment",
          filtered.length !== 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => refetch(),
            className: "h-7 text-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 mr-1" }),
              " Refresh"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-destructive", children: [
        "Failed to load.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "underline",
            onClick: () => refetch(),
            children: "Retry"
          }
        )
      ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-8 text-center text-muted-foreground",
          "data-ocid": "appt-empty-state",
          children: "No appointments found."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[700px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Patient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Date / Slot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          AppointmentRow,
          {
            appt,
            doctors
          },
          appt.id.toString()
        )) })
      ] }) })
    ] })
  ] });
}
export {
  AdminAppointmentsPage as default
};
