import { RefreshCw, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import { useAuditLogs } from "../../hooks/useAuditLogs";

const PAGE_SIZE = 25;

function truncatePrincipal(p: string): string {
  if (p.length <= 20) return p;
  return `${p.slice(0, 8)}…${p.slice(-8)}`;
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function AdminAuditLogsPage() {
  const { data: logs, isLoading, error, refetch } = useAuditLogs();
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!logs) return [];
    return logs
      .filter((l) => {
        const lSearch = search.toLowerCase();
        if (
          search &&
          !l.action.toLowerCase().includes(lSearch) &&
          !l.details.toLowerCase().includes(lSearch)
        )
          return false;
        if (dateFrom) {
          const logDate = new Date(Number(l.timestamp) / 1_000_000)
            .toISOString()
            .slice(0, 10);
          if (logDate < dateFrom) return false;
        }
        if (dateTo) {
          const logDate = new Date(Number(l.timestamp) / 1_000_000)
            .toISOString()
            .slice(0, 10);
          if (logDate > dateTo) return false;
        }
        return true;
      })
      .sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1));
  }, [logs, search, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleClear = () => {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  const pageNumbers = useMemo(() => {
    const count = Math.min(totalPages, 7);
    return Array.from({ length: count }, (_, i) => {
      if (totalPages <= 7) return i + 1;
      if (page <= 4) return i + 1;
      if (page >= totalPages - 3) return totalPages - 6 + i;
      return page - 3 + i;
    });
  }, [totalPages, page]);

  return (
    <div className="space-y-5" data-ocid="admin-audit-logs">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Audit Logs
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            All system actions and changes
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Refresh
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div className="space-y-1">
              <Label className="text-xs">Search Action</Label>
              <Input
                placeholder="Search action or details…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="bg-background h-8 text-sm w-52"
                data-ocid="audit-search-input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">From</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setPage(1);
                }}
                className="bg-background h-8 text-sm w-36"
                data-ocid="audit-date-from"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">To</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setPage(1);
                }}
                className="bg-background h-8 text-sm w-36"
                data-ocid="audit-date-to"
              />
            </div>
            {(search || dateFrom || dateTo) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={handleClear}
              >
                <X className="w-3 h-3 mr-1" /> Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border overflow-hidden">
        <CardHeader className="pb-2 px-4 pt-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            {filtered.length} log{filtered.length !== 1 ? "s" : ""} found
          </CardTitle>
          <span className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </span>
        </CardHeader>

        {isLoading ? (
          <div className="p-4 space-y-2">
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <Skeleton key={k} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-destructive">
            Failed to load logs.{" "}
            <button
              type="button"
              className="underline"
              onClick={() => refetch()}
            >
              Retry
            </button>
          </div>
        ) : paginated.length === 0 ? (
          <div
            className="p-8 text-center text-muted-foreground"
            data-ocid="audit-empty-state"
          >
            No logs found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5 font-medium w-44">
                    Timestamp
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium w-36">
                    User Principal
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium w-40">
                    Action
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((log) => (
                  <tr
                    key={log.id.toString()}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                    data-ocid={`audit-log-row-${log.id}`}
                  >
                    <td className="py-2.5 px-4 text-xs text-muted-foreground font-mono whitespace-nowrap">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="py-2.5 px-4">
                      <span
                        className="text-xs font-mono text-muted-foreground"
                        title={log.userId}
                      >
                        {truncatePrincipal(log.userId)}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="inline-flex px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-medium">
                        {log.action}
                      </span>
                    </td>
                    <td
                      className="py-2.5 px-4 text-sm text-muted-foreground max-w-xs truncate"
                      title={log.details}
                    >
                      {log.details || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div
            className="px-4 py-3 border-t border-border flex items-center justify-between gap-2"
            data-ocid="audit-pagination"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-7 text-xs"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {pageNumbers.map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={`w-7 h-7 text-xs rounded ${page === pageNum ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 text-xs"
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
