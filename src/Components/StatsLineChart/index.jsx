import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getStringFromDate } from '../../Helpers/Utils/dateFormat';
import { selectedDateSelector } from '../../Store/Calendar/selectors';

const StatsLineChart = ({ costs }) => {
    const selectedDate = useSelector(selectedDateSelector);
    const lastDayOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const lastDayToDisplay = lastDayOfSelectedMonth <= (new Date()) ? lastDayOfSelectedMonth.getDate() : (new Date()).getDate();
    const daysOfSelectedMonth = Array.from({length: lastDayToDisplay}, (v, k) => getStringFromDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), k + 1)));

    const settings = {
        options: {
            xaxis: {
              categories: daysOfSelectedMonth
            },
            stroke: {
                width: 2
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
            }
          },
          series: [
            {
              name: "Расходы",
              data: daysOfSelectedMonth.map(day => costs[day]?.total ? costs[day].total : 0)
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