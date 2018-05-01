"use strict"

let page = 1;
let lookingForData = false;
const musicContainer = document.querySelector("main");
const template = document.querySelector("#music-event").content;
let urlParams = new URLSearchParams(window.location.search);
let name = urlParams.get("name");
if (name) {
    document.querySelector('h1').textContent = name;
}

function fetchEvents() {
    lookingForData = true;
    let catid = urlParams.get("category");
    let musicEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/music_events?_embed&order=desc&per_page=4&page=" + page;
    if (catid) {
        musicEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/music_events?_embed&order=desc&per_page=4&page=" + page + "&categories=" + catid;
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
    let year = event.acf.date.substring(0, 4);
    let month = event.acf.date.substring(4, 6);
    let day = event.acf.date.substring(6, 8);
    let totalPageNumber = event.count / 4
    console.log(event.count);
    clone.querySelector(".list").addEventListener("click", listClicked);

    function listClicked() {
        window.location.href = "subpage.html?id=" + event.id;
    }
    clone.querySelector(".title").textContent = event.title.rendered;
    clone.querySelector(".genre").textContent = event.acf.genre;
    clone.querySelector(".date").textContent = day + "." + month + "." + year + ".";
    clone.querySelector(".time").textContent = event.acf.time;
    clone.querySelector(".image").src = event.acf.image.sizes.medium_large;
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

/*setInterval(function () {

    if (bottomVisible() && lookingForData === false) {
        console.log("We've reached rock bottom, fetching articles")
        page++;
        document.querySelector(".music-footer img").addEventListener("click", fetchEvents);
    }
})*/

function bottomVisible() {
    const scrollY = window.scrollY
    const visible = document.documentElement.clientHeight
    const pageHeight = document.documentElement.scrollHeight
    const bottomOfPage = visible + scrollY + 20 >= pageHeight
    console.log(bottomOfPage)
    return bottomOfPage || pageHeight < visible


}

const footer = document.querySelector("footer");


fetch("http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/categories?_embed&per_page=50")
    .then(e => e.json())
    .then(buildMusicMenu)

function buildMusicMenu(data) {
    let parentElement = document.querySelector(".menu ul");
    data.forEach(item => {
        console.log(item.parent);
        let li = document.createElement("li");
        let a = document.createElement("a");
        if (item.count !== 0 && item.parent === 7) {
            a.textContent = item.name;
            a.href = "music.html?category=" + item.id + '&name=' + item.name;
        } else {
            li.classList.add("hidden");
        }
        if (item.name == "All Music Events") {
            a.textContent = "All Genres"
            a.href = "music.html?category=" + item.id;

            li.classList.remove("hidden")
        }
        if (item.name == "Pop") {
            li.classList.add("hidden");
        }
        li.appendChild(a);
        parentElement.appendChild(li);

    })
};
