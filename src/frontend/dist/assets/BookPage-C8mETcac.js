import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, L as Link, P as Phone, H as Heart } from "./index-b-kEL4Ku.js";
import { B as Badge } from "./badge-Cp-Au3f2.js";
import { B as Button } from "./button-P341Onhk.js";
import { L as Label, I as Input } from "./label-CjzLGgCs.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { T as Textarea } from "./textarea-BMR9WIWK.js";
import { u as useCreateAppointment, a as useAvailableSlots } from "./useAppointments-BfO9sWka.js";
import { u as useDoctors } from "./useDoctors-CjcpV6PW.js";
import { m as motion, C as Clock } from "./proxy-BI_OhE29.js";
import { C as CircleCheckBig } from "./circle-check-big-C9Rp5mYm.js";
import { A as ArrowLeft } from "./arrow-left-BvbUOs73.js";
import { C as CalendarDays } from "./calendar-days-DEH2PRyn.js";
import "./useMutation-DbJwC5eP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
const STEPS = ["Doctor & Schedule", "Patient Details", "Confirm"];
function BookPage() {
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const createAppointment = useCreateAppointment();
  const [step, setStep] = reactExports.useState(0);
  const [doctorId, setDoctorId] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [slot, setSlot] = reactExports.useState("");
  const [patientName, setPatientName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [problem, setProblem] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const selectedDoctorId = doctorId ? BigInt(doctorId) : null;
  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(
    date,
    selectedDoctorId
  );
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const selectedDoctor = (doctors ?? []).find(
    (d) => d.id.toString() === doctorId
  );
  function handleDoctorChange(val) {
    setDoctorId(val);
    setSlot("");
  }
  function handleDateChange(val) {
    setDate(val);
    setSlot("");
  }
  function resetAll() {
    setStep(0);
    setDoctorId("");
    setDate("");
    setSlot("");
    setPatientName("");
    setPhone("");
    setProblem("");
  }
  async function handleSubmit() {
    try {
      await createAppointment.mutateAsync({
        patientName,
        phone,
        problem,
        date,
        slot,
        doctorId: selectedDoctorId
      });
      setSubmitted(true);
    } catch {
    }
  }
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center px-4",
        style: { background: "#0f1624" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.5 },
            className: "max-w-md w-full text-center bg-[#1a2035] rounded-2xl border border-white/8 p-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-green-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-white mb-3", children: "Appointment Booked!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm leading-relaxed mb-6", children: "Your appointment request has been submitted. Our team will confirm your booking via phone shortly. We look forward to seeing you." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0f1624] rounded-xl p-4 mb-6 text-left space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Doctor" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: selectedDoctor ? `Dr. ${selectedDoctor.name}` : "Auto-assigned" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: new Date(date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Time Slot" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: slot })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40", children: "Patient" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: patientName })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full border-white/10 text-white/70 hover:text-white hover:border-white/30",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                      " Back to Home"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => {
                      setSubmitted(false);
                      resetAll();
                    },
                    className: "flex-1 bg-[#dc2626] hover:bg-[#e11d48] text-white",
                    "data-ocid": "book-another-btn",
                    children: "Book Another"
                  }
                )
              ] })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { background: "#0f1624" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#151e30] border-b border-white/8 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "inline-flex items-center gap-2 text-white/40 hover:text-[#e11d48] text-sm mb-6 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            " Back to Home"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30", children: "Online Booking" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl md:text-4xl font-bold text-white mb-2", children: "Book an Appointment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/55 text-base", children: "Complete the steps below to schedule your visit at Noheria Nursing Home." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-10", children: STEPS.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center gap-2 ${i <= step ? "text-[#e11d48]" : "text-white/30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth ${i < step ? "bg-[#dc2626] border-[#dc2626] text-white" : i === step ? "border-[#dc2626] text-[#e11d48] bg-[#dc2626]/15" : "border-white/20 text-white/30"}`,
                  children: i < step ? "✓" : i + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium hidden sm:block ${i === step ? "text-white" : i < step ? "text-white/60" : "text-white/30"}`,
                  children: label
                }
              )
            ]
          }
        ),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex-1 h-0.5 mx-2 ${i < step ? "bg-[#dc2626]" : "bg-white/10"}`
          }
        )
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 15 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.35 },
          className: "bg-[#1a2035] rounded-2xl border border-white/8 p-8",
          children: [
            step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-white mb-1", children: "Choose Doctor & Schedule" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Select your preferred doctor, date, and available time slot." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/70 text-sm font-medium mb-1.5 block", children: [
                  "Select Doctor",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/35", children: "(optional)" })
                ] }),
                doctorsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 bg-white/5 rounded-md" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: doctorId,
                    onChange: (e) => handleDoctorChange(e.target.value),
                    className: "w-full h-10 px-3 rounded-md border border-white/10 bg-[#0f1624] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50",
                    "data-ocid": "doctor-select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Any Available Doctor" }),
                      (doctors ?? []).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d.id.toString(), children: [
                        "Dr. ",
                        d.name,
                        " — ",
                        d.specialization,
                        d.isOnline ? " ✓ Available" : ""
                      ] }, d.id.toString()))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-sm font-medium mb-1.5 block", children: "Preferred Date *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "date",
                    min: today,
                    value: date,
                    onChange: (e) => handleDateChange(e.target.value),
                    required: true,
                    className: "bg-[#0f1624] border-white/10 text-white [color-scheme:dark]",
                    "data-ocid": "date-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-sm font-medium mb-1.5 block", children: "Available Time Slot *" }),
                date && slotsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 bg-white/5 rounded-md" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  !date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm", children: "Please select a date first" }),
                  date && !slotsLoading && (slots ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm", children: "No slots available for this date. Try another day." }),
                  (slots ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSlot(s),
                      className: `flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-smooth ${slot === s ? "bg-[#dc2626] border-[#dc2626] text-white" : "border-white/10 text-white/60 hover:border-[#dc2626]/50 hover:text-white"}`,
                      "data-ocid": `slot-${s.replace(/[: ]/g, "-")}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                        s
                      ]
                    },
                    s
                  ))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => setStep(1),
                  disabled: !date || !slot,
                  className: "w-full bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold disabled:opacity-40",
                  "data-ocid": "step1-next-btn",
                  children: "Continue to Patient Details"
                }
              )
            ] }),
            step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-white mb-1", children: "Patient Information" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Tell us about the patient visiting." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/70 text-sm font-medium mb-1.5 block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 inline mr-1" }),
                  "Patient Name *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Full name",
                    value: patientName,
                    onChange: (e) => setPatientName(e.target.value),
                    required: true,
                    className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30",
                    "data-ocid": "patient-name-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-white/70 text-sm font-medium mb-1.5 block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5 inline mr-1" }),
                  "Phone Number *"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "tel",
                    placeholder: "+91 98765 43210",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value),
                    required: true,
                    className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30",
                    "data-ocid": "phone-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-white/70 text-sm font-medium mb-1.5 block", children: "Symptoms / Reason for Visit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    rows: 4,
                    placeholder: "Describe symptoms or reason for your visit...",
                    value: problem,
                    onChange: (e) => setProblem(e.target.value),
                    className: "bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 resize-none",
                    "data-ocid": "problem-textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setStep(0),
                    className: "flex-1 border-white/10 text-white/70 hover:text-white hover:border-white/30",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                      " Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: () => setStep(2),
                    disabled: !patientName || !phone,
                    className: "flex-1 bg-[#dc2626] hover:bg-[#e11d48] text-white disabled:opacity-40",
                    "data-ocid": "step2-next-btn",
                    children: "Review & Confirm"
                  }
                )
              ] })
            ] }),
            step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-white mb-1", children: "Confirm Your Appointment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "Review your booking details before confirming." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0f1624] rounded-xl border border-white/8 divide-y divide-white/5", children: [
                [
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
                    label: "Doctor",
                    value: selectedDoctor ? `Dr. ${selectedDoctor.name} (${selectedDoctor.specialization})` : "Auto-assigned available doctor"
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-4 h-4" }),
                    label: "Date",
                    value: new Date(date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                    label: "Time Slot",
                    value: slot
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
                    label: "Patient",
                    value: patientName
                  },
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                    label: "Phone",
                    value: phone
                  }
                ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-4 px-4 py-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48] shrink-0", children: row.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs", children: row.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-medium truncate", children: row.value })
                      ] })
                    ]
                  },
                  row.label
                )),
                problem && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mb-1", children: "Problem / Notes" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm leading-relaxed", children: problem })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/40 text-xs", children: [
                "By confirming, you agree that our team will contact you to verify this appointment. Status will be marked as",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#e11d48]", children: "Pending" }),
                " until approved."
              ] }),
              createAppointment.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-400 text-sm", children: "Something went wrong. Please try again." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setStep(1),
                    className: "flex-1 border-white/10 text-white/70 hover:text-white hover:border-white/30",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                      " Back"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleSubmit,
                    disabled: createAppointment.isPending,
                    className: "flex-1 bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold shadow-lg shadow-[#dc2626]/20",
                    "data-ocid": "confirm-appointment-btn",
                    children: createAppointment.isPending ? "Submitting..." : "Confirm Appointment"
                  }
                )
              ] })
            ] })
          ]
        },
        step
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-3 gap-4 text-center", children: [
        { icon: "🔒", label: "Secure & Private" },
        { icon: "⚡", label: "Instant Confirmation" },
        { icon: "📞", label: "24/7 Support" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs", children: item.label })
      ] }, item.label)) })
    ] })
  ] });
}
export {
  BookPage as default
};
