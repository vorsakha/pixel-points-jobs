import { LoaderCircle } from "lucide-react";
import React from "react";

type Variants =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "link"
  | "error"
  | "success"
  | "info"
  | "warning";
type Sizes = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: Variants;
  size?: Sizes;
}

const variantStyles = (variant: Variants): string => {
  switch (variant) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    case "accent":
      return "btn-accent";
    case "neutral":
      return "btn-neutral";
    case "link":
      return "btn-link";
    case "error":
      return "bg-error text-error-content";
    case "success":
      return "bg-success text-success-content";
    case "info":
      return "bg-info text-info-content";
    case "warning":
      return "bg-warning text-warning-content";
    default:
      return "btn-primary";
  }
};

const sizeStyles = (size: Sizes): string => {
  switch (size) {
    case "sm":
      return "btn-sm";
    case "md":
      return "btn-md";
    case "lg":
      return "btn-lg";
    default:
      return "btn-sm";
  }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      size = "md",
      variant = "primary",
      isLoading = false,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={`btn ${variantStyles(variant)} ${sizeStyles(size)} ${className}`}
      type={props.type === "submit" ? "submit" : "button"}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export { Button };
