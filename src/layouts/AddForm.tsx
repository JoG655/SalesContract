import { type ContractType } from "../types/general";
import { type ReactNode, useState } from "react";
import { usePostContractMutation } from "../services/queryOptions";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Check, X } from "lucide-react";
import { validateDate } from "../utils/validateDate";

export type AddFormProps = {
  data: ContractType[];
  children?: ReactNode;
};

export function AddForm({ data, children }: AddFormProps) {
  const [buyerValue, setBuyerValue] = useState("");

  const [buyerError, setBuyerError] = useState("");

  const [contractIdValue, setContractIdValue] = useState("");

  const [contractIdError, setContractIdError] = useState("");

  const [advancePaymentDateValue, setAdvancePaymentDateValue] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [advancePaymentDateError, setAdvancePaymentDateError] = useState("");

  const [deliveryDateValue, setDeliveryDateValue] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [deliveryDateError, setDeliveryDateError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: mutatePostContract } = usePostContractMutation();

  function resetFormStates() {
    setBuyerValue("");

    setBuyerError("");

    setContractIdValue("");

    setContractIdError("");

    setAdvancePaymentDateValue(new Date().toISOString().split("T")[0]);

    setAdvancePaymentDateError("");

    setDeliveryDateValue(new Date().toISOString().split("T")[0]);

    setDeliveryDateError("");
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();

        e.stopPropagation();

        setIsSubmitting(true);

        let errorFound = false,
          errorMsg = "";

        if (!buyerValue) {
          setBuyerError("Polje je obavezno");

          errorFound = true;
        }

        errorMsg = "";

        if (!contractIdValue) {
          errorMsg = "Polje je obavezno";
        } else if (
          data.some((contract) => contract.contractId === contractIdValue)
        ) {
          errorMsg = "Broj ugovora nije jedinstven";
        }
        console.log(
          data.some((contract) => contract.contractId === contractIdValue),
        );
        if (errorMsg) {
          setContractIdError(errorMsg);

          errorFound = true;
        }

        errorMsg = "";

        if (!advancePaymentDateValue) {
          errorMsg = "Polje je obavezno";
        } else {
          const validatedAdvancePaymentDate = validateDate(
            advancePaymentDateValue,
            { checkLessThanNow: true },
          );

          if (validatedAdvancePaymentDate === 1) {
            errorMsg = "Format datuma mora odgovarati YYYY-MM-DD";
          } else if (validatedAdvancePaymentDate === 2) {
            errorMsg = "Datum ne postoji";
          } else if (validatedAdvancePaymentDate === 3) {
            errorMsg = "Datum ne može biti manji nego danas";
          }
        }

        if (errorMsg) {
          setAdvancePaymentDateError(errorMsg);

          errorFound = true;
        }

        errorMsg = "";

        if (!deliveryDateValue) {
          errorMsg = "Polje je obavezno";
        } else {
          const validatedDeliveryDate = validateDate(deliveryDateValue, {
            checkLessThanNow: true,
          });

          if (validatedDeliveryDate === 1) {
            errorMsg = "Format datuma mora odgovarati YYYY-MM-DD";
          } else if (validatedDeliveryDate === 2) {
            errorMsg = "Datum ne postoji";
          } else if (validatedDeliveryDate === 3) {
            errorMsg = "Datum ne može biti manji nego danas";
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

        await mutatePostContract({
          id: crypto.randomUUID(),
          buyer: buyerValue,
          contractId: contractIdValue,
          advancePaymentDate: advancePaymentDateValue,
          deliveryDate: deliveryDateValue,
          status: "created",
        });

        resetFormStates();

        setIsSubmitting(false);
      }}
      onReset={(e) => {
        e.stopPropagation();

        resetFormStates();
      }}
    >
      <div className="flex flex-col gap-2 p-2">
        <Input
          className="ml-auto"
          type="text"
          placeholder="Petar Perić"
          disabled={isSubmitting}
          value={buyerValue}
          onChange={(e) => {
            setBuyerValue(e.target.value);

            setBuyerError("");
          }}
        >
          Kupac
        </Input>
        {buyerError ? (
          <p className="animate-fadeIn text-balance rounded-xl bg-red-100 px-4 py-2 text-center text-sm text-red-500">
            {buyerError}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Input
          className="ml-auto"
          type="text"
          placeholder="16/2024"
          disabled={isSubmitting}
          value={contractIdValue}
          onChange={(e) => {
            setContractIdValue(e.target.value);

            setContractIdError("");
          }}
        >
          Broj ugovora
        </Input>
        {contractIdError ? (
          <p className="animate-fadeIn text-balance rounded-xl bg-red-100 px-4 py-2 text-center text-sm text-red-500">
            {contractIdError}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Input
          className="ml-auto"
          type="text"
          placeholder={new Date().toISOString().split("T")[0]}
          disabled={isSubmitting}
          value={advancePaymentDateValue}
          onChange={(e) => {
            setAdvancePaymentDateValue(e.target.value);

            setAdvancePaymentDateError("");
          }}
        >
          Datum akontacije
        </Input>
        {advancePaymentDateError ? (
          <p className="animate-fadeIn text-balance rounded-xl bg-red-100 px-4 py-2 text-center text-sm text-red-500">
            {advancePaymentDateError}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Input
          className="ml-auto"
          type="text"
          placeholder={new Date().toISOString().split("T")[0]}
          disabled={isSubmitting}
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
