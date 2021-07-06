const auth = "563492ad6f917000010000018fbc5dc5e8514391b1ef8f02667729f6";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const moreButton = document.querySelector(".more-btn");
let searchValue;

let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

moreButton.addEventListener("click", loadMorePhotos);

function updateInput(e) {
  searchValue = e.target.value;
}

function createGallery(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src="${photo.src.large}" alt=""/>
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href="${photo.src.original}">Download</a>
        </div>
        
        `;
    gallery.appendChild(galleryImg);
  });
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "Get",
    headers: {
      accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  return data;
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";

  const data = await fetchApi(fetchLink);
  createGallery(data);
}

async function searchPhotos(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  clear();
  const data = await fetchApi(fetchLink);
  createGallery(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMorePhotos() {
  page++;

  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }

  const data = await fetchApi(fetchLink);
  createGallery(data);
}

curatedPhotos();
