import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { contractsQueryOptions } from "../services/queryOptions";
import { Route } from "../routes/index";
import { ListItem } from "../components/ListItem";
import { formatDate } from "../utils/formatDate";
import { Button } from "../components/Button";
import { Edit, List, Trash } from "lucide-react";
import { NavLink } from "../components/NavLink";
import { convertContractId } from "../utils/convertContractId";

export type SearchResultsProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
  setContractId: Dispatch<SetStateAction<string>>;
};
export function SearchResults({
  setIsOpen,
  setId,
  setContractId,
}: SearchResultsProps) {
  const { data } = useSuspenseQuery(contractsQueryOptions);

  const { buyer, active } = Route.useSearch();

  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    console.log("update");
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

  return filteredData.length ? (
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
              params={(old) => {
                return {
                  ...old,
                  contractId: convertContractId.display2param(
                    contract.broj_ugovora,
                  ),
                };
              }}
            >
              <List />
            </NavLink>
            <Button
              variant="outline"
              btnType="icon"
              onClick={() => {
                setIsOpen(true);

                setId(contract.id);

                setContractId(contract.broj_ugovora);
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
  );
}
