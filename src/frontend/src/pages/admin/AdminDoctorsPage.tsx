import { Edit, Plus, Trash2, Wifi, WifiOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import {
  useAddDoctor,
  useDoctors,
  useEditDoctor,
  useSetDoctorAvailability,
  useToggleDoctorOnlineStatus,
} from "../../hooks/useDoctors";
import type { AvailabilitySlot, DoctorPublic } from "../../types";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface SlotRow {
  dayOfWeek: string;
  startHour: string;
  endHour: string;
}

function AvailabilityEditor({
  slots,
  onChange,
}: { slots: SlotRow[]; onChange: (s: SlotRow[]) => void }) {
  const add = () =>
    onChange([
      ...slots,
      { dayOfWeek: "Monday", startHour: "9", endHour: "17" },
    ]);
  const remove = (i: number) => onChange(slots.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof SlotRow, value: string) => {
    const next = [...slots];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Availability Slots</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={add}
        >
          <Plus className="w-3 h-3 mr-1" /> Add
        </Button>
      </div>
      {slots.length === 0 && (
        <p className="text-muted-foreground text-xs italic">No slots added.</p>
      )}
      {slots.map((slot, i) => (
        <div key={`${slot.dayOfWeek}-${i}`} className="flex gap-2 items-center">
          <select
            value={slot.dayOfWeek}
            onChange={(e) => update(i, "dayOfWeek", e.target.value)}
            className="bg-background border border-input rounded-md px-2 py-1.5 text-sm text-foreground flex-1"
          >
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <Input
            type="number"
            min={0}
            max={23}
            value={slot.startHour}
            onChange={(e) => update(i, "startHour", e.target.value)}
            className="bg-background w-16 text-sm"
            placeholder="Start"
          />
          <span className="text-muted-foreground text-xs">–</span>
          <Input
            type="number"
            min={0}
            max={24}
            value={slot.endHour}
            onChange={(e) => update(i, "endHour", e.target.value)}
            className="bg-background w-16 text-sm"
            placeholder="End"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-destructive h-7 w-7 p-0"
            onClick={() => remove(i)}
            aria-label="Remove slot"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function DoctorModal({
  doctor,
  onClose,
}: { doctor: DoctorPublic | null; onClose: () => void }) {
  const [name, setName] = useState(doctor?.name ?? "");
  const [specialization, setSpecialization] = useState(
    doctor?.specialization ?? "",
  );
  const [email, setEmail] = useState(doctor?.email ?? "");
  const [phone, setPhone] = useState(doctor?.phone ?? "");
  const [slots, setSlots] = useState<SlotRow[]>(
    doctor?.availability.map((a) => ({
      dayOfWeek: a.dayOfWeek,
      startHour: String(a.startHour),
      endHour: String(a.endHour),
    })) ?? [],
  );

  const addDoctor = useAddDoctor();
  const editDoctor = useEditDoctor();
  const setAvailability = useSetDoctorAvailability();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const avail: AvailabilitySlot[] = slots.map((s) => ({
        dayOfWeek: s.dayOfWeek,
        startHour: BigInt(Number(s.startHour)),
        endHour: BigInt(Number(s.endHour)),
      }));

      if (doctor) {
        await editDoctor.mutateAsync({
          id: doctor.id,
          name,
          specialization,
          email,
          phone,
        });
        await setAvailability.mutateAsync({
          doctorId: doctor.id,
          availability: avail,
        });
        toast.success("Doctor updated");
      } else {
        const result = await addDoctor.mutateAsync({
          name,
          specialization,
          email,
          phone,
        });
        if (result.__kind__ === "ok" && avail.length > 0) {
          await setAvailability.mutateAsync({
            doctorId: result.ok,
            availability: avail,
          });
        }
        toast.success("Doctor added");
      }
      onClose();
    } catch {
      toast.error("Failed to save doctor");
    }
  };

  const isPending =
    addDoctor.isPending || editDoctor.isPending || setAvailability.isPending;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-card border-border sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {doctor ? "Edit Doctor" : "Add New Doctor"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="drName">Full Name</Label>
              <Input
                id="drName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="drSpec">Specialization</Label>
              <Input
                id="drSpec"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="bg-background"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="drEmail">Email</Label>
              <Input
                id="drEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="drPhone">Phone</Label>
              <Input
                id="drPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>
          <AvailabilityEditor slots={slots} onChange={setSlots} />
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isPending ? "Saving…" : doctor ? "Save Changes" : "Add Doctor"}
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

export default function AdminDoctorsPage() {
  const { data: doctors, isLoading, error, refetch } = useDoctors();
  const toggleOnline = useToggleDoctorOnlineStatus();
  const [modalDoctor, setModalDoctor] = useState<DoctorPublic | null | "new">(
    null,
  );

  const handleToggle = async (doctor: DoctorPublic) => {
    try {
      await toggleOnline.mutateAsync({
        doctorId: doctor.id,
        isOnline: !doctor.isOnline,
      });
      toast.success(
        `${doctor.name} is now ${!doctor.isOnline ? "online" : "offline"}`,
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-5" data-ocid="admin-doctors">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Doctors
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your medical staff
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setModalDoctor("new")}
          data-ocid="add-doctor-btn"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Doctor
        </Button>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-2">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-16 w-full" />
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
        ) : !doctors?.length ? (
          <div
            className="p-8 text-center text-muted-foreground"
            data-ocid="doctors-empty-state"
          >
            <p className="font-medium mb-2">No doctors added yet.</p>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setModalDoctor("new")}
            >
              Add First Doctor
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5 font-medium">Name</th>
                  <th className="text-left px-4 py-2.5 font-medium">
                    Specialization
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 font-medium">
                    Availability
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr
                    key={doc.id.toString()}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                    data-ocid={`doctor-row-${doc.id}`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-sm text-foreground">
                        {doc.name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {doc.email}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {doc.specialization}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border font-medium ${doc.isOnline ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-muted text-muted-foreground border-border"}`}
                      >
                        {doc.isOnline ? (
                          <Wifi className="w-3 h-3" />
                        ) : (
                          <WifiOff className="w-3 h-3" />
                        )}
                        {doc.isOnline ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {doc.availability.length} slot
                      {doc.availability.length !== 1 ? "s" : ""}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => setModalDoctor(doc)}
                          data-ocid="doctor-edit-btn"
                        >
                          <Edit className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`h-7 text-xs ${doc.isOnline ? "border-destructive/40 text-destructive hover:bg-destructive/10" : "border-green-500/40 text-green-400 hover:bg-green-500/10"}`}
                          onClick={() => handleToggle(doc)}
                          disabled={toggleOnline.isPending}
                          data-ocid="doctor-toggle-btn"
                        >
                          {doc.isOnline ? (
                            <WifiOff className="w-3 h-3 mr-1" />
                          ) : (
                            <Wifi className="w-3 h-3 mr-1" />
                          )}
                          {doc.isOnline ? "Go Offline" : "Go Online"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {modalDoctor !== null && (
        <DoctorModal
          doctor={modalDoctor === "new" ? null : modalDoctor}
          onClose={() => setModalDoctor(null)}
        />
      )}
    </div>
  );
}
