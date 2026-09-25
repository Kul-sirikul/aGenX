import type { Meta, StoryObj } from "@storybook/react";
import { Banner, type BannerType, MessageBox, type MessageBoxType } from "primitives";

const meta = {
  title: "Data display/Alert",
} satisfies Meta;

export default meta;

/* --------------------------------- Message Box --------------------------------- */

type MessageBoxArgs = {
  type: MessageBoxType;
  text: string;
  icon: boolean;
  viewDetail: boolean;
  rightIcon: boolean;
};

export const MessageBoxStory: StoryObj<{ args: MessageBoxArgs }> = {
  name: "Message box",
  args: {
    type: "Warning",
    text: "Message box",
    icon: true,
    viewDetail: false,
    rightIcon: true,
  },
  argTypes: {
    type: {
      name: "variant",
      control: "select",
      options: ["Default", "Information", "Warning", "Success", "Error"] satisfies MessageBoxType[],
    },
    text: { control: "text" },
    icon: { control: "boolean" },
    viewDetail: { control: "boolean" },
    rightIcon: { control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => {
    const { text, type, icon, viewDetail, rightIcon } = args as MessageBoxArgs;
    return (
      <MessageBox type={type} icon={icon} viewDetail={viewDetail} rightIcon={rightIcon}>
        {text}
      </MessageBox>
    );
  },
};

/* ------------------------------------ Banner ------------------------------------ */

type BannerArgs = {
  type: BannerType;
  showTitle: boolean;
  title: string;
  text: string;
  showButton: boolean;
  buttonText: string;
  icon: boolean;
  x: boolean;
};

export const BannerStory: StoryObj<{ args: BannerArgs }> = {
  name: "Banner",
  args: {
    type: "Warning",
    showTitle: true,
    title: "Title",
    text: "Description",
    showButton: false,
    buttonText: "Button",
    icon: true,
    x: true,
  },
  argTypes: {
    type: {
      name: "variant",
      control: "select",
      options: ["Default", "Information", "Warning", "Success", "Error"] satisfies BannerType[],
    },
    showTitle: { control: "boolean" },
    title: { control: "text", if: { arg: "showTitle" } },
    text: { name: "Description", control: "text" },
    showButton: { control: "boolean" },
    buttonText: { control: "text", if: { arg: "showButton" } },
    icon: { control: "boolean" },
    x: { control: "boolean" },
  } as Record<string, unknown>,
  render: (args) => {
    const { text, type, title, showTitle, buttonText, showButton, icon, x } = args as BannerArgs;
    return (
      <Banner type={type} title={title} showTitle={showTitle} buttonText={buttonText} showButton={showButton} icon={icon} x={x}>
        {text}
      </Banner>
    );
  },
};
