import { d as useQuery, e as useQueryClient, f as useActor, h as createActor } from "./index-b-kEL4Ku.js";
import { u as useMutation } from "./useMutation-DbJwC5eP.js";
function useBackendActor() {
  return useActor(createActor);
}
function useSiteContent() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["siteContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteContent();
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateHeroSection() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateHeroSection(
        params.heroTitle,
        params.heroTagline,
        params.heroIntro,
        params.heroCtaText
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    }
  });
}
function useUpdateServices() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (services) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateServices(services);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    }
  });
}
function useUpdateTestimonials() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonials) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateTestimonials(testimonials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    }
  });
}
function useUpdateFAQs() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (faqs) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateFAQs(faqs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    }
  });
}
function useUpdateContactInfo() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateContactInfo(
        params.address,
        params.phone,
        params.email,
        params.hours,
        params.mapUrl
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    }
  });
}
export {
  useUpdateHeroSection as a,
  useUpdateServices as b,
  useUpdateTestimonials as c,
  useUpdateFAQs as d,
  useUpdateContactInfo as e,
  useSiteContent as u
};
