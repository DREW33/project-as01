import { NextResponse, type NextRequest } from "next/server";

/*
 * Custom-domain routing for Lite-plan customers.
 *
 * When a request comes in on a hostname that is NOT our main domain
 * (projectas01.online / www.projectas01.online / *.vercel.app / localhost),
 * we treat it as a Lite-plan customer's custom domain and rewrite to
 * /site-by-host/<host> — which looks up the customer by customDomain and
 * renders their SiteTemplate.
 *
 * Note: for SSL + routing to work end-to-end, the admin still needs to add
 * the domain in the Vercel project dashboard once (one-time per customer).
 * Customer's DNS must point at Vercel (A 76.76.21.21 OR CNAME cname.vercel-dns.com).
 */

const PRIMARY_HOSTS = new Set([
  "projectas01.online",
  "www.projectas01.online",
]);

function isOwnHost(host: string): boolean {
  if (!host) return true;
  if (PRIMARY_HOSTS.has(host)) return true;
  if (host.startsWith("localhost")) return true;
  if (host.endsWith(".vercel.app")) return true; // preview / production-url
  return false;
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase();
  if (isOwnHost(host)) return NextResponse.next();

  // Custom domain — rewrite to dynamic lookup page (preserve search params)
  const url = req.nextUrl.clone();
  url.pathname = `/site-by-host/${host}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API, _next assets, sitemap, robots, favicon — only rewrite page requests
  matcher: ["/((?!api|_next/|favicon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
