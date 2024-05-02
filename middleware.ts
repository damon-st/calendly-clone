import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProetecedRoute = createRouteMatcher(["/intro(.*)", "/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProetecedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
