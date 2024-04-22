import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ErrorDisplay } from "../../layouts/ErrorDisplay";
import { PendingDisplay } from "../../layouts/PendingDisplay";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  contractsQueryOptions,
  contractArticlesQueryOptions,
} from "../../services/queryOptions";
import { convertContractId } from "../../utils/convertContractId";
import { Button } from "../../components/Button";
import { ArrowLeft } from "lucide-react";
import { ListItem } from "../../components/ListItem";
import { CardContract } from "../../layouts/CardContract";
import { convertStatus } from "../../utils/convertStatus";

export const Route = createFileRoute("/contract/$contractId")({
  /* loader:
    ({ context: { queryClient }, params: { contractId } }) =>
    async () => {
      const contractBasePromise = queryClient.ensureQueryData(contractsQueryOptions);

      const contractArticlePromise = queryClient.ensureQueryData(
        contractArticlesQueryOptions(contractId),
      );

      return Promise.all([contractBasePromise, contractArticlePromise]);
    }, */
  loader: ({ context: { queryClient }, params: { contractId } }) =>
    queryClient.ensureQueryData(contractArticlesQueryOptions(contractId)),
  component: Contract,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Contract() {
  const contractId = Route.useParams().contractId;

  const [homeRes, contractRes] = useSuspenseQueries({
    queries: [contractsQueryOptions, contractArticlesQueryOptions(contractId)],
  });

  const contractBaseData = homeRes.data.filter(
    (contract) =>
      convertContractId.param2display(contractId) === contract.contractId,
  )[0];

  const contractArticlesData = contractRes.data;

  const { history } = useRouter();

  return (
    <section className="flex w-full flex-col gap-4 text-primary-500">
      <div className="flex justify-center">
        <Button size="xl" onClick={() => history.go(-1)}>
          <ArrowLeft />
          Vrati se na prethodnu stranicu
        </Button>
      </div>
      <h1 className="text-center font-bold">Kupoprodajni podatci</h1>
      {contractBaseData ? (
        <CardContract data={contractBaseData} />
      ) : (
        <p className="text-center">Nema kupoprodajnog ugovora</p>
      )}
      <h2 className="text-center font-semibold">Artikli</h2>
      {contractArticlesData.length ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {contractArticlesData.map((contractArticle) => (
            <li key={contractArticle.id}>
              <ul className="flex flex-col gap-2 overflow-hidden rounded-md border-2 border-primary-400">
                <ListItem label="Naziv">{contractArticle.name}</ListItem>
                <ListItem label="Dobavljač">
                  {contractArticle.supplier}
                </ListItem>
                <ListItem label="Status" variant={contractArticle.status}>
                  {convertStatus.param2display(contractArticle.status)}
                </ListItem>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Nema artikala</p>
      )}
    </section>
  );
}
