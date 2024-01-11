
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');

//const next = document.querySelector(".next");
//const prev = document.querySelector(".prev");




console.log(id);

var fetched_data;
var AD_TEMPLATE;
var AD_CONTAINER;

window.onload= function() {
    AD_TEMPLATE = Handlebars.compile(document.getElementById("ad-template").innerHTML);
    AD_CONTAINER = document.getElementById("ads-container");

    list_ads();
};

function renderSubCategories() {
    if (AD_CONTAINER) {
        const html = AD_TEMPLATE(fetched_data);
        AD_CONTAINER.innerHTML = html;
        console.log(AD_CONTAINER.innerHTML);
    } else {
        console.error("Categories container not found.");
    }
}

function list_ads(){
    let url = "https://wiki-ads.onrender.com/ads?subcategory="+id;
    let headers = new Headers();
    let init = {
        method:'GET',
        headers:headers
    }
    fetch(url,init)
    .then(response => response.json())
    .then(data => {
        
        fetched_data = parseAds(data);
        outer = document.getElementById("ad_list");
        renderSubCategories();

    }).catch(error =>{
        console.log("error",error);
    });
}
function parseAds(data){
    var ads = {};
    var ads_arr = [];
    for(let ads of data){
        var tmp = {};
        tmp.id = ads.id;
        tmp.title = ads.title;
        tmp.subcategory_id = ads.subcategory_id;
        tmp.description = ads.description;
        tmp.cost = ads.cost;
        tmp.image = ads.images.map(image => "https://wiki-ads.onrender.com/" + image);
        tmp.firstimage = "https://wiki-ads.onrender.com/"+ads.images[0];
        tmp.features = ads.features ? ads.features.split(';') : [];
        ads_arr.push(tmp);
    }
    ads["ads"] = ads_arr;
    return ads;
}

Handlebars.registerHelper('addOne', function(index) {
    return index + 1;
});


function showSlide(n, element) {
    let slideNumber = n;
    let slides = element.parentElement.querySelectorAll(".slide");
    
    if (slideNumber > slides.length) { slideNumber = 1 }
    if (slideNumber < 1) { slideNumber = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideNumber - 1].style.display = "block";
}

function nextSlide(element) {
    let currentSlide = element.parentElement.querySelector(".slide[style='display: block;']");
    let currentSlideNumber = parseInt(currentSlide.querySelector("img").dataset.slideNumber);console.log("Current Slide Number:", currentSlideNumber);
    showSlide(currentSlideNumber + 1, element);
}

function prevSlide(element) {
    let currentSlide = element.parentElement.querySelector(".slide[style='display: block;']");
    let currentSlideNumber = parseInt(currentSlide.querySelector("img").dataset.slideNumber);console.log("Current Slide Number:", currentSlideNumber);
    showSlide(currentSlideNumber - 1, element);
}
