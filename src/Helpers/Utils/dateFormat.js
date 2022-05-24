import { format, parse } from 'date-fns';

export const getStringFromDate = (date) => format(date, 'dd-MM-yyyy');

export const getDateFromString = (dateString) => parse(dateString, 'dd-MM-yyyy', new Date());
