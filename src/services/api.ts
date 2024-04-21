import axios from "axios";
import { convertContractId } from "../utils/convertContractId";
import { type ArticleType, type ContractType } from "../types/general";

const BASE_URL = "http://localhost:7000";
const TIMEOUT = 100;

const axiosInstance = axios.create({ baseURL: BASE_URL });

export class NotFoundError extends Error {}

export async function getContracts() {
  console.log("Fetching contracts...");

  await new Promise((r) => setTimeout(r, TIMEOUT));

  const items = axiosInstance
    .get<ContractType[]>("contracts")
    .then((r) => r.data);

  if (!items) {
    throw new NotFoundError("Kupoprodajni ugovori nisu pronađeni!");
  }

  return items;
}

export async function deleteContract(id: string) {
  console.log(`Deleting contract with id ${id}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  return await axiosInstance.delete(`contracts/${id}`);
}

export async function getContract(contractId: string) {
  console.log(`Fetching contract with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  const items = axiosInstance
    .get<
      ContractType[]
    >(`contracts?broj_ugovora=${convertContractId.param2display(contractId)}`)
    .then((r) => r.data[0]);

  if (!items) {
    throw new NotFoundError("Kupoprodajni ugovor nije pronađen!");
  }

  return items;
}

export async function getContractArticles(contractId: string) {
  console.log(`Fetching contract articles with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  const items = await axiosInstance
    .get<ArticleType>(`articles/${contractId}`)
    .then((r) => r.data.items);

  if (!items) {
    throw new NotFoundError(
      `Artikli za broj ugovora:"${convertContractId.param2display(contractId)}" nisu pronađeni!`,
    );
  }

  return items;
}

export async function deleteContractArticles(contractId: string) {
  console.log(`Deleting contract articles with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  return await axiosInstance.delete(`articles/${contractId}`);
}

export type DeleteContractAndContractArticlesProps = {
  id: string;
  contractId: string;
};
export async function deleteContractAndContractArticles({
  id,
  contractId,
}: DeleteContractAndContractArticlesProps) {
  console.log(
    `Deleting contract with id ${id} and contract articles with id ${contractId}...`,
  );

  const results = await Promise.all([
    deleteContract(id),
    deleteContractArticles(convertContractId.display2param(contractId)),
  ]);

  return results;
}
