import { d as useQuery, e as useQueryClient, f as useActor, h as createActor } from "./index-b-kEL4Ku.js";
import { u as useMutation } from "./useMutation-DbJwC5eP.js";
function useBackendActor() {
  return useActor(createActor);
}
function useDoctors() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDoctors();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddDoctor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addDoctor(
        params.name,
        params.specialization,
        params.email,
        params.phone
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    }
  });
}
function useEditDoctor() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.editDoctor(
        params.id,
        params.name,
        params.specialization,
        params.email,
        params.phone
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    }
  });
}
function useSetDoctorAvailability() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.setDoctorAvailability(params.doctorId, params.availability);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    }
  });
}
function useToggleDoctorOnlineStatus() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.toggleDoctorOnlineStatus(params.doctorId, params.isOnline);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    }
  });
}
export {
  useToggleDoctorOnlineStatus as a,
  useAddDoctor as b,
  useEditDoctor as c,
  useSetDoctorAvailability as d,
  useDoctors as u
};
