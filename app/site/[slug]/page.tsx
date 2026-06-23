import { notFound } from "next/navigation";
import Link from "next/link";
import { findBySlug } from "@/lib/customers";
import SiteTemplate from "./SiteTemplate";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = await findBySlug(slug);
  if (!c?.siteConfig) return { title: "Site not found" };
  const cfg = c.siteConfig;
  const name = cfg.businessName || c.business || c.name;
  return {
    title: `${name}${cfg.tagline ? ` — ${cfg.tagline}` : ""}`,
    description: cfg.about?.slice(0, 155) || `Welcome to ${name}.`,
  };
}

export default async function CustomerSite({ params }: Props) {
  const { slug } = await params;
  const customer = await findBySlug(slug);

  if (!customer) notFound();

  const now = Date.now();
  const expired = new Date(customer.expiryDate).getTime() < now;
  const locked = customer.siteActive === false;

  // Site offline (admin lock OR subscription expired)
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
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
