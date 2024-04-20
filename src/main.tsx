import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
} from "@tanstack/react-query";
import {
  createRouter,
  createRoute,
  RouterProvider,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { getContracts } from "./api/contracts";
import { getContractArticles } from "./api/contractArticles";
import { Home } from "./pages/Home";
import { ContractArticles } from "./pages/ContractArticles";
import { Bonus } from "./pages/Bonus";
import { NavLink } from "./components/NavLink";
import { ErrorDisplay } from "./layouts/ErrorDisplay";
import { PendingDisplay } from "./layouts/PendingDisplay";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
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
      <main className="mt-6 flex flex-grow flex-col items-center">
        <Outlet />
      </main>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});

export const homeQueryOptions = queryOptions({
  queryKey: ["home"],
  queryFn: () => getContracts(),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(homeQueryOptions),
  component: Home,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

export const contractQueryOptions = (contractId: string) =>
  queryOptions({
    queryKey: ["contract", { contractId }],
    queryFn: () => getContractArticles(contractId),
  });

const contractRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contract/$contractId",
  loader: ({ context: { queryClient }, params: { contractId } }) =>
    queryClient.ensureQueryData(contractQueryOptions(contractId)),
  component: ContractArticles,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

const bonusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bonus",
  component: Bonus,
});

const routeTree = rootRoute.addChildren([homeRoute, contractRoute, bonusRoute]);

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      ,
    </StrictMode>,
  );
}
