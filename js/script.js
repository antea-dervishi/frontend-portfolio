
import { artists } from './artists.js';

document.addEventListener("DOMContentLoaded", () => {
    
    
    const artistSelect = document.getElementById("artistSelect");
    if (artistSelect) {
        artists.forEach(artist => {
            const option = document.createElement("option");
            option.value = artist.name;
            option.textContent = artist.name;
            artistSelect.appendChild(option);
        });
    }

    let artDataState = JSON.parse(localStorage.getItem("art_data"));
    if (!artDataState) {
        artDataState = [
            { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 500, is_published: true, img_url: "./images/listing-1.png" ,type:"sale", isSold:true, date_sold: new Date("2025-01-19")},
            { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 2", desc: "Lorem ipsum dolor sit amet.", price: 900, is_published: true, img_url: "./images/listing-1.png" ,type:"sale", isSold:true, date_sold: new Date("2025-01-19")},
            { artist: { id: 1, name: "Artist1" }, title: "Abstract painting 3", desc: "Lorem ipsum dolor sit amet.", price: 1000, is_published: false, img_url: "./images/listing-1.png" ,type:"auction", isSold:false, date_sold: null},
            { artist: { id: 2, name: "Artist2" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 600, is_published: false, img_url: "./images/listing-2.png" ,type:"sale",  isSold:true, date_sold: new Date("2025-01-19")},
            { artist: { id: 3, name: "Artist3" }, title: "Abstract painting 1", desc: "Dolorem autem voluptas.", price: 700, is_published: false, img_url: "./images/listing-1.png" , type:"sale", isSold:false, date_sold: null},
            { artist: { id: 4, name: "Artist4" }, title: "Abstract painting 1", desc: "Lorem ipsum dolor sit amet.", price: 500, is_published: true, img_url: "./images/listing-1.png",type:"auction",  isSold:true , date_sold: new Date("2025-01-20")},
        ];
        localStorage.setItem("art_data", JSON.stringify(artDataState));
    }

  
    let filteredItemsState = artDataState.filter(item => item.is_published);

   
    function showItems(items) {
        const itemList = document.querySelector(".item-list");
        if (!itemList) {
           
            return;
        }
        itemList.innerHTML = ""; 

        items.forEach((item, index) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card", index % 2 === 0 ? "even-card" : "odd-card");
            cardElement.innerHTML = 
               `<img src="${item.img_url}" alt="${item.title}" />
                <div>
                    <h1>${item.artist.name}</h1>
                    <span class="${index % 2 === 0 ? 'price-even' : 'price-odd'}">$${item.price}</span>
                </div>
                <h2>${item.title}</h2>
                <p>${item.desc}</p>`
            ;
            itemList.appendChild(cardElement);
        });
    }

   
    showItems(filteredItemsState);

    // Filter function
    function filterItems() {
        const titleInput = document.querySelector("#title").value.toLowerCase();
        const artistInput = document.querySelector("#artistSelect").value;
        const minPriceInput = parseFloat(document.querySelector("#minPrice").value);
        const maxPriceInput = parseFloat(document.querySelector("#maxPrice").value);
        const typeInput = document.querySelector("#typeSelect").value;

        filteredItemsState = artDataState.filter(item => {
            const matchesTitle = !titleInput || item.title.toLowerCase().includes(titleInput);
            const matchesArtist = !artistInput || item.artist.name === artistInput;
            const matchesPrice = (!minPriceInput || item.price >= minPriceInput) &&
                (!maxPriceInput || item.price <= maxPriceInput);
            const matchesType = !typeInput || item.type === typeInput;

            return matchesTitle && matchesArtist && matchesPrice && matchesType;
        });

        showItems(filteredItemsState);
    }

    const applyFilterBtn = document.querySelector("#applyFilter");
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener("click", () => {
            filterItems();
            document.querySelector(".filter-panel").classList.remove("open");
        });
    }

   
    const closeFilterBtn = document.querySelector("#closeFilter");
    if (closeFilterBtn) {
        closeFilterBtn.addEventListener("click", () => {
            document.querySelector(".filter-panel").classList.remove("open");
        });
    }

 
    const floatingFilterBtn = document.querySelector("#floatingFilterBtn");
    if (floatingFilterBtn) {
        floatingFilterBtn.addEventListener("click", () => {
            document.querySelector(".filter-panel").classList.add("open");
        });
    }
});



const floatingFilterBtn = document.getElementById('floatingFilterBtn');
const applyFilterBtn = document.getElementById('applyFilter');
const filterPanel = document.querySelector('.filter-panel');
const closeFilterBtn = document.getElementById('closeFilter');


// Function to open the filter panel and toggle button visibility
function openFilterPanel() {
    filterPanel.classList.add('open');
    floatingFilterBtn.style.display = 'none';
    applyFilterBtn.style.display = 'block';  
}


function closeFilterPanel() {
    filterPanel.classList.remove('open');
    floatingFilterBtn.style.display = 'block'; 
    applyFilterBtn.style.display = 'none';    
}


floatingFilterBtn.addEventListener('click', openFilterPanel); 
closeFilterBtn.addEventListener('click', closeFilterPanel);   
applyFilterBtn.addEventListener('click', closeFilterPanel);   

