import { d as useQuery, e as useQueryClient, f as useActor, h as createActor } from "./index-b-kEL4Ku.js";
import { u as useMutation } from "./useMutation-DbJwC5eP.js";
function useBackendActor() {
  return useActor(createActor);
}
function usePublishedBlogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedBlogs();
    },
    enabled: !!actor && !isFetching
  });
}
function useAllBlogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogs();
    },
    enabled: !!actor && !isFetching
  });
}
function useBlogById(id) {
  const { data: allBlogs } = useAllBlogs();
  return {
    data: (allBlogs == null ? void 0 : allBlogs.find((b) => b.id === id)) ?? null
  };
}
function useCreateBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createBlog(
        params.title,
        params.content,
        params.imageUrl,
        params.blogType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    }
  });
}
function useEditBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.editBlog(
        params.id,
        params.title,
        params.content,
        params.imageUrl,
        params.blogType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    }
  });
}
function useDeleteBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteBlog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    }
  });
}
function usePublishBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.publishBlog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    }
  });
}
function useUnpublishBlog() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.unpublishBlog(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
    }
  });
}
export {
  useBlogById as a,
  useAllBlogs as b,
  useDeleteBlog as c,
  usePublishBlog as d,
  useUnpublishBlog as e,
  useCreateBlog as f,
  useEditBlog as g,
  usePublishedBlogs as u
};
