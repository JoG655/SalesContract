import { type ContractType, type StatusType } from "../types/general";
import { type ReactNode, useState } from "react";
import { usePatchContractMutation } from "../services/queryOptions";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Button } from "../components/Button";
import { Check, X } from "lucide-react";
import { validateDate } from "../utils/validateDate";

const CREATED_OPTIONS: Record<Exclude<StatusType, "ISPORUČENO">, string> = {
  KREIRANO: "Kreirano",
  NARUČENO: "Naručeno",
};

const OREDERED_OPTIONS: Record<Exclude<StatusType, "KREIRANO">, string> = {
  NARUČENO: "Naručeno",
  ISPORUČENO: "Isporučeno",
};

const DELIVERED_OPTIONS: Record<
  Exclude<StatusType, "KREIRANO" | "NARUČENO">,
  string
> = {
  ISPORUČENO: "Isporučeno",
};

export type EditFormProps = { children?: ReactNode } & {
  id: ContractType["id"];
  deliveryDate: ContractType["rok_isporuke"];
  status: ContractType["status"];
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
      onSubmit={async (e) => {
        e.preventDefault();

        e.stopPropagation();

        setIsSubmitting(true);

        let errorFound = false;

        switch (validateDate(deliveryDate)) {
          case 0:
            break;
          case 1:
            setDeliveryDateError("Format datuma mora odgovarati YYYY-MM-DD");
            break;
          case 2:
            setDeliveryDateError("Datum ne postoji");
            break;
          case 3:
            setDeliveryDateError("Datum je manji od trenutnog");
            break;
          default:
            break;
        }

        if (deliveryDateError) {
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

        setDeliveryDateError;
      }}
    >
      <fieldset
        className="flex flex-col items-center gap-4"
        disabled={isSubmitting}
      >
        <Input
          value={deliveryDateValue}
          onChange={(e) => {
            setDeliveryDateValue(e.target.value);

            setDeliveryDateError("");
          }}
          type="text"
          placeholder="2024-03-14"
          required
          disabled={status === "ISPORUČENO"}
        >
          Rok isporuke
        </Input>
        {deliveryDateError ? (
          <p className="rounded bg-red-100 px-4 py-2 text-red-500"></p>
        ) : null}
        <Select
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value as StatusType)}
          options={
            status === "KREIRANO"
              ? CREATED_OPTIONS
              : status === "NARUČENO"
                ? OREDERED_OPTIONS
                : DELIVERED_OPTIONS
          }
          disabled={status === "ISPORUČENO"}
          required
        >
          Status
        </Select>
        <div className="flex gap-2">
          <Button type="submit">
            <Check />
          </Button>
          <Button variant="outline" type="reset">
            <X />
          </Button>
          {children}
        </div>
      </fieldset>
    </form>
  );
}
