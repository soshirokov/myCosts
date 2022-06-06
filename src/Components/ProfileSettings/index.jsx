import { FormControl, Grid, TextField, Typography } from '@mui/material';
import { onValue, set } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, costLevelRef } from '../../Helpers/Firebase';
import { selectedDateSelector } from '../../Store/Calendar/selectors';

const ProfileSettings = () => {
    const [costLevel, setCostLevel] = useState('');
    const selectedDate = useSelector(selectedDateSelector);
    const daysInCurrentMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            onValue(costLevelRef(auth.currentUser.uid), snapshot => setCostLevel(snapshot.val() || ''))
        }
    }, []);

    const inputHandler = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        if (+e.target.value === 0) {e.target.value = '';}

        setCostLevel(e.target.value);
    };

    const keyDowHandler = (e) => {
        if(e.keyCode === 13) {
            e.target.blur()
        }
    };

    const blurHandler = (e) => {
        set(costLevelRef(auth.currentUser.uid), e.target.value);
    };


    return (
        <Grid container columnSpacing={{ xs: 0, sm: 4, md: 8 }} rowSpacing={1} p={4}>
            <Grid item sm={4} xs={12}>
            </Grid>
            <Grid item sm={4} xs={12}>
                <Typography fontSize={12}>Твой ID:</Typography>
                <Typography fontSize={16} fontWeight={600}>{auth?.currentUser?.uid}</Typography>
                <FormControl fullWidth sx={{my:3}}>
                    <TextField 
                        label="Желаемый уровень расходов"
                        value={costLevel} 
                        type='text' 
                        variant='filled' 
                        size='small'
                        onChange={inputHandler}
                        onKeyDown={keyDowHandler}
                        onBlur={blurHandler}
                    />
                </FormControl>
                <Typography fontSize={12}>Расход в день в этом месяце:</Typography>
                <Typography fontSize={16} fontWeight={600}>{Math.round(costLevel / daysInCurrentMonth)}</Typography>
            </Grid>
            <Grid item sm={4} xs={12}>
            </Grid>
        </Grid>
    );
}

export { ProfileSettings };