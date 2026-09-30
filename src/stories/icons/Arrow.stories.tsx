import type { Meta, StoryObj } from "@storybook/react";
import { ARROW_ICONS, buildArrowSvgMarkup } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Foundation/Icon",
} satisfies Meta;

export default meta;

const items = ARROW_ICONS.map((icon) => ({
  name: icon.name,
  Icon: icon.Icon,
  svg: buildArrowSvgMarkup(icon.path, icon.fill),
}));

export const Arrow: StoryObj = {
  name: "Arrow",
  render: () => <IconGallery items={items} />,
};
