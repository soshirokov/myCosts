import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Grid, TextField, Typography } from '@mui/material';
import ruLocale from 'date-fns/locale/ru';
import { differenceInDays, sub } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { auth, costByUserRef } from '../../Helpers/Firebase';
import {  limitToFirst, onValue, orderByChild, query, startAt } from 'firebase/database';
import { StatsPieChart } from '../../Components/StatsPieChart';
import { Box } from '@mui/system';
import { StatsLineChart } from '../../Components/StatsLineChart';

const StatsPage = () => {
    const [stats, setStats] = useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (auth?.currentUser?.uid && startDate && endDate) {
            const firstDate = sub(startDate, { days: 1 })

            const daysBetween = differenceInDays(endDate, firstDate)

            const myQuery = query(costByUserRef(auth.currentUser.uid), orderByChild('dateTime'), startAt(firstDate.getTime()), limitToFirst(daysBetween));

            onValue(myQuery, snapshot => setStats(snapshot.val() || {}))
        }
    }, [startDate, endDate]);

    return (
        <div className='StatsPage'>
            <Grid container columnSpacing={{ xs: 0, sm: 4, md: 10 }} rowSpacing={1} px={4}>
                <Grid item sm={2} xs={12}>
                    <Typography fontSize={16} fontWeight={600} marginBottom={ 3 }>Select range</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                        <Box>
                            <DesktopDatePicker
                                mask="__.__.____"
                                label="Start date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Box marginTop={3}>
                            <DesktopDatePicker
                                mask="__.__.____"
                                label="End date"
                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </LocalizationProvider>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Typography fontSize={16} fontWeight={600} marginBottom={ 3 }>Costs dynamic</Typography>
                    <StatsLineChart costs={stats}/>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Typography fontSize={16} fontWeight={600} marginBottom={ 3 }>Costs categories</Typography>
                    <StatsPieChart costs={stats}/>
                </Grid>
            </Grid>
        </div>
    );
};

export {StatsPage};