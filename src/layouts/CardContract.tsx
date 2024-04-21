import { type ContractType } from "../types/general";
import { type ReactNode } from "react";
import { ListItem } from "../components/ListItem";
import { formatDate } from "../utils/formatDate";

export type CardContractProps = {
  data: ContractType;
  children?: ReactNode;
};
export function CardContract({ data, children }: CardContractProps) {
  return (
    <ul className="flex flex-col gap-2 overflow-hidden rounded-md border-2 border-primary-500">
      <ListItem label="Kupac">{data.kupac}</ListItem>
      <ListItem label="Broj ugovora">{data.broj_ugovora}</ListItem>
      <ListItem label="Datum akontacije">
        {formatDate(data.datum_akontacije)}
      </ListItem>
      <ListItem label="Rok isporuke">{formatDate(data.rok_isporuke)}</ListItem>
      <ListItem label="Status" variant={data.status}>
        {data.status}
      </ListItem>
      {children}
    </ul>
  );
}
