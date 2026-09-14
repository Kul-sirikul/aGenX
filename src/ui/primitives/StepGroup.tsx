import clsx from "clsx";
import { Fragment } from "react";
import { Step, type StepStatus } from "./Step";
import "./StepGroup.css";

export type StepGroupDirection = "Vertical" | "Horizontal";

export type StepGroupItem = {
  id: string;
  label: React.ReactNode;
  status?: StepStatus;
  alert?: boolean;
  resend?: boolean;
};

export type StepGroupProps = {
  direction?: StepGroupDirection;
  steps: StepGroupItem[];
  className?: string;
};

export function StepGroup({ direction = "Vertical", steps, className }: StepGroupProps) {
  return (
    <div
      className={clsx("agx-step-group", `agx-step-group--${direction.toLowerCase()}`, className)}
    >
      {steps.map((step, index) => (
        <Fragment key={step.id}>
          <Step status={step.status} stepNumber={index + 1} alert={step.alert} resend={step.resend}>
            {step.label}
          </Step>
          {index < steps.length - 1 && <span className="agx-step-group__connector" />}
        </Fragment>
      ))}
    </div>
  );
}
