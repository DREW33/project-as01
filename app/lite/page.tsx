import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "₹2,999 Website Plan — Live in 3 Days | Project AS01",
  description:
    "Get a premium business website for ₹2,999/year. Mobile-responsive, hosted on a fast CDN, live in 3 days. WhatsApp button, gallery, services, contact map — everything a small business needs.",
  alternates: { canonical: "/lite" },
};

const waLink = (msg: string) =>
  `https://wa.me/919670621213?text=${encodeURIComponent(msg)}`;

const features = [
  { icon: "⚡", title: "Live in 3 days", body: "Send us your details on WhatsApp. We launch within 72 hours." },
  { icon: "🎨", title: "Premium template", body: "Modern, mobile-first design. Customized with your brand colors, logo and photos." },
  { icon: "🌐", title: "Free hosting included", body: "Hosted on Project AS01's fast CDN. SSL/HTTPS secured. Yours forever for ₹2,999/year." },
  { icon: "📱", title: "WhatsApp & Call buttons", body: "Direct WhatsApp + Call buttons in the header. Customers reach you in one tap." },
  { icon: "🖼️", title: "Gallery + Services + Map", body: "Show your work, list your services with prices, embed your Google Map." },
  { icon: "✏️", title: "Free content edits", body: "Need to change hours, prices or add photos? WhatsApp us anytime — unlimited edits." },
];

const audience = [
  { emoji: "🍽️", who: "Restaurants & Cafés" },
  { emoji: "💇", who: "Salons & Spas" },
  { emoji: "🛍️", who: "Shops & Boutiques" },
  { emoji: "🏋️", who: "Gyms & Studios" },
  { emoji: "🏥", who: "Clinics & Pharmacies" },
  { emoji: "🎓", who: "Coaching Centres" },
  { emoji: "🛠️", who: "Service Pros" },
  { emoji: "🏨", who: "Homestays & Resorts" },
];

const steps = [
  { n: "1", title: "Send us your details", body: "WhatsApp us your business name, services, photos and contact info." },
  { n: "2", title: "We build your website", body: "Within 72 hours we set up your live site at projectas01.online/site/your-name." },
  { n: "3", title: "Pay ₹2,999, go live", body: "Pay via UPI/bank transfer. We hand over your login + you can request edits anytime." },
];

const faqs = [
  {
    q: "What's actually included for ₹2,999?",
    a: "A complete premium business website hosted by us for 1 full year — mobile-responsive, custom-branded with your colors/logo/photos, with WhatsApp + Call buttons, services, gallery, contact map, and unlimited content edits requested via WhatsApp.",
  },
  {
    q: "How is this different from your ₹20,000 Starter plan?",
    a: "Starter (₹20,000) gives you a completely custom-coded website with its own SEO setup, you own the code, can move it anywhere. Lite (₹2,999/yr) uses our shared premium template — fully personalized but built on our infrastructure. Same beautiful look at one-seventh the price, perfect to get started fast.",
  },
  {
    q: "Can I get my own domain like mybusiness.in?",
    a: "Yes — your site is at projectas01.online/site/your-name by default. If you buy a custom domain (~₹800/year from Hostinger/GoDaddy), we'll point it to your site for a one-time ₹500 setup. Or upgrade to Starter (₹20,000) which includes a custom domain.",
  },
  {
    q: "What happens after 1 year?",
    a: "30 days before renewal we send you a WhatsApp reminder. Pay another ₹2,999 to renew for the next year. If you don't renew, your site goes offline (data preserved for 90 days) until you decide.",
  },
  {
    q: "Can you build my site if I'm not in Assam?",
    a: "Yes! We work with clients across India and worldwide, fully remote. The whole process happens over WhatsApp — no calls required.",
  },
];

export default function LitePlanPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030014] text-white">
      {/* glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-purple-700/25 blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-[60vh] h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-[420px] w-[420px] rounded-full bg-rose-500/15 blur-[150px]" />

      {/* simple top bar */}
      <header className="relative border-b border-white/5 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="font-display text-sm font-bold">
            <span className="text-white">project</span>{" "}
            <span className="gradient-text">as01</span>
          </Link>
          <Link
            href="/portal"
            className="btn-ghost rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
          >
            Existing customer? Log in →
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-5 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-orange-400/50 bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_0_24px_rgba(251,146,60,0.5)]">
            🔥 High Demand · Lite Yearly Plan
          </span>
          <h1 className="font-display mt-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Your <span className="gradient-text">premium business website</span>
            <br />
            for just <span className="text-orange-400">₹2,999/year</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Mobile-responsive. Hosted by us. Live in 3 days. Unlimited content edits via WhatsApp.
            Perfect for restaurants, salons, shops, clinics and small businesses.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(
                "Hi Project AS01! I want to order the ₹2,999/yr Lite website plan. Here are my details:\n\nBusiness name:\nWhat we do:\nPhone:\nLocation:"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon font-display rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white"
            >
              💬 Order on WhatsApp →
            </a>
            <a
              href="#how"
              className="btn-ghost font-display rounded-full px-8 py-4 text-sm font-bold uppercase tracking-wider text-white"
            >
              How it works
            </a>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            ✓ Live in 3 days · ✓ Free hosting · ✓ Unlimited edits · ✓ No setup fee
          </p>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="relative px-5 py-12 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
            Built for
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {audience.map((a) => (
              <span key={a.who} className="glass rounded-full px-4 py-2.5 text-sm text-slate-200">
                {a.emoji} {a.who}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-purple-400">
              Everything you need
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl">
              All this, included
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="glass glow-card rounded-2xl p-6">
                <p className="text-3xl">{f.icon}</p>
                <h3 className="font-display mt-3 text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative scroll-mt-24 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-purple-400">
              From order to launch
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl">
              Live in 3 days, in 3 simple steps
            </h2>
          </div>
          <div className="relative mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="glass relative rounded-2xl p-7">
                <span className="font-display absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-sm font-bold text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]">
                  {s.n}
                </span>
                <h3 className="font-display mt-4 text-center text-base font-bold">{s.title}</h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-slate-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section className="relative px-5 py-20 md:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="neon-border relative rounded-3xl p-10 text-center shadow-[0_0_80px_rgba(147,51,234,0.3)]">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-purple-400">
              Lite Yearly Plan
            </p>
            <p className="font-display gradient-text mt-3 text-6xl font-extrabold">₹2,999</p>
            <p className="text-sm text-slate-500">/ year (renews yearly)</p>

            <ul className="mt-8 space-y-3 text-left">
              {[
                "3-page premium business website",
                "Mobile responsive + retina-ready",
                "Hosted on fast CDN (free)",
                "Free SSL / HTTPS",
                "WhatsApp + Call buttons",
                "Services, gallery & contact map",
                "Unlimited content edits via WhatsApp",
                "Live in 3 days from order",
                "Renews yearly at ₹2,999",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="mt-0.5 text-purple-400">✦</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={waLink(
                "Hi Project AS01! I want to order the ₹2,999/yr Lite website plan. Here are my details:\n\nBusiness name:\nWhat we do:\nPhone:\nLocation:"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon font-display mt-8 inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider text-white"
            >
              💬 Order on WhatsApp
            </a>
            <p className="mt-4 text-[11px] text-slate-500">
              Pay only after we show you the live preview. No commitment upfront.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative px-5 py-20 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.35em] text-purple-400">
              Common questions
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl">
              Got questions? We&apos;ve got answers.
            </h2>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass group rounded-2xl">
                <summary className="font-display flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-white sm:text-base">
                  {f.q}
                  <span className="gradient-text text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative border-t border-white/5 px-5 py-16 text-center md:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Ready to go online? <span className="gradient-text">Start now.</span>
          </h2>
          <p className="mt-4 text-slate-400">
            One WhatsApp message is all it takes. Your website will be live in 72 hours.
          </p>
          <a
            href={waLink(
              "Hi Project AS01! I want to order the ₹2,999/yr Lite website plan."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon font-display mt-8 inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wider text-white"
          >
            💬 Start on WhatsApp →
          </a>
          <p className="mt-6 text-xs text-slate-500">
            Already a customer?{" "}
            <Link href="/portal" className="text-purple-300 hover:text-white">
              Log in to your portal
            </Link>
          </p>
        </div>
      </section>

      {/* mini footer */}
      <footer className="border-t border-white/5 px-5 py-6 text-center text-[11px] text-slate-600">
        <p>© {new Date().getFullYear()} Project AS01 · Guwahati, Assam · Premium Web Development</p>
      </footer>
    </main>
  );
}
