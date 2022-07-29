import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getStringFromDate } from '../../Helpers/Utils/dateFormat';
import { selectedDateSelector } from '../../Store/Calendar/selectors';

const StatsLineChart = ({ costs, inMonth }) => {
    const selectedDate = useSelector(selectedDateSelector);
    const costsData = []    
    const costsSeries = []

    if (inMonth) {
        const lastDayOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const lastDayToDisplay = lastDayOfSelectedMonth <= (new Date()) ? lastDayOfSelectedMonth.getDate() : (new Date()).getDate();
        const daysOfSelectedMonth = Array.from({ length: lastDayToDisplay }, (v, k) => getStringFromDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), k + 1)));
        costsData.push(...daysOfSelectedMonth.map(day => costs[day]?.total ? costs[day].total : 0))
        costsSeries.push(...daysOfSelectedMonth)
    } else { 
        const costsKeysSorted = Object.keys(costs).sort((a, b) => costs[a].dateTime > costs[b].dateTime ? 1 : -1)
        costsData.push(...costsKeysSorted.map(key => costs[key].total))
        costsSeries.push(...costsKeysSorted)
    }

    const settings = {
        options: {
            xaxis: {
              categories: costsSeries
            },
            stroke: {
                width: 2,
            },
            chart: {
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                y: {
                    formatter: (val) => (+val).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }),
                },
            },
            colors: ['#3f2aff']
          },
          series: [
            {
              name: "Расходы",
              data: costsData
            }
          ]
    };

    return(<>
        <Chart 
            type='area'
            width='100%'
            height='350px'
            options={settings.options}
            series={settings.series}
        />
    </>);
};

export { StatsLineChart };