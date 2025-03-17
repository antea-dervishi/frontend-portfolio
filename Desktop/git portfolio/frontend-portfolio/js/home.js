const artDataState = [
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 1", priceSold: 500, is_published: true, date_sold: new Date("2025-01-15") },
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 2", priceSold: 900, is_published: true, date_sold: new Date("2025-01-13") },
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 3", priceSold: 1200, is_published: true, date_sold: null },
    { artist: { id: 2, name: "Artist2" }, title: "Painting 1", priceSold: 600, is_published: true, date_sold: new Date("2025-01-12") },
];

let currentArtistId = 1;
let currentArtistName = "Artist1";

document.getElementById('artist-name').textContent = currentArtistName;

function updateWidgets() {
    const artistItems = artDataState.filter(item => item.artist.id === currentArtistId);

    const totalSold = artistItems.filter(item => item.date_sold).length;
    const totalPublished = artistItems.filter(item => item.is_published).length;
    document.getElementById('total-items-sold').textContent = `${totalSold}/${totalPublished}`;

    const totalIncome = artistItems.reduce((sum, item) => sum + (item.date_sold ? item.priceSold : 0), 0);
    document.getElementById('total-income').textContent = `$${totalIncome}`;

    const liveAuction = artistItems.find(item => !item.date_sold && item.is_published);
    document.getElementById('live-auction').textContent = liveAuction ? `$${liveAuction.priceSold}` : "$0";
}

function calculateIncome(days) {
    const now = new Date();
    const artistItems = artDataState.filter(item => item.artist.id === currentArtistId && item.date_sold);

    const filteredItems = artistItems.filter(item => {
        const daysDifference = Math.ceil((now - item.date_sold) / (1000 * 60 * 60 * 24));
        return daysDifference <= days;
    });

    const incomeByDate = {};
    filteredItems.forEach(item => {
        const dateKey = item.date_sold.toISOString().split("T")[0];
        incomeByDate[dateKey] = (incomeByDate[dateKey] || 0) + item.priceSold;
    });

    return incomeByDate;
}

function renderChart(days) {
    const incomeData = calculateIncome(days);

    const labels = Object.keys(incomeData);
    const data = Object.values(incomeData);

    const ctx = document.getElementById('income-chart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Income',
                    data,
                    backgroundColor: '#a16a5e',
                    borderColor: '#a16a5e',
                    borderWidth: 1,
                    borderRadius: 10,
                    barThickness: 20, // Adjust bar width
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false, // Hide legend to match the design
                },
                tooltip: {
                    backgroundColor: '#fcebd5',
                    titleColor: '#a16a5e',
                    bodyColor: '#a16a5e',
                    borderColor: '#a16a5e',
                    borderWidth: 1,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: '#4d4d4d',
                        font: {
                            size: 12,
                            family: 'Arial, sans-serif',
                        },
                    },
                },
                y: {
                    grid: {
                        color: '#dcdcdc',
                        lineWidth: 1,
                    },
                    ticks: {
                        color: '#4d4d4d',
                        font: {
                            size: 12,
                            family: 'Arial, sans-serif',
                        },
                        beginAtZero: true,
                    },
                },
            },
        },
    });
}


updateWidgets();
renderChart(7);
