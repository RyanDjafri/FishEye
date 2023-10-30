// template pour la page principale récupérant la data puis à l'aide d'une template permet de l'afficher de la manière voulue

export function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    p2.classList.add("price");

    h2.innerHTML = `<a href="photographer.html?photographerId=${id}">${name}</a>`;

    h3.textContent = city + ", " + country;
    p.textContent = tagline;
    p2.textContent = price + "€/jour";

    img.setAttribute("src", picture);
    img.setAttribute("alt", `picture of ${name}`);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(p2);

    return article;
  }

  return { getUserCardDOM };
}
