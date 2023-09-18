import { fetchData } from "../api/index.js";
import { photographerTemplate } from "../templates/photographer.js";

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await fetchData();
  displayData(photographers);
}

init();

function DOM() {
  const logoBtn = document.querySelector(".logo");
  const linkBtn = document.querySelector(".link");
  logoBtn.addEventListener("click", () => {
    window.location.href = "/";
  });
  linkBtn.addEventListener("click", () => {
    window.location.href = "/photographer.html";
  });
}
DOM();
