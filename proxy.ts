import { NextRequest, NextResponse } from "next/server";

const ADMIN_HEADER = "x-admin-secret";
const ADMIN_QUERY = "admin_secret";

const isAuthorized = (request: NextRequest, expected: string | undefined) => {
  if (!expected || expected.trim().length === 0) {
    return false;
  }

  const headerSecret =
    request.headers.get(ADMIN_HEADER) ?? request.headers.get("admin-secret");
  const querySecret = request.nextUrl.searchParams.get(ADMIN_QUERY);

  return headerSecret === expected || querySecret === expected;
};

export function proxy(request: NextRequest) {
  const expected = process.env.ADMIN_SECRET;
  const authorized = isAuthorized(request, expected);
  const isProd = process.env.NODE_ENV === "production";

  if (!authorized) {
    if (isProd) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/debug/:path*", "/api/submissions/:path*"],
};
