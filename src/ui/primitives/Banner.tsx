import clsx from "clsx";
import "./Banner.css";

export type BannerProps = {
  children: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  buttonText?: string;
  showButton?: boolean;
  icon?: boolean;
  x?: boolean;
  onButtonClick?: () => void;
  onClose?: () => void;
  className?: string;
};

// Exact vector path exported from Figma "exclaimation-solid" icon node (12364:24071).
function ExclamationIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-banner__icon">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.48392 1.75175C6.15767 0.585083 7.84233 0.585083 8.5155 1.75175L12.8059 9.18808C13.4791 10.3547 12.6368 11.8131 11.2898 11.8131H2.70958C1.36267 11.8131 0.520917 10.3547 1.19408 9.18808L5.48333 1.75175H5.48392ZM7 4.8125C7.11603 4.8125 7.22731 4.85859 7.30936 4.94064C7.39141 5.02269 7.4375 5.13397 7.4375 5.25V7.4375C7.4375 7.55353 7.39141 7.66481 7.30936 7.74686C7.22731 7.82891 7.11603 7.875 7 7.875C6.88397 7.875 6.77269 7.82891 6.69064 7.74686C6.60859 7.66481 6.5625 7.55353 6.5625 7.4375V5.25C6.5625 5.13397 6.60859 5.02269 6.69064 4.94064C6.77269 4.85859 6.88397 4.8125 7 4.8125ZM7 9.625C7.11603 9.625 7.22731 9.57891 7.30936 9.49686C7.39141 9.41481 7.4375 9.30353 7.4375 9.1875C7.4375 9.07147 7.39141 8.96019 7.30936 8.87814C7.22731 8.79609 7.11603 8.75 7 8.75C6.88397 8.75 6.77269 8.79609 6.69064 8.87814C6.60859 8.96019 6.5625 9.07147 6.5625 9.1875C6.5625 9.30353 6.60859 9.41481 6.69064 9.49686C6.77269 9.57891 6.88397 9.625 7 9.625Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "x" icon node (12364:24074).
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-banner__close-icon">
      <path
        d="M3.33333 12.6667L12.6667 3.33333M3.33333 3.33333L12.6667 12.6667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Banner({
  children,
  title = "Title",
  showTitle = true,
  buttonText = "Button",
  showButton = false,
  icon = true,
  x = true,
  onButtonClick,
  onClose,
  className,
}: BannerProps) {
  return (
    <div className={clsx("agx-banner", className)}>
      {icon && <ExclamationIcon />}
      {showTitle && (
        <>
          <p className="agx-banner__title">{title}</p>
          <span className="agx-banner__divider" aria-hidden="true" />
        </>
      )}
      <p className="agx-banner__description">{children}</p>
      {showButton && (
        <button type="button" className="agx-banner__button" onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
      {x && (
        <button type="button" className="agx-banner__close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
