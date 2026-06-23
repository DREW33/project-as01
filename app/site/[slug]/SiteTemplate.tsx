import type { Customer } from "@/lib/customers";

/*
 * The hosted customer-site template. ONE template that adapts to any small
 * business via the customer's siteConfig. Fully server-rendered (no JS needed)
 * for max SEO + speed.
 */
export default function SiteTemplate({ customer }: { customer: Customer }) {
  const cfg = customer.siteConfig || {};
  const name = cfg.businessName || customer.business || customer.name;
  const tagline = cfg.tagline || "Welcome";
  const about = cfg.about || `${name} is here to serve you.`;
  const phone = cfg.phone || customer.phone;
  const whatsapp = (cfg.whatsapp || phone).replace(/\D/g, "");
  const primary = cfg.primaryColor || "#a855f7";
  const accent = cfg.accentColor || "#3b82f6";
  const hero =
    cfg.heroImage ||
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=70";
  const logo = cfg.logoImage;

  const services = cfg.services || [];
  const gallery = cfg.gallery || [];
  const testimonials = cfg.testimonials || [];

  // CSS variables for theming this customer's site
  const themeVars = {
    ["--c-primary" as string]: primary,
    ["--c-accent" as string]: accent,
  } as React.CSSProperties;

  return (
    <main className="customer-site" style={themeVars}>
      <style>{`
        .customer-site { background:#0a0a0f; color:#e8edf5; min-height:100vh; font-family:'Segoe UI',system-ui,sans-serif; }
        .cs-grad { background:linear-gradient(135deg,var(--c-primary),var(--c-accent)); }
        .cs-gradtxt { background:linear-gradient(92deg,var(--c-primary),var(--c-accent)); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .cs-btn { display:inline-block; padding:14px 28px; border-radius:999px; font-weight:700; font-size:14px; text-decoration:none; transition:transform .2s; }
        .cs-btn:hover { transform:translateY(-2px); }
        .cs-card { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:18px; padding:24px; transition:border-color .25s,transform .25s; }
        .cs-card:hover { border-color:var(--c-primary); transform:translateY(-4px); }
        .cs-nav { position:sticky; top:0; z-index:50; backdrop-filter:blur(12px); background:rgba(10,10,15,0.85); border-bottom:1px solid rgba(255,255,255,0.06); }
      `}</style>

      {/* NAV */}
      <nav className="cs-nav">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            {logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={name} className="h-10 w-10 rounded-full object-cover" />
            )}
            <span className="font-bold text-lg">
              <span className="cs-gradtxt">{name}</span>
            </span>
          </div>
          <div className="hidden gap-6 text-sm md:flex">
            <a href="#about" className="text-slate-300 hover:text-white">About</a>
            {services.length > 0 && <a href="#services" className="text-slate-300 hover:text-white">Services</a>}
            {gallery.length > 0 && <a href="#gallery" className="text-slate-300 hover:text-white">Gallery</a>}
            <a href="#contact" className="text-slate-300 hover:text-white">Contact</a>
          </div>
          <a href={`https://wa.me/${whatsapp.length === 10 ? "91" + whatsapp : whatsapp}`} target="_blank" rel="noopener noreferrer" className="cs-btn cs-grad text-white">💬 Chat</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative flex min-h-[70vh] items-center px-5 py-20 md:px-12"
        style={{
          backgroundImage: `linear-gradient(rgba(10,10,15,0.7),rgba(10,10,15,0.9)),url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            <span className="cs-gradtxt">{name}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-200 md:text-2xl">{tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`tel:+91${phone.replace(/\D/g, "").slice(-10)}`} className="cs-btn cs-grad text-white">
              📞 Call {phone}
            </a>
            <a href={`https://wa.me/${whatsapp.length === 10 ? "91" + whatsapp : whatsapp}`} target="_blank" rel="noopener noreferrer" className="cs-btn text-white" style={{ background: "#25D366" }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-5 py-20 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] cs-gradtxt">About us</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Welcome to {name}</h2>
          <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-slate-300">{about}</p>
        </div>
      </section>

      {/* SERVICES */}
      {services.length > 0 && (
        <section id="services" className="px-5 py-20 md:px-12" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] cs-gradtxt">What we offer</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Our Services</h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <div key={i} className="cs-card">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{s.name}</h3>
                    {s.price && <span className="cs-gradtxt text-lg font-extrabold whitespace-nowrap">{s.price}</span>}
                  </div>
                  {s.description && <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section id="gallery" className="px-5 py-20 md:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] cs-gradtxt">Gallery</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">A look inside</h2>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {gallery.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`${name} - ${i + 1}`} className="aspect-square w-full rounded-2xl object-cover transition hover:scale-[1.02]" loading="lazy" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="px-5 py-20 md:px-12" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] cs-gradtxt">Reviews</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">What our customers say</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <div key={i} className="cs-card">
                  <p className="text-2xl cs-gradtxt">&ldquo;</p>
                  <p className="text-sm leading-relaxed text-slate-300">{t.text}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">— {t.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section id="contact" className="px-5 py-20 md:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] cs-gradtxt">Visit / Call</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Get in touch</h2>
          <div className="mt-8 grid gap-4 text-sm">
            <p>📞 <a href={`tel:+91${phone.replace(/\D/g, "").slice(-10)}`} className="text-white hover:text-purple-300">{phone}</a></p>
            {cfg.email && <p>✉️ <a href={`mailto:${cfg.email}`} className="text-white hover:text-purple-300">{cfg.email}</a></p>}
            {cfg.address && <p>📍 {cfg.address}</p>}
            {cfg.hours && <p>🕒 {cfg.hours}</p>}
          </div>
          {cfg.mapsUrl && (
            <iframe src={cfg.mapsUrl} className="mt-8 h-72 w-full rounded-2xl border-0" loading="lazy" title="Map" />
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${whatsapp.length === 10 ? "91" + whatsapp : whatsapp}`} target="_blank" rel="noopener noreferrer" className="cs-btn cs-grad text-white">💬 Message us on WhatsApp</a>
            {cfg.instagram && (
              <a href={cfg.instagram} target="_blank" rel="noopener noreferrer" className="cs-btn text-white" style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>📸 Instagram</a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-5 py-8 text-center text-xs text-slate-500 md:px-12">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="mt-2 text-[10px]">
          ⚡ Website by{" "}
          <a href="https://projectas01.online" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-white">
            Project AS01
          </a>
        </p>
      </footer>
    </main>
  );
}
