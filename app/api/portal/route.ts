import { NextResponse } from "next/server";
import { allCustomers, type Customer } from "@/lib/customers";
import { limited } from "@/lib/rateLimit";

/*
 * Public customer portal endpoint. Customer sends their phone + access code,
 * we look up their record and return a SAFE subset (no notes, no internal id).
 * Rate-limited to stop brute-forcing of access codes.
 */
export async function POST(req: Request) {
  // 5 attempts per minute per IP — stops brute-force
  if (limited(req, "portal", 5, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Please wait a minute." }, { status: 429 });
  }
  const { phone, code } = await req.json().catch(() => ({}));
  const p = String(phone || "").replace(/\D/g, "").slice(-10);
  const c = String(code || "").trim().toUpperCase();
  if (p.length !== 10 || !c) {
    return NextResponse.json({ error: "Enter your 10-digit phone and access code." }, { status: 400 });
  }

  const all = await allCustomers();
  const match = all.find((x: Customer) => x.phone === p && x.accessCode.toUpperCase() === c);
  if (!match) {
    return NextResponse.json({ error: "Phone & code don't match. Please check or contact us." }, { status: 401 });
  }

  // safe public payload — no notes, no internal id
  const now = Date.now();
  const expiryMs = new Date(match.expiryDate).getTime();
  const daysLeft = Math.ceil((expiryMs - now) / (24 * 60 * 60 * 1000));

  return NextResponse.json({
    name: match.name,
    business: match.business,
    plan: match.plan,
    amountPaid: match.amountPaid,
    startDate: match.startDate,
    expiryDate: match.expiryDate,
    websiteUrl: match.websiteUrl,
    siteSlug: match.siteSlug,
    siteActive: match.siteActive,
    customDomain: match.customDomain,
    daysLeft,
    expired: daysLeft <= 0,
    expiringSoon: daysLeft > 0 && daysLeft <= 30,
  });
}
