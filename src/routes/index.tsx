import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorDisplay } from "../layouts/ErrorDisplay";
import { PendingDisplay } from "../layouts/PendingDisplay";
import { useState } from "react";
import {
  contractsQueryOptions,
  useDeleteContractAndContractArticlesMutation,
} from "../services/queryOptions";
import { Button } from "../components/Button";
import { Check, Plus, X } from "lucide-react";
import { SearchForm } from "../layouts/SearchForm";
import { SearchResults } from "../layouts/SearchResults";
import { Modal } from "../components/Modal";

const contractsSearchSchema = z.object({
  buyer: z.string().catch(""),
  active: z.string().catch("notSelected"),
});

// type ContractsSearch = z.infer<typeof contractsSearchSchema>;

export const Route = createFileRoute("/")({
  validateSearch: contractsSearchSchema,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(contractsQueryOptions),
  component: Home,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Home() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [deleteContractId, setDeleteContractId] = useState("");

  const { mutateAsync: mutateDeleteContractAndContractArticles } =
    useDeleteContractAndContractArticlesMutation();

  return (
    <>
      <section className="flex w-full flex-col gap-4 text-primary-500">
        <div className="flex justify-center">
          <Button size="xl">
            Dodaj novi kupoprodajni ugovor <Plus />
          </Button>
        </div>
        <h1 className="text-center font-bold">Kupoprodajni ugovori</h1>
        <SearchForm />
        <SearchResults
          setIsOpen={setIsDeleteOpen}
          setId={setDeleteId}
          setContractId={setDeleteContractId}
        />
      </section>
      <Modal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen}>
        <div className="flex flex-col items-center gap-2 p-14">
          <p>Potvrdite brisanje kupoprodajnog ugovora</p>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                await mutateDeleteContractAndContractArticles({
                  id: deleteId,
                  contractId: deleteContractId,
                });

                setIsDeleteOpen(false);
              }}
            >
              Potvrdi <Check />
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Odustani <X />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
