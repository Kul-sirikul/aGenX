import clsx from "clsx";
import { ToggleButton, type ToggleButtonProps } from "react-aria-components";
import "./ButtonIcon.css";

export type ButtonIconSize = "20" | "24" | "28" | "36";

export type ButtonIconProps = Omit<ToggleButtonProps, "children"> & {
  size?: ButtonIconSize;
  bg?: boolean;
  error?: boolean;
  children?: React.ReactNode;
};

// Exact vector path exported from the Figma "copy" icon node (45:1935).
function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="agx-button-icon__icon">
      <path
        d="M13.125 14.375V17.1875C13.125 17.705 12.705 18.125 12.1875 18.125H4.0625C3.81386 18.125 3.5754 18.0262 3.39959 17.8504C3.22377 17.6746 3.125 17.4361 3.125 17.1875V6.5625C3.125 6.045 3.545 5.625 4.0625 5.625H5.625C6.04381 5.62472 6.46192 5.65928 6.875 5.72834M13.125 14.375H15.9375C16.455 14.375 16.875 13.955 16.875 13.4375V9.375C16.875 5.65834 14.1725 2.57417 10.625 1.97834C10.2119 1.90928 9.79381 1.87472 9.375 1.875H7.8125C7.295 1.875 6.875 2.295 6.875 2.8125V5.72834M13.125 14.375H7.8125C7.56386 14.375 7.3254 14.2762 7.14959 14.1004C6.97377 13.9246 6.875 13.6861 6.875 13.4375V5.72834M16.875 11.25V9.6875C16.875 8.94158 16.5787 8.22621 16.0512 7.69876C15.5238 7.17132 14.8084 6.875 14.0625 6.875H12.8125C12.5639 6.875 12.3254 6.77623 12.1496 6.60041C11.9738 6.4246 11.875 6.18614 11.875 5.9375V4.6875C11.875 4.31816 11.8023 3.95243 11.6609 3.6112C11.5196 3.26998 11.3124 2.95993 11.0512 2.69876C10.7901 2.4376 10.48 2.23043 10.1388 2.08909C9.79757 1.94775 9.43184 1.875 9.0625 1.875H8.125"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Exact vector path exported from the Figma "exclaimation-solid" icon node (11446:34114).
// The exclamation mark is a cutout (evenodd hole) in the triangle, not a separate white shape.
function ErrorBadge() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="agx-button-icon__badge">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.13403 1.75153C5.51924 1.08489 6.482 1.08523 6.86646 1.75153L10.5432 8.12555C10.9279 8.79218 10.4467 9.62555 9.677 9.62555H2.32251C1.55324 9.62549 1.0718 8.79236 1.4563 8.12555L4.98853 2.00153H4.9895L5.13403 1.75153ZM6.00024 3.62457C5.79727 3.62457 5.60123 3.69533 5.44556 3.82281L5.3811 3.88141C5.21723 4.04538 5.12536 4.26776 5.12524 4.49957V6.37457C5.12524 6.60657 5.2171 6.82963 5.3811 6.99371C5.43226 7.04487 5.48999 7.08801 5.55103 7.12457C5.51439 7.14649 5.47885 7.17055 5.44556 7.19781L5.3811 7.25641C5.2376 7.39999 5.14901 7.58837 5.12915 7.78864L5.12524 7.87457L5.12915 7.96149C5.14902 8.16174 5.2376 8.35014 5.3811 8.49371C5.5452 8.65781 5.76818 8.74957 6.00024 8.74957C6.23217 8.74953 6.45437 8.65766 6.61841 8.49371C6.7825 8.32962 6.87524 8.10664 6.87524 7.87457C6.87514 7.67179 6.80435 7.47641 6.677 7.32086L6.61841 7.25641L6.55493 7.19781C6.52143 7.17037 6.48537 7.14661 6.44849 7.12457C6.50963 7.088 6.56716 7.04493 6.61841 6.99371C6.7825 6.82962 6.87524 6.60664 6.87524 6.37457V4.49957C6.87514 4.29679 6.80435 4.10141 6.677 3.94586L6.61841 3.88141L6.55493 3.82281C6.42138 3.71339 6.25801 3.64644 6.08618 3.62946L6.00024 3.62457Z"
        fill="var(--surface-red)"
        stroke="var(--surface-red)"
      />
    </svg>
  );
}

export function ButtonIcon({ size = "36", bg = true, error = false, className, children, ...props }: ButtonIconProps) {
  return (
    <ToggleButton
      {...props}
      className={clsx(
        "agx-button-icon",
        `agx-button-icon--${size}`,
        bg ? "agx-button-icon--bg" : "agx-button-icon--no-bg",
        className,
      )}
    >
      {children ?? <CopyIcon />}
      {error && <ErrorBadge />}
    </ToggleButton>
  );
}
