import { createFileRoute } from "@tanstack/react-router";
import { ErrorDisplay } from "../../layouts/ErrorDisplay";
import { PendingDisplay } from "../../layouts/PendingDisplay";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  homeQueryOptions,
  contractQueryOptions,
} from "../../services/queryOptions";
import { convertContractId } from "../../utils/convertContractId";

export const Route = createFileRoute("/contract/$contractId")({
  /* loader:
    ({ context: { queryClient }, params: { contractId } }) =>
    async () => {
      const contractBasePromise = queryClient.ensureQueryData(homeQueryOptions);

      const contractArticlePromise = queryClient.ensureQueryData(
        contractQueryOptions(contractId),
      );

      return Promise.all([contractBasePromise, contractArticlePromise]);
    }, */
  loader: ({ context: { queryClient }, params: { contractId } }) =>
    queryClient.ensureQueryData(contractQueryOptions(contractId)),
  component: Contract,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Contract() {
  const contractId = Route.useParams().contractId;

  const [homeRes, contractRes] = useSuspenseQueries({
    queries: [homeQueryOptions, contractQueryOptions(contractId)],
  });

  const contractBaseData = homeRes.data.filter(
    (contract) =>
      convertContractId.param2display(contractId) === contract.broj_ugovora,
  )[0];

  const contractArticlesData = contractRes.data;

  return contractBaseData ? (
    <div className="space-y-2">
      <p>{contractBaseData.kupac}</p>
      <p>{contractBaseData.broj_ugovora}</p>
      <p>{contractBaseData.datum_akontacije}</p>
      <p>{contractBaseData.rok_isporuke}</p>
      <p>{contractBaseData.status}</p>
      <p>{JSON.stringify(contractArticlesData)}</p>
    </div>
  ) : (
    <div>No data</div>
  );
}

/* import { createFileRoute } from "@tanstack/react-router";
import { ErrorDisplay } from "../../layouts/ErrorDisplay";
import { PendingDisplay } from "../../layouts/PendingDisplay";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  contractBaseQueryOptions,
  contractArticleQueryOptions,
} from "../../services/queryOptions";
import {} from "../../services/queryOptions";

export const Route = createFileRoute("/contract/$contractId")({
  loader:
    ({ context: { queryClient }, params: { contractId } }) =>
    async () => {
      console.log("R");
      const contractBasePromise = queryClient.ensureQueryData(
        contractBaseQueryOptions(contractId),
      );

      const contractArticlePromise = queryClient.ensureQueryData(
        contractArticleQueryOptions(contractId),
      );

      const [contractBaseData, contractArticleData] = await Promise.all([
        contractBasePromise,
        contractArticlePromise,
      ]);

      return { base: contractBaseData, article: contractArticleData };
    },
  component: Contract,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Contract() {
  const contractId = Route.useParams().contractId;

  const res = useSuspenseQueries({
    queries: [
      contractBaseQueryOptions(contractId),
      contractArticleQueryOptions(contractId),
    ],
  });

  console.log(res);

  return contractBaseData ? (
    <div className="space-y-2">
      <p>{contractBaseData.kupac}</p>
      <p>{contractBaseData.broj_ugovora}</p>
      <p>{contractBaseData.datum_akontacije}</p>
      <p>{contractBaseData.rok_isporuke}</p>
      <p>{contractBaseData.status}</p>
      <p>{JSON.stringify(contractArticlesData)}</p>
    </div>
  ) : (
    <div>No data</div>
  );
}
*/
