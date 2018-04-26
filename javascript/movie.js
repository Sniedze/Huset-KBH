let movieEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/movies?_embed&order=asc";
let page = 1;
let lookingForData = false;
const movieContainer = document.querySelector(".movies");
const movieTemplate = document.querySelector(".movie-event").content;


function fetchEvents() {
    lookingForData = true;
    let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");
    if (catid) {
        movieEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/movies?_embed&order=asc&per_page=10&page=" + page + "&categories=" + catid;
    }

    fetch(movieEvents)
        .then(ev => ev.json())
        .then(showMovieEvents);

}



function showMovieEvents(movie) {
    console.log(movie)
    lookingForData = false;
    movie.forEach(showSingleMovieEvent);
}

function showSingleMovieEvent(movie) {
    let movieClone = movieTemplate.cloneNode(true);
    let year = movie.acf.date.substring(0, 4);
    let month = movie.acf.date.substring(4, 6);
    let day = movie.acf.date.substring(6, 8);
    movieClone.querySelector(".movie-title").textContent = movie.title.rendered;
    /*movieClone.querySelector(".description").innerHTML = event.content.rendered;*/
    movieClone.querySelector(".movie-price span").textContent = movie.acf.price;
    movieClone.querySelector(".movie-genre").textContent = movie.acf.genre;
    movieClone.querySelector(".movie-date").textContent = day + "." + month + "." + year + ".";
    movieClone.querySelector(".movie-time").textContent = movie.acf.time;
    movieClone.querySelector(".movie-venue").textContent = movie.acf.venue;
    movieClone.querySelector(".movie-image").src = movie.acf.image.sizes.medium;
    movieClone.querySelector(".movie-more-details").href = "subpage.html?id=" + movie.id;
    movieContainer.appendChild(movieClone);
}

fetchEvents();
setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("We've reached rock bottom, fetching articles")
        page++;
        fetchEvents();
    }
}, 1000)

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY + 20 >= pageHeight
    return bottomOfPage || pageHeight < visible
}

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
            anc.href = "movie.html?category=" + ite.id;
        } else {
            lis.classList.add("hidden");
        }
        if (ite.name == "Movies") {
            anc.textContent = "All Genres"
            anc.href = "movie.html?category=" + ite.id;
            lis.classList.remove("hidden")
        }
        lis.appendChild(anc);
        parentElem.appendChild(lis);


    })
};
