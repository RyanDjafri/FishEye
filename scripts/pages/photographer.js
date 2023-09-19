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
    main.innerHTML = `
  <div class="photograph-header">
    <div class="photograph-info">
        <h1 class="photograph-name">${photograph.name}</h1>
        <h4 class="photograph-location">${
          photograph.city + ", " + photograph.country
        }</h4>
        <p class="photograph-tagline">${photograph.tagline}</p>
    </div>
    <div class="photograph-contact">
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    </div>
    <div class="photograph-pic">
        <img src="${picture}" alt="photograph-pic" class="photograph-picture" />
    </div>
      </div>
  
  `;
  }
};

const displayMedia = async () => {
  const cardsContainer = document.querySelector(".cards-container");
  const data = await getData();
  if (data) {
    const hisMedia = data.hisMedia;
    let rowHTML = "";
    hisMedia.forEach((media, index) => {
      const picture = `./assets/media/${media.image}`;
      rowHTML += `
          <div class="card">
            <div class="card-picture">
              <img src="${picture}" alt="" class="media-picture"/>
            </div>
          </div>
        `;

      // Check if we've added 3 pictures to the current row or if it's the last item
      if ((index + 1) % 3 === 0 || index === hisMedia.length - 1) {
        // Wrap the row in a container and append it to cardsContainer
        cardsContainer.innerHTML += `<div class="row">${rowHTML}</div>`;
        rowHTML = ""; // Reset the rowHTML for the next row
      }
    });
  }
};

displayMedia();
displayPhotograph();
DOM();
