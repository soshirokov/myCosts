import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getStringFromDate } from '../../Helpers/Utils/dateFormat';
import { selectedDateSelector } from '../../Store/Calendar/selectors';
import { CostDetail } from '../CostDetail';
import { lastDayOfMonth } from '../../Helpers/Utils/lastDayOfMonth';

const CostTotal = ( { stats, costLevel } ) => {
    const selectedDate = useSelector(selectedDateSelector)
    const daysInCurrentMonth = lastDayOfMonth(selectedDate)
    const daysToMonthEnd = daysInCurrentMonth - (new Date()).getDate() 

    const getStatsTotal = () => {
        return Object.keys(stats).length > 0 ? Object.keys(stats).reduce((total, key) => total + +stats[key].total, 0) : 0;
    }

    const getStatsAverage = () => {
        return Object.keys(stats).length ? Math.round(getStatsTotal()/Object.keys(stats).length) : 0;
    }

    const getCostLevelAverage = () => {
        return costLevel ? Math.round(costLevel/daysInCurrentMonth) : 0;
    }

    const getForecastTotal = () => {
        return getStatsAverage() * daysInCurrentMonth;
    }

    const getToBalanceAverage = () => {
        return (costLevel - getStatsTotal())/daysToMonthEnd;
    }

    return (
        <Grid container columnSpacing={{ xs: 0, sm: 4, md: 8 }} rowSpacing={1} px={4} pb={6} pt={2}>
            <Grid item sm={2} xs={12}>
                <CostDetail label="В этот день" amount={ stats[getStringFromDate(selectedDate)] ? stats[getStringFromDate(selectedDate)].total : 0 } diff={0} />
            </Grid>
            <Grid item sm={2} xs={12}>
                <CostDetail label="В среднем за день" amount={ getStatsAverage() } diff={costLevel ? getCostLevelAverage() - getStatsAverage() : 0} />
            </Grid>
            <Grid item sm={2} xs={12}>
                <CostDetail label="Всего в этом месяце" amount={ getStatsTotal() } diff={0} />
            </Grid>
            <Grid item sm={2} xs={12}>
                <CostDetail label="Будет за месяц" amount={ getForecastTotal() } diff={costLevel ? costLevel - getForecastTotal() : 0} />
            </Grid>
            <Grid item sm={2} xs={12}>
                <CostDetail label="Осталось в день" amount={ getToBalanceAverage() } diff={costLevel ? getToBalanceAverage() - getCostLevelAverage() : 0} full/>
            </Grid>
            <Grid item sm={2} xs={12}>
                <CostDetail label={ `Осталось в этом месяце (${daysToMonthEnd} д.)` } amount={ costLevel - getStatsTotal() } diff={costLevel ? costLevel - getForecastTotal() : 0} full/>
            </Grid>
        </Grid>
    );
}

export {CostTotal};