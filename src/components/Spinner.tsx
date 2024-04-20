import { type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export type SpinnerProps = {
  animationCount?: 1 | 2 | 3 | 4 | 5 | 6;
} & ComponentPropsWithoutRef<"div">;

export function Spinner({
  animationCount = 3,
  className,
  children,
  ...rest
}: SpinnerProps) {
  return (
    <div className={twMerge("spinner", "animate-fadeIn", className)} {...rest}>
      {[...Array(animationCount)].map((_, i) => (
        <i key={i} className="spinner__animation"></i>
      ))}
      {children ? <span className="spinner__text">{children}</span> : null}
    </div>
  );
}
