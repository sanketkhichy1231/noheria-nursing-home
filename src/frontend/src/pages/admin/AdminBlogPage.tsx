import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Eye, ImagePlus, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Skeleton } from "../../components/ui/skeleton";
import { Switch } from "../../components/ui/switch";
import {
  useAllBlogs,
  useCreateBlog,
  useDeleteBlog,
  useEditBlog,
  usePublishBlog,
  useUnpublishBlog,
} from "../../hooks/useBlogs";
import type { Blog } from "../../types";

type FilterType = "All" | "Draft" | "Published";

const QUILL_DARK_STYLES = `
  .quill-dark .ql-toolbar { background: oklch(var(--muted)); border-color: oklch(var(--border)) !important; }
  .quill-dark .ql-container { background: oklch(var(--background)); border-color: oklch(var(--border)) !important; color: oklch(var(--foreground)); }
  .quill-dark .ql-editor { min-height: 200px; }
  .quill-dark .ql-stroke { stroke: oklch(var(--muted-foreground)) !important; }
  .quill-dark .ql-fill { fill: oklch(var(--muted-foreground)) !important; }
  .quill-dark .ql-picker-label { color: oklch(var(--muted-foreground)) !important; }
  .quill-dark .ql-picker-options { background: oklch(var(--popover)); border-color: oklch(var(--border)) !important; }
`;

function BlogModal({
  blog,
  onClose,
}: { blog: Blog | null; onClose: () => void }) {
  const [title, setTitle] = useState(blog?.title ?? "");
  const [content, setContent] = useState(blog?.content ?? "");
  const [blogType, setBlogType] = useState(blog?.blogType ?? "Blog");
  const [imageUrl, setImageUrl] = useState(blog?.imageUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState(false);

  const createBlog = useCreateBlog();
  const editBlog = useEditBlog();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setBlogType(blog.blogType);
      setImageUrl(blog.imageUrl);
    }
  }, [blog]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);
    try {
      // Use object URL as image preview (direct upload requires object-storage extension)
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
      setUploadProgress(100);
      toast.success("Image selected");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      if (blog) {
        await editBlog.mutateAsync({
          id: blog.id,
          title,
          content,
          imageUrl,
          blogType,
        });
        toast.success("Blog updated");
      } else {
        await createBlog.mutateAsync({ title, content, imageUrl, blogType });
        toast.success("Blog created");
      }
      onClose();
    } catch {
      toast.error("Failed to save blog");
    }
  };

  const isPending = createBlog.isPending || editBlog.isPending;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-card border-border sm:max-w-2xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            {blog ? "Edit Post" : "Create New Post"}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="ml-auto h-7 text-xs"
              onClick={() => setPreview(!preview)}
            >
              <Eye className="w-3 h-3 mr-1" /> {preview ? "Edit" : "Preview"}
            </Button>
          </DialogTitle>
        </DialogHeader>

        {preview ? (
          <div className="space-y-3 text-sm">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <h2 className="font-display font-bold text-xl text-foreground">
              {title || "Untitled"}
            </h2>
            <section
              className="prose prose-invert max-w-none text-muted-foreground"
              aria-label="Blog content preview"
            >
              <p className="whitespace-pre-wrap text-sm">
                {content.replace(/<[^>]*>/g, " ").trim() || "(No content)"}
              </p>
            </section>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="blogTitle">Title</Label>
              <Input
                id="blogTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background"
                placeholder="Enter post title…"
                required
                data-ocid="blog-title-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Type</Label>
                <Select value={blogType} onValueChange={setBlogType}>
                  <SelectTrigger
                    className="bg-background"
                    data-ocid="blog-type-select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Blog">Blog Article</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Featured Image</Label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer" htmlFor="imageUpload">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-9 text-sm pointer-events-none"
                      tabIndex={-1}
                    >
                      {uploading ? (
                        <>
                          <Upload className="w-3 h-3 mr-1 animate-bounce" />{" "}
                          {uploadProgress}%
                        </>
                      ) : (
                        <>
                          <ImagePlus className="w-3 h-3 mr-1" /> Upload
                        </>
                      )}
                    </Button>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Thumb"
                      className="w-9 h-9 rounded object-cover border border-border"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <Label>Content</Label>
              <div className="quill-dark rounded-md overflow-hidden border border-input">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  style={{ minHeight: "200px" }}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {isPending ? "Saving…" : blog ? "Save Changes" : "Create Post"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function AdminBlogPage() {
  const { data: blogs, isLoading, error, refetch } = useAllBlogs();
  const deleteBlog = useDeleteBlog();
  const publishBlog = usePublishBlog();
  const unpublishBlog = useUnpublishBlog();
  const [filter, setFilter] = useState<FilterType>("All");
  const [modal, setModal] = useState<Blog | null | "new">(null);

  const filtered =
    blogs?.filter((b) => {
      if (filter === "All") return true;
      return b.status === filter;
    }) ?? [];

  const handleDelete = async (b: Blog) => {
    if (!confirm(`Delete "${b.title}"?`)) return;
    try {
      await deleteBlog.mutateAsync(b.id);
      toast.success("Blog deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleTogglePublish = async (b: Blog) => {
    try {
      if (b.status === "Published") {
        await unpublishBlog.mutateAsync(b.id);
        toast.success("Blog unpublished");
      } else {
        await publishBlog.mutateAsync(b.id);
        toast.success("Blog published");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-5" data-ocid="admin-blog">
      <style>{QUILL_DARK_STYLES}</style>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Blog CMS
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage health education content
          </p>
        </div>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setModal("new")}
          data-ocid="create-blog-btn"
        >
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      <div
        className="flex gap-1 border-b border-border"
        data-ocid="blog-filters"
      >
        {(["All", "Draft", "Published"] as FilterType[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${filter === f ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="bg-card border-border overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-2">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-14 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-destructive">
            Failed to load.{" "}
            <button
              type="button"
              className="underline"
              onClick={() => refetch()}
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center" data-ocid="blog-empty-state">
            <p className="text-muted-foreground mb-3">No posts found.</p>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setModal("new")}
            >
              Create First Post
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5 font-medium">Title</th>
                  <th className="text-left px-4 py-2.5 font-medium">Type</th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 font-medium">
                    Published
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr
                    key={b.id.toString()}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                    data-ocid={`blog-row-${b.id}`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-sm text-foreground truncate max-w-xs">
                        {b.title}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">
                        {b.blogType}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={b.status === "Published"}
                          onCheckedChange={() => handleTogglePublish(b)}
                          aria-label="Toggle publish"
                          data-ocid="blog-publish-toggle"
                        />
                        <span
                          className={`text-xs font-medium ${b.status === "Published" ? "text-green-400" : "text-muted-foreground"}`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {b.status === "Published"
                        ? new Date(
                            Number(b.updatedAt) / 1_000_000,
                          ).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => setModal(b)}
                          data-ocid="blog-edit-btn"
                        >
                          <Pencil className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(b)}
                          data-ocid="blog-delete-btn"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {modal !== null && (
        <BlogModal
          blog={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
