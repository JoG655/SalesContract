import { type ArticleType } from "../types/general";
import axios from "axios";
import { convertContractId } from "../utils/convertContractId";

export class NotFoundError extends Error {}

export async function getContractArticles(contractId: string) {
  console.log(`Fetching contract articles with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, 2500));

  const items = await axios
    .get<ArticleType>(`http://localhost:7000/articles/${contractId}`)
    .then((r) => r.data.items);

  if (!items) {
    throw new NotFoundError(
      `Artikli za broj ugovora:"${convertContractId.param2display(contractId)}" nisu pronađeni!`,
    );
  }

  return items;
}
