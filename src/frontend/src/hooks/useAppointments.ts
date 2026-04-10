import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Appointment } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useAppointments(
  statusFilter: string | null = null,
  doctorIdFilter: bigint | null = null,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Appointment[]>({
    queryKey: ["appointments", statusFilter, doctorIdFilter?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointments(statusFilter, doctorIdFilter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAppointmentsByDoctor(doctorId: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Appointment[]>({
    queryKey: ["appointmentsByDoctor", doctorId?.toString()],
    queryFn: async () => {
      if (!actor || doctorId === null) return [];
      return actor.getAppointmentsByDoctor(doctorId);
    },
    enabled: !!actor && !isFetching && doctorId !== null,
  });
}

export function useAvailableSlots(
  date: string,
  doctorId: bigint | null = null,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<string[]>({
    queryKey: ["availableSlots", date, doctorId?.toString()],
    queryFn: async () => {
      if (!actor || !date) return [];
      return actor.getAvailableSlots(date, doctorId);
    },
    enabled: !!actor && !isFetching && !!date,
  });
}

export function useCreateAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      patientName: string;
      phone: string;
      problem: string;
      date: string;
      slot: string;
      doctorId: bigint | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createAppointment(
        params.patientName,
        params.phone,
        params.problem,
        params.date,
        params.slot,
        params.doctorId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      newStatus: string;
      notes: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateAppointmentStatus(
        params.id,
        params.newStatus,
        params.notes,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsByDoctor"] });
    },
  });
}

export function useRescheduleAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      newDate: string;
      newSlot: string;
      newDoctorId: bigint | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.rescheduleAppointment(
        params.id,
        params.newDate,
        params.newSlot,
        params.newDoctorId,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsByDoctor"] });
      queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
    },
  });
}

export function useDeleteAppointment() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteAppointment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
