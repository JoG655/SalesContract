export type StatusType = "KREIRANO" | "NARUČENO" | "ISPORUČENO";

export type ContractType = {
  id: string;
  kupac: string;
  broj_ugovora: string;
  datum_akontacije: string;
  rok_isporuke: string;
  status: StatusType;
};

export type ArticleType = {
  id: string;
  items: {
    id: string;
    naziv: string;
    dobavljač: string;
    status: StatusType;
  }[];
};
