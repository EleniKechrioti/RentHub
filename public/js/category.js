//import { User } from "./models/user.js"
const HOST_URL = "http://localhost:8080"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');
console.log(id);

var fetched_data;
var SUBCATEGORY_TEMPLATE;
var CATEGORY_CONTAINER;
var logged_in;

window.onload= function() {
    SUBCATEGORY_TEMPLATE = Handlebars.compile(document.getElementById("subcategory-template").innerHTML);
    CATEGORY_CONTAINER = document.getElementById("products-container");
    list_ads();

};


function renderCategories() {
    if (CATEGORY_CONTAINER) {
        const html = SUBCATEGORY_TEMPLATE(fetched_data);
        CATEGORY_CONTAINER.innerHTML = html;
        console.log(CATEGORY_CONTAINER.innerHTML);
    } else {
        console.error("Categories container not found.");
    }
}

function list_ads(){
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
        tmp.features = ads.features ? ads.features.split(';') : [];
        ads_arr.push(tmp);
    }
    ads["ads"] = ads_arr;
    return ads;
}


// -----------------------------------------------------------------

window.addEventListener('load', (event) => {
    const login_form = document.getElementById('loginForm');
    login_form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formData = new FormData(login_form);
        const username = formData.get('username');
        const password = formData.get('password');
        fetch('/login',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response =>response.json())
        .then(data =>{
            logged_in=data;
           
            data_logged = parseCreds(data);
            console.log(data_logged);

            console.log(data);
            if(data.status=="FAIL"||(username==""||password=="")){
                alert("Please check your username or password");
                
            }else{
                alert("Welcome"+"\n"+username);
            }
        }).catch(error =>{
            console.log("error on login",error);
            alert("Please signup");
        });
    })
});

function parseCreds(data){
    var creds = {};
    var creds_arr = []; 
    if(data.sessionId==undefined){return;}
    var tmp ={};
    tmp.id = data._id;
    tmp.sessionId = data.sessionId;
    tmp.username = data._doc.username;
    tmp.password = data._doc.password;
    tmp.favorites = data._doc.favorites;
    creds_arr.push(tmp);
    creds['creds'] = creds_arr;
    return creds;
}


function addToFavorites(index){
    if(!logged_in){
        alert("Παρακαλώ συνδεθείτε για προσθήκη στη λίστα αγαπημένων.");
        return;
    }
    let tmpToc = logged_in._doc;
    let toc = tmpToc;
    let tmp_product = fetched_data.ads[index];
    let product = JSON.parse(JSON.stringify(tmp_product));
    console.log(toc);
    
    let exists = false;

    let listings = toc.favorites;
    if (!listings) {
        listings = toc.favorites = [];
    }
    if (listings && listings.length) {
    for(let i = 0;i<listings.length;i++){
        if(listings[i].title===product.title){
            alert("Η αγγελία βρίσκεται ήδη στη λίστα αγαπημένων.");
            exists=true;
            break;
        }
    }}else{exists=false;}
    if(!exists){
        listings.push({
            id: product.id,
            description: product.description,
            title: product.title,
            cost: product.cost,
            image:product.firstimage
        });
        
    }
 
    fetch('/add_favorites',{
        method:'PATCH',
        body: JSON.stringify(toc),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response =>response.json())
    .then(data =>{
        logged_in =data;
    }).catch(error =>{
        console.log("error on login",error)
    });

}

function goToFavorites() {
    if(!logged_in){
        alert("Παρακαλώ συνδεθείτε για δείτε τη λίστα αγαπημένων.");
        return;
    }
    const encodedUsername = encodeURIComponent(logged_in._doc.username);
    const encodedSessionId = encodeURIComponent(logged_in.sessionId);

    window.location = `${HOST_URL}/favorites-ads.html?username=${encodedUsername}&sessionId=${encodedSessionId}`;
}