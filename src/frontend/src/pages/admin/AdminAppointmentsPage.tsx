import { ChevronDown, ChevronUp, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Skeleton } from "../../components/ui/skeleton";
import {
  useAppointments,
  useDeleteAppointment,
  useRescheduleAppointment,
  useUpdateAppointmentStatus,
} from "../../hooks/useAppointments";
import { useDoctors } from "../../hooks/useDoctors";
import type { Appointment, DoctorPublic } from "../../types";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Approved: "bg-green-500/20 text-green-400 border-green-500/30",
  Rejected: "bg-destructive/20 text-destructive border-destructive/30",
  Completed: "bg-green-600/20 text-green-300 border-green-600/30",
  Cancelled: "bg-muted text-muted-foreground border-border",
  Rescheduled: "bg-primary/20 text-primary border-primary/30",
};

const STATUS_FILTERS = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Completed",
  "Cancelled",
];

function RescheduleModal({
  appointment,
  doctors,
  onClose,
}: {
  appointment: Appointment;
  doctors: DoctorPublic[];
  onClose: () => void;
}) {
  const [newDate, setNewDate] = useState(appointment.date);
  const [newSlot, setNewSlot] = useState(appointment.slot);
  const [doctorId, setDoctorId] = useState(appointment.doctorId.toString());
  const reschedule = useRescheduleAppointment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await reschedule.mutateAsync({
        id: appointment.id,
        newDate,
        newSlot,
        newDoctorId: doctorId ? BigInt(doctorId) : null,
      });
      toast.success("Appointment rescheduled");
      onClose();
    } catch {
      toast.error("Failed to reschedule");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Patient</Label>
            <p className="text-foreground font-medium text-sm mt-1">
              {appointment.patientName}
            </p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="newDate">New Date</Label>
            <Input
              id="newDate"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-background"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="newSlot">New Time Slot</Label>
            <Input
              id="newSlot"
              value={newSlot}
              onChange={(e) => setNewSlot(e.target.value)}
              placeholder="e.g. 09:00 - 09:30"
              className="bg-background"
              required
            />
          </div>
          <div className="space-y-1">
            <Label>Doctor</Label>
            <Select value={doctorId} onValueChange={setDoctorId}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {doctors.map((d) => (
                  <SelectItem key={d.id.toString()} value={d.id.toString()}>
                    {d.name} — {d.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={reschedule.isPending}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {reschedule.isPending ? "Saving…" : "Reschedule"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function AppointmentRow({
  appt,
  doctors,
}: { appt: Appointment; doctors: DoctorPublic[] }) {
  const [expanded, setExpanded] = useState(false);
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const updateStatus = useUpdateAppointmentStatus();
  const deleteAppt = useDeleteAppointment();

  const doctor = doctors.find((d) => d.id === appt.doctorId);

  const handleStatus = async (status: string) => {
    try {
      await updateStatus.mutateAsync({
        id: appt.id,
        newStatus: status.toLowerCase(),
        notes: null,
      });
      toast.success(`Appointment ${status.toLowerCase()}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this appointment?")) return;
    try {
      await deleteAppt.mutateAsync(appt.id);
      toast.success("Appointment deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <tr
        className="border-b border-border hover:bg-muted/30 transition-colors"
        data-ocid={`appt-row-${appt.id}`}
      >
        <td className="py-3 px-4">
          <div className="font-medium text-sm text-foreground">
            {appt.patientName}
          </div>
          <div className="text-muted-foreground text-xs">{appt.phone}</div>
        </td>
        <td className="py-3 px-4 text-sm text-muted-foreground">
          {doctor?.name ?? "—"}
        </td>
        <td className="py-3 px-4 text-sm text-muted-foreground">
          <div>{appt.date}</div>
          <div className="text-xs">{appt.slot}</div>
        </td>
        <td className="py-3 px-4">
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border font-medium ${STATUS_COLORS[appt.status] ?? "bg-muted text-muted-foreground"}`}
          >
            {appt.status}
          </span>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {appt.status === "Pending" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10"
                  onClick={() => handleStatus("Approved")}
                  disabled={updateStatus.isPending}
                  data-ocid="appt-approve-btn"
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
                  onClick={() => handleStatus("Rejected")}
                  disabled={updateStatus.isPending}
                  data-ocid="appt-reject-btn"
                >
                  Reject
                </Button>
              </>
            )}
            {(appt.status === "Approved" || appt.status === "Rescheduled") && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-green-500/40 text-green-400 hover:bg-green-500/10"
                onClick={() => handleStatus("Completed")}
                disabled={updateStatus.isPending}
                data-ocid="appt-complete-btn"
              >
                Complete
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => setRescheduleOpen(true)}
              data-ocid="appt-reschedule-btn"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
              onClick={handleDelete}
              disabled={deleteAppt.isPending}
              data-ocid="appt-delete-btn"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            <button
              type="button"
              className="p-1 text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded(!expanded)}
              aria-label="Toggle details"
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-muted/20 border-b border-border">
          <td colSpan={5} className="px-4 py-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Problem:</span>{" "}
            {appt.problem || "—"}&nbsp;&nbsp;
            <span className="font-medium text-foreground">Notes:</span>{" "}
            {appt.notes || "None"}
          </td>
        </tr>
      )}
      {rescheduleOpen && (
        <RescheduleModal
          appointment={appt}
          doctors={doctors}
          onClose={() => setRescheduleOpen(false)}
        />
      )}
    </>
  );
}

export default function AdminAppointmentsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");

  const {
    data: appointments,
    isLoading,
    error,
    refetch,
  } = useAppointments(statusFilter === "All" ? null : statusFilter);
  const { data: doctors = [] } = useDoctors();

  const filtered =
    appointments?.filter((a) => {
      if (search && !a.patientName.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (dateFrom && a.date < dateFrom) return false;
      if (dateTo && a.date > dateTo) return false;
      return true;
    }) ?? [];

  return (
    <div className="space-y-5" data-ocid="admin-appointments">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Appointments
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage all patient appointments
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1">
              <Label className="text-xs">Search Patient</Label>
              <Input
                placeholder="Search by name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background h-8 text-sm w-44"
                data-ocid="appt-search-input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className="bg-background h-8 text-sm w-36"
                  data-ocid="appt-status-filter"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {STATUS_FILTERS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">From</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-background h-8 text-sm w-36"
                data-ocid="appt-date-from"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-background h-8 text-sm w-36"
                data-ocid="appt-date-to"
              />
            </div>
            {(dateFrom || dateTo || search) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => {
                  setDateFrom("");
                  setDateTo("");
                  setSearch("");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="pb-2 px-4 pt-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            {filtered.length} appointment{filtered.length !== 1 ? "s" : ""}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="h-7 text-xs"
          >
            <RefreshCw className="w-3 h-3 mr-1" /> Refresh
          </Button>
        </CardHeader>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {["a", "b", "c", "d", "e"].map((k) => (
                <Skeleton key={k} className="h-12 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="p-8 text-center text-destructive">
              Failed to load.{" "}
              <button
                type="button"
                className="underline"
                onClick={() => refetch()}
              >
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="p-8 text-center text-muted-foreground"
              data-ocid="appt-empty-state"
            >
              No appointments found.
            </div>
          ) : (
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5 font-medium">Patient</th>
                  <th className="text-left px-4 py-2.5 font-medium">Doctor</th>
                  <th className="text-left px-4 py-2.5 font-medium">
                    Date / Slot
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((appt) => (
                  <AppointmentRow
                    key={appt.id.toString()}
                    appt={appt}
                    doctors={doctors}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
