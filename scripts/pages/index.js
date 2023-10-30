import { fetchData } from "../api/index.js";
import { photographerTemplate } from "../templates/photographer.js";
// j'importe ma fonction fetch ainsi que ma template puis je l'implémante dans mon DOM
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await fetchData();
  displayData(photographers);
}

init();
