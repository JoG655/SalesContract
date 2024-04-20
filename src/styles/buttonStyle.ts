import { cva } from "class-variance-authority";

export const buttonStyle = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-lg",
    "leading-none",
    "ring-focus",
    "transition",
    "focus:outline-none",
    "focus-visible:ring-4",
    "hover:cursor-pointer",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-600",
          "text-primary-50",
          "hover:bg-primary-500",
          "active:bg-primary-700",
          "disabled:bg-primary-200",
          "disabled:text-primary-400",
        ],
        outline: [
          "border-2",
          "border-primary-600",
          "bg-white",
          "text-primary-600",
          "hover:bg-primary-100",
          "active:bg-primary-200",
          "disabled:border-primary-200",
          "disabled:bg-white",
          "disabled:text-primary-400",
        ],
        ghost: [
          "bg-white",
          "text-primary-600",
          "hover:bg-primary-50",
          "active:bg-primary-100",
          "disabled:border-primary-200",
          "disabled:bg-white",
          "disabled:text-primary-400",
        ],
      },
      size: {
        sm: ["text-sm", "min-h-9", "px-3", "py-1.5"],
        md: ["text-sm", "min-h-10", "px-5", "py-2"],
        lg: ["text-md", "min-h-11", "px-5", "py-2.5"],
        xl: ["text-md", "min-h-12", "px-6", "py-3"],
      },
      btnType: {
        button: "",
        icon: ["rounded-full", "px-0"],
      },
    },
    compoundVariants: [
      { btnType: "icon", size: "sm", class: "size-9" },
      { btnType: "icon", size: "md", class: "size-10" },
      { btnType: "icon", size: "lg", class: "size-11" },
      { btnType: "icon", size: "xl", class: "size-12" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      btnType: "button",
    },
  },
);
