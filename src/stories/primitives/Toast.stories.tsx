import type { Meta, StoryObj } from "@storybook/react";
import { Toast, type ToastState } from "primitives";

const meta = {
  title: "Data display/Toast",
} satisfies Meta;

export default meta;

type ToastArgs = {
  text: string;
  state: ToastState;
  showButtonText: boolean;
  buttonText: string;
};

export const Default: StoryObj<{ args: ToastArgs }> = {
  name: "Toasts",
  args: {
    text: "Place holder",
    state: "Default",
    showButtonText: false,
    buttonText: "Button",
  },
  argTypes: {
    text: { control: "text" },
    state: {
      name: "variant",
      control: "select",
      options: ["Default", "Failed"] satisfies ToastState[],
    },
    showButtonText: { control: "boolean" },
    buttonText: { control: "text", if: { arg: "showButtonText" } },
  } as Record<string, unknown>,
  render: (args) => {
    const { text, state, showButtonText, buttonText } = args as ToastArgs;
    return (
      <Toast state={state} showButtonText={showButtonText} buttonText={buttonText}>
        {text}
      </Toast>
    );
  },
};
