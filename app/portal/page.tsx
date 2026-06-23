"use client";

import { useState } from "react";
import Link from "next/link";

type Account = {
  name: string;
  business?: string;
  plan: string;
  amountPaid?: number;
  startDate: string;
  expiryDate: string;
  websiteUrl?: string;
  siteSlug?: string;
  siteActive?: boolean;
  daysLeft: number;
  expired: boolean;
  expiringSoon: boolean;
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-purple-500/70 focus:shadow-[0_0_18px_rgba(168,85,247,0.25)]";

export default function PortalPage() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [acc, setAcc] = useState<Account | null>(null);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const d = await r.json();
      if (r.ok) {
        setAcc(d);
      } else {
        setError(d.error || "Login failed.");
      }
    } catch {
      setError("Network error — try again.");
    }
    setLoading(false);
  };

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  const renewMsg = acc
    ? `Hi Project AS01! I want to renew my ${acc.plan} plan for ${acc.business || acc.name}. (Expiry: ${fmt(acc.expiryDate)})`
    : "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030014] py-16">
      {/* glow blobs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-purple-700/20 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="relative mx-auto max-w-lg px-5">
        <Link
          href="/"
          className="font-display text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-purple-400"
        >
          ← Back to projectas01.online
        </Link>

        {!acc ? (
          <div className="glass-strong mt-8 rounded-3xl p-8">
            <h1 className="font-display text-3xl font-extrabold text-white">
              Customer <span className="gradient-text">Portal</span>
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Check your plan, expiry date and renewal status.
            </p>

            <form onSubmit={login} className="mt-6 space-y-4">
              <input
                type="tel"
                required
                placeholder="Your 10-digit phone number"
                className={inputCls}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={15}
              />
              <input
                required
                placeholder="Access code (given when you signed up)"
                className={inputCls + " uppercase tracking-widest"}
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={10}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-neon font-display w-full rounded-xl px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-60"
              >
                {loading ? "Checking…" : "View My Plan →"}
              </button>
              {error && <p className="text-center text-sm text-red-400">{error}</p>}
            </form>

            <p className="mt-6 border-t border-white/5 pt-4 text-center text-xs text-slate-500">
              Lost your access code? WhatsApp us at{" "}
              <a
                href="https://wa.me/919670621213"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-white"
              >
                +91 96706 21213
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {/* welcome */}
            <div className="glass-strong rounded-3xl p-7">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-purple-400">
                Welcome back
              </p>
              <h1 className="font-display mt-1 text-2xl font-extrabold text-white">
                {acc.name.split(" ")[0]} 👋
              </h1>
              <p className="mt-1 text-sm text-slate-400">{acc.business}</p>
            </div>

            {/* plan card */}
            <div
              className={`relative rounded-3xl p-7 ${
                acc.expired
                  ? "border border-red-500/40 bg-red-500/10"
                  : acc.expiringSoon
                  ? "border border-amber-500/40 bg-amber-500/10"
                  : "glass border border-green-500/30"
              }`}
            >
              <p className="font-display text-xs uppercase tracking-[0.25em] text-slate-400">
                Your Plan
              </p>
              <p className="font-display gradient-text mt-1 text-3xl font-extrabold">{acc.plan}</p>

              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Started on</p>
                  <p className="mt-1 text-sm font-semibold text-white">{fmt(acc.startDate)}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500">Expires on</p>
                  <p className="mt-1 text-sm font-semibold text-white">{fmt(acc.expiryDate)}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/[0.04] p-4 text-center">
                {acc.expired ? (
                  <>
                    <p className="font-display text-lg font-extrabold text-red-300">
                      ⚠️ Expired {Math.abs(acc.daysLeft)} day{Math.abs(acc.daysLeft) === 1 ? "" : "s"} ago
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Renew now to keep your website live.
                    </p>
                  </>
                ) : acc.expiringSoon ? (
                  <>
                    <p className="font-display text-lg font-extrabold text-amber-300">
                      ⏰ {acc.daysLeft} day{acc.daysLeft === 1 ? "" : "s"} left
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Time to renew — message us to avoid downtime.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-lg font-extrabold text-green-300">
                      ✓ Active · {acc.daysLeft} days left
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      You&apos;re all good. We&apos;ll remind you before renewal.
                    </p>
                  </>
                )}
              </div>

              <a
                href={`https://wa.me/919670621213?text=${encodeURIComponent(renewMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon font-display mt-5 block w-full rounded-xl px-6 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-white"
              >
                💬 {acc.expired ? "Renew Now" : acc.expiringSoon ? "Renew via WhatsApp" : "Contact Support"}
              </a>

              {!acc.expired && !acc.expiringSoon && (
                <a
                  href={`https://wa.me/919670621213?text=${encodeURIComponent(renewMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost font-display mt-3 block w-full rounded-xl px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white"
                >
                  🔄 Renew early
                </a>
              )}
            </div>

            {/* Hosted website card (Lite plan customers) */}
            {acc.siteSlug && (
              <div className="glass rounded-3xl p-6">
                <p className="font-display text-xs uppercase tracking-[0.25em] text-slate-400">
                  🌐 Your Live Website
                </p>
                <p className="mt-2 font-mono text-sm text-white">
                  projectas01.online/site/{acc.siteSlug}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`/site/${acc.siteSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon font-display rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white"
                  >
                    🚀 Visit my website
                  </a>
                  <a
                    href={`https://wa.me/919670621213?text=${encodeURIComponent(
                      `Hi Project AS01! I want to update my website (${acc.business || acc.name}). Here's what to change:`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost font-display rounded-xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white"
                  >
                    ✏️ Request edits
                  </a>
                </div>
                {acc.siteActive === false && (
                  <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-300">
                    ⚠️ Your site is currently paused by admin. Contact us to reactivate.
                  </p>
                )}
              </div>
            )}

            {/* External website (non-Lite plans) */}
            {!acc.siteSlug && acc.websiteUrl && (
              <a
                href={acc.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass block rounded-3xl p-6 text-center transition hover:border-purple-500/40"
              >
                <p className="font-display text-xs uppercase tracking-[0.25em] text-slate-400">
                  🌐 Your Website
                </p>
                <p className="font-display gradient-text mt-2 text-lg font-bold">
                  Visit my website →
                </p>
              </a>
            )}

            <button
              onClick={() => {
                setAcc(null);
                setPhone("");
                setCode("");
              }}
              className="font-display block w-full text-center text-xs uppercase tracking-wider text-slate-500 transition hover:text-white"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
