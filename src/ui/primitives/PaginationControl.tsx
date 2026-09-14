import clsx from "clsx";
import { Button, type ButtonProps } from "react-aria-components";
import "./PaginationControl.css";

export type PaginationControlVariant = "Previous" | "Next" | "Page" | "...";

export type PaginationControlProps = Omit<ButtonProps, "children" | "type"> & {
  variant?: PaginationControlVariant;
  page?: React.ReactNode;
  isSelected?: boolean;
};

// Exact vector path exported from the Figma "arrow-long-left" icon node (485:43731).
// "Next" reuses the same path, flipped — Figma does the same thing internally.
function LongArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 19.5 16.5"
      fill="none"
      aria-hidden="true"
      className="agx-pagination-control__icon"
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M8.25 0.75L0.75 8.25L8.25 15.75M0.75 8.25H18.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaginationControl({
  variant = "Page",
  page = "1",
  isSelected = false,
  className,
  ...props
}: PaginationControlProps) {
  if (variant === "...") {
    return (
      <span className={clsx("agx-pagination-control", "agx-pagination-control--ellipsis", className)}>...</span>
    );
  }

  const isPage = variant === "Page";

  return (
    <Button
      {...props}
      className={clsx(
        "agx-pagination-control",
        isPage && "agx-pagination-control--page",
        isPage && isSelected && "agx-pagination-control--selected",
        className,
      )}
    >
      {variant === "Previous" && (
        <>
          <LongArrowIcon />
          Previous
        </>
      )}
      {variant === "Next" && (
        <>
          Next
          <LongArrowIcon flip />
        </>
      )}
      {isPage && page}
    </Button>
  );
}
