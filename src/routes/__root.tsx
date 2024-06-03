import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { NavLink } from "../components/NavLink";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Root,
});

function Root() {
  return (
    <>
      <nav className="sticky top-0 flex w-full items-center justify-center gap-4 border-b-2 border-primary-700 bg-white p-4 text-lg">
        <NavLink to="/" activeOptions={{ includeSearch: true }}>
          Početna
        </NavLink>
        <NavLink to="/bonus">Bonus</NavLink>
      </nav>
      <main>
        <div className="mx-auto flex max-w-7xl flex-grow animate-fadeIn flex-col items-center scroll-smooth px-1 py-4 md:px-4 md:py-6">
          <Outlet />
        </div>
      </main>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
