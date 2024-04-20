import { homeQueryOptions, contractQueryOptions } from "../main";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { convertContractId } from "../utils/convertContractId";

export function ContractArticles() {
  const routeApi = getRouteApi("/contract/$contractId");

  const { contractId } = routeApi.useParams();

  const { data: homeData } = useSuspenseQuery(homeQueryOptions);

  const contractBaseData = homeData?.filter(
    (contract) =>
      convertContractId.param2display(contractId) === contract.broj_ugovora,
  )[0];

  const { data: contractArticlesData } = useSuspenseQuery(
    contractQueryOptions(contractId),
  );

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
