import { homeQueryOptions } from "../main";
import { useSuspenseQuery } from "@tanstack/react-query";

export function Home() {
  const { data, isLoading } = useSuspenseQuery(homeQueryOptions);

  return (
    <div className="flex gap-2 p-2">
      {isLoading ? "Loading" : null}
      {data.length ? (
        <ul className="list-disc pl-4">
          {data.map((contract) => {
            return (
              <li key={contract.broj_ugovora} className="whitespace-nowrap">
                {contract.broj_ugovora}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
}
