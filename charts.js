// Charts initialization for Admin Dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Charts
    initCharts();
});

// Initialize Charts using Chart.js
function initCharts() {
    // Sales Chart
    const salesChartCtx = document.getElementById('sales-chart');
    if (salesChartCtx) {
        const salesChart = new Chart(salesChartCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Sales',
                    data: [12500, 19200, 15000, 24800, 18600, 22000, 26500],
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `$${context.raw.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Traffic Sources Chart
    const trafficChartCtx = document.getElementById('traffic-chart');
    if (trafficChartCtx) {
        const trafficChart = new Chart(trafficChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Social Media', 'Email', 'Referral', 'Organic Search'],
                datasets: [{
                    data: [30, 25, 15, 10, 20],
                    backgroundColor: [
                        '#4361ee',
                        '#4cc9f0',
                        '#f72585',
                        '#ff9f43',
                        '#3f37c9'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                cutout: '70%'
            }
        });
    }
}