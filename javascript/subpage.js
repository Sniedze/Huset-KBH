let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/music_events?_embed/" + id)
    .then(e => e.json())
    .then(showSingleEvent)


function showSingleEvent(event) {
    console.log(event);
    document.querySelector("#singleEvent h1").textContent = event.title.rendered;

}
