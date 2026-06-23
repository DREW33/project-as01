import Link from "next/link";
import { findByHost } from "@/lib/customers";
import SiteTemplate from "../../site/[slug]/SiteTemplate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ host: string }> };

export async function generateMetadata({ params }: Props) {
  const { host } = await params;
  const c = await findByHost(decodeURIComponent(host));
  if (!c?.siteConfig) return { title: "Site" };
  const cfg = c.siteConfig;
  const name = cfg.businessName || c.business || c.name;
  return {
    title: `${name}${cfg.tagline ? ` — ${cfg.tagline}` : ""}`,
    description: cfg.about?.slice(0, 155) || `Welcome to ${name}.`,
  };
}

export default async function CustomerSiteByHost({ params }: Props) {
  const { host } = await params;
  const customer = await findByHost(decodeURIComponent(host));

  // Unknown domain → friendly help page (instead of 404)
  if (!customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030014] p-6 text-center">
        <div className="glass-strong max-w-md rounded-3xl p-10">
          <p className="text-5xl">🌐</p>
          <h1 className="font-display mt-4 text-2xl font-extrabold text-white">
            Domain not configured yet
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            <span className="font-mono text-purple-300">{decodeURIComponent(host)}</span> isn&apos;t
            linked to a customer site yet. If this is your domain, please send the link to
            our team and we&apos;ll connect it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/portal"
              className="btn-neon font-display rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Customer login
            </Link>
            <a
              href="https://wa.me/919670621213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost font-display rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              💬 Contact Project AS01
            </a>
          </div>
        </div>
      </main>
    );
  }

  // Site lock or expiry checks (same as /site/[slug])
  const expired = new Date(customer.expiryDate).getTime() < Date.now();
  const locked = customer.siteActive === false;
  if (locked || expired) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030014] p-6 text-center">
        <div className="glass-strong max-w-md rounded-3xl p-10">
          <p className="text-5xl">🔒</p>
          <h1 className="font-display mt-4 text-2xl font-extrabold text-white">
            This site is temporarily offline
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {expired
              ? "The subscription has expired. The owner can renew anytime to bring it back online."
              : "The owner has temporarily paused this site. Please check back later."}
          </p>
          {customer.siteConfig?.businessName && (
            <p className="mt-6 text-xs uppercase tracking-widest text-slate-600">
              {customer.siteConfig.businessName}
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/portal"
              className="btn-neon font-display rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              Owner login
            </Link>
            <a
              href="https://wa.me/919670621213"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost font-display rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
            >
              💬 Contact Project AS01
            </a>
          </div>
        </div>
      </main>
    );
  }

  return <SiteTemplate customer={customer} />;
}
