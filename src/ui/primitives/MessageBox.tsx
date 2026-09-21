import clsx from "clsx";
import "./MessageBox.css";

export type MessageBoxType = "Default" | "Information" | "Warning" | "Success" | "Error";

export type MessageBoxProps = {
  children: React.ReactNode;
  type?: MessageBoxType;
  icon?: boolean;
  rightIcon?: boolean;
  viewDetail?: boolean;
  onViewDetail?: () => void;
  onClose?: () => void;
  className?: string;
};

// Exact vector path exported from Figma "exclaimation-solid" icon nodes —
// identical shape for Warning and Error, only the fill color (currentColor,
// set per --agx-message-box--* variant) differs. Used for Warning/Error.
function ExclamationIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-message-box__icon">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.48392 1.75175C6.15767 0.585083 7.84233 0.585083 8.5155 1.75175L12.8059 9.18808C13.4791 10.3547 12.6368 11.8131 11.2898 11.8131H2.70958C1.36267 11.8131 0.520917 10.3547 1.19408 9.18808L5.48333 1.75175H5.48392ZM7 4.8125C7.11603 4.8125 7.22731 4.85859 7.30936 4.94064C7.39141 5.02269 7.4375 5.13397 7.4375 5.25V7.4375C7.4375 7.55353 7.39141 7.66481 7.30936 7.74686C7.22731 7.82891 7.11603 7.875 7 7.875C6.88397 7.875 6.77269 7.82891 6.69064 7.74686C6.60859 7.66481 6.5625 7.55353 6.5625 7.4375V5.25C6.5625 5.13397 6.60859 5.02269 6.69064 4.94064C6.77269 4.85859 6.88397 4.8125 7 4.8125ZM7 9.625C7.11603 9.625 7.22731 9.57891 7.30936 9.49686C7.39141 9.41481 7.4375 9.30353 7.4375 9.1875C7.4375 9.07147 7.39141 8.96019 7.30936 8.87814C7.22731 8.79609 7.11603 8.75 7 8.75C6.88397 8.75 6.77269 8.79609 6.69064 8.87814C6.60859 8.96019 6.5625 9.07147 6.5625 9.1875C6.5625 9.30353 6.60859 9.41481 6.69064 9.49686C6.77269 9.57891 6.88397 9.625 7 9.625Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "info-solid" icon nodes — identical
// shape for Default and Information, only the fill color differs. Used for
// Default/Information.
function InfoIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-message-box__icon">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.3125 7C1.3125 3.85875 3.85875 1.3125 7 1.3125C10.1412 1.3125 12.6875 3.85875 12.6875 7C12.6875 10.1412 10.1412 12.6875 7 12.6875C3.85875 12.6875 1.3125 10.1412 1.3125 7ZM6.391 6.15883C7.0595 5.82458 7.81258 6.42892 7.63117 7.154L7.21758 8.80833L7.24208 8.79667C7.34488 8.75148 7.46111 8.74754 7.56672 8.78567C7.67234 8.8238 7.75925 8.90108 7.80946 9.00152C7.85968 9.10195 7.86936 9.21785 7.8365 9.32522C7.80363 9.43259 7.73074 9.52321 7.63292 9.57833L7.60958 9.59117C6.9405 9.92542 6.18742 9.32108 6.36883 8.596L6.783 6.94167L6.7585 6.95333C6.7069 6.98201 6.65002 6.99995 6.5913 7.00607C6.53258 7.01218 6.47324 7.00635 6.41683 6.98893C6.36042 6.9715 6.30813 6.94284 6.26309 6.90466C6.21806 6.86649 6.18121 6.8196 6.15478 6.76681C6.12834 6.71402 6.11287 6.65643 6.10928 6.5975C6.10569 6.53858 6.11407 6.47953 6.13391 6.42393C6.15374 6.36832 6.18463 6.31731 6.2247 6.27395C6.26477 6.2306 6.31321 6.19581 6.36708 6.17167L6.391 6.15883ZM7 5.25C7.11603 5.25 7.22731 5.20391 7.30936 5.12186C7.39141 5.03981 7.4375 4.92853 7.4375 4.8125C7.4375 4.69647 7.39141 4.58519 7.30936 4.50314C7.22731 4.42109 7.11603 4.375 7 4.375C6.88397 4.375 6.77269 4.42109 6.69064 4.50314C6.60859 4.58519 6.5625 4.69647 6.5625 4.8125C6.5625 4.92853 6.60859 5.03981 6.69064 5.12186C6.77269 5.20391 6.88397 5.25 7 5.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "check-circle" icon node. Used for Success.
function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" className="agx-message-box__icon">
      <path
        d="M5.25 7.4375L6.5625 8.75L8.75 5.6875M12.25 7C12.25 7.68944 12.1142 8.37213 11.8504 9.00909C11.5865 9.64605 11.1998 10.2248 10.7123 10.7123C10.2248 11.1998 9.64605 11.5865 9.00909 11.8504C8.37213 12.1142 7.68944 12.25 7 12.25C6.31056 12.25 5.62787 12.1142 4.99091 11.8504C4.35395 11.5865 3.7752 11.1998 3.28769 10.7123C2.80018 10.2248 2.41347 9.64605 2.14963 9.00909C1.8858 8.37213 1.75 7.68944 1.75 7C1.75 5.60761 2.30312 4.27226 3.28769 3.28769C4.27226 2.30312 5.60761 1.75 7 1.75C8.39239 1.75 9.72774 2.30312 10.7123 3.28769C11.6969 4.27226 12.25 5.60761 12.25 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const iconByType: Record<MessageBoxType, () => React.JSX.Element> = {
  Default: InfoIcon,
  Information: InfoIcon,
  Warning: ExclamationIcon,
  Success: CheckCircleIcon,
  Error: ExclamationIcon,
};

// Exact vector path exported from Figma "x" icon node (13035:2848 / etc).
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-message-box__close-icon">
      <path
        d="M3.33333 12.6667L12.6667 3.33333M3.33333 3.33333L12.6667 12.6667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MessageBox({
  children,
  type = "Warning",
  icon = true,
  rightIcon = true,
  viewDetail = false,
  onViewDetail,
  onClose,
  className,
}: MessageBoxProps) {
  const Icon = iconByType[type];
  return (
    <div className={clsx("agx-message-box", `agx-message-box--${type.toLowerCase()}`, className)}>
      {icon && <Icon />}
      <p className="agx-message-box__text">{children}</p>
      {viewDetail && (
        <button type="button" className="agx-message-box__view-detail" onClick={onViewDetail}>
          View Detail
        </button>
      )}
      {rightIcon && (
        <button type="button" className="agx-message-box__close" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
