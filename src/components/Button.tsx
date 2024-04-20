import { type VariantProps } from "class-variance-authority";
import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyle } from "../styles/buttonStyle";

export type ButtonProps = VariantProps<typeof buttonStyle> &
  ComponentPropsWithoutRef<"button">;

export function Button({
  variant,
  size,
  btnType,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(buttonStyle({ variant, size, btnType }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}
