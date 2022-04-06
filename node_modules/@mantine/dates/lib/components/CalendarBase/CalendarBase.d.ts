import React from 'react';
import { MantineSize, ClassNames, DefaultProps } from '@mantine/core';
import { MonthSettings } from '../Month';
import { YearPickerStylesNames } from './YearPicker/YearPicker';
import { MonthPickerStylesNames } from './MonthPicker/MonthPicker';
import { MonthsListStylesNames } from './MonthsList/MonthsList';
import useStyles from './CalendarBase.styles';
export declare type CalendarBaseStylesNames = ClassNames<typeof useStyles> | YearPickerStylesNames | MonthPickerStylesNames | MonthsListStylesNames;
export interface CalendarSharedProps extends DefaultProps<CalendarBaseStylesNames>, MonthSettings {
    /** Month for controlled calendar */
    month?: Date;
    /** Initial month for uncontrolled calendar */
    initialMonth?: Date;
    /** Called when month changes */
    onMonthChange?(month: Date): void;
    /** Locale used for labels formatting, defaults to theme.datesLocale */
    locale?: string;
    /** Amount of months */
    amountOfMonths?: number;
    /** Selected value */
    value?: Date | null;
    /** Called when day is selected */
    onChange?(value: Date): void;
    /** Calendar size */
    size?: MantineSize;
    /** Allow to change level (date – month – year) */
    allowLevelChange?: boolean;
    /** Initial date selection level */
    initialLevel?: 'date' | 'month' | 'year';
    /** Static selector base */
    __staticSelector?: string;
    /** Selected range */
    range?: [Date, Date];
    /** Called when day is selected */
    onChange?(value: Date): void;
    /** Called when onMouseEnter event fired on day button */
    onDayMouseEnter?(date: Date, event: React.MouseEvent): void;
    /** Next month control aria-label */
    nextMonthLabel?: string;
    /** Previous month control aria-label */
    previousMonthLabel?: string;
    /** Next year control aria-label */
    nextYearLabel?: string;
    /** Previous year control aria-label */
    previousYearLabel?: string;
    /** Next decade control aria-label */
    nextDecadeLabel?: string;
    /** Previous decade control aria-label */
    previousDecadeLabel?: string;
    /** dayjs label format */
    labelFormat?: string;
}
export interface CalendarBaseProps extends CalendarSharedProps, Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
}
export declare const CalendarBase: React.ForwardRefExoticComponent<CalendarBaseProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CalendarBase.d.ts.map