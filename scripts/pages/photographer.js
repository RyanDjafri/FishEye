import { fetchData } from "../api/index.js";
// j'importe ma fonction fetch
let cards = [];
// logo/link pour redirect vers la page d'accueil
const DOM = () => {
  const logo = document.querySelector(".logo");
  logo.addEventListener("click", () => {
    window.location.href = "/index.html";
  });
};
// je récupère ma data avec la fonction importer plus haut
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
        return null;
      }
    } else {
      console.error("PhotographerId not found in the URL.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching photographer data:", error);
    return null;
  }
};
// je display ma data de manière dynamique en fonction du photograph voulu retenu grace à son id dans le lien
const displayPhotograph = async () => {
  const data = await getData();
  const main = document.getElementById("main");
  if (data) {
    const photograph = data.photographer;
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
// je gere mes filtres en fonction des options proposées popularite, date, titre
const customSelect = document.querySelector(".custom-select");
const optionElements = document.querySelectorAll(".custom-select .option");
const selectedValueElement = document.querySelector(".selected-value");

let selectedOption = optionElements[0];

customSelect.addEventListener("click", function () {
  customSelect.classList.toggle("open");
});

optionElements.forEach((option) => {
  option.addEventListener("click", function () {
    if (!this.classList.contains("disabled")) {
      selectedOption.style.display = "block";
      this.style.display = "none";
      selectedValueElement.textContent = this.textContent;
      selectedOption = this;
      customSelect.classList.remove("open");
      const selectedValue = this.getAttribute("data-value");
      const cardsContainer = document.querySelector(".cards-container");
      cardsContainer.innerHTML = "";
      displayMedia(selectedValue);
    }
  });
});
// j'affiche tous mes medias en fonction du photograph voulu, je trie, je gere mes likes (total, par media)
const displayMedia = async (sortBy) => {
  const cardsContainer = document.querySelector(".cards-container");
  const data = await getData();
  const photographer = data.photographer;
  if (data) {
    const hisMedia = data.hisMedia;
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
      const likes = media.likes;
      if (media.image) {
        const picture = `assets/media/${media.image}`;
        mediaElement = `
          <div class="card-picture">
            <img src="${picture}" alt="${
          "picture of " + media.title
        }" class="media-picture"/>
          </div>
        `;
      } else if (media.video) {
        const videoSource = `./assets/media/${media.video}`;
        mediaElement = `
          <div class="card-picture" >
            <video class="video" alt="video" >
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
            <span class="card-s">${likes}<i class="fa-solid fa-heart"></i></span>
          </div>
        </div>
      `;
      if ((index + 1) % 3 === 0 || index === hisMedia.length - 1) {
        cardsContainer.innerHTML += `<div class="row">${rowHTML}</div>`;
        rowHTML = "";
      }
    });
    const hearts = document.querySelectorAll(".card-s");
    const likesContainer = document.querySelector(".likes");
    const totalLikes = hisMedia.reduce(
      (total, media) => total + media.likes,
      0
    );
    likesContainer.innerHTML = `
    <h2 class="likes">${totalLikes}</h2>
    <img src="../../assets/icons/like.svg" alt="like-icon" />
    `;
    Array.from(hearts).forEach((heart, index) => {
      let isLiked = false;

      heart.addEventListener("click", () => {
        if (isLiked) {
          let newLikes = (hisMedia[index].likes -= 1);
          heart.innerHTML = `${newLikes}<i class="fa-solid fa-heart"></i>`;
          isLiked = false;
        } else {
          let newLikes = (hisMedia[index].likes += 1);
          heart.innerHTML = `${newLikes}<i class="fa-solid fa-heart"></i>`;
          isLiked = true;
        }
        let totalLikes = hisMedia.reduce(
          (total, media) => total + media.likes,
          0
        );
        const likesContainer = document.querySelector(".likes");
        likesContainer.innerHTML = `
          <h2 class="likes">${totalLikes}</h2>
          <img src="../../assets/icons/like.svg" alt="like-icon" />
        `;
      });
    });

    const priceContainer = document.querySelector(".price");
    priceContainer.innerHTML = `
      <h2 class="price-p">${photographer.price}€/jour</h2>
    `;
    cards = document.querySelectorAll(".card");
    getSource();
  }
};

DOM();
displayMedia("popularite");
displayPhotograph();
// j'importe mes constantes pour le carousel,
const carouselModal = document.querySelector(".carousel");
const img = carouselModal.querySelector(".image-opened");
const video = carouselModal.querySelector("video");
const prev = document.querySelector(".previous");
const next = document.querySelector(".next");
const close = document.querySelector(".close");
let imageIndex = 0;
// je récupere la source de la photo sur laquelle j'ai cliqué
function getSource() {
  const cardsContainer = document.querySelector(".cards-container");
  const cards = cardsContainer.querySelectorAll(".card .card-picture");
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      carouselModal.showModal();
      imageIndex = index;
      updateMedia(cards);
    });
  });
}

const updateMedia = (cards) => {
  const card = cards[imageIndex];
  const cardPicture = card.querySelector(".card-picture img");
  const cardVideo = card.querySelector(".card-picture video source");

  if (cardPicture) {
    img.src = cardPicture.src;
    img.style.display = "inline";
    video.style.display = "none";
  } else if (cardVideo) {
    video.src = cardVideo.src;
    video.width = "850px";
    video.height = "650px";
    video.controls = true;
    video.load();
    video.play();
    img.style.display = "none";
    video.style.display = "inline";
  }
};
// flèche pour naviguer dans mes médias
prev.addEventListener("click", () => {
  if (imageIndex > 0) {
    imageIndex--;
  } else {
    imageIndex = cards.length - 1;
  }
  updateMedia(cards);
});

next.addEventListener("click", () => {
  if (imageIndex < cards.length - 1) {
    imageIndex++;
  } else {
    imageIndex = 0;
  }
  updateMedia(cards);
});

close.addEventListener("click", () => {
  carouselModal.close();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    prev.click();
  } else if (event.key === "ArrowRight") {
    next.click();
  }
});
