import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
  type ErrorComponentProps,
  ErrorComponent,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { NotFoundError } from "../services/api";
import { Button } from "../components/Button";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export function ErrorDisplay({ error, reset }: ErrorComponentProps) {
  const { invalidate, history } = useRouter();

  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div className="flex flex-col items-center gap-4">
      {error instanceof NotFoundError ? (
        <div>{error.message}</div>
      ) : (
        <ErrorComponent error={error} />
      )}
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          onClick={() => {
            reset();

            invalidate();
          }}
        >
          Pokušaj ponovo
          <RefreshCcw />
        </Button>
        <Button variant={"outline"} onClick={() => history.go(-1)}>
          <ArrowLeft />
          Vrati se na prethodnu stranicu
        </Button>
      </div>
    </div>
  );
}
