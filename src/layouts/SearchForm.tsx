import { useNavigate } from "@tanstack/react-router";
import { Route } from "../routes/index";
import { InputSearch } from "../components/InputSearch";
import { Activity, Search, Send, Trash } from "lucide-react";
import { InputSelect } from "../components/InputSelect";
import { Button } from "../components/Button";

export function SearchForm() {
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <form
      className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();

        e.stopPropagation();

        const data = new FormData(e.target as HTMLFormElement);

        const formData = Array.from(data.entries()).reduce<
          Record<string, string>
        >((acc, [key, value]) => {
          acc[key] = value.toString();

          return acc;
        }, {});

        navigate({
          search: (old) => {
            return {
              ...old,
              buyer: formData.buyer,
              active: formData.active,
            };
          },
        });
      }}
      onReset={(e) => {
        e.stopPropagation();

        navigate({
          search: {
            buyer: "",
            active: "notSelected",
          },
        });
      }}
    >
      <InputSearch name="buyer">
        <Search />
        Naziv
      </InputSearch>
      <InputSelect
        name="active"
        options={{
          notSelected: "Nije odabrano",
          true: "Aktivni",
          false: "Neaktivni",
        }}
      >
        <Activity />
        Aktivnost
      </InputSelect>
      <div className="flex gap-2">
        <Button type="submit">
          Traži
          <Send />
        </Button>
        <Button type="reset">
          Očisti
          <Trash />
        </Button>
      </div>
    </form>
  );
}
