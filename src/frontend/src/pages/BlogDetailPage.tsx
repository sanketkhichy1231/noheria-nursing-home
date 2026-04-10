import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useBlogById, usePublishedBlogs } from "../hooks/useBlogs";

function estimateReadTime(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getInitials(str: string): string {
  return str
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function BlogDetailPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const blogId = params.id ? BigInt(params.id) : null;
  const { data: blog } = useBlogById(blogId);
  const { data: allBlogs, isLoading: blogsLoading } = usePublishedBlogs();

  const related = (allBlogs ?? [])
    .filter((b) => b.id !== blogId && b.blogType === (blog?.blogType ?? ""))
    .slice(0, 3);

  if (!blog && !blogsLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0f1624" }}
      >
        <div className="text-center py-20">
          <BookOpen className="w-14 h-14 text-white/20 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Article Not Found
          </h2>
          <p className="text-white/50 mb-6">
            This article may have been removed or is unavailable.
          </p>
          <Link to="/">
            <Button className="bg-[#dc2626] hover:bg-[#e11d48] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f1624" }}>
      {/* Hero image / header */}
      <div className="relative bg-[#151e30] border-b border-white/8">
        {blog?.imageUrl ? (
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1624] via-[#0f1624]/60 to-transparent" />
          </div>
        ) : (
          <div className="h-40 bg-gradient-to-br from-[#dc2626]/15 to-[#151e30]" />
        )}

        <div className="container mx-auto px-4 pb-10 relative">
          {/* Back link */}
          <div className="pt-6 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#e11d48] text-sm transition-colors"
              data-ocid="back-to-home"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          {blog ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge
                  className={`text-xs ${blog.blogType === "Video" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30"}`}
                >
                  {blog.blogType === "Video" ? (
                    <>
                      <Video className="w-3 h-3 mr-1" />
                      Video
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-3 h-3 mr-1" />
                      Article
                    </>
                  )}
                </Badge>
                <span className="text-white/40 text-xs flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {formatDate(blog.createdAt)}
                </span>
                <span className="text-white/40 text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {estimateReadTime(blog.content)} min read
                </span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl">
                {blog.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#dc2626]/25 flex items-center justify-center text-[#e11d48] font-bold text-sm shrink-0">
                  {blog.authorId ? getInitials(blog.authorId) : "NH"}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    Noheria Medical Team
                  </p>
                  <p className="text-white/40 text-xs">
                    Noheria Nursing Home, Panchkula
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-3 mt-2">
              <Skeleton className="h-8 w-40 bg-white/5" />
              <Skeleton className="h-14 w-3/4 bg-white/5" />
              <Skeleton className="h-14 w-2/3 bg-white/5" />
              <Skeleton className="h-10 w-44 bg-white/5" />
            </div>
          )}
        </div>
      </div>

      {/* Article body */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <article className="lg:col-span-2">
            {blog ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div
                  className="prose prose-invert prose-p:text-white/70 prose-headings:text-white prose-headings:font-display prose-a:text-[#e11d48] prose-strong:text-white prose-li:text-white/70 max-w-none text-base leading-relaxed"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: Blog content is stored as rich HTML from the admin editor
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags / share */}
                <div className="mt-10 pt-6 border-t border-white/8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-sm">Category:</span>
                    <Badge className="bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30">
                      {blog.blogType}
                    </Badge>
                  </div>
                  <Link to="/book">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#dc2626] hover:bg-[#e11d48] text-white rounded-lg text-sm font-semibold transition-smooth"
                      data-ocid="blog-book-appointment"
                    >
                      <CalendarDays className="w-4 h-4" /> Book Appointment
                    </button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {["bl1", "bl2", "bl3", "bl4", "bl5", "bl6", "bl7", "bl8"].map(
                  (k, i) => (
                    <Skeleton
                      key={k}
                      className={`h-4 bg-white/5 ${i % 3 === 2 ? "w-3/4" : "w-full"}`}
                    />
                  ),
                )}
              </div>
            )}
          </article>

          {/* Sidebar — related articles */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <h3 className="font-display text-lg font-semibold text-white mb-4">
                Related Articles
              </h3>

              {blogsLoading ? (
                <div className="space-y-4">
                  {["r1", "r2", "r3"].map((k) => (
                    <Skeleton key={k} className="h-24 rounded-xl bg-white/5" />
                  ))}
                </div>
              ) : related.length === 0 ? (
                <p className="text-white/40 text-sm">
                  No related articles yet.
                </p>
              ) : (
                related.map((b) => (
                  <Card
                    key={b.id.toString()}
                    className="bg-[#1a2035] border-white/8 hover:border-[#dc2626]/40 transition-smooth group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={`text-[10px] ${b.blogType === "Video" ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-[#dc2626]/15 text-[#e11d48] border-[#dc2626]/30"}`}
                        >
                          {b.blogType}
                        </Badge>
                        <span className="text-white/35 text-[10px]">
                          {formatDate(b.createdAt)}
                        </span>
                      </div>
                      <h4 className="text-white text-sm font-semibold mb-2 line-clamp-2 group-hover:text-[#e11d48] transition-colors">
                        {b.title}
                      </h4>
                      <Link
                        to="/blog/$id"
                        params={{ id: b.id.toString() }}
                        className="inline-flex items-center gap-1 text-[#e11d48] text-xs font-semibold"
                        data-ocid={`related-blog-${b.id}`}
                      >
                        Read <ChevronRight className="w-3 h-3" />
                      </Link>
                    </CardContent>
                  </Card>
                ))
              )}

              {/* CTA card */}
              <Card className="bg-[#dc2626]/10 border-[#dc2626]/25 mt-6">
                <CardContent className="p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#dc2626]/20 flex items-center justify-center mx-auto mb-3">
                    <CalendarDays className="w-5 h-5 text-[#e11d48]" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Need a Consultation?
                  </h4>
                  <p className="text-white/50 text-xs mb-4">
                    Book an appointment with our specialist doctors today.
                  </p>
                  <Link to="/book">
                    <Button
                      size="sm"
                      className="w-full bg-[#dc2626] hover:bg-[#e11d48] text-white text-xs"
                      data-ocid="sidebar-book-btn"
                    >
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
