const artDataState = [
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 500, is_published: true, img_url: "./images/listing-1.png", type: "sale", isSold: true, date_sold: new Date("2025-01-19") },
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 2", desc: "Lorem ipsum dolor sit amet.", price: 900, is_published: true, img_url: "./images/listing-1.png", type: "sale", isSold: true, date_sold: new Date("2025-01-19") },
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 3", desc: "Lorem ipsum dolor sit amet.", price: 1000, is_published: false, img_url: "./images/listing-1.png", type: "auction", isSold: false, date_sold: null },
    { artist: { id: 2, name: "Artist2" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 600, is_published: false, img_url: "./images/listing-2.png", type: "sale", isSold: true, date_sold: new Date("2025-01-19") },
    { artist: { id: 3, name: "Artist3" }, title: "Abstract painting 1", desc: "Dolorem autem voluptas.", price: 700, is_published: false, img_url: "./images/listing-1.png", type: "sale", isSold: false, date_sold: null },
    { artist: { id: 4, name: "Artist4" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 500, is_published: true, img_url: "./images/listing-1.png", type: "auction", isSold: true, date_sold: new Date("2025-01-20") },
];

let currentArtistId = 1; 
let currentArtistName = "Artist1"; 


document.getElementById('artist-name').textContent = currentArtistName;

function renderAuctionItems() {
    const container = document.getElementById('auction-container');
    container.innerHTML = '';

    const auctionItems = artDataState.filter(item => item.type === 'auction');

    auctionItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.img_url}" alt="${item.title}">
            <div class="info">
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </div>
            <div class="auction-controls">
                <input type="number" placeholder="Enter your bid" class="bid-input">
                <button class="bid-btn">Bid</button>
            </div>
        `;

        container.appendChild(card);

        initializeAuctionControls(card);
    });
}

function initializeAuctionControls(card) {
    const bidInput = card.querySelector('.bid-input');
    const bidBtn = card.querySelector('.bid-btn');

    bidBtn.addEventListener('click', () => {
        const bidValue = bidInput.value;
        if (bidValue) {
            alert(`You placed a bid of $${bidValue}`);
        } else {
            alert('Please enter a valid bid amount.');
        }
    });
}

document.addEventListener('DOMContentLoaded', renderAuctionItems);
