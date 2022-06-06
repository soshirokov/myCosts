import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { getStringFromDate } from '../../Helpers/Utils/dateFormat';
import { selectedDateSelector } from '../../Store/Calendar/selectors';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const CostTotal = ( { stats, costLevel } ) => {
    const selectedDate = useSelector(selectedDateSelector);
    const daysInCurrentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

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
        const daysToMonthEnd = daysInCurrentMonth - (new Date()).getDate();
        return (costLevel - getStatsTotal())/daysToMonthEnd;
    }

    return (
        <Grid container columnSpacing={{ xs: 0, sm: 4, md: 8 }} rowSpacing={1} px={4} pb={6} pt={2}>
                <Grid item sm={2} xs={12}>
                    <Typography fontSize={12}>В этот день:</Typography>
                    <Typography fontSize={16} fontWeight={600}>{
                        (stats[getStringFromDate(selectedDate)] ? stats[getStringFromDate(selectedDate)].total : 0).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
                        }</Typography>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Typography fontSize={12}>В среднем за день:</Typography>
                    <Typography fontSize={16} fontWeight={600}>
                        {getStatsAverage().toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                        {costLevel && (getCostLevelAverage() > getStatsAverage() ? 
                            <Typography variant="span" sx={{color: '#17d34acf', fontSize: '12px'}}><ArrowDropDownIcon sx={{top: '4px', position: 'relative', fontSize: '16px'}} />{(getCostLevelAverage() - getStatsAverage()).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography> : 
                            <Typography variant="span" sx={{color: '#eb3030d2', fontSize: '12px'}}><ArrowDropUpIcon sx={{top: '4px', position: 'relative', fontSize: '16px'}} />{(getStatsAverage() - getCostLevelAverage()).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography>
                        )}
                    </Typography>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Typography fontSize={12}>Всего в этом месяце:</Typography>
                    <Typography fontSize={16} fontWeight={600}>{getStatsTotal().toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Typography fontSize={12}>Будет за месяц:</Typography>
                    <Typography fontSize={16} fontWeight={600}>
                        {getForecastTotal().toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                        {costLevel && (+costLevel > getForecastTotal() ? 
                            <Typography variant="span" sx={{color: '#17d34acf', fontSize: '12px'}}><ArrowDropDownIcon sx={{top: '4px', position: 'relative', fontSize: '16px'}} />{(+costLevel - getForecastTotal()).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography> : 
                            <Typography variant="span" sx={{color: '#eb3030d2', fontSize: '12px'}}><ArrowDropUpIcon sx={{top: '4px', position: 'relative', fontSize: '16px'}} />{(getForecastTotal() - costLevel).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography>
                        )}
                    </Typography>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Typography fontSize={12}>Осталось в день:</Typography>
                    {getToBalanceAverage() > getCostLevelAverage() ? 
                        <Typography sx={{color: '#17d34acf'}} fontSize={16} fontWeight={600}>{getToBalanceAverage().toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography>:
                        <Typography sx={{color: '#eb3030d2'}} fontSize={16} fontWeight={600}>{getToBalanceAverage().toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography>
                    }
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Typography fontSize={12}>Осталось в этом месяце:</Typography>
                    {costLevel && (+costLevel > getForecastTotal() ? 
                        <Typography sx={{color: '#17d34acf'}} fontSize={16} fontWeight={600}>{(costLevel - getStatsTotal()).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography>:
                        <Typography sx={{color: '#eb3030d2'}} fontSize={16} fontWeight={600}>{(costLevel - getStatsTotal()).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</Typography>
                    )}                
                </Grid>
        </Grid>
    );
}

export {CostTotal};