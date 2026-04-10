import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle,
  Clock,
  Heart,
  Phone,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  useAvailableSlots,
  useCreateAppointment,
} from "../hooks/useAppointments";
import { useDoctors } from "../hooks/useDoctors";

const STEPS = ["Doctor & Schedule", "Patient Details", "Confirm"];

export default function BookPage() {
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const createAppointment = useCreateAppointment();

  const [step, setStep] = useState(0);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedDoctorId = doctorId ? BigInt(doctorId) : null;
  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(
    date,
    selectedDoctorId,
  );

  const today = new Date().toISOString().split("T")[0];
  const selectedDoctor = (doctors ?? []).find(
    (d) => d.id.toString() === doctorId,
  );

  function handleDoctorChange(val: string) {
    setDoctorId(val);
    setSlot("");
  }
  function handleDateChange(val: string) {
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
        doctorId: selectedDoctorId,
      });
      setSubmitted(true);
    } catch {
      // handled by mutation state
    }
  }

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0f1624" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center bg-[#1a2035] rounded-2xl border border-white/8 p-10"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Appointment Booked!
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Your appointment request has been submitted. Our team will confirm
            your booking via phone shortly. We look forward to seeing you.
          </p>
          <div className="bg-[#0f1624] rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/40">Doctor</span>
              <span className="text-white font-medium">
                {selectedDoctor
                  ? `Dr. ${selectedDoctor.name}`
                  : "Auto-assigned"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Date</span>
              <span className="text-white font-medium">
                {new Date(date).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Time Slot</span>
              <span className="text-white font-medium">{slot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Patient</span>
              <span className="text-white font-medium">{patientName}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/" className="flex-1">
              <Button
                variant="outline"
                className="w-full border-white/10 text-white/70 hover:text-white hover:border-white/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
              </Button>
            </Link>
            <Button
              onClick={() => {
                setSubmitted(false);
                resetAll();
              }}
              className="flex-1 bg-[#dc2626] hover:bg-[#e11d48] text-white"
              data-ocid="book-another-btn"
            >
              Book Another
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f1624" }}>
      {/* Page header */}
      <div className="bg-[#151e30] border-b border-white/8 py-10">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#e11d48] text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48]">
              <CalendarDays className="w-5 h-5" />
            </div>
            <Badge className="bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30">
              Online Booking
            </Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
            Book an Appointment
          </h1>
          <p className="text-white/55 text-base">
            Complete the steps below to schedule your visit at Noheria Nursing
            Home.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1">
              <div
                className={`flex items-center gap-2 ${i <= step ? "text-[#e11d48]" : "text-white/30"}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth ${
                    i < step
                      ? "bg-[#dc2626] border-[#dc2626] text-white"
                      : i === step
                        ? "border-[#dc2626] text-[#e11d48] bg-[#dc2626]/15"
                        : "border-white/20 text-white/30"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${i === step ? "text-white" : i < step ? "text-white/60" : "text-white/30"}`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-[#dc2626]" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-[#1a2035] rounded-2xl border border-white/8 p-8"
        >
          {/* Step 0: Doctor & Schedule */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  Choose Doctor &amp; Schedule
                </h2>
                <p className="text-white/50 text-sm">
                  Select your preferred doctor, date, and available time slot.
                </p>
              </div>

              <div>
                <Label className="text-white/70 text-sm font-medium mb-1.5 block">
                  Select Doctor{" "}
                  <span className="text-white/35">(optional)</span>
                </Label>
                {doctorsLoading ? (
                  <Skeleton className="h-10 bg-white/5 rounded-md" />
                ) : (
                  <select
                    value={doctorId}
                    onChange={(e) => handleDoctorChange(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-white/10 bg-[#0f1624] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626]/50"
                    data-ocid="doctor-select"
                  >
                    <option value="">Any Available Doctor</option>
                    {(doctors ?? []).map((d) => (
                      <option key={d.id.toString()} value={d.id.toString()}>
                        Dr. {d.name} — {d.specialization}
                        {d.isOnline ? " ✓ Available" : ""}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <Label className="text-white/70 text-sm font-medium mb-1.5 block">
                  Preferred Date *
                </Label>
                <Input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  required
                  className="bg-[#0f1624] border-white/10 text-white [color-scheme:dark]"
                  data-ocid="date-input"
                />
              </div>

              <div>
                <Label className="text-white/70 text-sm font-medium mb-1.5 block">
                  Available Time Slot *
                </Label>
                {date && slotsLoading ? (
                  <Skeleton className="h-10 bg-white/5 rounded-md" />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {!date && (
                      <p className="text-white/30 text-sm">
                        Please select a date first
                      </p>
                    )}
                    {date && !slotsLoading && (slots ?? []).length === 0 && (
                      <p className="text-white/30 text-sm">
                        No slots available for this date. Try another day.
                      </p>
                    )}
                    {(slots ?? []).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSlot(s)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-smooth ${
                          slot === s
                            ? "bg-[#dc2626] border-[#dc2626] text-white"
                            : "border-white/10 text-white/60 hover:border-[#dc2626]/50 hover:text-white"
                        }`}
                        data-ocid={`slot-${s.replace(/[: ]/g, "-")}`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                onClick={() => setStep(1)}
                disabled={!date || !slot}
                className="w-full bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold disabled:opacity-40"
                data-ocid="step1-next-btn"
              >
                Continue to Patient Details
              </Button>
            </div>
          )}

          {/* Step 1: Patient Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  Patient Information
                </h2>
                <p className="text-white/50 text-sm">
                  Tell us about the patient visiting.
                </p>
              </div>

              <div>
                <Label className="text-white/70 text-sm font-medium mb-1.5 block">
                  <User className="w-3.5 h-3.5 inline mr-1" />
                  Patient Name *
                </Label>
                <Input
                  placeholder="Full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30"
                  data-ocid="patient-name-input"
                />
              </div>

              <div>
                <Label className="text-white/70 text-sm font-medium mb-1.5 block">
                  <Phone className="w-3.5 h-3.5 inline mr-1" />
                  Phone Number *
                </Label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30"
                  data-ocid="phone-input"
                />
              </div>

              <div>
                <Label className="text-white/70 text-sm font-medium mb-1.5 block">
                  Symptoms / Reason for Visit
                </Label>
                <Textarea
                  rows={4}
                  placeholder="Describe symptoms or reason for your visit..."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 resize-none"
                  data-ocid="problem-textarea"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(0)}
                  className="flex-1 border-white/10 text-white/70 hover:text-white hover:border-white/30"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!patientName || !phone}
                  className="flex-1 bg-[#dc2626] hover:bg-[#e11d48] text-white disabled:opacity-40"
                  data-ocid="step2-next-btn"
                >
                  Review &amp; Confirm
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Confirm */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  Confirm Your Appointment
                </h2>
                <p className="text-white/50 text-sm">
                  Review your booking details before confirming.
                </p>
              </div>

              <div className="bg-[#0f1624] rounded-xl border border-white/8 divide-y divide-white/5">
                {[
                  {
                    icon: <Heart className="w-4 h-4" />,
                    label: "Doctor",
                    value: selectedDoctor
                      ? `Dr. ${selectedDoctor.name} (${selectedDoctor.specialization})`
                      : "Auto-assigned available doctor",
                  },
                  {
                    icon: <CalendarDays className="w-4 h-4" />,
                    label: "Date",
                    value: new Date(date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }),
                  },
                  {
                    icon: <Clock className="w-4 h-4" />,
                    label: "Time Slot",
                    value: slot,
                  },
                  {
                    icon: <User className="w-4 h-4" />,
                    label: "Patient",
                    value: patientName,
                  },
                  {
                    icon: <Phone className="w-4 h-4" />,
                    label: "Phone",
                    value: phone,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-4 px-4 py-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48] shrink-0">
                      {row.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/40 text-xs">{row.label}</p>
                      <p className="text-white text-sm font-medium truncate">
                        {row.value}
                      </p>
                    </div>
                  </div>
                ))}
                {problem && (
                  <div className="px-4 py-3">
                    <p className="text-white/40 text-xs mb-1">
                      Problem / Notes
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      {problem}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-white/40 text-xs">
                By confirming, you agree that our team will contact you to
                verify this appointment. Status will be marked as{" "}
                <span className="text-[#e11d48]">Pending</span> until approved.
              </p>

              {createAppointment.isError && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-white/10 text-white/70 hover:text-white hover:border-white/30"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={createAppointment.isPending}
                  className="flex-1 bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold shadow-lg shadow-[#dc2626]/20"
                  data-ocid="confirm-appointment-btn"
                >
                  {createAppointment.isPending
                    ? "Submitting..."
                    : "Confirm Appointment"}
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "🔒", label: "Secure & Private" },
            { icon: "⚡", label: "Instant Confirmation" },
            { icon: "📞", label: "24/7 Support" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <span className="text-xl">{item.icon}</span>
              <span className="text-white/40 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
