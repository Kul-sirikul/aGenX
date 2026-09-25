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
          ["Pagination control", "Tabs", "Stepper"],
          "Data entry",
          ["Chip", "Checkbox", "Date picker", "Dropdown", "Input", "Radio button", "Toggle"],
          "Data display",
          ["Badge", "Alert", "Tag", "Toast notifications", "Tooltip"],
        ],
      },
    },
  },

  tags: [],
};

export default preview;
