import { DateFormatter, getLocalTimeZone, type CalendarDate } from "@internationalized/date";
import clsx from "clsx";
import { useState } from "react";
import {
  Button as AriaButton,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DateRangePicker as AriaDateRangePicker,
  DateSegment,
  Dialog,
  Group,
  Label,
  Popover,
  RangeCalendar,
  Text,
  useLocale,
  type DateRange,
} from "react-aria-components";
import { Tooltip } from "./Tooltip";
import "./DatePicker.css";
import "./DateRangePicker.css";

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

function MonthHeading({ start, offset }: { start: CalendarDate; offset: number }) {
  const { locale } = useLocale();
  const date = start.add({ months: offset });
  const label = new DateFormatter(locale, { month: "long", year: "numeric" }).format(date.toDate(getLocalTimeZone()));
  return <div className="agx-calendar__heading">{label}</div>;
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

export type DateRangePickerProps = {
  label?: string;
  showInfoIcon?: boolean;
  helpText?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  defaultValue?: DateRange | null;
  value?: DateRange | null;
  onChange?: (value: DateRange | null) => void;
  className?: string;
};

// Reuses the same "Date selection" field states as DatePicker (see
// DatePicker.css) — the Range type just renders two DateInputs with a
// separator instead of one, matching the shared Figma component.
export function DateRangePicker({
  label,
  showInfoIcon = true,
  helpText,
  isDisabled,
  isInvalid,
  defaultValue,
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [internalValue, setInternalValue] = useState<DateRange | null>(defaultValue ?? null);
  const currentValue = value !== undefined ? value : internalValue;

  function handleChange(next: DateRange | null) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  return (
    <AriaDateRangePicker
      className={clsx("agx-date-field", className)}
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
            <div className="agx-date-range-inputs">
              <div className="agx-date-input-wrapper">
                <DateInput slot="start" className="agx-date-input">
                  {(segment) => <DateSegment segment={segment} className="agx-date-segment" />}
                </DateInput>
                {!currentValue && (
                  <span className="agx-date-field__placeholder" aria-hidden="true">
                    date
                  </span>
                )}
              </div>
              <span className="agx-date-field__separator">-</span>
              <div className="agx-date-input-wrapper">
                <DateInput slot="end" className="agx-date-input">
                  {(segment) => <DateSegment segment={segment} className="agx-date-segment" />}
                </DateInput>
                {!currentValue && (
                  <span className="agx-date-field__placeholder" aria-hidden="true">
                    date
                  </span>
                )}
              </div>
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
                <RangeCalendar className="agx-calendar agx-calendar--range" visibleDuration={{ months: 2 }}>
                  {({ state: calendarState }) => (
                    <>
                      <div className="agx-calendar__body agx-calendar__body--range">
                        {[0, 1].map((offset) => (
                          <div key={offset} className="agx-calendar__month">
                            <header className="agx-calendar__header agx-calendar__header--range">
                              {offset === 0 ? (
                                <AriaButton slot="previous" className="agx-calendar__nav">
                                  <LongArrowIcon />
                                </AriaButton>
                              ) : (
                                <span className="agx-calendar__nav-spacer" aria-hidden="true" />
                              )}
                              <MonthHeading start={calendarState.visibleRange.start} offset={offset} />
                              {offset === 1 ? (
                                <AriaButton slot="next" className="agx-calendar__nav">
                                  <LongArrowIcon flip />
                                </AriaButton>
                              ) : (
                                <span className="agx-calendar__nav-spacer" aria-hidden="true" />
                              )}
                            </header>
                            <CalendarGrid className="agx-calendar__grid" weekdayStyle="short" offset={{ months: offset }}>
                              <WeekdayHeader />
                              <CalendarGridBody>
                                {(date) => <CalendarCell date={date} className="agx-calendar__cell" />}
                              </CalendarGridBody>
                            </CalendarGrid>
                          </div>
                        ))}
                      </div>
                      <div className="agx-calendar__footer">
                        <button
                          type="button"
                          className="agx-calendar__footer-button"
                          onClick={() => state.setValue(null)}
                        >
                          Clear
                        </button>
                        <button type="button" className="agx-calendar__footer-button" onClick={close}>
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </RangeCalendar>
              )}
            </Dialog>
          </Popover>
        </>
      )}
    </AriaDateRangePicker>
  );
}
