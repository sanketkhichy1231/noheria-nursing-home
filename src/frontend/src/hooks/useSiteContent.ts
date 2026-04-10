import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { FAQ, ServiceCard, SiteContent, Testimonial } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useSiteContent() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<SiteContent | null>({
    queryKey: ["siteContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSiteContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHeroSection() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      heroTitle: string;
      heroTagline: string;
      heroIntro: string;
      heroCtaText: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateHeroSection(
        params.heroTitle,
        params.heroTagline,
        params.heroIntro,
        params.heroCtaText,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}

export function useUpdateServices() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (services: ServiceCard[]) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateServices(services);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}

export function useUpdateTestimonials() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (testimonials: Testimonial[]) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateTestimonials(testimonials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}

export function useUpdateFAQs() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (faqs: FAQ[]) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateFAQs(faqs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}

export function useUpdateContactInfo() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      address: string;
      phone: string;
      email: string;
      hours: string;
      mapUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateContactInfo(
        params.address,
        params.phone,
        params.email,
        params.hours,
        params.mapUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["siteContent"] });
    },
  });
}
