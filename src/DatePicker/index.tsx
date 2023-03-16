import { DateTimePicker, DateTimePicker as WpDateTimePicker } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import moment from 'moment-timezone';

export interface DatePickerProps extends Omit<WpDateTimePicker.Props, 'onChange'> {
  onChange: (currentDate: string | null, currentDateGmt: string | null) => void;
  format?: string;
  useMysqlFormat?: boolean;
  isInvalidDate?: (date: Date) => boolean;
  allowOnlyDatesAfter?: Date;
  allowOnlyFutureDates?: boolean;
  allowTodayAndFutureDates?: boolean;
}

export const MYSQL_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIMEZONELESS_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

const isFutureDate = (checkDate: Date, includeToday = false) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  if (includeToday === false) {
    date.setDate(date.getDate() + 1);
  }
  return date < checkDate;
};

const dateToGmt = (date: string, format: string) => {
  const dateSettings = __experimentalGetSettings();
  if (dateSettings.timezone.string) {
    const localDate = moment.tz(date, dateSettings.timezone.string);
    const gmtDate = localDate.clone().tz('GMT');
    return gmtDate.format(format);
  }
  const momentDate = moment(date);
  const offset = parseInt(dateSettings.timezone.offset, 10);
  if (offset > 0) {
    momentDate.subtract(offset, 'h');
  }
  if (offset < 0) {
    momentDate.add(offset, 'h');
  }
  return momentDate.format(format);
};

export default function DatePicker({
  currentDate,
  onChange,
  format,
  useMysqlFormat = false,
  isInvalidDate = () => false,
  allowOnlyDatesAfter,
  allowOnlyFutureDates = false,
  allowTodayAndFutureDates = false,
  ...props
}: DatePickerProps) {
  const newFormat = format || (useMysqlFormat && MYSQL_FORMAT) || TIMEZONELESS_FORMAT;

  return (
    <DateTimePicker
      onChange={(newDate) =>
        newDate
          ? onChange(moment(newDate).format(newFormat), dateToGmt(newDate, newFormat))
          : onChange(null, null)
      }
      currentDate={currentDate}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      isInvalidDate={(d: Date): boolean => {
        if (allowOnlyDatesAfter) {
          return d < allowOnlyDatesAfter;
        }
        if (allowOnlyFutureDates || allowTodayAndFutureDates) {
          return isFutureDate(d, allowTodayAndFutureDates) === false;
        }
        return isInvalidDate(d);
      }}
      allowOnlyFutureDates
      {...props}
    />
  );
}
