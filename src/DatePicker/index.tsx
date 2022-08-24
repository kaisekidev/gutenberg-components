import { DateTimePicker, DateTimePicker as WpDateTimePicker } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import moment from 'moment-timezone';

export interface DatePickerProps extends Omit<WpDateTimePicker.Props, 'onChange'> {
  onChange: (currentDate: string, currentDateGmt: string) => void;
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
  const localDate = moment.tz(date, dateSettings.timezone.string);
  const gmtDate = localDate.clone().tz('GMT');
  return gmtDate.format(format);
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
      onChange={(newDate) => {
        onChange(moment(newDate).format(newFormat), dateToGmt(newDate, newFormat));
      }}
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
