import { type ContractType } from "../types/general";
import { type ReactNode } from "react";
import { ListItem } from "../components/ListItem";
import { formatDate } from "../utils/formatDate";
import { convertStatus } from "../utils/convertStatus";

export type CardContractProps = {
  data: ContractType;
  children?: ReactNode;
};
export function CardContract({ data, children }: CardContractProps) {
  return (
    <ul className="flex flex-col gap-2 overflow-hidden rounded-md border-2 border-primary-500">
      <ListItem label="Kupac">{data.buyer}</ListItem>
      <ListItem label="Broj ugovora">{data.contractId}</ListItem>
      <ListItem label="Datum akontacije">
        {formatDate(data.advancePaymentDate)}
      </ListItem>
      <ListItem label="Rok isporuke">{formatDate(data.deliveryDate)}</ListItem>
      <ListItem label="Status" variant={data.status}>
        {convertStatus.param2display(data.status)}
      </ListItem>
      {children}
    </ul>
  );
}
