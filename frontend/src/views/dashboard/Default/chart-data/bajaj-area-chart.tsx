import { ApexOptions } from 'apexcharts';

// ==============================|| DASHBOARD - BAJAJ AREA CHART ||============================== //

const chartOptions: ApexOptions = {
    chart: {
        id: 'support-chart',
        sparkline: { enabled: true },
        background: 'transparent',
        toolbar: { show: false }
    },
    colors: [],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 1 },
    fill: {
        gradient: {
            colorStops: []
        }
    },
    yaxis: { labels: { show: false } },
    tooltip: {
        fixed: { enabled: false },
        x: { show: false },
        y: { title: { formatter: () => 'Ticket ' } },
        marker: { show: false }
    },
    theme: { mode: 'light' }
};

export default chartOptions;
