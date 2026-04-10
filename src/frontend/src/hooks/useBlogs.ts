import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Blog } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function usePublishedBlogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Blog[]>({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedBlogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllBlogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Blog[]>({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogById(id: bigint | null) {
  const { data: allBlogs } = useAllBlogs();
  return {
    data: allBlogs?.find((b) => b.id === id) ?? null,
  };
}

export function useCreateBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      title: string;
      content: string;
      imageUrl: string;
      blogType: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBlog(
        params.title,
        params.content,
        params.imageUrl,
        params.blogType,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    },
  });
}

export function useEditBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      title: string;
      content: string;
      imageUrl: string;
      blogType: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.editBlog(
        params.id,
        params.title,
        params.content,
        params.imageUrl,
        params.blogType,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    },
  });
}

export function useDeleteBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteBlog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    },
  });
}

export function usePublishBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.publishBlog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    },
  });
}

export function useUnpublishBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.unpublishBlog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    },
  });
}
