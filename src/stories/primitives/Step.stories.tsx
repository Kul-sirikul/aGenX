import type { Meta, StoryObj } from "@storybook/react";
import { Step, StepGroup, type StepStatus, type StepGroupDirection, type StepGroupItem } from "primitives";

const meta = {
  title: "Primitives/Step",
  component: Step,
  argTypes: {
    status: {
      control: "select",
      options: ["Default", "Current", "Finished", "Current+Finished"] satisfies StepStatus[],
    },
  },
  args: {
    status: "Default",
    stepNumber: 1,
    title: true,
    alert: false,
    resend: false,
    children: "Step",
  },
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Step",
};

const GROUP_STEPS: { id: string; label: string }[] = [
  { id: "step-1", label: "Step" },
  { id: "step-2", label: "Step" },
  { id: "step-3", label: "Step" },
  { id: "step-4", label: "Step" },
];

function StepGroupDemo({ direction, activeStep }: { direction: StepGroupDirection; activeStep: number }) {
  const steps: StepGroupItem[] = GROUP_STEPS.map((step, index) => ({
    ...step,
    status: index + 1 < activeStep ? "Finished" : index + 1 === activeStep ? "Current" : "Default",
  }));
  return <StepGroup direction={direction} steps={steps} />;
}

type GroupArgs = { direction: StepGroupDirection; activeStep: number };

export const Group: StoryObj<{ args: GroupArgs }> = {
  name: "Step group",
  args: {
    direction: "Vertical",
    activeStep: 2,
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["Vertical", "Horizontal"] satisfies StepGroupDirection[],
    },
    activeStep: {
      name: "Active step",
      description: "Drag through 1–4 to play the group to Finished.",
      control: { type: "range", min: 1, max: GROUP_STEPS.length + 1, step: 1 },
    },
    // Hide Step's controls, inherited from `meta` — this story renders its
    // own StepGroupDemo and ignores them.
    status: { table: { disable: true } },
    stepNumber: { table: { disable: true } },
    title: { table: { disable: true } },
    alert: { table: { disable: true } },
    resend: { table: { disable: true } },
    children: { table: { disable: true } },
  } as Record<string, unknown>,
  render: (args) => <StepGroupDemo {...(args as GroupArgs)} />,
};
