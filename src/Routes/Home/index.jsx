import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Calendar } from '../../Components/Calendar';
import { CostForm } from '../../Components/CostForm';

const Home = () => {
    return (
        <div className='home'>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography variant="h6" component="h6">
                        Выбрать день
                    </Typography>
                    <Calendar/>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" component="h6">
                        Внести расходы
                    </Typography>
                    <CostForm/>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" component="h6">
                        Статистика за текущий месяц
                    </Typography>
                </Grid>
            </Grid>
            
        </div>
    );
};

export {Home};