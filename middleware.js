import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { hostname } from "./config";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes("_next")) return;

  const host = req.headers.get("host");

  const subdomain = getValidSubdomain(host);
  if (subdomain && subdomain != "www") {
    // Subdomain available, rewriting
    // console.log(
    //   `>>> Rewriting: ${url.pathname} to /showprofile/${subdomain}${url.pathname}`
    // );
    url.pathname = `/showprofile/${subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}

const getValidSubdomain = (host) => {
  let subdomain = null;
  if (!host && typeof window !== "undefined") {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (
      candidate &&
      host.split(".").length >= (hostname === "localhost:3000" ? 2 : 3)
    ) {
      // Valid candidate
      subdomain = candidate;
    }
  }
  return subdomain;
};
