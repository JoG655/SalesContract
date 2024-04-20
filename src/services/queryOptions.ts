import { queryOptions } from "@tanstack/react-query";
import { getContracts, getContractArticles } from "./api";

export const homeQueryOptions = queryOptions({
  queryKey: ["home"],
  queryFn: () => getContracts(),
});

export const contractQueryOptions = (contractId: string) =>
  queryOptions({
    queryKey: ["contract", { contractId }],
    queryFn: () => getContractArticles(contractId),
  });
