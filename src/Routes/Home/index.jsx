import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Calendar } from '../../Components/Calendar';
import { CostForm } from '../../Components/CostForm';
import { CostStats } from '../../Components/CostStats';

const Home = () => {
    return (
        <div className='home'>
            <Grid container columnSpacing={{ xs: 0, sm: 4, md: 8 }} rowSpacing={1} p={4}>
                <Grid item sm={3} xs={12}>
                    <Typography variant="h6" component="h6">
                        Дата
                    </Typography>
                    <Calendar/>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Typography variant="h6" component="h6">
                        Расходы
                    </Typography>
                    <CostForm/>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <Typography variant="h6" component="h6">
                        Статистика
                    </Typography>
                    <CostStats/>
                </Grid>
            </Grid>
            
        </div>
    );
};

export {Home};