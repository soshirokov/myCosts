import { Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { LoginForm } from '../../Components/LoginForm';

const Login = ({authed}) => {
    return (
        <div className='login'>
            <Grid container columnSpacing={{sx: 0, sm: 4}} sx={{my:4}}>
                <Grid item xs={12} sm={4}/>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ p: 2}}>
                        <CardContent>
                            <LoginForm authed={authed}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}/>
            </Grid>
        </div>
    );
};

export {Login};