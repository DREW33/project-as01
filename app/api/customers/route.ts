import { NextResponse } from "next/server";
import { readJson, writeJson, deleteJson } from "@/lib/blob";
import { isValidAdminKey } from "@/lib/adminAuth";
import { allCustomers, customerKey, normalizePhone, slugify, type Customer, type SiteConfig } from "@/lib/customers";

/*
 * Paying-customer registry (admin-only). One blob per customer so rapid edits
 * never overwrite — same lag-proof pattern as admins/prospects.
 * Customers log in at /portal using their phone + accessCode (set here).
 */
const rid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36);

export async function GET(req: Request) {
  if (!(await isValidAdminKey(req.headers.get("x-admin-key")))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ customers: await allCustomers() });
}

export async function POST(req: Request) {
  if (!(await isValidAdminKey(req.headers.get("x-admin-key")))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));

  if (body.action === "delete") {
    if (!body.id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await deleteJson(customerKey(body.id));
    return NextResponse.json({ ok: true });
  }

  const c = body.customer || {};
  const phone = normalizePhone(c.phone);
  if (!c.name?.trim() || !phone || phone.length !== 10) {
    return NextResponse.json({ error: "Name and 10-digit phone required" }, { status: 400 });
  }
  if (!c.plan?.trim()) return NextResponse.json({ error: "Plan required" }, { status: 400 });

  const now = new Date().toISOString();
  const id = c.id || rid();
  const existing = c.id ? await readJson<Customer | null>(customerKey(id), null) : null;

  const start = c.startDate || existing?.startDate || now.slice(0, 10);
  const expiry =
    c.expiryDate ||
    existing?.expiryDate ||
    new Date(new Date(start).getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const accessCode =
    c.accessCode ||
    existing?.accessCode ||
    Math.random().toString(36).slice(2, 7).toUpperCase();

  // Site slug: cleaned; ensure unique (if it collides with another customer, append id suffix)
  let siteSlug = slugify(c.siteSlug || existing?.siteSlug || "");
  if (siteSlug) {
    const others = (await allCustomers()).filter((x) => x.id !== id && x.siteSlug === siteSlug);
    if (others.length) siteSlug = `${siteSlug}-${id.slice(0, 4)}`;
  }

  // Custom domain: normalize (strip protocol, www, paths, trailing slash, lowercase)
  const customDomain = String(c.customDomain || existing?.customDomain || "")
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/[^a-z0-9.\-]/g, "");

  const record: Customer = {
    id,
    name: String(c.name).trim(),
    business: c.business || "",
    phone,
    email: c.email || "",
    plan: String(c.plan).trim(),
    amountPaid: Number(c.amountPaid) || 0,
    startDate: start,
    expiryDate: expiry,
    accessCode,
    notes: c.notes ?? existing?.notes ?? "",
    websiteUrl: c.websiteUrl || existing?.websiteUrl || "",
    siteSlug,
    siteActive: c.siteActive !== undefined ? !!c.siteActive : existing?.siteActive !== false,
    siteConfig: (c.siteConfig as SiteConfig) || existing?.siteConfig || {},
    customDomain,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  await writeJson(customerKey(id), record);
  return NextResponse.json({ ok: true, customer: record });
}
