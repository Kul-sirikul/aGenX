import { CalendarDate, CalendarDateTime, getLocalTimeZone, today } from "@internationalized/date";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import {
  Button as AriaButton,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  Text,
  type DateValue,
} from "react-aria-components";
import { Tooltip } from "./Tooltip";
import "./DatePicker.css";

// Exact vector path exported from Figma "calendar" icon node (6609:225773).
function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-date-field__icon">
      <path
        d="M4.5 2V3.5M11.5 2V3.5M2 12.5V5C2 4.60218 2.15804 4.22064 2.43934 3.93934C2.72064 3.65804 3.10218 3.5 3.5 3.5H12.5C12.8978 3.5 13.2794 3.65804 13.5607 3.93934C13.842 4.22064 14 4.60218 14 5V12.5M14 12.5V7.5C14 7.10218 13.842 6.72064 13.5607 6.43934C13.2794 6.15804 12.8978 6 12.5 6H3.5C3.10218 6 2.72064 6.15804 2.43934 6.43934C2.15804 6.72064 2 7.10218 2 7.5V12.5C2 12.8978 2.15804 13.2794 2.43934 13.5607C2.72064 13.842 3.10218 14 3.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5ZM8 8.5H8.00533V8.50533H8V8.5ZM8 10H8.00533V10.0053H8V10ZM8 11.5H8.00533V11.5053H8V11.5ZM6.5 10H6.50533V10.0053H6.5V10ZM6.5 11.5H6.50533V11.5053H6.5V11.5ZM5 10H5.00533V10.0053H5V10ZM5 11.5H5.00533V11.5053H5V11.5ZM9.5 8.5H9.50533V8.50533H9.5V8.5ZM9.5 10H9.50533V10.0053H9.5V10ZM9.5 11.5H9.50533V11.5053H9.5V11.5ZM11 8.5H11.0053V8.50533H11V8.5ZM11 10H11.0053V10.0053H11V10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Exact vector path exported from Figma "arrow-long-left" icon node — the
// calendar's own nav icon (same shape reused by PaginationControl, flipped
// for "next").
function LongArrowIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="agx-calendar__nav-icon"
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M7 3L2 8L7 13M2 8H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Figma's weekday row reads "Su, Mo, Tu, We, Th, Fr, Sa" — a specific
// 2-letter style that doesn't match either of RAC's built-in weekdayStyle
// options ("narrow" is 1 letter, "short" is 3 in en-US), so it's rendered
// from a fixed lookup instead, indexed by the render order (always
// Sunday-first for this locale, matching CalendarGridHeader's own order).
const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function WeekdayHeader() {
  let index = 0;
  return (
    <CalendarGridHeader>
      {() => <CalendarHeaderCell className="agx-calendar__weekday">{WEEKDAY_LABELS[index++ % 7]}</CalendarHeaderCell>}
    </CalendarGridHeader>
  );
}

// Exact vector path exported from Figma "info" icon node (13026:538) — the
// same info affordance reused next to the label, as in the Tooltip work.
function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="agx-date-field__info-icon">
      <path
        d="M7.5 7.5L7.52733 7.48667C7.61282 7.44396 7.70875 7.42664 7.80378 7.43677C7.8988 7.4469 7.98893 7.48404 8.0635 7.54381C8.13806 7.60357 8.19394 7.68345 8.22451 7.77399C8.25508 7.86453 8.25907 7.96193 8.236 8.05467L7.764 9.94533C7.74076 10.0381 7.74463 10.1356 7.77513 10.2263C7.80563 10.3169 7.86149 10.3969 7.93609 10.4568C8.01069 10.5166 8.10089 10.5538 8.196 10.564C8.2911 10.5741 8.38712 10.5568 8.47267 10.514L8.5 10.5M14 8C14 8.78793 13.8448 9.56815 13.5433 10.2961C13.2417 11.0241 12.7998 11.6855 12.2426 12.2426C11.6855 12.7998 11.0241 13.2417 10.2961 13.5433C9.56815 13.8448 8.78793 14 8 14C7.21207 14 6.43185 13.8448 5.7039 13.5433C4.97595 13.2417 4.31451 12.7998 3.75736 12.2426C3.20021 11.6855 2.75825 11.0241 2.45672 10.2961C2.15519 9.56815 2 8.78793 2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.5913 2 11.1174 2.63214 12.2426 3.75736C13.3679 4.88258 14 6.4087 14 8ZM8 5.5H8.00533V5.50533H8V5.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type DatePickerProps = {
  label?: string;
  showInfoIcon?: boolean;
  helpText?: string;
  showTime?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  defaultValue?: DateValue | null;
  value?: DateValue | null;
  onChange?: (value: DateValue | null) => void;
  className?: string;
};

// The Figma "Date selection" state system (Default/Focus/Selected/Error/
// Disable) collapses into DateInput/Group's own RAC data-attributes — see
// DatePicker.css. `showTime` covers both the "Single date picker" and "Date
// and time picker" Figma nodes, since they're the same mechanism with an
// extra pair of hour/minute columns bolted onto the calendar popover.
export function DatePicker({
  label,
  showInfoIcon = true,
  helpText,
  showTime = false,
  isDisabled,
  isInvalid,
  defaultValue,
  value,
  onChange,
  className,
}: DatePickerProps) {
  const [internalValue, setInternalValue] = useState<DateValue | null>(defaultValue ?? null);
  const currentValue = value !== undefined ? value : internalValue;

  function handleChange(next: DateValue | null) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  // The time columns sit flush against the popover's top edge, beside the
  // nav row and grid together (not just the grid), and "hug" that whole
  // date-side column's height instead of a fixed height — 24 hours never
  // fit that short, so they always scroll internally. A callback ref
  // (rather than useEffect) is required here since the date-side column
  // only exists while the popover is open, so a plain ref wouldn't be
  // attached yet when an effect ran.
  const [dateSideHeight, setDateSideHeight] = useState<number>();
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const dateSideRef = useCallback((node: HTMLDivElement | null) => {
    resizeObserverRef.current?.disconnect();
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setDateSideHeight(entry.contentRect.height));
    observer.observe(node);
    resizeObserverRef.current = observer;
  }, []);

  return (
    <AriaDatePicker
      className={clsx("agx-date-field", className)}
      granularity={showTime ? "minute" : "day"}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      value={currentValue as never}
      onChange={handleChange as never}
    >
      {({ state }) => (
        <>
          {label && (
            <div className="agx-date-field__label-row">
              <Label className="agx-date-field__label">{label}</Label>
              {showInfoIcon && (
                <Tooltip content="Test Playground">
                  <span role="button" tabIndex={0}>
                    <InfoIcon />
                  </span>
                </Tooltip>
              )}
            </div>
          )}
          <Group className="agx-date-field__box">
            <div className="agx-date-input-wrapper">
              <DateInput className="agx-date-input">
                {(segment) => <DateSegment segment={segment} className="agx-date-segment" />}
              </DateInput>
              {/* Figma's Focus state (no value yet) still reads "date" — this
                  stays up through focus, only clearing once a full date is
                  committed (matching Figma's Default/Focus vs
                  Selected/Focus+Selected state pairs). */}
              {!currentValue && (
                <span className="agx-date-field__placeholder" aria-hidden="true">
                  date
                </span>
              )}
            </div>
            <AriaButton className="agx-date-field__icon-button">
              <CalendarIcon />
            </AriaButton>
          </Group>
          {helpText && isInvalid && (
            <Text slot="description" className="agx-date-field__help agx-date-field__help--error">
              {helpText}
            </Text>
          )}
          <Popover>
            <Dialog className="agx-calendar__dialog">
              {({ close }) => (
                <Calendar
                  className="agx-calendar"
                  value={(state.value as DateValue | null) as CalendarDate | null}
                  onChange={(date) => {
                    if (showTime) {
                      const time = state.value as CalendarDateTime | null;
                      state.setValue(
                        new CalendarDateTime(
                          date.year,
                          date.month,
                          date.day,
                          time?.hour ?? 0,
                          time?.minute ?? 0,
                        ) as never,
                      );
                    } else {
                      state.setValue(date as never);
                    }
                  }}
                >
                  <div
                    className="agx-calendar__top-wrapper"
                    style={
                      dateSideHeight ? ({ "--agx-time-columns-height": `${dateSideHeight}px` } as React.CSSProperties) : undefined
                    }
                  >
                    <div className="agx-calendar__date-side" ref={dateSideRef}>
                      <header className="agx-calendar__header">
                        <AriaButton slot="previous" className="agx-calendar__nav">
                          <LongArrowIcon />
                        </AriaButton>
                        <Heading className="agx-calendar__heading" />
                        <AriaButton slot="next" className="agx-calendar__nav">
                          <LongArrowIcon flip />
                        </AriaButton>
                      </header>
                      <div className="agx-calendar__body">
                        <CalendarGrid className="agx-calendar__grid" weekdayStyle="short">
                          <WeekdayHeader />
                          <CalendarGridBody>
                            {(date) => <CalendarCell date={date} className="agx-calendar__cell" />}
                          </CalendarGridBody>
                        </CalendarGrid>
                      </div>
                    </div>
                    {showTime && (
                      <TimeColumns
                        value={state.value as CalendarDateTime | null}
                        onChange={(next) => state.setValue(next as never)}
                      />
                    )}
                  </div>
                  <div className="agx-calendar__footer">
                    <button type="button" className="agx-calendar__footer-button" onClick={() => state.setValue(null)}>
                      Clear
                    </button>
                    <button type="button" className="agx-calendar__footer-button" onClick={close}>
                      Close
                    </button>
                  </div>
                </Calendar>
              )}
            </Dialog>
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

function TimeColumns({
  value,
  onChange,
}: {
  value: CalendarDateTime | null;
  onChange: (value: CalendarDateTime) => void;
}) {
  const now = today(getLocalTimeZone());
  const base = value ?? new CalendarDateTime(now.year, now.month, now.day, 0, 0);

  return (
    <div className="agx-time-columns">
      <div className="agx-time-column">
        {HOURS.map((hour) => (
          <button
            key={hour}
            type="button"
            className="agx-time-column__item"
            data-selected={hour === base.hour || undefined}
            onClick={() => onChange(base.set({ hour }))}
          >
            {String(hour).padStart(2, "0")}
          </button>
        ))}
      </div>
      <div className="agx-time-column">
        {MINUTES.map((minute) => (
          <button
            key={minute}
            type="button"
            className="agx-time-column__item"
            data-selected={minute === base.minute || undefined}
            onClick={() => onChange(base.set({ minute }))}
          >
            {String(minute).padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
}

export type { DateValue, CalendarDate, CalendarDateTime };
