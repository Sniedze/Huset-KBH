"use strict"
let page = 1;
let moviePages = 0;
const footerButton = document.querySelector(".footer-image");
let lookingForData = false;
const movieContainer = document.querySelector(".movies");
const movieTemplate = document.querySelector("#movie-event").content;
let urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get("name");
if (name) {
    document.querySelector("#movie-heading").textContent = name;

}

function fetchEvents() {
    lookingForData = true;

    let catid = urlParams.get("category");
    let movieEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/movies?_embed&order=asc&per_page=2&page=" + page;
    if (catid) {
        movieEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/movies?_embed&order=asc&per_page=2&page=" + page + "&categories=" + catid;
    }

    fetch(movieEvents)
        .then(e => {
            moviePages = e.headers.get("X-WP-TotalPages")
            return e.json()
        })
        .then(showMovieEvents);

}

/*Event Listener for adding more posts on click.*/

footerButton.addEventListener("click", function () {
    page++;

    if (page <= moviePages) {
        fetchEvents();
    } else {
        footerButton.classList.add("hidden");
    }
})

function showMovieEvents(movie) {
    movie.forEach(showSingleMovieEvent);
    if (page < moviePages) {
        footerButton.classList.remove("hidden");

    }
}

function showSingleMovieEvent(movie) {

    let movieClone = movieTemplate.cloneNode(true);
    let year = movie.acf.date.substring(0, 4);
    let month = movie.acf.date.substring(4, 6);
    let day = movie.acf.date.substring(6, 8);
    movieClone.querySelector(".movie-list").addEventListener("click", listClicked);

    function listClicked() {
        window.location.href = "subpage.html?id=" + movie.id;
    }
    movieClone.querySelector(".movie-title").textContent = movie.title.rendered;
    movieClone.querySelector(".movie-genre").textContent = movie.acf.genre;
    movieClone.querySelector(".movie-date").textContent = day + "." + month + "." + year + ".";
    movieClone.querySelector(".movie-time").textContent = movie.acf.time;
    movieClone.querySelector(".movie-image").src = movie.acf.image.sizes.medium;
    movieClone.querySelector(".movie-more-details").href = "subpage.html?id=" + movie.id;
    movieContainer.appendChild(movieClone);
}

fetchEvents();

///////////*Build Filter Menu*////////////////////



fetch("http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/categories?_embed&per_page=50")
    .then(ev => ev.json())
    .then(buildMovieMenu)

function buildMovieMenu(movie) {
    let parentElem = document.querySelector(".movie-menu ul");
    movie.forEach(ite => {
        console.log(ite);
        let lis = document.createElement("li");
        let anc = document.createElement("a");
        let catego = ite.id;

        if (ite.count !== 0 && ite.parent === 41) {
            anc.textContent = ite.name;
            anc.href = "movie.html?category=" + ite.id + '&name=' + ite.name;;
        } else {
            lis.classList.add("hidden");
        }
        document.querySelector(".movie-menu a").href = "movie.html";
        lis.appendChild(anc);
        parentElem.appendChild(lis);


    })
};
