import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorDisplay } from "../layouts/ErrorDisplay";
import { PendingDisplay } from "../layouts/PendingDisplay";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  contractsQueryOptions,
  useDeleteContractAndContractArticlesMutation,
} from "../services/queryOptions";
import { Button } from "../components/Button";
import { Check, DoorOpen, Plus } from "lucide-react";
import { SearchForm } from "../layouts/SearchForm";
import { SearchResults } from "../layouts/SearchResults";
import { Modal } from "../components/Modal";
import { EditForm } from "../layouts/EditForm";

const contractsSearchSchema = z.object({
  buyer: z.string().catch(""),
  active: z.enum(["notSelected", "active", "inactive"]).catch("notSelected"),
});

export type ContractsSearch = z.infer<typeof contractsSearchSchema>;

export type ContractsSearchActive = z.infer<
  typeof contractsSearchSchema
>["active"];

export const Route = createFileRoute("/")({
  validateSearch: contractsSearchSchema,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(contractsQueryOptions),
  component: Home,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Home() {
  const { data } = useSuspenseQuery(contractsQueryOptions);

  const { buyer, active } = Route.useSearch();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [id, setId] = useState(data[0].id);

  const [activeContract, setActiveContract] = useState(data[0]);

  useEffect(() => {
    setActiveContract({ ...data.filter((contract) => id === contract.id)[0] });
  }, [data, id]);

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
        <SearchForm
          routeFullPath={Route.fullPath}
          buyer={buyer}
          active={active}
        />
        <SearchResults
          data={data}
          buyer={buyer}
          active={active}
          setIsDeleteOpen={setIsDeleteOpen}
          setIsEditOpen={setIsEditOpen}
          setId={setId}
        />
      </section>
      <Modal isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen}>
        <div className="flex flex-col items-center gap-6 p-14">
          <h3>Potvrdite brisanje kupoprodajnog ugovora</h3>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                await mutateDeleteContractAndContractArticles({
                  id: id,
                  contractId: activeContract.broj_ugovora,
                });

                setIsDeleteOpen(false);
              }}
            >
              <Check />
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              <DoorOpen />
            </Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isEditOpen} setIsOpen={setIsEditOpen}>
        <div className="flex flex-col items-center gap-6 p-14">
          <h3>Uređivanje kupoprodajnog ugovora</h3>
          <EditForm
            id={id}
            deliveryDate={activeContract.rok_isporuke}
            status={activeContract.status}
          >
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              <DoorOpen />
            </Button>
          </EditForm>
        </div>
      </Modal>
    </>
  );
}
