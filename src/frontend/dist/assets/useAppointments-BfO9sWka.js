import { e as useQueryClient, d as useQuery, f as useActor, h as createActor } from "./index-b-kEL4Ku.js";
import { u as useMutation } from "./useMutation-DbJwC5eP.js";
function useBackendActor() {
  return useActor(createActor);
}
function useAppointments(statusFilter = null, doctorIdFilter = null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["appointments", statusFilter, doctorIdFilter == null ? void 0 : doctorIdFilter.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointments(statusFilter, doctorIdFilter);
    },
    enabled: !!actor && !isFetching
  });
}
function useAppointmentsByDoctor(doctorId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["appointmentsByDoctor", doctorId == null ? void 0 : doctorId.toString()],
    queryFn: async () => {
      if (!actor || doctorId === null) return [];
      return actor.getAppointmentsByDoctor(doctorId);
    },
    enabled: !!actor && !isFetching && doctorId !== null
  });
}
function useAvailableSlots(date, doctorId = null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["availableSlots", date, doctorId == null ? void 0 : doctorId.toString()],
    queryFn: async () => {
      if (!actor || !date) return [];
      return actor.getAvailableSlots(date, doctorId);
    },
    enabled: !!actor && !isFetching && !!date
  });
}
function useCreateAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createAppointment(
        params.patientName,
        params.phone,
        params.problem,
        params.date,
        params.slot,
        params.doctorId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
    }
  });
}
function useUpdateAppointmentStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateAppointmentStatus(
        params.id,
        params.newStatus,
        params.notes
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsByDoctor"] });
    }
  });
}
function useRescheduleAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rescheduleAppointment(
        params.id,
        params.newDate,
        params.newSlot,
        params.newDoctorId
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsByDoctor"] });
      queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
    }
  });
}
function useDeleteAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    }
  });
}
export {
  useAvailableSlots as a,
  useAppointments as b,
  useUpdateAppointmentStatus as c,
  useDeleteAppointment as d,
  useRescheduleAppointment as e,
  useAppointmentsByDoctor as f,
  useCreateAppointment as u
};
