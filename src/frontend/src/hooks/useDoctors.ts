import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { AvailabilitySlot, Doctor, DoctorPublic } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useDoctors() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<DoctorPublic[]>({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDoctors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDoctorById(id: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Doctor | null>({
    queryKey: ["doctor", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getDoctorById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useAddDoctor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      specialization: string;
      email: string;
      phone: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addDoctor(
        params.name,
        params.specialization,
        params.email,
        params.phone,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}

export function useEditDoctor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      name: string;
      specialization: string;
      email: string;
      phone: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.editDoctor(
        params.id,
        params.name,
        params.specialization,
        params.email,
        params.phone,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
  });
}

export function useRemoveDoctor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      // Backend doesn't have removeDoctor — use editDoctor with inactive status
      throw new Error("removeDoctor not available in backend");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
}

export function useSetDoctorAvailability() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      doctorId: bigint;
      availability: AvailabilitySlot[];
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setDoctorAvailability(params.doctorId, params.availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
  });
}

export function useToggleDoctorOnlineStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: { doctorId: bigint; isOnline: boolean }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.toggleDoctorOnlineStatus(params.doctorId, params.isOnline);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
  });
}
