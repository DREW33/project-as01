import { readJson, listJson } from "./blob";

/* Shared customer helpers (not in api/route.ts so Next.js can route it cleanly). */
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
  websiteUrl?: string;
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
