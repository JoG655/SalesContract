import { type StatusType } from "../types/general";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  label: string;
  variant?: StatusType;
} & ComponentPropsWithoutRef<"li">;

export function ListItem({
  label,
  variant,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <li
      className={twMerge(
        "flex h-full justify-between gap-2 border-b-2 border-primary-200 px-8 py-2",
        className,
      )}
      {...rest}
    >
      <p className="text-balance">{`${label}:`}</p>
      <p
        className={twMerge(
          "text-balance text-right",
          variant === "KREIRANO" ? "text-green-500" : null,
          variant === "NARUČENO" ? "text-yellow-500" : null,
          variant === "ISPORUČENO" ? "text-gray-500" : null,
        )}
      >
        {children}
      </p>
    </li>
  );
}
