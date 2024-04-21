import axios from "axios";
import { convertContractId } from "../utils/convertContractId";
import { type ArticleType, type ContractType } from "../types/general";

const BASE_URL = "http://localhost:7000";
const TIMEOUT = 2500;

const axiosInstance = axios.create({ baseURL: BASE_URL });

export class NotFoundError extends Error {}

export async function getContracts() {
  console.log("Getting contracts...");

  await new Promise((r) => setTimeout(r, TIMEOUT));

  try {
    const { data } = await axiosInstance.get<ContractType[]>("contracts");

    if (!data) {
      throw new NotFoundError("Kupoprodajni ugovori nisu pronađeni!");
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Pogreška: ", error.message);

      throw new NotFoundError(error.message);
    } else {
      console.log("Neočekivana pogreška: ", error);

      throw new NotFoundError("Neočekivana pogreška");
    }
  }
}

export async function deleteContract(id: string) {
  console.log(`Deleting contract with id ${id}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  try {
    await axiosInstance.delete(`contracts/${id}`);

    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Pogreška: ", error.message);

      throw new NotFoundError(error.message);
    } else {
      console.log("Neočekivana pogreška: ", error);

      throw new NotFoundError("Neočekivana pogreška");
    }
  }
}

export type PatchContractProps = {
  id: string;
  deliveryDate: ContractType["rok_isporuke"];
  status: ContractType["status"];
};

export async function patchContract({
  id,
  deliveryDate,
  status,
}: PatchContractProps) {
  console.log(`Patching contract with id ${id}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  try {
    const { data } = await axiosInstance.patch<ContractType>(
      `contracts/${id}`,
      { rok_isporuke: deliveryDate, status },
    );

    if (!data) {
      throw new NotFoundError(
        `Kupoprodajni ugovor za id:"${id}" nije pronađen!`,
      );
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Pogreška: ", error.message);

      throw new NotFoundError(error.message);
    } else {
      console.log("Neočekivana pogreška: ", error);

      throw new NotFoundError("Neočekivana pogreška");
    }
  }
}

export async function postContract(id: string) {
  console.log(`Posting contract with id ${id}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  try {
    const { data } = await axiosInstance.post<ContractType>(`contracts/${id}`);

    if (!data) {
      throw new NotFoundError(
        `Kupoprodajni ugovor za id:"${id}" nije pronađen!`,
      );
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Pogreška: ", error.message);

      throw new NotFoundError(error.message);
    } else {
      console.log("Neočekivana pogreška: ", error);

      throw new NotFoundError("Neočekivana pogreška");
    }
  }
}

export async function getContractArticles(contractId: string) {
  console.log(`Getting contract articles with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  try {
    const { data } = await axiosInstance.get<ArticleType>(
      `articles/${contractId}`,
    );

    if (!data.items) {
      throw new NotFoundError(
        `Artikli za broj ugovora:"${convertContractId.param2display(contractId)}" nisu pronađeni!`,
      );
    }

    return data.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Pogreška: ", error.message);

      throw new NotFoundError(error.message);
    } else {
      console.log("Neočekivana pogreška: ", error);

      throw new NotFoundError("Neočekivana pogreška");
    }
  }
}

export async function deleteContractArticles(contractId: string) {
  console.log(`Deleting contract articles with id ${contractId}...`);

  await new Promise((r) => setTimeout(r, TIMEOUT));

  try {
    await axiosInstance.delete(`articles/${contractId}`);

    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Pogreška: ", error.message);

      throw new NotFoundError(error.message);
    } else {
      console.log("Neočekivana pogreška: ", error);

      throw new NotFoundError("Neočekivana pogreška");
    }
  }
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

  try {
    const results = await Promise.all([
      deleteContract(id),
      deleteContractArticles(convertContractId.display2param(contractId)),
    ]);

    return results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Pogreška: ", error.message);

      throw new NotFoundError(error.message);
    } else {
      console.log("Neočekivana pogreška: ", error);

      throw new NotFoundError("Neočekivana pogreška");
    }
  }
}
