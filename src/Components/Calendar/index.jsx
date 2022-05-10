import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { CalendarPicker, PickersDay } from '@mui/lab';
import { isSameDate } from '../../Helpers/Utils/isSameDate';
import './styles.scss';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return(
        <div className='calendar'>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <CalendarPicker 
                    onChange={(value) => {setSelectedDate(value)}}
                    renderDay={(day) => {
                        
                        let dayClass = '';
                        if (day.getMonth() === (new Date()).getMonth()) {
                            dayClass += "currentMonth";
                        }

                        return(<PickersDay 
                            day={day} 
                            outsideCurrentMonth={true} 
                            key={day} 
                            className={dayClass}
                            onDaySelect={(value) => {setSelectedDate(value)}}
                            selected={isSameDate(day, selectedDate)}
                            showDaysOutsideCurrentMonth={true}
                        />);
                    }
                    }
                />
            </LocalizationProvider>
        </div>
    );
};

export { Calendar };