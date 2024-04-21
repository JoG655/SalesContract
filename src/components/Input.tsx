import { type VariantProps } from "class-variance-authority";
import { inputStyle } from "../styles/inputStyle";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = VariantProps<typeof inputStyle> &
  ComponentPropsWithoutRef<"input">;

export function Input({
  variant,
  size,
  className,
  children,
  ...rest
}: InputProps) {
  return (
    <>
      <label className="flex items-center gap-2 hover:cursor-pointer">
        <span className="flex gap-1 empty:hidden">{children}</span>
        <input
          type="search"
          className={twMerge(
            inputStyle({ variant, size }),
            !children ? "mr-2" : null,
            className,
          )}
          {...rest}
        />
      </label>
    </>
  );
}
