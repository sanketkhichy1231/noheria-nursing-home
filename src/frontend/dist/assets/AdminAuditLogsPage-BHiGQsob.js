import { d as useQuery, f as useActor, h as createActor, r as reactExports, j as jsxRuntimeExports, X } from "./index-b-kEL4Ku.js";
import { B as Button } from "./button-P341Onhk.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BQUDAgz6.js";
import { L as Label, I as Input } from "./label-CjzLGgCs.js";
import { S as Skeleton } from "./skeleton-MV_wEVED.js";
import { R as RefreshCw } from "./refresh-cw-CKd7_hNY.js";
function useBackendActor() {
  return useActor(createActor);
}
function useAuditLogs() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAuditLogs();
    },
    enabled: !!actor && !isFetching
  });
}
const PAGE_SIZE = 25;
function truncatePrincipal(p) {
  if (p.length <= 20) return p;
  return `${p.slice(0, 8)}…${p.slice(-8)}`;
}
function formatTimestamp(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function AdminAuditLogsPage() {
  const { data: logs, isLoading, error, refetch } = useAuditLogs();
  const [search, setSearch] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => {
    if (!logs) return [];
    return logs.filter((l) => {
      const lSearch = search.toLowerCase();
      if (search && !l.action.toLowerCase().includes(lSearch) && !l.details.toLowerCase().includes(lSearch))
        return false;
      if (dateFrom) {
        const logDate = new Date(Number(l.timestamp) / 1e6).toISOString().slice(0, 10);
        if (logDate < dateFrom) return false;
      }
      if (dateTo) {
        const logDate = new Date(Number(l.timestamp) / 1e6).toISOString().slice(0, 10);
        if (logDate > dateTo) return false;
      }
      return true;
    }).sort((a, b) => b.timestamp > a.timestamp ? 1 : -1);
  }, [logs, search, dateFrom, dateTo]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handleClear = () => {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };
  const pageNumbers = reactExports.useMemo(() => {
    const count = Math.min(totalPages, 7);
    return Array.from({ length: count }, (_, i) => {
      if (totalPages <= 7) return i + 1;
      if (page <= 4) return i + 1;
      if (page >= totalPages - 3) return totalPages - 6 + i;
      return page - 3 + i;
    });
  }, [totalPages, page]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin-audit-logs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Audit Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "All system actions and changes" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => refetch(),
          className: "gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
            " Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Search Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search action or details…",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(1);
            },
            className: "bg-background h-8 text-sm w-52",
            "data-ocid": "audit-search-input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateFrom,
            onChange: (e) => {
              setDateFrom(e.target.value);
              setPage(1);
            },
            className: "bg-background h-8 text-sm w-36",
            "data-ocid": "audit-date-from"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateTo,
            onChange: (e) => {
              setDateTo(e.target.value);
              setPage(1);
            },
            className: "bg-background h-8 text-sm w-36",
            "data-ocid": "audit-date-to"
          }
        )
      ] }),
      (search || dateFrom || dateTo) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-8",
          onClick: handleClear,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3 mr-1" }),
            " Clear"
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 px-4 pt-4 flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-muted-foreground", children: [
          filtered.length,
          " log",
          filtered.length !== 1 ? "s" : "",
          " found"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2", children: ["a", "b", "c", "d", "e", "f"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center text-destructive", children: [
        "Failed to load logs.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "underline",
            onClick: () => refetch(),
            children: "Retry"
          }
        )
      ] }) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-8 text-center text-muted-foreground",
          "data-ocid": "audit-empty-state",
          children: "No logs found."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[700px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border text-xs text-muted-foreground uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium w-44", children: "Timestamp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium w-36", children: "User Principal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium w-40", children: "Action" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-medium", children: "Details" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: paginated.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border hover:bg-muted/30 transition-colors",
            "data-ocid": `audit-log-row-${log.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4 text-xs text-muted-foreground font-mono whitespace-nowrap", children: formatTimestamp(log.timestamp) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-mono text-muted-foreground",
                  title: log.userId,
                  children: truncatePrincipal(log.userId)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex px-2 py-0.5 rounded bg-accent/10 text-accent text-xs font-medium", children: log.action }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "py-2.5 px-4 text-sm text-muted-foreground max-w-xs truncate",
                  title: log.details,
                  children: log.details || "—"
                }
              )
            ]
          },
          log.id.toString()
        )) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-4 py-3 border-t border-border flex items-center justify-between gap-2",
          "data-ocid": "audit-pagination",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page === 1,
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                className: "h-7 text-xs",
                children: "Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: pageNumbers.map((pageNum) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setPage(pageNum),
                className: `w-7 h-7 text-xs rounded ${page === pageNum ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                children: pageNum
              },
              pageNum
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page === totalPages,
                onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                className: "h-7 text-xs",
                children: "Next"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  AdminAuditLogsPage as default
};
