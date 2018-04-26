"use strict"

let musicEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/music_events?_embed";

let page = 1;
let lookingForData = false;
const musicContainer = document.querySelector("main");

const template = document.querySelector(".music-event").content;



function fetchEvents() {
    lookingForData = true;
    let urlParams = new URLSearchParams(window.location.search);
    let catid = urlParams.get("category");
    if (catid) {
        musicEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/music_events?_embed&per_page=10&page=" + page + "&categories=" + catid;

    }
    fetch(musicEvents)
        .then(e => e.json())
        .then(showMusicEvents);


}


function showMusicEvents(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleEvent);

}

function showSingleEvent(event) {
    let clone = template.cloneNode(true);
    clone.querySelector(".title").textContent = event.title.rendered;
    /*clone.querySelector(".description").innerHTML = event.content.rendered;*/
    clone.querySelector(".price span").textContent = event.acf.price;
    clone.querySelector(".genre").textContent = event.acf.genre;
    clone.querySelector(".date").textContent = event.acf.date;
    clone.querySelector(".time").textContent = event.acf.time;
    clone.querySelector(".venue").textContent = event.acf.venue;
    clone.querySelector(".image").src = event.acf.image.sizes.medium;
    clone.querySelector(".more-details").href = "subpage.html?id=" + event.id;
    musicContainer.appendChild(clone);
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
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible
}

///////////*Animations*////////////////////
fetch("http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/categories?_embed&per_page=50")
    .then(e => e.json())
    .then(buildMusicMenu)


function buildMusicMenu(data) {
    let parentElement = document.querySelector(".menu ul");
    data.forEach(item => {
        console.log(item);
        let li = document.createElement("li");
        let a = document.createElement("a");
        let categ = item.id;


        /* a.href = "index.html?category=" + item.id;*/

        if (item.name == "Cult" || item.name == "Documentary" || item.name == "Drama" || item.name == "Fun" || item.name == "Horror" || item.name == "Movies" || item.name == "Uncategorized" || item.name == "Music") {
            li.classList.add("hidden");
        } else {
            a.textContent = item.name;
            a.href = "music.html?category=" + item.id;
        }
        if (item.name == "Music Events") {
            a.textContent = "All Genres"

        }
        li.appendChild(a);
        parentElement.appendChild(li);

    })
};
