import { Grid } from '@mui/material';
import { Calendar } from '../../Components/Calendar';
import { CostForm } from '../../Components/CostForm';
import { CostStats } from '../../Components/CostStats';
import { equalTo, limitToFirst, onValue, orderByChild, query } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, costByUserRef, costLevelRef } from '../../Helpers/Firebase';
import { selectedDateSelector } from '../../Store/Calendar/selectors';
import { CostTotal } from '../../Components/CostTotal';
import { lastDayOfMonth } from '../../Helpers/Utils/lastDayOfMonth';

const Home = () => {
    const [stats, setStats] = useState({});
    const [costLevel, setCostLevel] = useState();
    const selectedDate = useSelector(selectedDateSelector);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            const today = new Date()
            const lastDayOfStats = selectedDate.getMonth() < today.getMonth() && selectedDate.getFullYear() <= today.getFullYear()
                ? lastDayOfMonth(selectedDate)
                : today.getDate()

            const myQuery = query(costByUserRef(auth.currentUser.uid), orderByChild('m'), equalTo(selectedDate.getMonth() + 1), limitToFirst(lastDayOfStats));

            onValue(myQuery, snapshot => setStats(snapshot.val() || {}))
        }
    }, [selectedDate]);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            onValue(costLevelRef(auth.currentUser.uid), snapshot => setCostLevel(snapshot.val() || ''))
        }
    }, []);

    return (
        <div className='home'>
            <CostTotal stats={stats} costLevel={costLevel}/>
            <Grid container columnSpacing={{ xs: 0, sm: 4, md: 10 }} rowSpacing={1} px={4}>
                <Grid item sm={3} xs={12}>
                    <Calendar/>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <CostForm/>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <CostStats stats={stats}/>
                </Grid>
            </Grid>
        </div>
    );
};

export {Home};