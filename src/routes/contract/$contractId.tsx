import { createFileRoute } from "@tanstack/react-router";
import { ErrorDisplay } from "../../layouts/ErrorDisplay";
import { PendingDisplay } from "../../layouts/PendingDisplay";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  homeQueryOptions,
  contractQueryOptions,
} from "../../services/queryOptions";
import { convertContractId } from "../../utils/convertContractId";
import { ListItem } from "../../components/ListItem";

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

  return (
    <section className="flex w-full flex-col gap-4 text-primary-500">
      <h1 className="text-center font-bold">Kupoprodajni podatci</h1>
      {contractBaseData ? (
        <ul className="flex flex-col gap-2 overflow-hidden rounded-md border-2 border-primary-500">
          <ListItem label="Kupac">{contractBaseData.kupac}</ListItem>
          <ListItem label="Broj ugovora">
            {contractBaseData.broj_ugovora}
          </ListItem>
          <ListItem label="Datum akontacije">
            {contractBaseData.datum_akontacije}
          </ListItem>
          <ListItem label="Rok isporuke">
            {contractBaseData.rok_isporuke}
          </ListItem>
          <ListItem label="Status" variant={contractBaseData.status}>
            {contractBaseData.status}
          </ListItem>
        </ul>
      ) : (
        <p>Nema artikala</p>
      )}
      <h2 className="text-center font-semibold">Artikli</h2>
      {contractArticlesData ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          {contractArticlesData.map((contractArticle) => (
            <li key={contractArticle.id}>
              <ul className="flex flex-col gap-2 overflow-hidden rounded-md border-2 border-primary-400">
                <ListItem label="Naziv">{contractArticle.naziv}</ListItem>
                <ListItem label="Dobavljač">
                  {contractArticle.dobavljač}
                </ListItem>
                <ListItem label="Status" variant={contractArticle.status}>
                  {contractArticle.status}
                </ListItem>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nema artikala</p>
      )}
    </section>
  );
}
