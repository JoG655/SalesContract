import { type VariantProps } from "class-variance-authority";
import { inputStyle } from "../styles/inputStyle";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputSelectProps = {
  options: Record<string, string>;
} & VariantProps<typeof inputStyle> &
  ComponentPropsWithoutRef<"select">;

export function InputSelect({
  options,
  variant,
  size,
  className,
  children,
  ...rest
}: InputSelectProps) {
  return (
    <>
      <label className="flex items-center gap-2 hover:cursor-pointer">
        <span className="flex gap-1 empty:hidden">{children}</span>
        <select
          className={twMerge(
            inputStyle({ variant, size }),
            !children ? "mr-2" : null,
            className,
          )}
          {...rest}
        >
          {Object.entries(options).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}
