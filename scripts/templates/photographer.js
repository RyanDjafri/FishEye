export function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    p2.classList.add("price");

    h2.innerHTML = `<a href="photographer.html?photographerId=${id}">${name}</a>`;

    h4.textContent = city + ", " + country;
    p.textContent = tagline;
    p2.textContent = price + "€/jour";

    img.setAttribute("src", picture);

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h4);
    article.appendChild(p);
    article.appendChild(p2);

    return article;
  }

  return { name, picture, getUserCardDOM, city, country, tagline, price };
}
