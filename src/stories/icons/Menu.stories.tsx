import type { Meta, StoryObj } from "@storybook/react";
import { MENU_ICONS, buildMenuSvgMarkup } from "icons";
import { IconGallery } from "./IconGallery";

const meta = {
  title: "Icon/Menu",
} satisfies Meta;

export default meta;

const items = MENU_ICONS.map((icon) => ({
  name: icon.name,
  Icon: icon.Icon,
  svg: buildMenuSvgMarkup(icon.path, icon.fill),
}));

export const Default: StoryObj = {
  name: "All menu",
  render: () => <IconGallery items={items} />,
};
