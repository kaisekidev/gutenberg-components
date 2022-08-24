import { Button, Dropdown } from '@wordpress/components';
import styled from 'styled-components';

import DatePicker, { DatePickerProps } from '../DatePicker/index.js';

import DateButtonLabel, { DateButtonLabelProps } from './DateButtonLabel.js';

interface DateDropdownProps extends DatePickerProps, Omit<DateButtonLabelProps, 'currentDate'> {
  buttonDateFormat?: string;
}

const DatePickerWrap = styled.div`
  .components-datetime__date {
    border-top-width: 0;
  }
`;

export default function DateDropdown({
  fallbackDate,
  currentDate,
  onChange,
  isInvalidDate,
  allowOnlyDatesAfter,
  allowOnlyFutureDates,
  allowTodayAndFutureDates,
  emptyLabel,
  buttonDateFormat,
  ...props
}: DateDropdownProps) {
  return (
    <Dropdown
      position="bottom left"
      renderToggle={({
        onToggle,
        isOpen,
      }) => (
        <Button
          onClick={onToggle}
          aria-expanded={isOpen}
          variant="tertiary"
        >
          <DateButtonLabel
            fallbackDate={fallbackDate}
            currentDate={currentDate}
            emptyLabel={emptyLabel}
            dateFormat={buttonDateFormat}
          />
        </Button>
      )}
      renderContent={({ onClose }) => (
        <DatePickerWrap>
          <DatePicker
            currentDate={currentDate || fallbackDate}
            onChange={(newDate, newDateGmt) => {
              onChange(newDate, newDateGmt);
              onClose();
            }}
            isInvalidDate={isInvalidDate}
            allowOnlyDatesAfter={allowOnlyDatesAfter}
            allowOnlyFutureDates={allowOnlyFutureDates}
            allowTodayAndFutureDates={allowTodayAndFutureDates}
            {...props}
          />
        </DatePickerWrap>
      )}
    />
  );
}
