import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import { CalendarPicker, PickersDay } from '@mui/lab';
import { isSameDate } from '../../Helpers/Utils/isSameDate';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../Store/Calendar/actions';
import { selectedDateSelector } from '../../Store/Calendar/selectors';
import { getStringFromDate } from '../../Helpers/Utils/dateFormat';
import { Button, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';

const Calendar = () => {
    const selectedDate = useSelector(selectedDateSelector);
    const dispatch = useDispatch();
    const [showCal, setShowCal] = useState('none');
    
    const dayChangeHandler = (value) => {
        const dateToStore = getStringFromDate(value);
        dispatch(setDate(dateToStore));
    };

    const showCalendar = () => {
        if (showCal === 'none') {setShowCal('block');}
        else {setShowCal('none');}
    }

    return(
        <div className='calendar'>
            <Box display={{xs: 'block', sm: 'none'}}>
                <FormControl fullWidth>
                    <Button 
                        variant="text" 
                        sx={{fontWeight: 'bold', fontSize: '18px'}}
                        onClick={showCalendar}
                    >
                        {format(selectedDate, 'dd.MM.yyyy')}
                    </Button>
                </FormControl>
            </Box>
            <Box display={{xs: showCal, sm: 'block'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                    <CalendarPicker 
                        onChange={dayChangeHandler}
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
                                onDaySelect={dayChangeHandler}
                                selected={isSameDate(day, selectedDate)}
                                showDaysOutsideCurrentMonth={true}
                            />);
                        }
                        }
                    />
                </LocalizationProvider>
            </Box>
        </div>
    );
};

export { Calendar };