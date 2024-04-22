import { type StatusType } from "../types/general";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type ListItemProps = {
  label: string;
  container?: boolean;
  variant?: StatusType;
} & ComponentPropsWithoutRef<"li">;

export function ListItem({
  label,
  container,
  variant,
  className,
  children,
  ...rest
}: ListItemProps) {
  return (
    <li
      className={twMerge(
        "flex h-full justify-between gap-2 border-b-2 border-primary-200 px-2 py-1 md:px-4 md:py-2",
        className,
      )}
      {...rest}
    >
      <p className="text-balance">{`${label}:`}</p>
      {container ? (
        <div className="flex gap-2">{children}</div>
      ) : (
        <p
          className={twMerge(
            "flex gap-2 text-balance text-right",
            variant === "created" ? "text-green-500" : null,
            variant === "ordered" ? "text-yellow-500" : null,
            variant === "delivered" ? "text-gray-500" : null,
          )}
        >
          {children}
        </p>
      )}
    </li>
  );
}
