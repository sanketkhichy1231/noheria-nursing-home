import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { UserProfile } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useAuth() {
  const { identity, login, clear, loginStatus, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const { actor, isFetching } = useBackendActor();

  const isAuthenticated = !!identity;

  const principal = identity?.getPrincipal();

  const { data: userProfile, isLoading: isLoadingProfile } =
    useQuery<UserProfile | null>({
      queryKey: ["currentUser", principal?.toText()],
      queryFn: async () => {
        if (!actor) return null;
        return actor.getCallerUserProfile();
      },
      enabled: !!actor && !isFetching && isAuthenticated,
    });

  const { data: isAdminResult } = useQuery<boolean>({
    queryKey: ["isAdmin", principal?.toText()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const role = userProfile?.role ?? null;

  const isAdmin = isAdminResult === true;
  const isDoctor = role === "doctor";
  const isStaff = role === "staff";

  return {
    identity,
    principal,
    isAuthenticated,
    login,
    logout: clear,
    loginStatus,
    isInitializing,
    isLoggingIn,
    userProfile: userProfile ?? null,
    isLoadingProfile,
    role,
    isAdmin,
    isDoctor,
    isStaff,
  };
}
