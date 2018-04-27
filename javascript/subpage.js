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
    document.querySelector("#event-image").src = ev.acf.image.sizes.medium_large;
    document.querySelector("#each-event  h1").textContent = ev.title.rendered;
    document.querySelector("#genre").textContent = ev.acf.genre;
    document.querySelector("#date").textContent = day + "." + month + "." + year + ".";
    document.querySelector("#time").textContent = ev.acf.time;
    document.querySelector("#each-event  p").textContent = ev.content.rendered;
    document.querySelector("#video").textContent = ev.acf.video_embed;
    document.querySelector("#each-event #price span").textContent = "Price " + ev.acf.price + " DKK";
    document.querySelector("#venue").textContent = "Venue " + ev.acf.venue;
    document.querySelector("#fb-image").src = ev.acf.facebook_icon.sizes.thumbnail;
    document.querySelector("#twitter-image").src = ev.acf.twitter_icon.sizes.thumbnail;
}
