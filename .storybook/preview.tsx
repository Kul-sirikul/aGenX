import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/theme.css";
import theme from "./theme";

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
    },
    options: {
      storySort: {
        order: [
          "Foundation",
          ["Button"],
          "Navigation",
          ["Pagination control", "Tab", "Step"],
          "Data entry",
          ["Chip", "Checkbox", "Dropdown", "Input", "Radio", "Toggle"],
          "Data display",
          ["Badge", "Alert", "Tag", "Toast", "Tooltip"],
        ],
      },
    },
  },

  tags: [],
};

export default preview;
