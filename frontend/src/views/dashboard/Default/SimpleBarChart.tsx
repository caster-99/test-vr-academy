import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import defaultChartOptions from './chart-data/total-growth-bar-chart';

interface SimpleBarChartProps {
    isLoading: boolean;
    title: string;
    categories: string[];
    series: { name: string; data: number[] }[];
}

const SimpleBarChart = ({ isLoading, title, categories, series }: SimpleBarChartProps) => {
    const theme = useTheme();
    const [chartOptions, setChartOptions] = useState<ApexOptions>(defaultChartOptions as ApexOptions);

    const primary = theme.palette.text.primary;
    const divider = theme.palette.divider;
    const grey500 = theme.palette.grey[500];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;

    useEffect(() => {
        setChartOptions((prevState) => ({
            ...prevState,
            colors: [primaryDark, secondaryMain],
            xaxis: {
                ...prevState.xaxis,
                categories: categories,
                labels: {
                    style: {
                        colors: Array(categories.length).fill(primary),
                        fontSize: '8px'
                    }
                }
            },
            yaxis: {
                ...prevState.yaxis,
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: divider
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        }));
    }, [primary, divider, grey500, primaryDark, secondaryMain, categories]);

    if (isLoading) return <SkeletonTotalGrowthBarChart />;

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid size={12}>
                    <Typography variant="h3">{title}</Typography>
                </Grid>
                <Grid size={12}>
                    <Chart options={chartOptions} series={series} type="bar" height={480} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default SimpleBarChart;
