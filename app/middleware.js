import { NextResponse } from "next/server";

export function middleware(request) {
  const url = new URL(request.url);

  const host = request.headers.get("host"); 
  const mainDomain = "ramprasad.site";

  // extract subdomain
  const [subdomain] = host.split(".");

  // ignore main site
  if (host === mainDomain || host.endsWith(`www.${mainDomain}`)) {
    return NextResponse.next();
  }

  // redirect subdomain → /showprofile/[username]
  return NextResponse.rewrite(
    new URL(`/showprofile/${subdomain}`, request.url)
  );
}
