import { cva } from "class-variance-authority";

export const inputStyle = cva(
  [
    "rounded-lg",
    "border-2",
    "ring-focus",
    "transition",
    "hover:cursor-pointer",
    "focus:cursor-auto",
    "focus:outline-none",
    "focus-visible:ring-4",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-primary-600",
          "bg-primary-50",
          "text-primary-600",
          "hover:border-primary-800",
          "disabled:bg-primary-500",
          "disabled:text-primary-50",
        ],
      },
      size: {
        sm: ["min-h-9", "px-3", "py-1.5", "text-sm"],
        md: ["min-h-10", "px-5", "py-2", "text-sm"],
        lg: ["min-h-11", "px-5", "py-2.5", "text-md"],
        xl: ["min-h-12", "px-6", "py-3", "text-md"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
