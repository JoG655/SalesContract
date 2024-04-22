import { type ContractType, type StatusType } from "../types/general";
import { convertStatus } from "../utils/convertStatus";
import { type ReactNode, useState } from "react";
import { usePatchContractMutation } from "../services/queryOptions";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { Check, X } from "lucide-react";
import { validateDate } from "../utils/validateDate";

const CREATED_OPTIONS: Record<Exclude<StatusType, "delivered">, string> = {
  created: convertStatus.param2display("created"),
  ordered: convertStatus.param2display("ordered"),
};

const OREDERED_OPTIONS: Record<Exclude<StatusType, "created">, string> = {
  ordered: convertStatus.param2display("ordered"),
  delivered: convertStatus.param2display("delivered"),
};

const DELIVERED_OPTIONS: Record<
  Exclude<StatusType, "created" | "ordered">,
  string
> = {
  delivered: convertStatus.param2display("delivered"),
};

export type EditFormProps = {
  id: ContractType["id"];
  deliveryDate: ContractType["deliveryDate"];
  status: ContractType["status"];
  children?: ReactNode;
};

export function EditForm({
  id,
  deliveryDate,
  status,
  children,
}: EditFormProps) {
  const [deliveryDateValue, setDeliveryDateValue] = useState(deliveryDate);

  const [deliveryDateError, setDeliveryDateError] = useState("");

  const [statusValue, setStatusValue] = useState(status);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: mutatePatchContract } = usePatchContractMutation();

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();

        e.stopPropagation();

        setIsSubmitting(true);

        let errorFound = false,
          errorMsg = "";

        if (!deliveryDateValue) {
          errorMsg = "Polje je obavezno";
        } else {
          const validatedDeliveryDate = validateDate(deliveryDateValue);

          if (validatedDeliveryDate === 1) {
            errorMsg = "Format datuma mora odgovarati YYYY-MM-DD";
          } else if (validatedDeliveryDate === 2) {
            errorMsg = "Datum ne postoji";
          }
        }

        if (errorMsg) {
          setDeliveryDateError(errorMsg);

          errorFound = true;
        }

        if (errorFound) {
          setIsSubmitting(false);

          return;
        }

        await mutatePatchContract({
          id,
          deliveryDate: deliveryDateValue,
          status: statusValue,
        });

        setIsSubmitting(false);
      }}
      onReset={(e) => {
        e.stopPropagation();

        setDeliveryDateValue(deliveryDate);

        setStatusValue(status);

        setDeliveryDateError("");
      }}
    >
      <div className="flex flex-col justify-between gap-2 p-2">
        <Input
          className="ml-auto"
          type="text"
          placeholder={new Date().toISOString().split("T")[0]}
          disabled={isSubmitting || status === "delivered"}
          value={deliveryDateValue}
          onChange={(e) => {
            setDeliveryDateValue(e.target.value);

            setDeliveryDateError("");
          }}
        >
          Rok isporuke
        </Input>
        {deliveryDateError ? (
          <p className="animate-fadeIn text-balance rounded-xl bg-red-100 px-4 py-2 text-center text-sm text-red-500">
            {deliveryDateError}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Select
          className="ml-auto"
          disabled={isSubmitting || status === "delivered"}
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value as StatusType)}
          options={
            status === "created"
              ? CREATED_OPTIONS
              : status === "ordered"
                ? OREDERED_OPTIONS
                : DELIVERED_OPTIONS
          }
        >
          Status
        </Select>
      </div>
      <div className="flex justify-center gap-2">
        <Button type="submit" disabled={isSubmitting}>
          <Check />
        </Button>
        <Button variant="ghost" type="reset" disabled={isSubmitting}>
          <X />
        </Button>
        {children}
      </div>
    </form>
  );
}
