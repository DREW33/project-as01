import { readJson, listJson } from "./blob";

/* Shared customer helpers (not in api/route.ts so Next.js can route it cleanly). */
export type SiteConfig = {
  businessName?: string;
  tagline?: string;
  about?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  hours?: string;
  mapsUrl?: string;
  instagram?: string;
  facebook?: string;
  primaryColor?: string;     // hex, e.g. "#a855f7"
  accentColor?: string;      // hex
  heroImage?: string;        // URL
  logoImage?: string;        // URL
  services?: { name: string; price?: string; description?: string }[];
  gallery?: string[];        // image URLs
  testimonials?: { name: string; text: string }[];
};

export type Customer = {
  id: string;
  name: string;
  business?: string;
  phone: string;
  email?: string;
  plan: string;
  amountPaid?: number;
  startDate: string;
  expiryDate: string;
  accessCode: string;
  notes?: string;
  websiteUrl?: string;        // optional external URL we built
  // Hosted-site fields (Lite plan)
  siteSlug?: string;          // their URL slug, e.g. "borah-sweets"
  siteActive?: boolean;       // admin lock; default true
  siteConfig?: SiteConfig;    // customer's customization
  customDomain?: string;      // optional custom domain (e.g. "borahsweets.in")
  createdAt: string;
  updatedAt: string;
};

export const customerKey = (id: string) => `customer_${id}.json`;
export const normalizePhone = (p: string) => String(p || "").replace(/\D/g, "").slice(-10);

export async function allCustomers(): Promise<Customer[]> {
  const files = await listJson("customer_");
  const out: Customer[] = [];
  for (const f of files) {
    const c = await readJson<Customer | null>(f, null);
    if (c?.id) out.push(c);
  }
  return out.sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
}

export const slugify = (s: string) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

export async function findBySlug(slug: string): Promise<Customer | null> {
  const cleaned = slugify(slug);
  if (!cleaned) return null;
  const all = await allCustomers();
  return all.find((c) => c.siteSlug === cleaned) || null;
}

export async function findByHost(host: string): Promise<Customer | null> {
  const h = String(host || "").toLowerCase().replace(/^www\./, "").split(":")[0];
  if (!h) return null;
  const all = await allCustomers();
  return all.find((c) => c.customDomain && c.customDomain === h) || null;
}
