import { getDateFromString } from '../../Helpers/Utils/dateFormat';

export const selectedDateSelector = (state) => getDateFromString(state.calendar.selectedDate);

export const selectedDateStringSelector = (state) => state.calendar.selectedDate;