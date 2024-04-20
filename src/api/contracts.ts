import { type ContractType } from "../types/general";
import axios from "axios";

export class NotFoundError extends Error {}

export async function getContracts() {
  console.log("Fetching contracts...");

  await new Promise((r) => setTimeout(r, 2500));

  const items = axios
    .get<ContractType[]>("http://localhost:7000/contracts")
    .then((r) => r.data);

  if (!items) {
    throw new NotFoundError("Prodajni ugovori nisu pronađeni!");
  }

  return items;
}
