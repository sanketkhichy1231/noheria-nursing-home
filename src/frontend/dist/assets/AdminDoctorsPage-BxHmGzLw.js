import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-b-kEL4Ku.js";
import { u as ue } from "./index-BgcjeN31.js";
import { B as Button } from "./button-P341Onhk.js";
import { C as Card } from "./card-BQUDAgz6.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-BtRoBSsK.js";
import { L as Label, I as Input } from "./label-CjzLGgCs.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { u as useDoctors, a as useToggleDoctorOnlineStatus, b as useAddDoctor, c as useEditDoctor, d as useSetDoctorAvailability } from "./useDoctors-CjcpV6PW.js";
import { P as Plus } from "./plus-GDDDW69H.js";
import { T as Trash2 } from "./trash-2-Dv5ZttQN.js";
import "./index-DYySJRn_.js";
import "./useMutation-DbJwC5eP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
function AvailabilityEditor({
  slots,
  onChange
}) {
  const add = () => onChange([
    ...slots,
    { dayOfWeek: "Monday", startHour: "9", endHour: "17" }
  ]);
  const remove = (i) => onChange(slots.filter((_, idx) => idx !== i));
  const update = (i, field, value) => {
    const next = [...slots];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "Availability Slots" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          variant: "outline",
          className: "h-7 text-xs",
          onClick: add,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
            " Add"
          ]
        }
      )
    ] }),
    slots.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs italic", children: "No slots added." }),
    slots.map((slot, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: slot.dayOfWeek,
          onChange: (e) => update(i, "dayOfWeek", e.target.value),
          className: "bg-background border border-input rounded-md px-2 py-1.5 text-sm text-foreground flex-1",
          children: DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: 0,
          max: 23,
          value: slot.startHour,
          onChange: (e) => update(i, "startHour", e.target.value),
          className: "bg-background w-16 text-sm",
          placeholder: "Start"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "–" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "number",
          min: 0,
          max: 24,
          value: slot.endHour,
          onChange: (e) => update(i, "endHour", e.target.value),
          className: "bg-background w-16 text-sm",
          placeholder: "End"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "text-destructive h-7 w-7 p-0",
          onClick: () => remove(i),
          "aria-label": "Remove slot",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
        }
      )
    ] }, `${slot.dayOfWeek}-${i}`))
  ] });
}
function DoctorModal({
  doctor,
  onClose
}) {
  const [name, setName] = reactExports.useState((doctor == null ? void 0 : doctor.name) ?? "");
  const [specialization, setSpecialization] = reactExports.useState(
    (doctor == null ? void 0 : doctor.specialization) ?? ""
  );
  const [email, setEmail] = reactExports.useState((doctor == null ? void 0 : doctor.email) ?? "");
  const [phone, setPhone] = reactExports.useState((doctor == null ? void 0 : doctor.phone) ?? "");
  const [slots, setSlots] = reactExports.useState(
    (doctor == null ? void 0 : doctor.availability.map((a) => ({
      dayOfWeek: a.dayOfWeek,
      startHour: String(a.startHour),
      endHour: String(a.endHour)
    }))) ?? []
  );
  const addDoctor = useAddDoctor();
  const editDoctor = useEditDoctor();
  const setAvailability = useSetDoctorAvailability();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const avail = slots.map((s) => ({
        dayOfWeek: s.dayOfWeek,
        startHour: BigInt(Number(s.startHour)),
        endHour: BigInt(Number(s.endHour))
      }));
      if (doctor) {
        await editDoctor.mutateAsync({
          id: doctor.id,
          name,
          specialization,
          email,
          phone
        });
        await setAvailability.mutateAsync({
          doctorId: doctor.id,
          availability: avail
        });
        ue.success("Doctor updated");
      } else {
        const result = await addDoctor.mutateAsync({
          name,
          specialization,
          email,
          phone
        });
        if (result.__kind__ === "ok" && avail.length > 0) {
          await setAvailability.mutateAsync({
            doctorId: result.ok,
            availability: avail
          });
        }
        ue.success("Doctor added");
      }
      onClose();
    } catch {
      ue.error("Failed to save doctor");
    }
  };
  const isPending = addDoctor.isPending || editDoctor.isPending || setAvailability.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border sm:max-w-lg max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: doctor ? "Edit Doctor" : "Add New Doctor" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "drName", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "drName",
              value: name,
              onChange: (e) => setName(e.target.value),
              className: "bg-background",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "drSpec", children: "Specialization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "drSpec",
              value: specialization,
              onChange: (e) => setSpecialization(e.target.value),
              className: "bg-background",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "drEmail", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "drEmail",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: "bg-background"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "drPhone", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "drPhone",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              className: "bg-background"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvailabilityEditor, { slots, onChange: setSlots }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "flex-1 bg-accent text-accent-foreground hover:bg-accent/90",
            children: isPending ? "Saving…" : doctor ? "Save Changes" : "Add Doctor"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" })
      ] })
    ] })
  ] }) });
}
function AdminDoctorsPage() {
  const { data: doctors, isLoading, error, refetch } = useDoctors();
  const toggleOnline = useToggleDoctorOnlineStatus();
  const [modalDoctor, setModalDoctor] = reactExports.useState(
    null
  );
  const handleToggle = async (doctor) => {
    try {
      await toggleOnline.mutateAsync({
        doctorId: doctor.id,
        isOnline: !doctor.isOnline
      });
      ue.success(
        `${doctor.name} is now ${!doctor.isOnline ? "online" : "offline"}`
      );
    } catch {
      ue.error("Failed to update status");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin-doctors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Doctors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage your medical staff" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "bg-accent text-accent-foreground hover:bg-accent/90",
          onClick: () => setModalDoctor("new"),
          "data-ocid": "add-doctor-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " Add Doctor"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, k)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-destructive", children: [
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
    ] }) : !(doctors == null ? void 0 : doctors.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-8 text-center text-muted-foreground",
        "data-ocid": "doctors-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium mb-2", children: "No doctors added yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "bg-accent text-accent-foreground hover:bg-accent/90",
              onClick: () => setModalDoctor("new"),
              children: "Add First Doctor"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Specialization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Availability" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: doctors.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border hover:bg-muted/30 transition-colors",
          "data-ocid": `doctor-row-${doc.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: doc.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: doc.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: doc.specialization }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border font-medium ${doc.isOnline ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-muted text-muted-foreground border-border"}`,
                children: [
                  doc.isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-3 h-3" }),
                  doc.isOnline ? "Online" : "Offline"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-sm text-muted-foreground", children: [
              doc.availability.length,
              " slot",
              doc.availability.length !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-7 text-xs",
                  onClick: () => setModalDoctor(doc),
                  "data-ocid": "doctor-edit-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3 mr-1" }),
                    " Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: `h-7 text-xs ${doc.isOnline ? "border-destructive/40 text-destructive hover:bg-destructive/10" : "border-green-500/40 text-green-400 hover:bg-green-500/10"}`,
                  onClick: () => handleToggle(doc),
                  disabled: toggleOnline.isPending,
                  "data-ocid": "doctor-toggle-btn",
                  children: [
                    doc.isOnline ? /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3 mr-1" }),
                    doc.isOnline ? "Go Offline" : "Go Online"
                  ]
                }
              )
            ] }) })
          ]
        },
        doc.id.toString()
      )) })
    ] }) }) }),
    modalDoctor !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DoctorModal,
      {
        doctor: modalDoctor === "new" ? null : modalDoctor,
        onClose: () => setModalDoctor(null)
      }
    )
  ] });
}
export {
  AdminDoctorsPage as default
};
