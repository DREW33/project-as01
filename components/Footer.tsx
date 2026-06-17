import Logo from "./Logo";

const demos = [
  ["shopkart", "ShopKart E-Commerce"],
  ["luxenest", "LuxeNest Realty"],
  ["drivenow", "DriveNow Car Rental"],
  ["glambride", "GlamBride Studio"],
  ["evermore", "Evermore Events"],
  ["resellhub", "ResellHub"],
  ["bigwin", "BigWin Arena"],
  ["stratos-erp", "Stratos ERP"],
  ["pulsecrm", "PulseCRM"],
  ["spiceroute", "Spice Route"],
  ["zoomride", "ZoomRide App"],
  ["loopin", "LoopIn Social"],
  ["streamx", "StreamX OTT"],
  ["coinpulse", "CoinPulse Finance"],
  ["rankforge", "RankForge SEO"],
  ["mailmint", "MailMint Automation"],
  ["cloudvault", "CloudVault Storage"],
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <Logo />
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500">
              Premium AI-powered website &amp; app development company in Guwahati, Assam.
              Coffee &gt; Code &gt; Repeat.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <a href="#projects" className="transition hover:text-white">Projects</a>
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#audit" className="transition hover:text-white">Free Audit</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
            <a href="https://instagram.com/project_as01" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Instagram</a>
            <a href="/admin" className="transition hover:text-purple-400">Admin</a>
          </nav>
        </div>

        {/* live demo links — internal links for SEO crawlers */}
        <div className="mt-10 border-t border-white/5 pt-6">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 md:text-left">
            Explore our live demo websites
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-start">
            {demos.map(([slug, name]) => (
              <li key={slug}>
                <a
                  href={`/demos/${slug}.html`}
                  className="text-[11px] text-slate-500 transition hover:text-purple-300"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-600 md:flex-row">
          <p>© {new Date().getFullYear()} Project AS01. All rights reserved.</p>
          <p className="font-mono">
            <span className="text-purple-500">&lt;/&gt;</span> vibe coder{" "}
            <span className="text-blue-500">&lt;/&gt;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
