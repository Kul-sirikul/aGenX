import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PaginationControl, type PaginationControlVariant } from "primitives";

const meta = {
  title: "Primitives/Pagination control",
  component: PaginationControl,
  argTypes: {
    variant: {
      control: "select",
      options: ["Previous", "Next", "Page", "..."] satisfies PaginationControlVariant[],
    },
  },
  args: {
    variant: "Page",
    page: "1",
    isSelected: false,
    isDisabled: false,
  },
} satisfies Meta<typeof PaginationControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const TOTAL_ITEMS = 97;
const ITEMS_PER_PAGE = 15;
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

function getPageItems(current: number, total: number): (number | "...")[] {
  const delta = 2;
  const pages: number[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    }
  }
  const items: (number | "...")[] = [];
  let previous: number | undefined;
  for (const page of pages) {
    if (previous !== undefined && page - previous > 1) {
      items.push("...");
    }
    items.push(page);
    previous = page;
  }
  return items;
}

function PlaygroundDemo({ withText }: { withText: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, TOTAL_ITEMS);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      {withText && (
        <p style={{ margin: 0, fontFamily: "var(--font-family-noto-sans-thai)", fontSize: "var(--size-12)", color: "var(--text-tertiary)" }}>
          {start}-{end} of {TOTAL_ITEMS} items
        </p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
        <PaginationControl
          variant="Previous"
          isDisabled={currentPage === 1}
          onPress={() => setCurrentPage((page) => Math.max(1, page - 1))}
        />
        {getPageItems(currentPage, TOTAL_PAGES).map((item, index) =>
          item === "..." ? (
            <PaginationControl key={`ellipsis-${index}`} variant="..." />
          ) : (
            <PaginationControl
              key={item}
              variant="Page"
              page={item}
              isSelected={item === currentPage}
              onPress={() => setCurrentPage(item)}
            />
          ),
        )}
        <PaginationControl
          variant="Next"
          isDisabled={currentPage === TOTAL_PAGES}
          onPress={() => setCurrentPage((page) => Math.min(TOTAL_PAGES, page + 1))}
        />
      </div>
    </div>
  );
}

type PlaygroundArgs = { withText: boolean };

export const Playground: StoryObj<{ args: PlaygroundArgs }> = {
  args: {
    withText: true,
  },
  argTypes: {
    withText: {
      name: "Variant",
      control: {
        type: "select",
        labels: {
          true: "With text: Yes",
          false: "With text: No",
        },
      },
      options: [true, false],
    },
    // Hide the real component's argTypes, inherited from `meta` — Playground
    // composes its own PaginationControl instances and ignores these args.
    variant: { table: { disable: true } },
    page: { table: { disable: true } },
    isSelected: { table: { disable: true } },
    isDisabled: { table: { disable: true } },
  } as Record<string, unknown>,
  render: (args) => <PlaygroundDemo withText={(args as PlaygroundArgs).withText} />,
};

export const Default: Story = {
  name: "Pagination control",
};
