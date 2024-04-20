import { type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { buttonStyle } from "../styles/buttonStyle";
import { type LinkProps, Link } from "@tanstack/react-router";

type ButtonStyle = VariantProps<typeof buttonStyle>;

export type NavLinkProps = LinkProps & {
  variant?: ButtonStyle["variant"];
  activeVariant?: ButtonStyle["variant"];
  size?: ButtonStyle["size"];
  linkType?: ButtonStyle["btnType"];
  className?: string;
};

export function NavLink({
  variant = "ghost",
  activeVariant = "primary",
  size,
  linkType,
  className,
  activeProps,
  inactiveProps,
  children,
  ...rest
}: NavLinkProps) {
  return (
    <Link
      inactiveProps={{
        className: twMerge(
          buttonStyle({ variant, size, btnType: linkType }),
          className,
        ),
        ...inactiveProps,
      }}
      activeProps={{
        className: twMerge(
          buttonStyle({ variant: activeVariant, size, btnType: linkType }),
          "pointer-events-none",
          className,
        ),
        tabIndex: -1,
        ...activeProps,
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
