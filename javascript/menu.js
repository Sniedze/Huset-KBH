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
