import {
  type ContractsSearchActive,
  type ContractsSearch,
} from "../routes/index";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "../components/Input";
import { Activity, Search, SearchCode, X } from "lucide-react";
import { Select } from "../components/Select";
import { Button } from "../components/Button";

const ACTIVE_OPTIONS: Record<ContractsSearchActive, string> = {
  notSelected: "Nije odabrano",
  active: "Aktivni",
  inactive: "Neaktivni",
};

export type SearchFormProps = { routeFullPath: string } & ContractsSearch;

export function SearchForm({ routeFullPath, buyer, active }: SearchFormProps) {
  const navigate = useNavigate({ from: routeFullPath });

  const [buyerValue, setBuyerValue] = useState(buyer);

  const [activeValue, setActiveValue] = useState(active);

  return (
    <form
      className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();

        e.stopPropagation();

        navigate({
          search: (old) => {
            return {
              ...old,
              buyer: buyerValue,
              active: activeValue,
            };
          },
        });
      }}
      onReset={(e) => {
        e.stopPropagation();

        setBuyerValue("");

        setActiveValue("notSelected");

        navigate({
          search: (old) => {
            return {
              ...old,
              buyer: "",
              active: "notSelected",
            };
          },
        });
      }}
    >
      <Input
        type="search"
        placeholder="npr. Josip"
        value={buyerValue}
        onChange={(e) => setBuyerValue(e.target.value)}
      >
        <SearchCode />
      </Input>
      <Select
        value={activeValue}
        onChange={(e) =>
          setActiveValue(e.target.value as ContractsSearchActive)
        }
        options={ACTIVE_OPTIONS}
      >
        <Activity />
      </Select>
      <div className="flex gap-2">
        <Button type="submit">
          <Search />
        </Button>
        <Button variant="outline" type="reset">
          <X />
        </Button>
      </div>
    </form>
  );
}
