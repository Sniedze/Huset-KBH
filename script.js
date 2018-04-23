"use strict"
const eventDB = "http://http://soperfect.dk/kea/07-cms/wp00/wp-json";
const musicEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/music_events";
const movieEvents = "http://soperfect.dk/kea/07-cms/wp00/wp-json/wp/v2/movies";

const main = document.querySelector("main");
const template = document.querySelector("template").content;
const nav = document.querySelector("#menu_nav");
const all = document.querySelector("#menu_nav a");
const modal = document.querySelector(".modal_background");
let h2 = document.querySelector("section h2");

all.addEventListener("click", () => filter("all"));
