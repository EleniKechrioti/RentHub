const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');
console.log(id);

window.onload = function() {
var fetched_data;
const SUBCATEGORY_TEMPLATE = Handlebars.compile(document.getElementById("subcategory-template").innerHTML);
const CATEGORY_CONTAINER = document.getElementById("products-container");

const html = SUBCATEGORY_TEMPLATE(fetched_data);
CATEGORY_CONTAINER.innerHTML = html;
console.log(CATEGORY_CONTAINER.innerHTML);

function renderCategories() {
    if (CATEGORY_CONTAINER) {
        const html = SUBCATEGORY_TEMPLATE(fetched_data);
        CATEGORY_CONTAINER.innerHTML = html;
        console.log(CATEGORY_CONTAINER.innerHTML);
    } else {
        console.error("Categories container not found.");
    }
}


function list_ads(filter){
    let url = "https://wiki-ads.onrender.com/ads?category="+id;
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
        renderCategories();

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
        tmp.image = ads.images;
        tmp.firstimage = "https://wiki-ads.onrender.com/"+ads.images[0];
        tmp.feautures = ads.feautures;
        ads_arr.push(tmp);
    }
    ads["ads"] = ads_arr;
    return ads;
}
list_ads();

};