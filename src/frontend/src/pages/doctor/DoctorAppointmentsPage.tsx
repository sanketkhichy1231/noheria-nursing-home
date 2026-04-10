import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  RefreshCw,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAppointmentsByDoctor,
  useAvailableSlots,
  useRescheduleAppointment,
  useUpdateAppointmentStatus,
} from "../../hooks/useAppointments";
import { useAuth } from "../../hooks/useAuth";
import { useDoctors } from "../../hooks/useDoctors";
import type { Appointment } from "../../types";

const STATUS_TABS = [
  "All",
  "Pending",
  "Approved",
  "Completed",
  "Rejected",
] as const;
type StatusTab = (typeof STATUS_TABS)[number];

function getStatusBadgeClass(status: string) {
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

function TableSkeleton() {
  return (
    <div className="divide-y divide-border">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-36 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-40 flex-1" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function RescheduleModal({
  appt,
  doctorId,
  onClose,
}: {
  appt: Appointment;
  doctorId: bigint | null;
  onClose: () => void;
}) {
  const [date, setDate] = useState(appt.date);
  const [slot, setSlot] = useState("");
  const { data: slots = [], isLoading: loadingSlots } = useAvailableSlots(
    date,
    doctorId,
  );
  const reschedule = useRescheduleAppointment();

  const handleSubmit = () => {
    if (!date || !slot) {
      toast.error("Please select date and slot");
      return;
    }
    reschedule.mutate(
      { id: appt.id, newDate: date, newSlot: slot, newDoctorId: doctorId },
      {
        onSuccess: () => {
          toast.success("Appointment rescheduled");
          onClose();
        },
        onError: () => toast.error("Failed to reschedule"),
      },
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-1">
          <div className="bg-muted/30 rounded-lg p-3 text-sm">
            <p className="text-foreground font-medium">{appt.patientName}</p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Current: {appt.date} · {appt.slot}
            </p>
          </div>
          <div>
            <Label className="text-foreground text-sm mb-1.5 block">
              New Date
            </Label>
            <Input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setDate(e.target.value);
                setSlot("");
              }}
              className="input-field"
              data-ocid="reschedule-date"
            />
          </div>
          <div>
            <Label className="text-foreground text-sm mb-1.5 block">
              Available Slot
            </Label>
            {loadingSlots ? (
              <Skeleton className="h-10 w-full rounded-md" />
            ) : slots.length === 0 ? (
              <p className="text-muted-foreground text-sm py-2">
                No slots available for this date
              </p>
            ) : (
              <Select value={slot} onValueChange={setSlot}>
                <SelectTrigger
                  className="input-field"
                  data-ocid="reschedule-slot"
                >
                  <SelectValue placeholder="Select a slot" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {slots.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="text-foreground hover:bg-muted"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border text-muted-foreground hover:text-foreground"
              data-ocid="reschedule-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={reschedule.isPending || !slot}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              data-ocid="reschedule-confirm"
            >
              {reschedule.isPending ? "Saving..." : "Confirm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AppointmentRow({
  appt,
  onAccept,
  onReject,
  onComplete,
  onReschedule,
  isUpdating,
}: {
  appt: Appointment;
  onAccept: (id: bigint) => void;
  onReject: (id: bigint) => void;
  onComplete: (id: bigint) => void;
  onReschedule: (appt: Appointment) => void;
  isUpdating: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border-b border-border hover:bg-muted/15 transition-smooth"
        data-ocid="appointment-row"
      >
        <td className="px-5 py-3.5">
          <div className="text-foreground text-sm font-medium">{appt.date}</div>
          <div className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3" />
            {appt.slot}
          </div>
        </td>
        <td className="px-5 py-3.5">
          <div className="text-foreground text-sm font-medium">
            {appt.patientName}
          </div>
          <div className="text-muted-foreground text-xs mt-0.5">
            {appt.phone}
          </div>
        </td>
        <td className="px-5 py-3.5 max-w-xs">
          <p className="text-muted-foreground text-sm truncate">
            {appt.problem}
          </p>
        </td>
        <td className="px-5 py-3.5">
          <Badge
            className={`text-xs border ${getStatusBadgeClass(appt.status)}`}
            variant="outline"
          >
            {appt.status}
          </Badge>
        </td>
        <td className="px-5 py-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {appt.status === "Pending" && (
              <>
                <Button
                  size="sm"
                  className="h-7 px-2.5 text-xs bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => onAccept(appt.id)}
                  disabled={isUpdating}
                  data-ocid="row-accept-btn"
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2.5 text-xs border-red-500/40 text-red-400 hover:bg-red-500/10"
                  onClick={() => onReject(appt.id)}
                  disabled={isUpdating}
                  data-ocid="row-reject-btn"
                >
                  Reject
                </Button>
              </>
            )}
            {appt.status === "Approved" && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/30"
                onClick={() => onComplete(appt.id)}
                disabled={isUpdating}
                data-ocid="row-complete-btn"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Complete
              </Button>
            )}
            {(appt.status === "Pending" || appt.status === "Approved") && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 text-xs border-border text-muted-foreground hover:text-foreground"
                onClick={() => onReschedule(appt)}
                disabled={isUpdating}
                data-ocid="row-reschedule-btn"
              >
                Reschedule
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Collapse details" : "Expand details"}
              data-ocid="row-expand-btn"
            >
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </td>
      </motion.tr>
      <AnimatePresence>
        {expanded && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-b border-border"
          >
            <td colSpan={5} className="px-5 py-3 bg-muted/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Full Problem Description
                  </p>
                  <p className="text-foreground leading-relaxed">
                    {appt.problem}
                  </p>
                </div>
                {appt.notes && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Notes
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {appt.notes}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Appointment ID
                  </p>
                  <p className="text-muted-foreground font-mono text-xs">
                    #{appt.id.toString()}
                  </p>
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default function DoctorAppointmentsPage() {
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

  const [activeTab, setActiveTab] = useState<StatusTab>("All");
  const [search, setSearch] = useState("");
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(
    null,
  );

  const filtered = appointments.filter((a) => {
    const matchTab = activeTab === "All" || a.status === activeTab;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.patientName.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.problem.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const handleAccept = (id: bigint) => {
    updateStatus.mutate(
      { id, newStatus: "approved", notes: null },
      {
        onSuccess: () => toast.success("Appointment approved"),
        onError: () => toast.error("Failed to approve"),
      },
    );
  };

  const handleReject = (id: bigint) => {
    updateStatus.mutate(
      { id, newStatus: "rejected", notes: null },
      {
        onSuccess: () => toast.success("Appointment rejected"),
        onError: () => toast.error("Failed to reject"),
      },
    );
  };

  const handleComplete = (id: bigint) => {
    updateStatus.mutate(
      { id, newStatus: "completed", notes: null },
      {
        onSuccess: () => toast.success("Marked as completed"),
        onError: () => toast.error("Failed to update"),
      },
    );
  };

  const tabCounts: Record<StatusTab, number> = {
    All: appointments.length,
    Pending: appointments.filter((a) => a.status === "Pending").length,
    Approved: appointments.filter((a) => a.status === "Approved").length,
    Completed: appointments.filter((a) => a.status === "Completed").length,
    Rejected: appointments.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div className="space-y-5 max-w-6xl" data-ocid="appointments-page">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            My Appointments
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage all your patient appointments
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="gap-1.5 border-border text-muted-foreground hover:text-foreground"
          data-ocid="refresh-appointments"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </Button>
      </motion.div>

      {/* Filters + Search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex gap-1 flex-wrap" data-ocid="status-tabs">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth flex items-center gap-1.5 ${
                      activeTab === tab
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    data-ocid={`tab-${tab.toLowerCase()}`}
                  >
                    {tab}
                    <span
                      className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                        activeTab === tab
                          ? "bg-accent-foreground/20 text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tabCounts[tab]}
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search patient, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-8 h-9 text-sm"
                  data-ocid="search-appointments"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-card border-border overflow-hidden">
          <CardHeader className="py-3 px-5 border-b border-border">
            <CardTitle className="font-display text-base text-foreground">
              {activeTab === "All"
                ? "All Appointments"
                : `${activeTab} Appointments`}
              <span className="text-muted-foreground font-normal text-sm ml-2">
                ({filtered.length})
              </span>
            </CardTitle>
          </CardHeader>
          <div className="overflow-x-auto">
            {isLoading ? (
              <TableSkeleton />
            ) : isError ? (
              <div className="p-10 text-center" data-ocid="appointments-error">
                <XCircle className="w-9 h-9 text-destructive mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Failed to load appointments
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetch()}
                  className="mt-3 border-border"
                >
                  Retry
                </Button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center" data-ocid="appointments-empty">
                <Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium text-sm">
                  No {activeTab !== "All" ? `${activeTab.toLowerCase()} ` : ""}
                  appointments found
                </p>
                {search && (
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    Try clearing the search filter
                  </p>
                )}
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Date / Time
                    </th>
                    <th className="px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Patient
                    </th>
                    <th className="px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Problem
                    </th>
                    <th className="px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-5 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((appt) => (
                    <AppointmentRow
                      key={appt.id.toString()}
                      appt={appt}
                      onAccept={handleAccept}
                      onReject={handleReject}
                      onComplete={handleComplete}
                      onReschedule={setRescheduleTarget}
                      isUpdating={updateStatus.isPending}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </motion.div>

      {rescheduleTarget && (
        <RescheduleModal
          appt={rescheduleTarget}
          doctorId={doctorId}
          onClose={() => setRescheduleTarget(null)}
        />
      )}
    </div>
  );
}
