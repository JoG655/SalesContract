import { createFileRoute } from "@tanstack/react-router";
import { ErrorDisplay } from "../layouts/ErrorDisplay";
import { PendingDisplay } from "../layouts/PendingDisplay";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { homeQueryOptions } from "../services/queryOptions";
import { Button } from "../components/Button";
import { Check, Edit, List, Plus, Trash, X } from "lucide-react";
import { ListItem } from "../components/ListItem";
import { formatDate } from "../utils/formatDate";
import { NavLink } from "../components/NavLink";
import { convertContractId } from "../utils/convertContractId";
import { Modal } from "../components/Modal";
import { deleteContractAndContractArticles } from "../services/api";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(homeQueryOptions),
  component: Home,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Home() {
  const { data } = useSuspenseQuery(homeQueryOptions);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [deleteContractId, setDeleteContractId] = useState("");

  return (
    <section className="flex w-full flex-col gap-4 text-primary-500">
      <div className="flex justify-center">
        <Button size="xl">
          Dodaj novi kupoprodajni ugovor <Plus />
        </Button>
      </div>
      <h1 className="text-center font-bold">Kupoprodajni ugovori</h1>
      {data.length ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {data.map((contract) => (
            <ul
              key={contract.id}
              className="flex flex-col gap-2 overflow-hidden rounded-md border-2 border-primary-500"
            >
              <ListItem label="Kupac">{contract.kupac}</ListItem>
              <ListItem label="Broj ugovora">{contract.broj_ugovora}</ListItem>
              <ListItem label="Datum akontacije">
                {formatDate(contract.datum_akontacije)}
              </ListItem>
              <ListItem label="Rok isporuke">
                {formatDate(contract.rok_isporuke)}
              </ListItem>
              <ListItem label="Status" variant={contract.status}>
                {contract.status}
              </ListItem>
              <ListItem label="Akcije" container>
                <Button variant="outline" btnType="icon">
                  <Edit />
                </Button>
                <NavLink
                  variant="outline"
                  linkType="icon"
                  to="/contract/$contractId"
                  params={{
                    contractId: convertContractId.display2param(
                      contract.broj_ugovora,
                    ),
                  }}
                >
                  <List />
                </NavLink>
                <Button
                  variant="outline"
                  btnType="icon"
                  onClick={() => {
                    setIsDeleteOpen(true);

                    setDeleteId(contract.id);

                    setDeleteContractId(contract.broj_ugovora);
                  }}
                >
                  <Trash className="text-red-600" />
                </Button>
              </ListItem>
            </ul>
          ))}
        </ul>
      ) : (
        <p className="text-center">Nema kupoprodajnih ugovora</p>
      )}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div className="flex flex-col items-center gap-2 p-6">
          <p>Potvrdite brisanje kupoprodajnog ugovora</p>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                await deleteContractAndContractArticles(
                  deleteId,
                  deleteContractId,
                );

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
    </section>
  );
}
