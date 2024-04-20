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
      <nav className="flex w-full items-center justify-center gap-4 border-b-2 border-primary-700 p-4 text-lg">
        <NavLink to="/" activeOptions={{ exact: true }}>
          Početna
        </NavLink>
        <NavLink to="/bonus">Bonus</NavLink>
        <NavLink to="/contract/$contractId" params={{ contractId: "1-2024" }}>
          Ugovor
        </NavLink>
      </nav>
      <main className="mx-auto flex min-h-dvh max-w-5xl flex-grow animate-fadeIn flex-col items-center scroll-smooth px-4 py-6">
        <Outlet />
      </main>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
