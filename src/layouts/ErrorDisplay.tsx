import { NotFoundError } from "../api/contractArticles";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import {
  ErrorComponent,
  type ErrorComponentProps,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "../components/Button";

export function ErrorDisplay({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

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
      <Button
        variant={"outline"}
        onClick={() => {
          reset();
          router.invalidate();
        }}
      >
        Pokušaj ponovo
      </Button>
    </div>
  );
}
