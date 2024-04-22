export type StatusApiType = "KREIRANO" | "NARUČENO" | "ISPORUČENO";

export type StatusType = "created" | "ordered" | "delivered";

export type ContractType = {
  id: string;
  buyer: string;
  contractId: string;
  advancePaymentDate: string;
  deliveryDate: string;
  status: StatusType;
};

export type ArticleType = {
  id: string;
  items: {
    id: string;
    name: string;
    supplier: string;
    status: StatusType;
  }[];
};
