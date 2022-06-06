import React from 'react';
import Chart from 'react-apexcharts';
import { categories } from '../../Constants/costCategories';

const StatsPieChart = ({ costs }) => {

    const sortedCosts = Object.keys(categories).map(category => {
        return {
                category, 
                total: Object.keys(costs).reduce((total, key) => total + +costs[key].details[category], 0)
            };
    }).sort((a, b) => a.total < b.total);

    const settings = {
        chart: {
            width: "100%",
            height: 380,
        },
        options: {
          labels: sortedCosts.map(cost => cost.category),
          legend: {
              show: false
          },
          colors: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4', '#e63946', '#0077b6', '#ffbe0b', '#118ab2', '#7400b8', '#4ea8de', '#72efdd', '#f72585', '#7209b7', '#4361ee', '#f95738'].sort(),
          tooltip: {
            enabled: false,
          },
          plotOptions: {
            pie: {
                startAngle: -140,
                endAngle: 140,
                expandOnClick: false,
                donut: {
                    labels: {
                        show: true,
                        value: {
                            fontSize: '16px',
                            formatter: function (val) {
                            return (+val).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
                            }
                        },
                        total: {
                            show: true,
                            color: '#000000',
                            label: 'Всего за месяц',
                            fontSize: '14px',
                            fontWeight: 600,
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                return a + b
                                }, 0).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
                            }
                        }
                    }
                }
            }
          }
        },
        series: sortedCosts.map(cost => cost.total)
    };

    return(<>
        <Chart 
            type="donut" 
            options={settings.options}
            series={settings.series}
        />
    </>);
};

export { StatsPieChart };