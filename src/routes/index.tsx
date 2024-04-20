import { createFileRoute } from "@tanstack/react-router";
import { ErrorDisplay } from "../layouts/ErrorDisplay";
import { PendingDisplay } from "../layouts/PendingDisplay";
import { useSuspenseQuery } from "@tanstack/react-query";
import { homeQueryOptions } from "../services/queryOptions";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(homeQueryOptions),
  component: Home,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Home() {
  const { data } = useSuspenseQuery(homeQueryOptions);

  return (
    <div className="flex gap-2 p-2">
      <ul className="list-disc pl-4">
        {data.map((contract) => {
          return (
            <li key={contract.broj_ugovora} className="whitespace-nowrap">
              {contract.broj_ugovora}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
