// Projecting AI Task Completion to 2030 - Chart.js
// CANVAS_HEIGHT: 760
// Data: METR-Horizon-v1.1 (Time Horizon 1.1 task suite), retrieved 2026-10-19 from
//   https://metr.org/assets/benchmark_results_1_1.yaml  (page: https://metr.org/time-horizons)
// All horizons are in MINUTES (the p50_horizon_length / p80_horizon_length estimates in that file).
// "Frontier" = METR's is_sota flag: the best model measured at the time of its release.
// Measurements above 16 hours (960 minutes) are flagged by METR as unreliable with its current task suite.
const modelData = {
    frontier: [
        { name: 'Claude Mythos Preview (early)', horizon50: 1044.780, horizon80: 185.912, date: '2026-04-07' },
        { name: 'Claude Opus 4.6', horizon50: 718.807, horizon80: 69.875, date: '2026-02-05' },
        { name: 'GPT-5.2', horizon50: 352.249, horizon80: 66.003, date: '2025-12-11' },
        { name: 'Claude Opus 4.5', horizon50: 292.995, horizon80: 49.431, date: '2025-11-24' },
        { name: 'Gemini 3 Pro', horizon50: 224.326, horizon80: 54.143, date: '2025-11-18' },
        { name: 'GPT-5', horizon50: 203.013, horizon80: 38.312, date: '2025-08-07' },
        { name: 'o3', horizon50: 119.733, horizon80: 29.982, date: '2025-04-16' },
        { name: 'Claude 3.7 Sonnet', horizon50: 60.389, horizon80: 12.092, date: '2025-02-24' },
        { name: 'o1', horizon50: 38.832, horizon80: 7.090, date: '2024-12-05' },
        { name: 'Claude 3.5 Sonnet (Oct 2024)', horizon50: 20.523, horizon80: 2.596, date: '2024-10-22' },
        { name: 'o1-preview', horizon50: 20.327, horizon80: 4.421, date: '2024-09-12' },
        { name: 'Claude 3.5 Sonnet', horizon50: 11.395, horizon80: 1.672, date: '2024-06-20' },
        { name: 'GPT-4o', horizon50: 6.991, horizon80: 1.267, date: '2024-05-13' },
        { name: 'GPT-4 1106', horizon50: 4.045, horizon80: 0.783, date: '2023-11-06' },
        { name: 'GPT-4', horizon50: 3.987, horizon80: 0.890, date: '2023-03-14' },
        { name: 'GPT-3.5 Turbo Instruct', horizon50: 0.599, horizon80: 0.255, date: '2022-03-15' },
        { name: 'davinci-002', horizon50: 0.144, horizon80: 0.056, date: '2020-05-28' },
        { name: 'GPT-2', horizon50: 0.054, horizon80: 0.013, date: '2019-02-14' }
    ],
    nonFrontier: [
        { name: 'GPT-5.4', horizon50: 341.735, horizon80: 53.878, date: '2026-03-05' },
        { name: 'Gemini 3.1 Pro', horizon50: 384.147, horizon80: 89.802, date: '2026-02-19' },
        { name: 'GPT-5.3-Codex', horizon50: 349.531, horizon80: 54.739, date: '2026-02-05' },
        { name: 'GPT-5.1-Codex-Max', horizon50: 223.715, horizon80: 50.632, date: '2025-11-19' },
        { name: 'Claude 4.1 Opus', horizon50: 100.472, horizon80: 23.456, date: '2025-08-05' },
        { name: 'Claude 4 Opus', horizon50: 100.366, horizon80: 20.430, date: '2025-05-22' },
        { name: 'GPT-4 Turbo', horizon50: 3.733, horizon80: 0.928, date: '2024-04-09' },
        { name: 'Claude 3 Opus', horizon50: 3.952, horizon80: 0.639, date: '2024-03-04' }
    ]
};

// Doubling times from the same METR file (doubling_time_in_days), converted to months below.
// "all" fits every point from 2019; "recent" fits only models from 2023 on. Both exclude p50 > 16 hrs.
const DAYS_PER_MONTH = 30.44;
const doublingOptions = {
    all:    { days: 187.778, label: 'all-time' },
    recent: { days: 128.744, label: 'since 2023' }
};
const RELIABLE_LIMIT_MIN = 16 * 60;   // METR: measurements above 16 hrs are unreliable
const TREND_REFERENCE = 'Claude Opus 4.6';   // newest model whose 50% horizon is below the 16-hr limit
const TREND_START = '2019-01-01';
const TREND_END = '2030-12-31';

let currentScale = 'logarithmic';
let currentProbability = '50';
let currentDoubling = 'all';
let showTrendline = true;
let chart;

function doublingMonths(key) {
    return doublingOptions[key].days / DAYS_PER_MONTH;
}

function trendLabel() {
    const o = doublingOptions[currentDoubling];
    return `Exponential Trend (${doublingMonths(currentDoubling).toFixed(1)}-month doubling, ${o.label})`;
}

// Exponential trend anchored on the newest model METR measured below its 16-hour reliability limit
function calculateTrendLine() {
    const horizonKey = currentProbability === '50' ? 'horizon50' : 'horizon80';
    const doublingTimeDays = doublingOptions[currentDoubling].days;

    const referenceModel = modelData.frontier.find(m => m.name === TREND_REFERENCE);
    const referenceDate = new Date(referenceModel.date);
    const referenceValue = referenceModel[horizonKey];

    // Generate points at 3-month intervals
    const trendPoints = [];
    const endDate = new Date(TREND_END);
    for (let date = new Date(TREND_START); date <= endDate; date.setMonth(date.getMonth() + 3)) {
        const daysDiff = (date - referenceDate) / (1000 * 60 * 60 * 24);
        const projectedValue = referenceValue * Math.pow(2, daysDiff / doublingTimeDays);
        trendPoints.push({ x: date.getTime(), y: projectedValue });
    }

    return trendPoints;
}

function prepareChartData() {
    const horizonKey = currentProbability === '50' ? 'horizon50' : 'horizon80';

    // Combine all models
    const allModels = [
        ...modelData.frontier.map(m => ({ ...m, type: 'frontier' })),
        ...modelData.nonFrontier.map(m => ({ ...m, type: 'nonFrontier' }))
    ];

    // Create datasets
    const frontierPoints = [];
    const nonFrontierPoints = [];

    allModels.forEach((model) => {
        const point = {
            x: new Date(model.date).getTime(),
            y: model[horizonKey],
            label: model.name,
            date: model.date
        };

        if (model.type === 'frontier') {
            frontierPoints.push(point);
        } else {
            nonFrontierPoints.push(point);
        }
    });

    const datasets = [
        {
            label: 'Frontier Models',
            data: frontierPoints,
            backgroundColor: 'rgba(39, 174, 96, 0.8)',
            borderColor: 'rgba(39, 174, 96, 1)',
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 10,
            showLine: false
        },
        {
            label: 'Non-Frontier Models',
            data: nonFrontierPoints,
            backgroundColor: 'rgba(149, 165, 166, 0.8)',
            borderColor: 'rgba(149, 165, 166, 1)',
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 10,
            showLine: false
        }
    ];

    // Add trend line if enabled
    if (showTrendline) {
        datasets.push({
            label: trendLabel(),
            data: calculateTrendLine(),
            borderColor: 'rgba(52, 152, 219, 0.6)',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            borderDash: [10, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
            showLine: true,
            fill: false,
            tension: 0.4
        });
    }

    return { datasets };
}

// Format a duration given in minutes as seconds, minutes, hours, or days
function formatDuration(minutes) {
    if (minutes < 1) return (minutes * 60).toFixed(0) + ' sec';
    if (minutes < 60) return minutes.toFixed(minutes < 10 ? 1 : 0) + ' min';
    if (minutes < 1440) return (minutes / 60).toFixed(1) + ' hrs';
    return (minutes / 1440).toFixed(1) + ' days';
}

function createChart() {
    const ctx = document.getElementById('taskChart').getContext('2d');
    const chartData = prepareChartData();

    chart = new Chart(ctx, {
        type: 'scatter',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label || 'Trend Line';
                        },
                        label: function(context) {
                            const minutes = context.parsed.y;
                            if (!context.raw.label) {
                                // Trend line point
                                const date = new Date(context.parsed.x);
                                return [
                                    `Date: ${date.toLocaleDateString()}`,
                                    `Projected: ${formatDuration(minutes)} (${minutes.toFixed(0)} min)`
                                ];
                            }

                            const lines = [
                                `${currentProbability}% Success Horizon: ${formatDuration(minutes)}`,
                                `= ${minutes.toFixed(1)} minutes`,
                                `Release: ${context.raw.date}`
                            ];
                            if (minutes > RELIABLE_LIMIT_MIN) {
                                lines.push('METR: measurements above 16 hrs are unreliable');
                            }
                            return lines;
                        }
                    }
                },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'year',
                        displayFormats: {
                            year: 'yyyy'
                        },
                        tooltipFormat: 'MMM yyyy'
                    },
                    title: {
                        display: true,
                        text: 'Year',
                        font: { size: 14, weight: 'bold' }
                    },
                    min: new Date(TREND_START).getTime(),
                    max: new Date(TREND_END).getTime(),
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    type: currentScale,
                    title: {
                        display: true,
                        text: 'Task Completion Time Horizon',
                        font: { size: 14, weight: 'bold' }
                    },
                    min: currentScale === 'logarithmic' ? 0.01 : 0,
                    ticks: {
                        callback: function(value) {
                            return formatDuration(value);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function setScale(scale) {
    currentScale = scale;

    // Update button states
    document.getElementById('btnLinear').classList.toggle('active', scale === 'linear');
    document.getElementById('btnLog').classList.toggle('active', scale === 'logarithmic');

    // Update chart
    chart.options.scales.y.type = scale;
    chart.options.scales.y.min = scale === 'logarithmic' ? 0.01 : 0;
    chart.update();
}

function setProbability(probability) {
    currentProbability = probability;

    // Update button states
    document.getElementById('btn50').classList.toggle('active', probability === '50');
    document.getElementById('btn80').classList.toggle('active', probability === '80');

    // Update chart data
    chart.data = prepareChartData();
    chart.update();
}

function setDoubling(key) {
    currentDoubling = key;

    // Update button states
    document.getElementById('btnDoubleAll').classList.toggle('active', key === 'all');
    document.getElementById('btnDoubleRecent').classList.toggle('active', key === 'recent');

    // Update chart data
    chart.data = prepareChartData();
    chart.update();
}

function toggleTrendline() {
    showTrendline = !showTrendline;

    // Update button state
    document.getElementById('btnTrend').classList.toggle('active', showTrendline);

    // Update chart data
    chart.data = prepareChartData();
    chart.update();
}

// Initialize chart on load
window.addEventListener('load', createChart);
