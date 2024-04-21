import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  type PatchContractProps,
  type DeleteContractAndContractArticlesProps,
  getContracts,
  patchContract,
  getContractArticles,
  deleteContractAndContractArticles,
} from "./api";

export const contractsQueryOptions = queryOptions({
  queryKey: ["contracts"],
  queryFn: () => getContracts(),
});

export const contractArticlesQueryOptions = (contractId: string) =>
  queryOptions({
    queryKey: ["contractArticles", { contractId }],
    queryFn: () => getContractArticles(contractId),
  });

export const usePatchContractMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PatchContractProps) => patchContract(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });
};

export const useDeleteContractAndContractArticlesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteContractAndContractArticlesProps) =>
      deleteContractAndContractArticles(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contracts"] }),
  });
};
