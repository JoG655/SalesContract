import { type StatusType, type StatusApiType } from "../types/general";

export const convertStatus = {
  param2display(status: StatusType) {
    const mappedStatus =
      status === "created"
        ? "KREIRANO"
        : status === "ordered"
          ? "NARUČENO"
          : "ISPORUČENO";

    return mappedStatus;
  },
  display2param(status: StatusApiType) {
    const mappedStatus: StatusType =
      status === "KREIRANO"
        ? "created"
        : status === "NARUČENO"
          ? "ordered"
          : "delivered";

    return mappedStatus;
  },
};
