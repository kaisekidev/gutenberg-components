import { format, __experimentalGetSettings } from '@wordpress/date';

export interface DateButtonLabelProps {
  currentDate?: string | undefined;
  fallbackDate?: string | undefined;
  emptyLabel?: string;
  dateFormat?: string;
}

export default function DateButtonLabel({
  currentDate,
  fallbackDate,
  emptyLabel,
  dateFormat = 'F j, Y',
}: DateButtonLabelProps) {
  const settings = __experimentalGetSettings();
  return (
    <span>
      {currentDate || !emptyLabel
        ? format(dateFormat || settings?.formats?.date, currentDate || fallbackDate || undefined)
        : emptyLabel}
    </span>
  );
}
