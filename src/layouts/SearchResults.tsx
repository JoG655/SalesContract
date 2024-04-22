import { type ContractType } from "../types/general";
import { type ContractsSearch } from "../routes/index";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { ListItem } from "../components/ListItem";
import { formatDate } from "../utils/formatDate";
import { convertStatus } from "../utils/convertStatus";
import { Button } from "../components/Button";
import { Edit, List, Trash } from "lucide-react";
import { NavLink } from "../components/NavLink";
import { convertContractId } from "../utils/convertContractId";

export type SearchResultsProps = {
  data: ContractType[];
  setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<string>>;
} & ContractsSearch;

export function SearchResults({
  data,
  buyer,
  active,
  setIsDeleteOpen,
  setIsEditOpen,
  setId,
}: SearchResultsProps) {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (!buyer && active === "notSelected") {
      setFilteredData([...data]);

      return;
    }

    const newFilteredData = data.filter((contract) => {
      const buyerMatches = buyer
        ? contract.buyer.toLowerCase().includes(buyer.toLowerCase())
        : true;

      const activeMatches =
        active === "notSelected"
          ? true
          : active === "active"
            ? contract.status === "created" || contract.status === "ordered"
            : active === "inactive"
              ? contract.status === "delivered"
              : false;

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
          <ListItem label="Kupac">{contract.buyer}</ListItem>
          <ListItem label="Broj ugovora">{contract.contractId}</ListItem>
          <ListItem label="Datum akontacije">
            {formatDate(contract.advancePaymentDate)}
          </ListItem>
          <ListItem label="Rok isporuke">
            {formatDate(contract.deliveryDate)}
          </ListItem>
          <ListItem label="Status" variant={contract.status}>
            {convertStatus.param2display(contract.status)}
          </ListItem>
          <ListItem label="Akcije" container>
            <Button
              variant="outline"
              btnType="icon"
              onClick={() => {
                setIsEditOpen(true);

                setId(contract.id);
              }}
            >
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
                    contract.contractId,
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
                setIsDeleteOpen(true);

                setId(contract.id);
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
