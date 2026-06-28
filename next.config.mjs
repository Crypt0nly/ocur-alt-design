/** @type {import('next').NextConfig} */

// The public game lives at ocur.ai/be-ai (root domain, subdirectory) so all the
// viral link-equity consolidates into the main domain and cold visitors land on
// brand turf. The realtime game logic + the real Ocur live in the app stack, so
// the interactive calls are reverse-proxied there. The marketing repo owns the
// shell, SEO, share cards, and this routing rule. Override the target with
// OCUR_APP_API_BASE (defaults to the production app API).
const APP_API_BASE = (process.env.OCUR_APP_API_BASE || "https://app.ocur.ai").replace(
  /\/+$/,
  ""
);

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // ocur.ai/be-ai/api/* -> {app}/api/be-ai/*  (same-origin, no CORS, SEO-clean)
        source: "/be-ai/api/:path*",
        destination: `${APP_API_BASE}/api/be-ai/:path*`,
      },
    ];
  },
};

export default nextConfig;
