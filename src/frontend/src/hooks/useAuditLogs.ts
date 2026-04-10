import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { AuditLog } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useAuditLogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AuditLog[]>({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuditLogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAuditLogsByUser(userId: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AuditLog[]>({
    queryKey: ["auditLogs", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getAuditLogsByUser(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}
