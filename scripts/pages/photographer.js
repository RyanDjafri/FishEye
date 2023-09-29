import { fetchData } from "../api/index.js";

const DOM = () => {
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    window.location.href = "/index.html";
  });
};

const getData = async () => {
  let currentURL = window.location.href;
  let url = new URL(currentURL);
  let photographerId = url.searchParams.get("photographerId");
  try {
    const photographersData = await fetchData();
    if (photographerId) {
      const photographer = photographersData.photographers.find(
        (p) => p.id === parseInt(photographerId, 10)
      );
      const hisMedia = photographersData.media.filter(
        (media) => media.photographerId === parseInt(photographerId, 10)
      );
      if (photographer) {
        return {
          photographer: photographer,
          hisMedia: hisMedia,
        };
      } else {
        console.error("Photographer not found for ID:", photographerId);
        return null; // Return null if photographer is not found
      }
    } else {
      console.error("PhotographerId not found in the URL.");
      return null; // Return null if photographerId is not found
    }
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return null; // Return null in case of an error
  }
};
const photographerImages = await getData();

const displayPhotograph = async () => {
  const data = await getData();
  const main = document.getElementById("main");
  if (data) {
    const photograph = data.photographer;
    console.log(photograph);
    const picture = `assets/photographers/${photograph.name.replace(
      /[\s-]+/g,
      ""
    )}.jpg`;
    const nameElement = document.querySelector(".photograph-name");
    nameElement.textContent = photograph.name;

    const taglineElement = document.querySelector(".photograph-tagline");
    taglineElement.textContent = photograph.tagline;

    const locationElement = document.querySelector(".photograph-location");
    locationElement.textContent = `${photograph.city}, ${photograph.country}`;

    const pictureElement = document.querySelector(".photograph-picture");
    pictureElement.src = picture;
    const modalElement = document.querySelector(".modal-name");
    modalElement.textContent = photograph.name;
  }
};

document.getElementById("sortBy").addEventListener("change", function () {
  const selectedValue = this.value;
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML = "";
  displayMedia(selectedValue);
});

const displayMedia = async (sortBy) => {
  const cardsContainer = document.querySelector(".cards-container");
  const data = await getData();
  if (data) {
    const hisMedia = data.hisMedia;
    console.log(hisMedia);
    const sortingFunction = (a, b) => {
      if (sortBy === "popularite") {
        return b.likes - a.likes;
      } else if (sortBy === "date") {
        return b.date.localeCompare(a.date);
      } else if (sortBy === "titre") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    };

    hisMedia.sort(sortingFunction);

    let rowHTML = "";
    hisMedia.forEach((media, index) => {
      let mediaElement;

      if (media.image) {
        const picture = `./assets/media/${media.image}`;
        mediaElement = `
            <div class="card-picture">
              <img src="${picture}" alt="${picture}" class="media-picture"/>
            </div>
          `;
      } else if (media.video) {
        const videoSource = `./assets/media/${media.video}`;
        mediaElement = `
            <div class="card-picture">
              <video class="video">
                <source src="${videoSource}" type="video/mp4">
              </video>
            </div>
          `;
      }
      rowHTML += `
          <div class="card">
            ${mediaElement}
            <div class="card-info">
              <p class="card-p">${media.title}</p>
              <span class="card-s">${media.likes}<i class="fa-solid fa-heart"></i></span>
            </div>
          </div>
        `;

      if ((index + 1) % 3 === 0 || index === hisMedia.length - 1) {
        cardsContainer.innerHTML += `<div class="row">${rowHTML}</div>`;
        rowHTML = "";
      }
    });
  }
};

const carouselModal = document.querySelector(".carousel");
const img = carouselModal.querySelector("img");
const displayCarousel = async () => {
  carouselModal.showModal();
  img.src = clickedSrc;
};

DOM();
displayMedia("popularite");
displayPhotograph();

let clickedSrc = "";
const postsContainer = document.querySelector(".cards-container");
postsContainer.addEventListener("click", (e) => {
  const clickedElement = e.target;
  const hasNotClickedAnImage = clickedElement.tagName !== "IMG";
  if (hasNotClickedAnImage) {
    return;
  }
  clickedSrc = clickedElement.src.split("5500/")[1];
  displayCarousel();
});
