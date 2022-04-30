import { Card, CardContent, Grid } from '@mui/material';
import React from 'react';
import { LoginForm } from '../../Components/LoginForm';

const Login = ({authed}) => {
    return (
        <div className='login'>
            <Grid container spacing={3} sx={{m:4}}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Card sx={{ p: 2}}>
                        <CardContent>
                            <LoginForm authed={authed}/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </div>
    );
};

export {Login};