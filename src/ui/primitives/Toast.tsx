import clsx from "clsx";
import "./Toast.css";

export type ToastState = "Default" | "Failed";

export type ToastProps = {
  children: React.ReactNode;
  state?: ToastState;
  showButtonText?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
  className?: string;
};

// Exact vector path exported from Figma "exclamation-solid" icon node (13035:322).
function ExclamationIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-toast__status-icon">
      <path
        d="M7.22162 2.246C7.54602 1.68355 8.32649 1.64834 8.70795 2.14053L8.77924 2.246L13.8027 10.9462C14.1485 11.5463 13.7153 12.2957 13.0234 12.2958H2.97552C2.28311 12.2955 1.85061 11.5463 2.1972 10.9462L7.22064 2.246H7.22162ZM7.99994 9.10049C7.65533 9.1005 7.32475 9.23678 7.08099 9.48037C6.8372 9.72417 6.70013 10.0555 6.70013 10.4003C6.70021 10.745 6.83726 11.0755 7.08099 11.3192C7.32476 11.5629 7.65523 11.7001 7.99994 11.7001C8.34464 11.7001 8.6751 11.5629 8.91888 11.3192C9.16261 11.0755 9.29967 10.745 9.29974 10.4003C9.29974 10.0555 9.16268 9.72417 8.91888 9.48037C8.67512 9.23681 8.34454 9.10049 7.99994 9.10049ZM7.99994 3.4999C7.70832 3.49992 7.42885 3.61603 7.22259 3.82217C7.01631 4.02846 6.90033 4.30875 6.90033 4.60049V7.40029C6.90041 7.69193 7.01637 7.97142 7.22259 8.17764C7.42886 8.38384 7.70828 8.49989 7.99994 8.4999C8.29168 8.4999 8.57197 8.38393 8.77826 8.17764C8.98428 7.97145 9.09947 7.69178 9.09955 7.40029V4.60049C9.09955 4.30885 8.98442 4.02844 8.77826 3.82217C8.57197 3.61588 8.29168 3.4999 7.99994 3.4999Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "x" icon nodes (13035:318 / 13035:325).
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-toast__close-icon">
      <path
        d="M3.33333 12.6667L12.6667 3.33333M3.33333 3.33333L12.6667 12.6667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Toast({
  children,
  state = "Default",
  showButtonText = false,
  buttonText = "Button",
  onButtonClick,
  onClose,
  className,
}: ToastProps) {
  return (
    <div className={clsx("agx-toast", `agx-toast--${state.toLowerCase()}`, className)}>
      <div className="agx-toast__content">
        {state === "Failed" ? (
          <div className="agx-toast__status">
            <ExclamationIcon />
            <p className="agx-toast__message">{children}</p>
          </div>
        ) : (
          <p className="agx-toast__message">{children}</p>
        )}
        {showButtonText && (
          <button type="button" className="agx-toast__button" onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
      <button type="button" className="agx-toast__close" aria-label="Close" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
}
