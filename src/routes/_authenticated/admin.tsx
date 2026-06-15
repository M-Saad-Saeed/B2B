import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { LogOut, Search, FileText, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "New" | "Contacted" | "Quoted" | "Closed";

type Inquiry = {
  id: string;
  full_name: string;
  business_name: string | null;
  email: string;
  whatsapp_number: string | null;
  country: string | null;
  product_type: string | null;
  size_required: string | null;
  quantity: string | null;
  lighting_option: string | null;
  material_finish: string | null;
  deadline: string | null;
  file_url: string | null;
  file_urls: string[] | null;
  notes: string | null;
  status: Status;
  source: string;
  created_at: string;
};

const STATUS_OPTIONS: Status[] = ["New", "Contacted", "Quoted", "Closed"];

const STATUS_STYLES: Record<Status, string> = {
  New: "bg-gold/15 text-gold border-gold/30",
  Contacted: "bg-blue-500/10 text-blue-700 border-blue-500/30",
  Quoted: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  Closed: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Quote Inquiry Dashboard — Custom Logo Sign" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  useEffect(() => {
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes.user?.id;
      if (!uid) {
        navigate({ to: "/auth", replace: true });
        return;
      }
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roleData);
    })();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) {
      if (isAdmin === false) setLoading(false);
      return;
    }
    fetchInquiries();
  }, [isAdmin]);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("quote_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setInquiries((data ?? []) as Inquiry[]);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: Status) => {
    const prev = inquiries;
    setInquiries((items) => items.map((i) => (i.id === id ? { ...i, status } : i)));
    const { error: err } = await supabase.from("quote_inquiries").update({ status }).eq("id", id);
    if (err) {
      setInquiries(prev);
      toast.error(`Failed to update: ${err.message}`);
      return;
    }
    toast.success(`Status updated to ${status}`);
  };

  const openFile = async (path: string) => {
    // path may be a full URL or just a storage path
    if (path.startsWith("http")) {
      window.open(path, "_blank");
      return;
    }
    const { data, error: err } = await supabase.storage
      .from("quote-uploads")
      .createSignedUrl(path, 60 * 10);
    if (err || !data) {
      toast.error("Could not open file");
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  const getFilePaths = (inquiry: Inquiry) => {
    if (Array.isArray(inquiry.file_urls) && inquiry.file_urls.length > 0) {
      return inquiry.file_urls;
    }

    if (!inquiry.file_url) {
      return [];
    }

    try {
      const parsed = JSON.parse(inquiry.file_url);
      if (Array.isArray(parsed)) {
        return parsed.filter((value): value is string => typeof value === "string");
      }
    } catch {
      // Fall back to legacy single-path storage.
    }

    return [inquiry.file_url];
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inquiries.filter((i) => {
      if (statusFilter !== "All" && i.status !== statusFilter) return false;
      if (!q) return true;
      return [i.full_name, i.business_name, i.email, i.whatsapp_number, i.product_type]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(q));
    });
  }, [inquiries, query, statusFilter]);

  const counts = useMemo(() => {
    const c: Record<"Total" | Status, number> = {
      Total: inquiries.length,
      New: 0,
      Contacted: 0,
      Quoted: 0,
      Closed: 0,
    };
    inquiries.forEach((i) => {
      c[i.status] = (c[i.status] ?? 0) + 1;
    });
    return c;
  }, [inquiries]);

  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <h2 className="font-serif text-2xl text-foreground">Access denied</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account does not have admin permissions.
          </p>
          <Button onClick={signOut} variant="outline" className="mt-6 rounded-full">
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-10">
          <div>
            <h1 className="font-serif text-2xl text-foreground lg:text-3xl">
              Quote Inquiry Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage quote requests submitted through the Custom Logo Sign website.
            </p>
          </div>
          <Button onClick={signOut} variant="outline" className="rounded-full border-border">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <SummaryCard label="Total" value={counts.Total} accent />
          <SummaryCard label="New" value={counts.New} />
          <SummaryCard label="Contacted" value={counts.Contacted} />
          <SummaryCard label="Quoted" value={counts.Quoted} />
          <SummaryCard label="Closed" value={counts.Closed} />
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, business, email, WhatsApp, product…"
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as Status | "All")}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Body */}
        <div className="mt-6">
          {loading ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
              Loading inquiries…
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
              <p className="text-sm text-destructive">Failed to load: {error}</p>
              <Button onClick={fetchInquiries} className="mt-4 rounded-full" variant="outline">
                Retry
              </Button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-4 text-sm text-muted-foreground">
                {inquiries.length === 0
                  ? "No quote inquiries yet. New submissions from the website will appear here."
                  : "No inquiries match your filters."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-hidden rounded-2xl border border-border bg-card lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-card-soft text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Customer</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Details</th>
                        <th className="px-4 py-3">File</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((i) => (
                        <tr key={i.id} className="border-t border-border align-top">
                          <td className="px-4 py-4 text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(i.created_at)}
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-medium text-foreground">{i.full_name}</div>
                            {i.business_name && (
                              <div className="text-xs text-muted-foreground">{i.business_name}</div>
                            )}
                            {i.country && (
                              <div className="text-xs text-muted-foreground">{i.country}</div>
                            )}
                          </td>
                          <td className="px-4 py-4 text-xs">
                            <div>
                              <a
                                href={`mailto:${i.email}`}
                                className="text-foreground hover:text-gold"
                              >
                                {i.email}
                              </a>
                            </div>
                            {i.whatsapp_number && (
                              <div className="mt-1 text-muted-foreground">{i.whatsapp_number}</div>
                            )}
                          </td>
                          <td className="px-4 py-4 text-xs">
                            <div className="font-medium text-foreground">
                              {i.product_type ?? "—"}
                            </div>
                            {i.material_finish && (
                              <div className="text-muted-foreground">{i.material_finish}</div>
                            )}
                            {i.lighting_option && (
                              <div className="text-muted-foreground">
                                Lighting: {i.lighting_option}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 text-xs text-muted-foreground">
                            {i.size_required && <div>Size: {i.size_required}</div>}
                            {i.quantity && <div>Qty: {i.quantity}</div>}
                            {i.deadline && <div>Deadline: {i.deadline}</div>}
                            {i.notes && (
                              <div className="mt-1 max-w-xs whitespace-pre-wrap text-foreground/80">
                                {i.notes}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4 text-xs">
                            {getFilePaths(i).length > 0 ? (
                              <div className="flex flex-col gap-2">
                                {getFilePaths(i).map((path, index) => (
                                  <button
                                    key={path}
                                    onClick={() => openFile(path)}
                                    className="inline-flex items-center gap-1 text-gold hover:underline"
                                  >
                                    View file {index + 1} <ExternalLink className="h-3 w-3" />
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">No file uploaded</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <Select
                              value={i.status}
                              onValueChange={(v) => updateStatus(i.id, v as Status)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {STATUS_OPTIONS.map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {s}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div className="grid gap-4 lg:hidden">
                {filtered.map((i) => (
                  <div
                    key={i.id}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-foreground">{i.full_name}</div>
                        {i.business_name && (
                          <div className="text-xs text-muted-foreground">{i.business_name}</div>
                        )}
                      </div>
                      <Badge variant="outline" className={STATUS_STYLES[i.status]}>
                        {i.status}
                      </Badge>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground">
                      {formatDate(i.created_at)}
                      {i.country && <> · {i.country}</>}
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
                      <Row label="Email" value={i.email} />
                      <Row label="WhatsApp" value={i.whatsapp_number} />
                      <Row label="Product" value={i.product_type} />
                      <Row label="Size" value={i.size_required} />
                      <Row label="Qty" value={i.quantity} />
                      <Row label="Lighting" value={i.lighting_option} />
                      <Row label="Material" value={i.material_finish} />
                      <Row label="Deadline" value={i.deadline} />
                      {i.notes && (
                        <div className="mt-1 rounded-md bg-card-soft p-3 text-foreground/80">
                          {i.notes}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      {getFilePaths(i).length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {getFilePaths(i).map((path, index) => (
                            <button
                              key={path}
                              onClick={() => openFile(path)}
                              className="inline-flex items-center gap-1 text-xs text-gold hover:underline"
                            >
                              View file {index + 1} <ExternalLink className="h-3 w-3" />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">No file uploaded</span>
                      )}
                      <Select
                        value={i.status}
                        onValueChange={(v) => updateStatus(i.id, v as Status)}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border bg-card p-4 ${accent ? "border-gold/40" : "border-border"}`}
    >
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`mt-1 font-serif text-3xl ${accent ? "text-gold" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  );
}

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleString();
  } catch {
    return s;
  }
}
