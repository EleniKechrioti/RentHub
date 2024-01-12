
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('sessionId');
let username = urlParams.get('username');

var fetched_data;
var FAVORITES_TEMPLATE;
var CATEGORY_CONTAINER;
var logged_in;

window.onload= function() {
    FAVORITES_TEMPLATE = Handlebars.compile(document.getElementById("favorites-template").innerHTML);
    CATEGORY_CONTAINER = document.getElementById("products-container");
    console.log(id);
    console.log(username);
    cartItems();
};

function renderCategories() {
    if (CATEGORY_CONTAINER) {
        const html = FAVORITES_TEMPLATE(fetched_data);
        CATEGORY_CONTAINER.innerHTML = html;
        console.log(CATEGORY_CONTAINER.innerHTML);
    } else {
        console.error("Categories container not found.");
    }
}

function cartItems(){
    fetch('/favorites_list',{
        method:'POST',
        body:JSON.stringify({username,id}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data=>{
        fetched_data = parseItems(data);
        renderCategories();
        logged_in = data;
    })
    .catch(error =>{
        console.log(error);
    })

}
function parseItems(data){
    var items = {};
    var items_arr = [];
    for(let item of data){
        var tmp = {};
        tmp.title = item.title;
        tmp.cost = item.cost;
        tmp.description = item.description;
        tmp.image = item.image;
        tmp.id = id;
        items_arr.push(tmp);
    }
    items['items'] = items_arr;
    return items;
}