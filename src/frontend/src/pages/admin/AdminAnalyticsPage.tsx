import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
import { useDoctors } from "../../hooks/useDoctors";

type PeriodKey = "7" | "30" | "90";

const PERIOD_OPTIONS: { label: string; value: PeriodKey }[] = [
  { label: "7 Days", value: "7" },
  { label: "30 Days", value: "30" },
  { label: "90 Days", value: "90" },
];

function KpiCard({
  label,
  value,
  sub,
  loading,
}: { label: string; value: string; sub?: string; loading?: boolean }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-5">
        <p className="text-muted-foreground text-xs uppercase tracking-wider font-medium">
          {label}
        </p>
        {loading ? (
          <Skeleton className="h-8 w-16 mt-1" />
        ) : (
          <p className="text-3xl font-display font-bold text-foreground mt-1">
            {value}
          </p>
        )}
        {sub && <p className="text-muted-foreground text-xs mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

const TOOLTIP_STYLE = {
  background: "oklch(var(--card))",
  border: "1px solid oklch(var(--border))",
  borderRadius: "8px",
  color: "oklch(var(--foreground))",
  fontSize: 12,
};

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<PeriodKey>("30");
  const { data: stats, isLoading: loadingStats } = useAppointmentStats();
  const { data: trend, isLoading: loadingTrend } = useAppointmentTrend(
    BigInt(Number(period)),
  );
  const { data: appointments, isLoading: loadingAppts } = useAppointments();
  const { data: doctors, isLoading: loadingDoctors } = useDoctors();

  const total = Number(stats?.total ?? 0);
  const completed = Number(stats?.completed ?? 0);
  const pending = Number(stats?.pending ?? 0);
  const cancelled = Number(stats?.cancelled ?? 0);
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const trendData =
    trend?.map((t) => ({ date: t.date.slice(5), count: Number(t.count) })) ??
    [];

  const doctorStats =
    doctors
      ?.map((doc) => {
        const docAppts =
          appointments?.filter((a) => a.doctorId === doc.id) ?? [];
        const totalD = docAppts.length;
        const acceptedD = docAppts.filter(
          (a) => a.status === "Approved",
        ).length;
        const rejectedD = docAppts.filter(
          (a) => a.status === "Rejected",
        ).length;
        const completedD = docAppts.filter(
          (a) => a.status === "Completed",
        ).length;
        const pendingD = docAppts.filter((a) => a.status === "Pending").length;
        const rate = totalD > 0 ? Math.round((completedD / totalD) * 100) : 0;
        return {
          name: doc.name,
          specialization: doc.specialization,
          total: totalD,
          accepted: acceptedD,
          rejected: rejectedD,
          completed: completedD,
          pending: pendingD,
          rate,
        };
      })
      .sort((a, b) => b.total - a.total) ?? [];

  const barData = doctorStats.slice(0, 8).map((d) => ({
    name: d.name.split(" ").pop() ?? d.name,
    Total: d.total,
    Completed: d.completed,
    Pending: d.pending,
    Rejected: d.rejected,
  }));

  const tickStyle = { fill: "oklch(var(--muted-foreground))", fontSize: 11 };

  return (
    <div className="space-y-6" data-ocid="admin-analytics">
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground">
          Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Performance metrics and insights
        </p>
      </div>

      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="analytics-kpis"
      >
        <KpiCard
          label="Total Appointments"
          value={String(total)}
          loading={loadingStats}
        />
        <KpiCard
          label="Completion Rate"
          value={`${completionRate}%`}
          sub={`${completed} completed`}
          loading={loadingStats}
        />
        <KpiCard
          label="Pending"
          value={String(pending)}
          loading={loadingStats}
        />
        <KpiCard
          label="Cancelled"
          value={String(cancelled)}
          loading={loadingStats}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-base font-display font-semibold">
                Appointment Trend
              </CardTitle>
              <div
                className="flex gap-1 bg-muted rounded-md p-0.5"
                data-ocid="period-selector"
              >
                {PERIOD_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPeriod(value)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${period === value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingTrend ? (
              <Skeleton className="h-52 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis dataKey="date" tick={tickStyle} />
                  <YAxis tick={tickStyle} allowDecimals={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
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
              <Skeleton className="h-52 w-full" />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                  />
                  <XAxis dataKey="name" tick={tickStyle} />
                  <YAxis tick={tickStyle} allowDecimals={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Legend
                    wrapperStyle={{
                      fontSize: 11,
                      color: "oklch(var(--muted-foreground))",
                    }}
                  />
                  <Bar
                    dataKey="Total"
                    fill="oklch(var(--primary))"
                    name="Total"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="Completed"
                    fill="oklch(var(--accent))"
                    name="Completed"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="Pending"
                    fill="#f59e0b"
                    name="Pending"
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="Rejected"
                    fill="#ef4444"
                    name="Rejected"
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-base font-display font-semibold">
            Doctor Statistics
          </CardTitle>
        </CardHeader>
        {loadingDoctors || loadingAppts ? (
          <div className="p-4 space-y-2">
            {["a", "b", "c", "d"].map((k) => (
              <Skeleton key={k} className="h-10 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5 font-medium">Doctor</th>
                  <th className="text-right px-4 py-2.5 font-medium">Total</th>
                  <th className="text-right px-4 py-2.5 font-medium">
                    Accepted
                  </th>
                  <th className="text-right px-4 py-2.5 font-medium">
                    Rejected
                  </th>
                  <th className="text-right px-4 py-2.5 font-medium">
                    Completed
                  </th>
                  <th className="text-right px-4 py-2.5 font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {doctorStats.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground text-sm"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  doctorStats.map((d) => (
                    <tr
                      key={d.name}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                      data-ocid="analytics-doctor-row"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-sm text-foreground">
                          {d.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {d.specialization}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-sm text-foreground">
                        {d.total}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-sm text-green-400">
                        {d.accepted}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-sm text-destructive">
                        {d.rejected}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-sm text-accent">
                        {d.completed}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${d.rate >= 70 ? "bg-green-500/20 text-green-400" : d.rate >= 40 ? "bg-yellow-500/20 text-yellow-400" : "bg-destructive/20 text-destructive"}`}
                        >
                          {d.rate}%
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
