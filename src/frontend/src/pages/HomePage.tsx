import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Baby,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronRight,
  Clock,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Stethoscope,
  Users,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  useAvailableSlots,
  useCreateAppointment,
} from "../hooks/useAppointments";
import { usePublishedBlogs } from "../hooks/useBlogs";
import { useDoctors } from "../hooks/useDoctors";
import { useSiteContent } from "../hooks/useSiteContent";

// Icon map for services
const ICON_MAP: Record<string, React.ReactNode> = {
  stethoscope: <Stethoscope className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  baby: <Baby className="w-6 h-6" />,
  activity: <Activity className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  building: <Building2 className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  default: <Stethoscope className="w-6 h-6" />,
};

function getIcon(icon: string) {
  return ICON_MAP[icon.toLowerCase()] ?? ICON_MAP.default;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Hero Section ────────────────────────────────────────────────────────────
function HeroSection() {
  const { data: content, isLoading } = useSiteContent();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f1624 0%, #1a2035 50%, #1e1530 100%)",
      }}
    >
      {/* Background hospital image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1400&q=80)",
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1624]/95 via-[#1a2035]/80 to-[#0f1624]/60 pointer-events-none" />
      {/* Crimson accent glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#dc2626]/8 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#16a34a]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#dc2626]/40 bg-[#dc2626]/10 text-[#e11d48] text-xs font-semibold mb-6 tracking-wide uppercase">
              <Heart className="w-3.5 h-3.5" />
              Est. 1994 · Panchkula, Haryana · Maternity &amp; Nursing Care
            </div>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {isLoading ? (
              <Skeleton className="h-20 w-3/4 bg-white/10" />
            ) : (
              content?.heroTitle || "Expert Care, Compassionate Healing"
            )}
          </motion.h1>

          <motion.p
            className="text-white/70 text-lg md:text-xl leading-relaxed mb-4 font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {isLoading ? (
              <Skeleton className="h-6 w-2/3 bg-white/10" />
            ) : (
              content?.heroTagline ||
              "Noheria Nursing Home — Trusted healthcare for every family since 1994."
            )}
          </motion.p>

          <motion.p
            className="text-white/55 text-base leading-relaxed mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {isLoading ? (
              <Skeleton className="h-16 w-full bg-white/10" />
            ) : (
              content?.heroIntro ||
              "From emergency care to maternity services, our experienced team of doctors and nurses is dedicated to your well-being. Modern facilities, personal attention, and decades of trust."
            )}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              type="button"
              onClick={() => scrollTo("appointment")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#dc2626] hover:bg-[#e11d48] text-white rounded-lg text-base font-semibold transition-smooth shadow-lg shadow-[#dc2626]/30"
              data-ocid="hero-cta-btn"
            >
              <CalendarDays className="w-5 h-5" />
              {isLoading
                ? "Book Appointment Now"
                : content?.heroCtaText || "Book Appointment Now"}
            </button>
            <button
              type="button"
              onClick={() => scrollTo("services")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white/80 hover:border-white/40 hover:text-white rounded-lg text-base font-semibold transition-smooth"
            >
              Our Services <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="mt-16 flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              {
                label: "Years of Service",
                value: "30+",
                color: "text-[#e11d48]",
              },
              {
                label: "Patients Served",
                value: "50,000+",
                color: "text-[#22c55e]",
              },
              {
                label: "Specialist Doctors",
                value: "15+",
                color: "text-[#e11d48]",
              },
              {
                label: "Emergency Response",
                value: "24/7",
                color: "text-[#22c55e]",
              },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className={`font-display text-3xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </span>
                <span className="text-white/50 text-xs uppercase tracking-wide mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────
function ServicesSection() {
  const { data: content, isLoading } = useSiteContent();

  const fallbackServices = [
    {
      id: 1n,
      order: 1n,
      icon: "heart",
      title: "General Medicine",
      description:
        "Comprehensive diagnosis and treatment for acute and chronic medical conditions by experienced physicians.",
    },
    {
      id: 2n,
      order: 2n,
      icon: "baby",
      title: "Maternity Care",
      description:
        "Complete antenatal, delivery, and postnatal care in a warm, supportive environment for mother and baby.",
    },
    {
      id: 3n,
      order: 3n,
      icon: "activity",
      title: "Emergency Services",
      description:
        "Round-the-clock emergency care with rapid response and life-saving interventions available 24/7.",
    },
    {
      id: 4n,
      order: 4n,
      icon: "stethoscope",
      title: "Pediatrics",
      description:
        "Specialized medical care for infants, children, and adolescents by dedicated pediatric specialists.",
    },
    {
      id: 5n,
      order: 5n,
      icon: "shield",
      title: "Surgical Care",
      description:
        "Modern operation theatres with skilled surgical teams for planned and emergency procedures.",
    },
    {
      id: 6n,
      order: 6n,
      icon: "users",
      title: "Nursing Care",
      description:
        "Professional and compassionate nursing services ensuring patient comfort and speedy recovery.",
    },
  ];

  const services = content?.services?.length
    ? content.services
    : fallbackServices;

  return (
    <section id="services" className="py-20 bg-[#0f1624]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30">
            Our Services
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Comprehensive Medical Care
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            From routine check-ups to specialized treatments, we offer a full
            spectrum of healthcare services under one roof.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <Skeleton key={k} className="h-44 rounded-xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Card className="bg-[#1a2035] border-white/8 hover:border-[#22c55e]/40 hover:shadow-lg hover:shadow-[#22c55e]/10 transition-smooth group h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48] mb-4 group-hover:bg-[#22c55e]/15 group-hover:text-[#22c55e] transition-smooth">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Doctor image URLs — alternating female/male pattern
const DOCTOR_IMAGES = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80", // female
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80", // male
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&q=80", // female
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80", // male
];

// ─── Doctors Section ──────────────────────────────────────────────────────────
function DoctorsSection() {
  const { data: doctors, isLoading } = useDoctors();

  return (
    <section id="doctors" className="py-20 bg-[#151e30]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30">
            Our Team
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Doctors
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            Our team of experienced and compassionate specialists is committed
            to your health and well-being.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["d1", "d2", "d3", "d4"].map((k) => (
              <Skeleton key={k} className="h-60 rounded-xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(doctors ?? []).map((doctor, i) => (
              <motion.div
                key={doctor.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="bg-[#1a2035] border-white/8 hover:border-[#22c55e]/40 hover:shadow-lg hover:shadow-[#22c55e]/10 transition-smooth group text-center h-full">
                  <CardContent className="p-6 flex flex-col items-center gap-4">
                    {/* Doctor Photo Avatar */}
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#dc2626]/30 group-hover:border-[#22c55e]/50 transition-smooth">
                        <img
                          src={DOCTOR_IMAGES[i % DOCTOR_IMAGES.length]}
                          alt={`Dr. ${doctor.name}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.classList.add(
                                "bg-gradient-to-br",
                                "from-[#dc2626]/30",
                                "to-[#1a2035]",
                                "flex",
                                "items-center",
                                "justify-center",
                              );
                              parent.innerHTML = `<span class="text-white font-display text-xl font-bold">${getInitials(doctor.name)}</span>`;
                            }
                          }}
                        />
                      </div>
                      <span
                        className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#1a2035] ${doctor.isOnline ? "bg-[#22c55e]" : "bg-white/30"}`}
                        title={doctor.isOnline ? "Online" : "Offline"}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white text-base">
                        Dr. {doctor.name}
                      </h3>
                      <p className="text-[#e11d48] text-xs font-medium mt-0.5">
                        {doctor.specialization}
                      </p>
                      <Badge
                        className={`mt-2 text-[10px] ${doctor.isOnline ? "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30" : "bg-white/5 text-white/40 border-white/10"}`}
                      >
                        {doctor.isOnline ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollTo("appointment")}
                      className="w-full mt-auto py-2 rounded-lg border border-[#dc2626]/40 text-[#e11d48] text-sm font-semibold hover:bg-[#dc2626]/10 transition-smooth"
                      data-ocid={`book-doctor-${doctor.id}`}
                    >
                      Book Appointment
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Appointment Section ──────────────────────────────────────────────────────
function AppointmentSection() {
  const { data: doctors } = useDoctors();
  const createAppointment = useCreateAppointment();

  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedDoctorId = doctorId ? BigInt(doctorId) : null;
  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(
    date,
    selectedDoctorId,
  );

  function handleDateChange(val: string) {
    setDate(val);
    setSlot("");
  }
  function handleDoctorChange(val: string) {
    setDoctorId(val);
    setSlot("");
  }

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!patientName || !phone || !date || !slot) return;
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
      setPatientName("");
      setPhone("");
      setProblem("");
      setDate("");
      setSlot("");
      setDoctorId("");
    } catch {
      // error handled by mutation state
    }
  }

  return (
    <section id="appointment" className="py-20 bg-[#0f1624]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30">
            Book Now
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Schedule an Appointment
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            Choose your preferred doctor, date, and time. We'll confirm your
            booking promptly.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Consultation image sidebar */}
          <div className="hidden lg:flex flex-col gap-4 lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-white/8 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&q=80"
                alt="Doctor patient consultation"
                className="w-full h-72 object-cover"
              />
            </div>
            <div className="bg-[#1a2035] rounded-xl border border-[#22c55e]/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span className="text-[#22c55e] text-xs font-semibold uppercase tracking-wide">
                  Doctors Available Now
                </span>
              </div>
              <p className="text-white/60 text-xs">
                Our specialists are ready to see you. Book your slot and get
                confirmed within minutes.
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="text-center py-16 bg-[#1a2035] rounded-2xl border border-[#22c55e]/30">
                <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[#22c55e]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Appointment Requested!
                </h3>
                <p className="text-white/60 mb-6">
                  We've received your appointment request. Our team will confirm
                  your booking shortly.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#dc2626] hover:bg-[#e11d48] text-white"
                  data-ocid="book-another-btn"
                >
                  Book Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#1a2035] rounded-2xl border border-white/8 p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Doctor */}
                  <div className="md:col-span-2">
                    <Label className="text-white/80 text-sm font-medium mb-1.5 block">
                      Doctor (optional — we'll auto-assign if none selected)
                    </Label>
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
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <Label className="text-white/80 text-sm font-medium mb-1.5 block">
                      Preferred Date *
                    </Label>
                    <Input
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => handleDateChange(e.target.value)}
                      required
                      className="bg-[#0f1624] border-white/10 text-white focus:ring-[#dc2626]/50 [color-scheme:dark]"
                      data-ocid="date-input"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <Label className="text-white/80 text-sm font-medium mb-1.5 block">
                      Time Slot *
                    </Label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      required
                      disabled={!date || slotsLoading}
                      className="w-full h-10 px-3 rounded-md border border-white/10 bg-[#0f1624] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 disabled:opacity-50"
                      data-ocid="slot-select"
                    >
                      <option value="">
                        {!date
                          ? "Select a date first"
                          : slotsLoading
                            ? "Loading slots..."
                            : slots?.length === 0
                              ? "No slots available"
                              : "Select a time slot"}
                      </option>
                      {(slots ?? []).map((s) => (
                        <option key={s} value={s} className="text-[#22c55e]">
                          ✓ {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Patient Name */}
                  <div>
                    <Label className="text-white/80 text-sm font-medium mb-1.5 block">
                      Patient Name *
                    </Label>
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                      className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 focus:ring-[#dc2626]/50"
                      data-ocid="patient-name-input"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="text-white/80 text-sm font-medium mb-1.5 block">
                      Phone Number *
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 focus:ring-[#dc2626]/50"
                      data-ocid="phone-input"
                    />
                  </div>

                  {/* Problem */}
                  <div className="md:col-span-2">
                    <Label className="text-white/80 text-sm font-medium mb-1.5 block">
                      Describe Your Problem / Reason for Visit
                    </Label>
                    <Textarea
                      rows={3}
                      placeholder="Brief description of symptoms or reason for visit..."
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 focus:ring-[#dc2626]/50 resize-none"
                      data-ocid="problem-textarea"
                    />
                  </div>
                </div>

                {createAppointment.isError && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={createAppointment.isPending}
                  className="w-full py-3 bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold text-base rounded-lg shadow-lg shadow-[#dc2626]/20 transition-smooth"
                  data-ocid="submit-appointment-btn"
                >
                  {createAppointment.isPending
                    ? "Booking..."
                    : "Confirm Appointment"}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Blog Section ─────────────────────────────────────────────────────────────
function BlogSection() {
  const { data: blogs, isLoading } = usePublishedBlogs();
  const recent = (blogs ?? []).slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-[#151e30]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30">
            Health Education
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Latest Health Articles
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base">
            Expert advice, health tips, and medical insights from our team of
            specialists.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["b1", "b2", "b3"].map((k) => (
              <Skeleton key={k} className="h-72 rounded-xl bg-white/5" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div className="text-center py-16 text-white/40">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recent.map((blog, i) => (
              <motion.div
                key={blog.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-[#1a2035] border-white/8 hover:border-[#dc2626]/40 transition-smooth group h-full flex flex-col">
                  {blog.imageUrl && (
                    <div className="h-44 overflow-hidden rounded-t-xl">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                    </div>
                  )}
                  {!blog.imageUrl && (
                    <div className="h-44 overflow-hidden rounded-t-xl relative">
                      <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"
                        alt="Medical health"
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2035]/80 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        {blog.blogType === "Video" ? (
                          <Video className="w-6 h-6 text-white/80" />
                        ) : (
                          <BookOpen className="w-6 h-6 text-white/80" />
                        )}
                      </div>
                    </div>
                  )}
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        className={`text-[10px] ${blog.blogType === "Video" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30"}`}
                      >
                        {blog.blogType === "Video" ? (
                          <>
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3 h-3 mr-1" />
                            Blog
                          </>
                        )}
                      </Badge>
                      <span className="text-white/40 text-xs">
                        {new Date(
                          Number(blog.createdAt) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-white text-base mb-2 line-clamp-2 group-hover:text-[#e11d48] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}
                      {blog.content.length > 100 ? "..." : ""}
                    </p>
                    <Link
                      to="/blog/$id"
                      params={{ id: blog.id.toString() }}
                      className="inline-flex items-center gap-1 text-[#e11d48] text-sm font-semibold hover:gap-2 transition-smooth mt-auto"
                      data-ocid={`read-blog-${blog.id}`}
                    >
                      Read More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const { data: content, isLoading } = useSiteContent();

  const fallbackTestimonials = [
    {
      id: 1n,
      name: "Priya Sharma",
      role: "Patient, Maternity Ward",
      text: "The care I received during my delivery was exceptional. The nurses and doctors made the experience calm, safe, and beautiful. I'm forever grateful to the Noheria team.",
      rating: 5n,
    },
    {
      id: 2n,
      name: "Rajesh Kumar",
      role: "Patient, General Medicine",
      text: "Dr. Mehta's diagnosis was spot-on and thorough. The staff was professional and the facility was clean and modern. Highly recommend for any medical needs.",
      rating: 5n,
    },
    {
      id: 3n,
      name: "Anita Singh",
      role: "Patient, Pediatrics",
      text: "Brought my 2-year-old for high fever at midnight — the emergency team responded immediately. They were so gentle with my child. Outstanding service.",
      rating: 5n,
    },
  ];

  const testimonials = content?.testimonials?.length
    ? content.testimonials
    : fallbackTestimonials;

  return (
    <section id="testimonials" className="py-20 bg-[#0f1624]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30">
            Testimonials
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            What Patients Say
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Real stories from the people we care for, every day.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["t1", "t2", "t3"].map((k) => (
              <Skeleton key={k} className="h-52 rounded-xl bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-[#1a2035] border-white/8 h-full relative overflow-hidden">
                  <CardContent className="p-6">
                    <span className="absolute top-4 right-5 text-[#dc2626]/30 font-serif text-6xl leading-none select-none">
                      "
                    </span>
                    <p className="text-white/70 text-sm leading-relaxed mb-5 relative z-10">
                      {t.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#dc2626]/20 flex items-center justify-center text-[#e11d48] font-bold text-sm shrink-0">
                        {getInitials(t.name)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {t.name}
                        </p>
                        <p className="text-white/45 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const { data: content, isLoading } = useSiteContent();

  const fallbackFaqs = [
    {
      id: 1n,
      order: 1n,
      question: "What are your OPD hours?",
      answer:
        "Our OPD is open Monday to Saturday, 9:00 AM to 7:00 PM. Emergency services are available 24/7, 365 days a year.",
    },
    {
      id: 2n,
      order: 2n,
      question: "Do I need an appointment for a regular check-up?",
      answer:
        "While walk-ins are welcome, booking an appointment ensures you see your preferred doctor without waiting. You can book online or call us directly.",
    },
    {
      id: 3n,
      order: 3n,
      question: "What insurance plans do you accept?",
      answer:
        "We accept most major health insurance providers including CGHS, ESIC, and all major private health insurers. Please call us to verify your specific plan.",
    },
    {
      id: 4n,
      order: 4n,
      question: "Is maternity care available around the clock?",
      answer:
        "Yes, our maternity ward is operational 24/7 with experienced obstetricians and nursing staff always on call to ensure safe deliveries at any hour.",
    },
    {
      id: 5n,
      order: 5n,
      question: "How can I access my medical records?",
      answer:
        "Patient medical records can be requested at the front desk during OPD hours. We can also provide digital copies via email upon written request and identity verification.",
    },
  ];

  const faqs = content?.faqs?.length ? content.faqs : fallbackFaqs;

  return (
    <section id="faq" className="py-20 bg-[#151e30]">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30">
            FAQ
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            Quick answers to the questions we hear most often.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-3">
            {["f1", "f2", "f3", "f4", "f5"].map((k) => (
              <Skeleton key={k} className="h-14 rounded-lg bg-white/5" />
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id.toString()}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <AccordionItem
                  value={faq.id.toString()}
                  className="bg-[#1a2035] border border-white/8 rounded-lg px-4 overflow-hidden"
                  data-ocid={`faq-item-${faq.id}`}
                >
                  <AccordionTrigger className="text-white text-sm font-medium hover:text-[#e11d48] hover:no-underline py-4 [&>svg]:text-[#e11d48]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const { data: content, isLoading } = useSiteContent();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const contact = content?.contactInfo ?? {
    address: "Sector 6, Panchkula, Haryana 134109",
    phone: "+91 172 256 0000",
    email: "info@noherianursinghome.com",
    hours: "Mon–Sat: 9:00 AM – 7:00 PM | Emergency: 24/7",
    mapUrl: "",
  };

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setContactForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="py-20 bg-[#0f1624]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-[#dc2626]/20 text-[#e11d48] border-[#dc2626]/30 hover:bg-[#dc2626]/30">
            Get in Touch
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base">
            We're here to help. Reach out for queries, appointments, or
            emergencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {isLoading ? (
              <div className="space-y-4">
                {["c1", "c2", "c3", "c4"].map((k) => (
                  <Skeleton key={k} className="h-14 bg-white/5 rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                {[
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Address",
                    value: contact.address,
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone",
                    value: contact.phone,
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: contact.email,
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    label: "Hours",
                    value: contact.hours,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#dc2626]/15 flex items-center justify-center text-[#e11d48] shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wide mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-white text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            <div className="pt-4 p-5 bg-[#dc2626]/10 border border-[#dc2626]/20 rounded-xl">
              <p className="text-[#e11d48] font-semibold text-sm mb-1">
                🚨 Emergency?
              </p>
              <p className="text-white/70 text-sm">
                Our emergency department is available 24 hours, 7 days a week.
                Come directly or call ahead.
              </p>
            </div>
          </motion.div>

          {/* Quick inquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sent ? (
              <div className="text-center py-12 bg-[#1a2035] rounded-2xl border border-white/8">
                <Heart className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-white/60 text-sm">
                  We'll get back to you within 24 hours.
                </p>
                <Button
                  onClick={() => setSent(false)}
                  variant="ghost"
                  className="mt-4 text-[#e11d48] hover:text-[#e11d48] hover:bg-[#dc2626]/10"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="bg-[#1a2035] rounded-2xl border border-white/8 p-6 space-y-4"
              >
                <h3 className="font-display text-lg font-semibold text-white">
                  Quick Inquiry
                </h3>
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">
                    Name
                  </Label>
                  <Input
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30"
                    data-ocid="contact-name-input"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                    className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30"
                    data-ocid="contact-email-input"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm mb-1.5 block">
                    Message
                  </Label>
                  <Textarea
                    rows={4}
                    placeholder="How can we help you?"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                    className="bg-[#0f1624] border-white/10 text-white placeholder:text-white/30 resize-none"
                    data-ocid="contact-message-textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#dc2626] hover:bg-[#e11d48] text-white font-semibold"
                  data-ocid="contact-submit-btn"
                >
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: "#0f1624" }}>
      <HeroSection />
      <ServicesSection />
      <DoctorsSection />
      <AppointmentSection />
      <BlogSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
