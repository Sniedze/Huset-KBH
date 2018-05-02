let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");

console.log("i want to get article: " + id);



fetch("http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/music_events/" + id)
    .then(e => e.json())
    .then(showOneEvent)



function showOneEvent(ev) {
    console.log(ev);
    let year = ev.acf.date.substring(0, 4);
    let month = ev.acf.date.substring(4, 6);
    let day = ev.acf.date.substring(6, 8);

    let parentElement = document.querySelector("#more-arrow");
    let arrowImage = document.createElement("img");
    let a = document.createElement("a");
    a.href = "music.html";
    arrowImage.src = "images/arrow-red.png";
    document.querySelector("#event-image").src = ev.acf.image.sizes.medium_large;
    document.querySelector("#each-event  h1").textContent = ev.title.rendered;
    document.querySelector("#genre").textContent = ev.acf.genre;
    document.querySelector("#date").textContent = day + "." + month + "." + year + ".";
    document.querySelector("#time").textContent = ev.acf.time;
    document.querySelector("#each-event  p").innerHTML = ev.content.rendered;
    document.querySelector("#video").textContent = ev.acf.video_embed;
    document.querySelector("#each-event #price span").textContent = "Price: " + ev.acf.price + " DKK";
    document.querySelector("#venue").textContent = "Venue: " + ev.acf.venue;

    a.appendChild(arrowImage);
    parentElement.appendChild(a);
}


fetch("http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/movies/" + id)
    .then(even => even.json())
    .then(showMovieEvent)


function showMovieEvent(eve) {
    console.log(eve);
    let year = eve.acf.date.substring(0, 4);
    let month = eve.acf.date.substring(4, 6);
    let day = eve.acf.date.substring(6, 8);

    let parentElement = document.querySelector("#movie-arrow");
    let arrowImage = document.createElement("img");
    let anc = document.createElement("a");
    anc.href = "movie.html";
    arrowImage.src = "images/arrow-red.png";
    document.querySelector("#event-image").src = eve.acf.image.sizes.medium_large;
    document.querySelector("#each-event  h1").textContent = eve.title.rendered;
    document.querySelector("#genre").textContent = eve.acf.genre;
    document.querySelector("#date").textContent = day + "." + month + "." + year + ".";
    document.querySelector("#time").textContent = eve.acf.time;
    document.querySelector("#each-event  p").innerHTML = eve.content.rendered;
    document.querySelector("#video").innerHTML = eve.acf.video_embed;
    document.querySelector("#each-event #price span").textContent = "Price " + eve.acf.price + " DKK";


    anc.appendChild(arrowImage);
    parentElement.appendChild(anc);
}
