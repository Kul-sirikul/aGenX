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
          "Primitives",
          ["Button", "Input", "Dropdown", "Checkbox", "Radio", "Tab", "Chip", "Step", "Pagination control"],
        ],
      },
    },
  },

  tags: [],
};

export default preview;
