import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // GitHub Pages project sites live in a subdirectory (VITE_BASE_PATH).
  // During SSR prerender the request comes in at "/", so the router must use
  // "/" there; on the client it uses the real base path.
  const basepath =
    import.meta.env.SSR || typeof window === "undefined"
      ? "/"
      : import.meta.env.VITE_BASE_PATH || "/";

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
