import { Grid } from '@mui/material';
import { Calendar } from '../../Components/Calendar';
import { CostForm } from '../../Components/CostForm';
import { CostStats } from '../../Components/CostStats';
import { equalTo, onValue, orderByChild, query } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { auth, costByUserRef, costLevelRef } from '../../Helpers/Firebase';
import { getDateFromString } from '../../Helpers/Utils/dateFormat';
import { selectedDateStringSelector } from '../../Store/Calendar/selectors';
import { CostTotal } from '../../Components/CostTotal';

const Home = () => {
    const [stats, setStats] = useState({});
    const [costLevel, setCostLevel] = useState();
    const selectedDate = useSelector(selectedDateStringSelector);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            const myQuery = query(costByUserRef(auth.currentUser.uid), orderByChild('m'), equalTo(getDateFromString(selectedDate).getMonth() + 1));

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