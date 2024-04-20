import axios from "axios";
import { convertContractId } from "../utils/convertContractId";

type ContractType = {
  id: string;
  kupac: string;
  broj_ugovora: string;
  datum_akontacije: string;
  rok_isporuke: string;
  status: "KREIRANO" | "NARUČENO" | "ISPORUČENO";
};

type ArticleType = {
  id: string;
  items: {
    id: string;
    naziv: string;
    dobavljač: string;
    status: "KREIRANO" | "NARUČENO" | "ISPORUČENO";
  }[];
};

const BASE_URL = "http://localhost:7000";
const TIMEOUT = 2500;

const axiosInstance = axios.create({ baseURL: BASE_URL });

export class NotFoundError extends Error {}

export async function getContracts() {
  console.log("Fetching contracts...");

  await new Promise((r) => setTimeout(r, TIMEOUT));

  const items = axiosInstance
    .get<ContractType[]>("http://localhost:7000/contracts")
    .then((r) => r.data);

  if (!items) {
    throw new NotFoundError("Prodajni ugovori nisu pronađeni!");
  }

  return items;
}

export async function getContract(contractId: string) {
  console.log(`Fetching contract with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  const items = axiosInstance
    .get<
      ContractType[]
    >(`http://localhost:7000/contracts?broj_ugovora=${convertContractId.param2display(contractId)}`)
    .then((r) => r.data[0]);

  if (!items) {
    throw new NotFoundError("Prodajni ugovor nije pronađen!");
  }

  return items;
}

export async function getContractArticles(contractId: string) {
  console.log(`Fetching contract articles with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  const items = await axiosInstance
    .get<ArticleType>(`http://localhost:7000/articles/${contractId}`)
    .then((r) => r.data.items);

  if (!items) {
    throw new NotFoundError(
      `Artikli za broj ugovora:"${convertContractId.param2display(contractId)}" nisu pronađeni!`,
    );
  }

  return items;
}
