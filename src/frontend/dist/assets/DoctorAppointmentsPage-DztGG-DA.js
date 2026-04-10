import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, k as useAuth, X, C as Calendar } from "./index-b-kEL4Ku.js";
import { B as Badge } from "./badge-Cp-Au3f2.js";
import { B as Button } from "./button-P341Onhk.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BQUDAgz6.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BtRoBSsK.js";
import { I as Input, L as Label } from "./label-CjzLGgCs.js";
import { C as ChevronUp, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DMrDbi7R.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { u as ue } from "./index-BgcjeN31.js";
import { c as useUpdateAppointmentStatus, f as useAppointmentsByDoctor, a as useAvailableSlots, e as useRescheduleAppointment } from "./useAppointments-BfO9sWka.js";
import { u as useDoctors } from "./useDoctors-CjcpV6PW.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion, C as Clock } from "./proxy-BI_OhE29.js";
import { R as RefreshCw } from "./refresh-cw-CKd7_hNY.js";
import { a as CircleX, C as CircleCheck } from "./circle-x-GbdGq4GT.js";
import { C as ChevronDown } from "./chevron-down-BhCoQgzK.js";
import "./index-DYySJRn_.js";
import "./index-DJNBLJT4.js";
import "./useMutation-DbJwC5eP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const STATUS_TABS = [
  "All",
  "Pending",
  "Approved",
  "Completed",
  "Rejected"
];
function getStatusBadgeClass(status) {
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
function TableSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36 flex-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40 flex-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 rounded-md" })
  ] }, i)) });
}
function RescheduleModal({
  appt,
  doctorId,
  onClose
}) {
  const [date, setDate] = reactExports.useState(appt.date);
  const [slot, setSlot] = reactExports.useState("");
  const { data: slots = [], isLoading: loadingSlots } = useAvailableSlots(
    date,
    doctorId
  );
  const reschedule = useRescheduleAppointment();
  const handleSubmit = () => {
    if (!date || !slot) {
      ue.error("Please select date and slot");
      return;
    }
    reschedule.mutate(
      { id: appt.id, newDate: date, newSlot: slot, newDoctorId: doctorId },
      {
        onSuccess: () => {
          ue.success("Appointment rescheduled");
          onClose();
        },
        onError: () => ue.error("Failed to reschedule")
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-5 h-5 text-accent" }),
      "Reschedule Appointment"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-lg p-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: appt.patientName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
          "Current: ",
          appt.date,
          " · ",
          appt.slot
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground text-sm mb-1.5 block", children: "New Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: date,
            min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            onChange: (e) => {
              setDate(e.target.value);
              setSlot("");
            },
            className: "input-field",
            "data-ocid": "reschedule-date"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-foreground text-sm mb-1.5 block", children: "Available Slot" }),
        loadingSlots ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-md" }) : slots.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm py-2", children: "No slots available for this date" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: slot, onValueChange: setSlot, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "input-field",
              "data-ocid": "reschedule-slot",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a slot" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: slots.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectItem,
            {
              value: s,
              className: "text-foreground hover:bg-muted",
              children: s
            },
            s
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: onClose,
            className: "flex-1 border-border text-muted-foreground hover:text-foreground",
            "data-ocid": "reschedule-cancel",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSubmit,
            disabled: reschedule.isPending || !slot,
            className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90",
            "data-ocid": "reschedule-confirm",
            children: reschedule.isPending ? "Saving..." : "Confirm"
          }
        )
      ] })
    ] })
  ] }) });
}
function AppointmentRow({
  appt,
  onAccept,
  onReject,
  onComplete,
  onReschedule,
  isUpdating
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.tr,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "border-b border-border hover:bg-muted/15 transition-smooth",
        "data-ocid": "appointment-row",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground text-sm font-medium", children: appt.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground text-xs flex items-center gap-1 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              appt.slot
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground text-sm font-medium", children: appt.patientName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs mt-0.5", children: appt.phone })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5 max-w-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm truncate", children: appt.problem }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-xs border ${getStatusBadgeClass(appt.status)}`,
              variant: "outline",
              children: appt.status
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            appt.status === "Pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "h-7 px-2.5 text-xs bg-accent text-accent-foreground hover:bg-accent/90",
                  onClick: () => onAccept(appt.id),
                  disabled: isUpdating,
                  "data-ocid": "row-accept-btn",
                  children: "Accept"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-7 px-2.5 text-xs border-red-500/40 text-red-400 hover:bg-red-500/10",
                  onClick: () => onReject(appt.id),
                  disabled: isUpdating,
                  "data-ocid": "row-reject-btn",
                  children: "Reject"
                }
              )
            ] }),
            appt.status === "Approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 px-2.5 text-xs bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/30",
                onClick: () => onComplete(appt.id),
                disabled: isUpdating,
                "data-ocid": "row-complete-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                  "Complete"
                ]
              }
            ),
            (appt.status === "Pending" || appt.status === "Approved") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 px-2.5 text-xs border-border text-muted-foreground hover:text-foreground",
                onClick: () => onReschedule(appt),
                disabled: isUpdating,
                "data-ocid": "row-reschedule-btn",
                children: "Reschedule"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 w-7 p-0 text-muted-foreground hover:text-foreground",
                onClick: () => setExpanded((v) => !v),
                "aria-label": expanded ? "Collapse details" : "Expand details",
                "data-ocid": "row-expand-btn",
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" })
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.tr,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "border-b border-border",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-5 py-3 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Full Problem Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: appt.problem })
          ] }),
          appt.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: appt.notes })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Appointment ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-mono text-xs", children: [
              "#",
              appt.id.toString()
            ] })
          ] })
        ] }) })
      }
    ) })
  ] });
}
function DoctorAppointmentsPage() {
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
  const [activeTab, setActiveTab] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [rescheduleTarget, setRescheduleTarget] = reactExports.useState(
    null
  );
  const filtered = appointments.filter((a) => {
    const matchTab = activeTab === "All" || a.status === activeTab;
    const q = search.toLowerCase();
    const matchSearch = !q || a.patientName.toLowerCase().includes(q) || a.phone.includes(q) || a.problem.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });
  const handleAccept = (id) => {
    updateStatus.mutate(
      { id, newStatus: "approved", notes: null },
      {
        onSuccess: () => ue.success("Appointment approved"),
        onError: () => ue.error("Failed to approve")
      }
    );
  };
  const handleReject = (id) => {
    updateStatus.mutate(
      { id, newStatus: "rejected", notes: null },
      {
        onSuccess: () => ue.success("Appointment rejected"),
        onError: () => ue.error("Failed to reject")
      }
    );
  };
  const handleComplete = (id) => {
    updateStatus.mutate(
      { id, newStatus: "completed", notes: null },
      {
        onSuccess: () => ue.success("Marked as completed"),
        onError: () => ue.error("Failed to update")
      }
    );
  };
  const tabCounts = {
    All: appointments.length,
    Pending: appointments.filter((a) => a.status === "Pending").length,
    Approved: appointments.filter((a) => a.status === "Approved").length,
    Completed: appointments.filter((a) => a.status === "Completed").length,
    Rejected: appointments.filter((a) => a.status === "Rejected").length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-6xl", "data-ocid": "appointments-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Appointments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Manage all your patient appointments" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => refetch(),
              className: "gap-1.5 border-border text-muted-foreground hover:text-foreground",
              "data-ocid": "refresh-appointments",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
                "Refresh"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.05 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-wrap", "data-ocid": "status-tabs", children: STATUS_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setActiveTab(tab),
              className: `px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth flex items-center gap-1.5 ${activeTab === tab ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
              "data-ocid": `tab-${tab.toLowerCase()}`,
              children: [
                tab,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-[10px] rounded-full px-1.5 py-0.5 ${activeTab === tab ? "bg-accent-foreground/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`,
                    children: tabCounts[tab]
                  }
                )
              ]
            },
            tab
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-56", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search patient, phone...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "input-field pl-8 h-9 text-sm",
                "data-ocid": "search-appointments"
              }
            ),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSearch(""),
                className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] }) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "py-3 px-5 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-base text-foreground", children: [
            activeTab === "All" ? "All Appointments" : `${activeTab} Appointments`,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal text-sm ml-2", children: [
              "(",
              filtered.length,
              ")"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", "data-ocid": "appointments-error", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-9 h-9 text-destructive mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Failed to load appointments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => refetch(),
                className: "mt-3 border-border",
                children: "Retry"
              }
            )
          ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 text-center", "data-ocid": "appointments-empty", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground/30 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-medium text-sm", children: [
              "No ",
              activeTab !== "All" ? `${activeTab.toLowerCase()} ` : "",
              "appointments found"
            ] }),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-xs mt-1", children: "Try clearing the search filter" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Date / Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Patient" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Problem" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              AppointmentRow,
              {
                appt,
                onAccept: handleAccept,
                onReject: handleReject,
                onComplete: handleComplete,
                onReschedule: setRescheduleTarget,
                isUpdating: updateStatus.isPending
              },
              appt.id.toString()
            )) })
          ] }) })
        ] })
      }
    ),
    rescheduleTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RescheduleModal,
      {
        appt: rescheduleTarget,
        doctorId,
        onClose: () => setRescheduleTarget(null)
      }
    )
  ] });
}
export {
  DoctorAppointmentsPage as default
};
