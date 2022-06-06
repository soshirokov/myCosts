import { Box } from '@mui/system';
import React from 'react';
import { StatsLineChart } from '../StatsLineChart';
import { StatsPieChart } from '../StatsPieChart';

const CostStats = ({ stats }) => {
    return(
        <div className='costStats'>
            <Box>
                {Object.keys(stats).length ? <StatsPieChart costs={stats}/> : "Не было расходов"}
            </Box>
            <Box>
                {Object.keys(stats).length ? <StatsLineChart costs={stats}/> : "Не было расходов"}
            </Box>
        </div>
    );
}

export { CostStats };