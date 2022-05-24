import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { equalTo, onValue, orderByChild, query } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { categories } from '../../Constants/costCategories';
import { auth, costByUserRef } from '../../Helpers/Firebase';
import { getDateFromString } from '../../Helpers/Utils/dateFormat';
import { selectedDateStringSelector } from '../../Store/Calendar/selectors';

const CostStats = () => {
    const [stats, setStats] = useState({});
    const selectedDate = useSelector(selectedDateStringSelector);

    useEffect(() => {
        if (auth?.currentUser?.uid) {
            const myQuery = query(costByUserRef(auth.currentUser.uid), orderByChild('m'), equalTo(getDateFromString(selectedDate).getMonth() + 1));

            onValue(myQuery, snapshot => setStats(snapshot.val() || {}))
        }
    }, [selectedDate]);

    const getStatsTotal = () => {
        return Object.keys(stats).length > 0 ? Object.keys(stats).reduce((total, key) => total + +stats[key].total, 0) : 0;
    }

    return(
        <div className='costStats'>
            <Typography fontSize={16} fontWeight={600} mt={2}>Потрачено в этом месяце:</Typography>
            <Typography>{getStatsTotal()}</Typography>
            <Typography fontSize={16} fontWeight={600} mt={2}>В среднем за день:</Typography>
            <Typography>{getStatsTotal() && Math.round(getStatsTotal()/Object.keys(stats).length)}</Typography>
            <Typography fontSize={16} fontWeight={600} mt={2}>По категориям:</Typography>
            <Box>
                {
                    getStatsTotal() &&
                    Object.keys(categories).map(category => {
                        const categoryTotal = Object.keys(stats).reduce((total, key) => total + +stats[key].details[category], 0);
                        return (<Typography key={category}>{category}: {categoryTotal}</Typography>);
                    })
                }
            </Box>
        </div>
    );
}

export { CostStats };