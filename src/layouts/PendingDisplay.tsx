import { Spinner } from "../components/Spinner";

export function PendingDisplay() {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <Spinner animationCount={5}>Učitavanje...</Spinner>
    </div>
  );
}
