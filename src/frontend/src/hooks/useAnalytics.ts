import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AppointmentStats,
  AppointmentSummary,
  TrendEntry,
} from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useAppointmentStats() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AppointmentSummary | null>({
    queryKey: ["appointmentStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAppointmentStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDoctorStats(doctorId: bigint | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AppointmentStats | null>({
    queryKey: ["doctorStats", doctorId?.toString()],
    queryFn: async () => {
      if (!actor || doctorId === null) return null;
      return actor.getDoctorStats(doctorId);
    },
    enabled: !!actor && !isFetching && doctorId !== null,
  });
}

export function useAppointmentTrend(days: bigint = BigInt(30)) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<TrendEntry[]>({
    queryKey: ["appointmentTrend", days.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointmentTrend(days);
    },
    enabled: !!actor && !isFetching,
  });
}
