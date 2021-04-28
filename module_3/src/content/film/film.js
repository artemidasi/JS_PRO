import {
    contentUpload,
    API_laodFilm
} from "../../api/api.js"

// Подпись на кнопе вернуться назад
const BACK__CONTENT = "Back to episodes";
// Подпись загловка
const PLANET__TITLE = "Planets";
const SPECIES__TITLE = "Species";

export const createPageWithMovie = async(number, container) => {
    const infoFilm = await API_laodFilm(number);
    const buttonBack = document.createElement("button");
    buttonBack.classList.add("btn");
    buttonBack.classList.add("btn-secondary");
    buttonBack.innerHTML = BACK__CONTENT;

    function handleBack(ev) {
        ev.preventDefault();
        container.innerHTML = "";
        history.back();
    }
    buttonBack.addEventListener('click', handleBack);
    container.append(buttonBack);
    // Секция с информацией
    const card = document.createElement("div");
    card.classList.add("card");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = infoFilm.title;
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerHTML = infoFilm.opening_crawl;
    const planetTitle = document.createElement("h2");
    planetTitle.classList.add("planet-title");
    planetTitle.innerHTML = PLANET__TITLE;
    const planetList = document.createElement("ol");
    planetList.classList.add("planet-list");
    // Добавляем планеты
    for (let url of infoFilm.planets) {
        const planetInfo = await contentUpload(url);
        const planetItem = document.createElement("li");
        planetItem.classList.add("planet-item");
        planetItem.innerHTML = planetInfo.name;
        planetList.append(planetItem);
    }
    const speciesTitle = document.createElement("h2");
    speciesTitle.classList.add("species-title");
    speciesTitle.innerHTML = SPECIES__TITLE;
    const speciesList = document.createElement("ol");
    speciesList.classList.add("species-list");
    for (let url of infoFilm.species) {
        const spaciestInfo = await contentUpload(url);
        const spaciesItem = document.createElement("li");
        spaciesItem.classList.add("species-item");
        spaciesItem.innerHTML = spaciestInfo.name;
        speciesList.append(spaciesItem);
    }
    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(planetTitle);
    cardBody.append(planetList);
    cardBody.append(speciesTitle);
    cardBody.append(speciesList);
    card.append(cardBody);
    container.append(card);
}

// {
//     /* <div class="card" style="width: 18rem;">
//       <img src="..." class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//     </div> */
// }