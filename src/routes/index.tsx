import { z } from "zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ErrorDisplay } from "../layouts/ErrorDisplay";
import { PendingDisplay } from "../layouts/PendingDisplay";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { homeQueryOptions } from "../services/queryOptions";
import { Button } from "../components/Button";
import { InputSearch } from "../components/InputSearch";
import {
  Activity,
  Check,
  Edit,
  List,
  Plus,
  Search,
  Send,
  Trash,
  X,
} from "lucide-react";
import { InputSelect } from "../components/InputSelect";
import { ListItem } from "../components/ListItem";
import { formatDate } from "../utils/formatDate";
import { NavLink } from "../components/NavLink";
import { convertContractId } from "../utils/convertContractId";
import { Modal } from "../components/Modal";
import { deleteContractAndContractArticles } from "../services/api";

const contractsSearchSchema = z.object({
  buyer: z.string().catch(""),
  active: z.string().catch("notSelected"),
});

// type ContractsSearch = z.infer<typeof contractsSearchSchema>;

export const Route = createFileRoute("/")({
  validateSearch: contractsSearchSchema,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(homeQueryOptions),
  component: Home,
  errorComponent: ErrorDisplay,
  pendingComponent: PendingDisplay,
});

function Home() {
  const { data } = useSuspenseQuery(homeQueryOptions);

  const { buyer, active } = Route.useSearch();
  console.log(buyer, active);

  const navigate = useNavigate({ from: Route.fullPath });

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!buyer && active === "notSelected") {
      setFilteredData([...data]);

      return;
    }

    const newFilteredData = data.filter((contract) => {
      const buyerMatches = buyer
        ? contract.kupac.toLowerCase().includes(buyer.toLowerCase())
        : true;

      const activeMatches =
        active === "notSelected"
          ? true
          : active === "true"
            ? contract.status === "KREIRANO" || contract.status === "NARUČENO"
            : contract.status === "ISPORUČENO";

      return buyerMatches && activeMatches;
    });

    setFilteredData([...newFilteredData]);
  }, [active, buyer, data]);

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
      <form
        className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();

          e.stopPropagation();

          const data = new FormData(e.target as HTMLFormElement);

          const formData = Array.from(data.entries()).reduce<
            Record<string, string>
          >((acc, [key, value]) => {
            acc[key] = value.toString();

            return acc;
          }, {});

          navigate({
            search: {
              buyer: formData.buyer,
              active: formData.active,
            },
          });
        }}
        onReset={(e) => {
          e.stopPropagation();

          navigate({
            search: {
              buyer: "",
              active: "notSelected",
            },
          });
        }}
      >
        <InputSearch name="buyer">
          <Search />
          Naziv
        </InputSearch>
        <InputSelect
          name="active"
          options={{
            notSelected: "Nije odabrano",
            true: "Aktivni",
            false: "Neaktivni",
          }}
        >
          <Activity />
          Aktivnost
        </InputSelect>
        <div className="flex gap-2">
          <Button type="submit">
            Traži
            <Send />
          </Button>
          <Button type="reset">
            Očisti
            <Trash />
          </Button>
        </div>
      </form>
      {filteredData.length ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4">
          {filteredData.map((contract) => (
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
