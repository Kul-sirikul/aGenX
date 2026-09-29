import { useState } from "react";

export type IconGalleryItem = {
  name: string;
  Icon: (props: { className?: string }) => React.JSX.Element;
  // Standalone, valid SVG document string matching the Icon component
  // exactly — used as both the "copy code" clipboard payload and the
  // "download .svg" file contents.
  svg: string;
};

// Shared gallery grid used by every "Icon/*" story (Arrow, Menu, ...): a
// fixed 5-column layout of icon cards, each with copy-code and
// download-.svg actions. Centralized here since every icon folder needs
// the identical grid/actions UI.

// Fixed (not `1fr`) column width — Storybook centers a story's root with
// flexbox, so a content-sized grid isn't stretched to fill it. With `1fr`
// tracks, each gallery's own grid would size to that gallery's own longest
// un-wrapped label (see the single-line label rule on `labelStyle` below),
// making card width vary story to story. A fixed track keeps every gallery's
// cards identically sized regardless of content.
const CARD_WIDTH = 124;

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: `repeat(5, ${CARD_WIDTH}px)`,
  gap: "var(--spacing-16, 16px)",
};

const cardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: CARD_WIDTH,
  gap: "var(--spacing-8, 8px)",
  padding: "var(--spacing-16, 16px)",
  border: "var(--border-75-thin) solid var(--border-gray-light)",
  borderRadius: "var(--radius-8, 8px)",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  margin: 0,
  width: "100%",
  fontFamily: "var(--font-family-noto-sans-thai), sans-serif",
  fontSize: "var(--size-12)",
  lineHeight: "var(--line-height-16)",
  color: "var(--text-tertiary)",
  textAlign: "center",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const actionRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "var(--spacing-4, 4px)",
};

const actionButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  padding: 0,
  border: "none",
  borderRadius: "var(--radius-6-small)",
  background: "transparent",
  color: "var(--text-tertiary)",
  cursor: "pointer",
};

// Generic "copy" glyph — UI chrome for the gallery's own actions, not a
// design-system icon, so it isn't sourced from Figma like the icons it shows.
function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" />
      <path d="M3 10V3.5C3 3.22386 3.22386 3 3.5 3H10" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

// Generic "download" glyph — same rationale as CopyIcon above.
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M2.5 11V12.5C2.5 12.7761 2.72386 13 3 13H13C13.2761 13 13.5 12.7761 13.5 12.5V11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function downloadSvgFile(name: string, markup: string) {
  const blob = new Blob([markup], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.svg`;
  link.click();
  URL.revokeObjectURL(url);
}

function IconCard({ name, Icon, svg }: IconGalleryItem) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(svg);
    } catch {
      // Clipboard API can be denied (permissions policy, insecure context) —
      // fall back to the older execCommand copy path via a hidden textarea.
      const textarea = document.createElement("textarea");
      textarea.value = svg;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={cardStyle}>
      <Icon className="agx-icon-gallery__glyph" />
      <p style={labelStyle} title={name}>
        {name}
      </p>
      <div style={actionRowStyle}>
        <button type="button" style={actionButtonStyle} aria-label={`Copy ${name} SVG code`} onClick={handleCopy}>
          <CopyIcon />
        </button>
        <button
          type="button"
          style={actionButtonStyle}
          aria-label={`Download ${name}.svg`}
          onClick={() => downloadSvgFile(name, svg)}
        >
          <DownloadIcon />
        </button>
      </div>
      {copied && <p style={labelStyle}>Copied!</p>}
    </div>
  );
}

export function IconGallery({ items }: { items: IconGalleryItem[] }) {
  return (
    <div style={gridStyle}>
      {items.map((item) => (
        <IconCard key={item.name} {...item} />
      ))}
      <style>{`.agx-icon-gallery__glyph { width: 24px; height: 24px; color: var(--text-primary); }`}</style>
    </div>
  );
}
