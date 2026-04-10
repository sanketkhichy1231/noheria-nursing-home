import { Link } from "@tanstack/react-router";
import { Calendar, CheckCircle, FileText, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import {
  useAppointmentStats,
  useAppointmentTrend,
} from "../../hooks/useAnalytics";
import { useAppointments } from "../../hooks/useAppointments";
import { useAllBlogs } from "../../hooks/useBlogs";
import { useDoctors } from "../../hooks/useDoctors";

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  accent = false,
  green = false,
  loading = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  green?: boolean;
  loading?: boolean;
}) {
  const colorClass = green
    ? "text-green-400"
    : accent
      ? "text-accent"
      : "text-foreground";
  const bgClass = green
    ? "bg-green-500/20"
    : accent
      ? "bg-accent/20"
      : "bg-muted";
  const iconClass = green
    ? "text-green-400"
    : accent
      ? "text-accent"
      : "text-muted-foreground";

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
              {label}
            </p>
            {loading ? (
              <Skeleton className="h-8 w-20 mt-1" />
            ) : (
              <p
                className={`text-3xl font-display font-bold mt-1 ${colorClass}`}
              >
                {value}
              </p>
            )}
            {sub && !loading && (
              <p className="text-muted-foreground text-xs mt-1">{sub}</p>
            )}
          </div>
          <div className={`p-2.5 rounded-lg ${bgClass}`}>
            <Icon className={`w-5 h-5 ${iconClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const { data: appointments, isLoading: loadingAppts } = useAppointments();
  const { data: doctors, isLoading: loadingDoctors } = useDoctors();
  const { data: blogs, isLoading: loadingBlogs } = useAllBlogs();
  const { data: stats, isLoading: loadingStats } = useAppointmentStats();
  const { data: trend, isLoading: loadingTrend } = useAppointmentTrend(
    BigInt(7),
  );

  const pendingCount =
    appointments?.filter((a) => a.status === "Pending").length ?? 0;
  const activeDoctors = doctors?.filter((d) => d.isOnline).length ?? 0;
  const publishedBlogs =
    blogs?.filter((b) => b.status === "Published").length ?? 0;

  const trendData =
    trend?.map((t) => ({
      date: t.date.slice(5),
      count: Number(t.count),
    })) ?? [];

  const doctorBarData =
    doctors?.slice(0, 8).map((d) => ({
      name: d.name.split(" ").slice(-1)[0],
      total: appointments?.filter((a) => a.doctorId === d.id).length ?? 0,
      completed:
        appointments?.filter(
          (a) => a.doctorId === d.id && a.status === "Completed",
        ).length ?? 0,
    })) ?? [];

  // navigation handled via Link components below

  return (
    <div className="space-y-6" data-ocid="admin-dashboard">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back — here's your facility overview
        </p>
      </div>

      {/* KPI Cards */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard-kpis"
      >
        <KpiCard
          icon={Calendar}
          label="Total Appointments"
          value={loadingAppts ? "—" : (appointments?.length ?? 0)}
          sub={`${pendingCount} pending`}
          loading={loadingAppts}
        />
        <KpiCard
          icon={CheckCircle}
          label="Pending Approvals"
          value={loadingAppts ? "—" : pendingCount}
          accent
          loading={loadingAppts}
        />
        <KpiCard
          icon={Users}
          label="Active Doctors"
          value={loadingDoctors ? "—" : activeDoctors}
          sub={`of ${doctors?.length ?? 0} total`}
          green
          loading={loadingDoctors}
        />
        <KpiCard
          icon={FileText}
          label="Published Blogs"
          value={loadingBlogs ? "—" : publishedBlogs}
          sub={`${blogs?.length ?? 0} total`}
          loading={loadingBlogs}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display font-semibold">
              Appointment Trend (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingTrend ? (
              <Skeleton className="h-48 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "8px",
                      color: "oklch(var(--foreground))",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="oklch(var(--accent))"
                    strokeWidth={2}
                    dot={{ fill: "oklch(var(--accent))", r: 4 }}
                    name="Appointments"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display font-semibold">
              Doctor Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDoctors || loadingAppts ? (
              <Skeleton className="h-48 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={doctorBarData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                  />
                  <YAxis
                    tick={{
                      fill: "oklch(var(--muted-foreground))",
                      fontSize: 11,
                    }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "8px",
                      color: "oklch(var(--foreground))",
                      fontSize: 12,
                    }}
                  />
                  <Bar
                    dataKey="total"
                    fill="oklch(var(--primary))"
                    name="Total"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    fill="oklch(var(--accent))"
                    name="Completed"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display font-semibold">
              Appointment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStats ? (
              <div className="space-y-2">
                {["a", "b", "c", "d", "e"].map((k) => (
                  <Skeleton key={k} className="h-7 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  {
                    label: "Total",
                    value: stats?.total ?? 0,
                    color: "text-foreground",
                  },
                  {
                    label: "Approved",
                    value: stats?.approved ?? 0,
                    color: "text-green-400",
                  },
                  {
                    label: "Pending",
                    value: stats?.pending ?? 0,
                    color: "text-yellow-400",
                  },
                  {
                    label: "Completed",
                    value: stats?.completed ?? 0,
                    color: "text-green-300",
                  },
                  {
                    label: "Cancelled",
                    value: stats?.cancelled ?? 0,
                    color: "text-destructive",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-1 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground text-sm">
                      {label}
                    </span>
                    <Badge
                      variant="outline"
                      className={`${color} border-current font-mono`}
                    >
                      {String(value)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display font-semibold">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/appointments">
              <Button
                className="w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90"
                data-ocid="quick-view-appointments"
              >
                <Calendar className="w-4 h-4 mr-2" />
                View Appointments
              </Button>
            </Link>
            <Link to="/admin/doctors">
              <Button
                variant="secondary"
                className="w-full justify-start"
                data-ocid="quick-manage-doctors"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Doctors
              </Button>
            </Link>
            <Link to="/admin/blog">
              <Button
                variant="secondary"
                className="w-full justify-start"
                data-ocid="quick-blog-cms"
              >
                <FileText className="w-4 h-4 mr-2" />
                Blog CMS
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
