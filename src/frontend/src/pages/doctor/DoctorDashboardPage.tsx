import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  RefreshCw,
  Stethoscope,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import {
  useAppointmentsByDoctor,
  useUpdateAppointmentStatus,
} from "../../hooks/useAppointments";
import { useAuth } from "../../hooks/useAuth";
import { useDoctors } from "../../hooks/useDoctors";
import type { Appointment } from "../../types";

const today = new Date().toISOString().split("T")[0];

function getStatusBadge(status: string) {
  const map: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Approved: "bg-green-500/20 text-green-400 border-green-500/30",
    Completed: "bg-green-600/20 text-green-300 border-green-600/30",
    Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
    Cancelled: "bg-muted text-muted-foreground border-border",
    Rescheduled: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  return map[status] ?? "bg-muted text-muted-foreground border-border";
}

function KPICard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  sub?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="bg-card border-border surface-card">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="font-display font-bold text-3xl text-foreground">
                {value}
              </p>
              {sub && (
                <p className="text-muted-foreground text-xs mt-1">{sub}</p>
              )}
            </div>
            <div className={`p-2.5 rounded-lg ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ScheduleRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border last:border-0">
      <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-52" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
  );
}

function ScheduleRow({
  appt,
  onAccept,
  onReject,
  isPending,
}: {
  appt: Appointment;
  onAccept: (id: bigint) => void;
  onReject: (id: bigint) => void;
  isPending: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 p-4 border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
      data-ocid="schedule-row"
    >
      <div className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-lg flex flex-col items-center justify-center shrink-0">
        <Clock className="w-3.5 h-3.5 text-accent mb-0.5" />
        <span className="text-accent text-[10px] font-semibold leading-tight text-center px-1">
          {appt.slot}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-foreground font-medium text-sm truncate">
          {appt.patientName}
        </p>
        <p className="text-muted-foreground text-xs truncate mt-0.5">
          {appt.problem}
        </p>
        <p className="text-muted-foreground text-[11px] mt-0.5">
          📞 {appt.phone}
        </p>
      </div>
      <Badge
        className={`text-xs border shrink-0 ${getStatusBadge(appt.status)}`}
        variant="outline"
      >
        {appt.status}
      </Badge>
      {appt.status === "Pending" && (
        <div className="flex gap-2 shrink-0">
          <Button
            size="sm"
            className="h-8 px-3 bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
            onClick={() => onAccept(appt.id)}
            disabled={isPending}
            data-ocid="accept-btn"
          >
            Accept
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 border-red-500/40 text-red-400 hover:bg-red-500/10 hover:text-red-300 text-xs"
            onClick={() => onReject(appt.id)}
            disabled={isPending}
            data-ocid="reject-btn"
          >
            Reject
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default function DoctorDashboardPage() {
  const { userProfile } = useAuth();
  const { data: doctors } = useDoctors();
  const updateStatus = useUpdateAppointmentStatus();

  const myDoctor = doctors?.find((d) => d.name === userProfile?.name);
  const doctorId = myDoctor?.id ?? null;

  const {
    data: appointments = [],
    isLoading,
    isError,
    refetch,
  } = useAppointmentsByDoctor(doctorId);

  const todayAppts = appointments.filter((a) => a.date === today);
  const pendingCount = appointments.filter(
    (a) => a.status === "Pending",
  ).length;
  const completedToday = todayAppts.filter(
    (a) => a.status === "Completed",
  ).length;
  const upcomingAppts = appointments
    .filter((a) => a.date > today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const handleAccept = (id: bigint) => {
    updateStatus.mutate({ id, newStatus: "Approved", notes: null });
  };
  const handleReject = (id: bigint) => {
    updateStatus.mutate({ id, newStatus: "Rejected", notes: null });
  };

  const doctorName = userProfile?.name ?? "Doctor";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Greeting Card */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-gradient-to-r from-accent/15 via-card to-card border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <Stethoscope className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-foreground">
                  {greeting}, Dr. {doctorName}
                </h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {new Date().toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {myDoctor && (
                  <p className="text-accent text-xs font-medium mt-1">
                    {myDoctor.specialization} ·{" "}
                    <span
                      className={
                        myDoctor.isOnline
                          ? "text-green-400"
                          : "text-muted-foreground"
                      }
                    >
                      {myDoctor.isOnline ? "● Online" : "○ Offline"}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          icon={CalendarCheck}
          label="Today's Appointments"
          value={isLoading ? "—" : todayAppts.length}
          sub={today}
          color="bg-accent/15 text-accent"
          delay={0.05}
        />
        <KPICard
          icon={CalendarClock}
          label="Pending Approvals"
          value={isLoading ? "—" : pendingCount}
          sub="Awaiting your action"
          color="bg-yellow-500/15 text-yellow-400"
          delay={0.1}
        />
        <KPICard
          icon={CheckCircle2}
          label="Completed Today"
          value={isLoading ? "—" : completedToday}
          sub="Consultations done"
          color="bg-green-500/15 text-green-400"
          delay={0.15}
        />
      </div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-accent" />
                Today's Schedule
                <Badge className="bg-accent/20 text-accent border-accent/30 ml-1">
                  {todayAppts.length}
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => refetch()}
                className="text-muted-foreground hover:text-foreground h-8 gap-1.5"
                data-ocid="refresh-schedule"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div>
                {[1, 2, 3].map((i) => (
                  <ScheduleRowSkeleton key={i} />
                ))}
              </div>
            ) : isError ? (
              <div className="p-8 text-center" data-ocid="schedule-error">
                <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Failed to load appointments
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="mt-3"
                >
                  Retry
                </Button>
              </div>
            ) : todayAppts.length === 0 ? (
              <div className="p-10 text-center" data-ocid="schedule-empty">
                <CalendarCheck className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium text-sm">
                  No appointments scheduled for today
                </p>
                <p className="text-muted-foreground/60 text-xs mt-1">
                  Check upcoming appointments below
                </p>
              </div>
            ) : (
              todayAppts.map((appt) => (
                <ScheduleRow
                  key={appt.id.toString()}
                  appt={appt}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  isPending={updateStatus.isPending}
                />
              ))
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-primary" />
                Upcoming Appointments
                <span className="text-muted-foreground text-sm font-normal">
                  (next 5)
                </span>
              </CardTitle>
              <Link to="/doctor/appointments">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-accent hover:text-accent/80 h-8 gap-1"
                  data-ocid="view-all-appointments"
                >
                  View All
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 border-b border-border last:border-0"
                  >
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32 flex-1" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                ))}
              </div>
            ) : upcomingAppts.length === 0 ? (
              <div className="p-8 text-center" data-ocid="upcoming-empty">
                <p className="text-muted-foreground text-sm">
                  No upcoming appointments
                </p>
              </div>
            ) : (
              upcomingAppts.map((appt, i) => (
                <motion.div
                  key={appt.id.toString()}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.06 }}
                  className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid="upcoming-row"
                >
                  <div className="text-muted-foreground text-xs w-20 shrink-0">
                    <div className="font-medium text-foreground text-[13px]">
                      {appt.date}
                    </div>
                    <div className="text-[11px]">{appt.slot}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-medium truncate">
                      {appt.patientName}
                    </p>
                    <p className="text-muted-foreground text-xs truncate">
                      {appt.problem}
                    </p>
                  </div>
                  <Badge
                    className={`text-xs border shrink-0 ${getStatusBadge(appt.status)}`}
                    variant="outline"
                  >
                    {appt.status}
                  </Badge>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
