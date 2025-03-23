const artDataState = [
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 500, is_published: true, img_url: "./images/listing-1.png", type: "sale", isSold: true, date_sold: new Date("2025-01-19") },
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 2", desc: "Lorem ipsum dolor sit amet.", price: 900, is_published: true, img_url: "./images/listing-1.png", type: "sale", isSold: true, date_sold: new Date("2025-01-19") },
    { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 3", desc: "Lorem ipsum dolor sit amet.", price: 1000, is_published: false, img_url: "./images/listing-1.png", type: "auction", isSold: false, date_sold: null },
    { artist: { id: 2, name: "Artist2" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 600, is_published: false, img_url: "./images/listing-2.png", type: "sale", isSold: true, date_sold: new Date("2025-01-19") },
    { artist: { id: 3, name: "Artist3" }, title: "Abstract painting 1", desc: "Dolorem autem voluptas.", price: 700, is_published: false, img_url: "./images/listing-1.png", type: "sale", isSold: false, date_sold: null },
    { artist: { id: 4, name: "Artist4" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 500, is_published: true, img_url: "./images/listing-1.png", type: "auction", isSold: true, date_sold: new Date("2025-01-20") },
];

const currentArtistId = 1; // Simulate chosen artist ID
let currentArtistName = "Artist1"; // Simulate chosen artist name

// Initialize Artist Name
document.getElementById('artist-name').textContent = currentArtistName;


const itemTypes = ["sale", "auction"];
let editingItemId = null;

function renderItems() {
    const container = document.getElementById('items-container');
    container.innerHTML = '';

    const addCard = document.createElement('div');
    addCard.classList.add('add-card');
    addCard.textContent = '+ Add new Item';
    addCard.addEventListener('click', () => showForm());
    container.appendChild(addCard);

    const artistItems = artDataState.filter(item => item.artist.id === currentArtistId);
    artistItems.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.img_url}" alt="${item.title}">
            <div class="info">
                <div class="title-price">
                    <h3>${item.title}</h3>
                    <span class="price">$${item.price}</span>
                </div>
                <p>${item.desc}</p>
            </div>
            <div class="controls">
                <button class="send-to-auction-btn">Send to Auction</button>
                <button class="${item.is_published ? 'unpublish-btn' : 'publish-btn'}">
                    ${item.is_published ? 'Unpublish' : 'Publish'}
                </button>
                <button class="remove-btn">Remove</button>
                <button class="edit-btn">Edit</button>
            </div>
        `;

        card.querySelector('.edit-btn').addEventListener('click', () => showForm(item));
        card.querySelector('.remove-btn').addEventListener('click', () => removeItem(item.id));
        card.querySelector('.send-to-auction-btn').addEventListener('click', () => sendToAuction(item.id));
        card.querySelector('.publish-btn, .unpublish-btn').addEventListener('click', () => togglePublish(item.id));
        container.appendChild(card);
    });
}

function showForm(item = null) {
    editingItemId = item ? item.id : null;

    const formContainer = document.getElementById('form-container');
    const itemsContainer = document.getElementById('items-container');

    formContainer.style.display = 'block';
    itemsContainer.style.display = 'none';

    document.getElementById('form-title').textContent = item ? "Edit Item" : "Add New Item";
    document.getElementById('item-title').value = item ? item.title : '';
    document.getElementById('item-desc').value = item ? item.desc : '';
    document.getElementById('item-type').value = item ? item.type : itemTypes[0];
    document.getElementById('item-price').value = item ? item.price : '';
    document.getElementById('item-img-url').value = item ? item.img_url : '';
    document.getElementById('item-published').checked = item ? item.is_published : true;
}

function hideForm() {
    const formContainer = document.getElementById('form-container');
    const itemsContainer = document.getElementById('items-container');

    formContainer.style.display = 'none';
    itemsContainer.style.display = 'block';
}

function saveForm() {
    const title = document.getElementById('item-title').value;
    const desc = document.getElementById('item-desc').value;
    const type = document.getElementById('item-type').value;
    const price = parseFloat(document.getElementById('item-price').value);
    const imgUrl = document.getElementById('item-img-url').value;
    const isPublished = document.getElementById('item-published').checked;

    if (!title || !type || !price || !imgUrl) {
        alert("All required fields must be filled out!");
        return;
    }

    const itemData = {
        title,
        desc,
        type,
        price,
        img_url: imgUrl,
        is_published: isPublished,
        dateCreated: editingItemId ? artDataState.find(item => item.id === editingItemId).dateCreated : new Date(),
        artist: { id: currentArtistId, name: "Artist1" },
    };

    if (editingItemId !== null) {
        const itemIndex = artDataState.findIndex(item => item.id === editingItemId);
        if (itemIndex !== -1) {
            artDataState[itemIndex] = { ...artDataState[itemIndex], ...itemData };
        }
        editingItemId = null;
    } else {
        itemData.id = artDataState.length + 1;
        artDataState.push(itemData);
    }

    hideForm();
    renderItems();
}

function removeItem(itemId) {
    const itemIndex = artDataState.findIndex(item => item.id === itemId);
    if (itemIndex !== -1 && confirm('Are you sure you want to remove this item?')) {
        artDataState.splice(itemIndex, 1);
        renderItems();
    }
}

function sendToAuction(itemId) {
    const item = artDataState.find(item => item.id === itemId);
    if (item && item.type === "sale") {
        item.type = "auction";
        alert(`${item.title} has been sent to auction!`);
        renderItems();
    } else {
        alert(`${item.title} is already in auction or not eligible.`);
    }
}

function togglePublish(itemId) {
    const item = artDataState.find(item => item.id === itemId);
    if (item) {
        item.is_published = !item.is_published;
        renderItems();
    }
}

document.getElementById('save-item-btn').addEventListener('click', saveForm);
document.getElementById('cancel-item-btn').addEventListener('click', hideForm);

renderItems();

let cameraStream = null;

function openCamera() {
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-view');
    if (!modal || !video) return;

    modal.style.display = 'flex';
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            cameraStream = stream;
            video.srcObject = stream;
        })
        .catch(() => {
            alert('Unable to access the camera.');
            closeCamera();
        });
}

function captureSnapshot() {
    const video = document.getElementById('camera-view');
    const imgUrlField = document.getElementById('item-img-url');
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL('image/png');
    if (imgUrlField) imgUrlField.value = imageUrl;

    closeCamera();
}

function closeCamera() {
    const modal = document.getElementById('camera-modal');
    if (!modal) return;

    modal.style.display = 'none';
    if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach((track) => track.stop());
        cameraStream = null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const snapshotButton = document.querySelector('.snapshot-section');
    const closeButton = document.getElementById('close-camera-btn');
    const captureButton = document.getElementById('capture-btn');

    if (snapshotButton) snapshotButton.addEventListener('click', openCamera);
    if (closeButton) closeButton.addEventListener('click', closeCamera);
    if (captureButton) captureButton.addEventListener('click', captureSnapshot);
});



