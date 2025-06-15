// Main JavaScript for Admin Dashboard

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Charts
    initCharts();
    
    // Toggle sidebar on mobile
    setupMobileMenu();
    
    // Setup notification and user profile dropdowns
    setupDropdowns();
});

// Initialize Charts using Chart.js
function initCharts() {
    // Sales Chart
    const salesChartCtx = document.getElementById('salesChart');
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
    const trafficChartCtx = document.getElementById('trafficChart');
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

// Setup mobile menu toggle
function setupMobileMenu() {
    // Add mobile menu toggle button
    const topNav = document.querySelector('.top-nav');
    if (topNav) {
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        topNav.prepend(mobileMenuBtn);
        
        // Add event listener to toggle sidebar
        mobileMenuBtn.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');
            
            if (sidebar.style.width === '260px') {
                sidebar.style.width = '0';
                sidebar.style.opacity = '0';
                mainContent.style.marginLeft = '0';
            } else {
                sidebar.style.width = '260px';
                sidebar.style.opacity = '1';
                mainContent.style.marginLeft = '260px';
            }
        });
    }
}

// Setup dropdown menus
function setupDropdowns() {
    // Add click event to notification icon
    const notification = document.querySelector('.notification');
    if (notification) {
        const notificationIcon = notification.querySelector('i');
        const dropdown = notification.querySelector('.notification-dropdown');
        
        notificationIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Sidebar profile dropdown functionality
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        const profileImg = userProfile.querySelector('img');
        const dropdown = userProfile.querySelector('.user-info-dropdown');
        
        profileImg.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            profileImg.classList.add('pulse');
            setTimeout(() => {
                profileImg.classList.remove('pulse');
            }, 500);
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        const dropdowns = document.querySelectorAll('.notification-dropdown, .user-info-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    });
}

// Add CSS class for active menu item based on current page
function setActiveMenuItem() {
    const currentPage = window.location.pathname;
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && currentPage.includes(link.getAttribute('href'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Call setActiveMenuItem when page loads
window.addEventListener('load', setActiveMenuItem);