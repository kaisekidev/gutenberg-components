import { format, __experimentalGetSettings, DateSettings } from '@wordpress/date';
import { __ } from '@wordpress/i18n';

export interface DateButtonLabelProps {
  currentDate?: string;
  fallbackDate?: string;
  emptyLabel?: string;
  dateFormat?: string;
}

export default function DateButtonLabel({
  currentDate,
  fallbackDate,
  emptyLabel,
  dateFormat = 'F j, Y',
}: DateButtonLabelProps) {
  const settings = __experimentalGetSettings() as DateSettings;
  const label = emptyLabel || __('Pick date');
  return (
    <span>
      {currentDate
        ? format(dateFormat || settings?.formats?.date, currentDate || fallbackDate || undefined)
        : label}
    </span>
  );
}
