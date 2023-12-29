window.onload = function() {
    // This function will be called when the entire page has finished loading
    var fetched_data;
    const CATEGORY_TEMPLATE = Handlebars.compile(document.getElementById("categories-template").innerHTML);
    const CATEGORY_CONTAINER = document.getElementById("categories-container");

    function renderCategories() {
        if (CATEGORY_CONTAINER) {
            const html = CATEGORY_TEMPLATE(fetched_data);
            CATEGORY_CONTAINER.innerHTML = html;
            console.log(CATEGORY_CONTAINER.innerHTML);
        } else {
            console.error("Categories container not found.");
        }
    }

    function list_categories() {
        let url = "https://wiki-ads.onrender.com/categories";
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let init = {
            method: 'GET',
            headers: headers
        };
        fetch(url, init)
            .then(response => response.json())
            .then(data => {
                fetched_data = parseData(data);
                renderCategories();
            });
    }

    function parseData(data) {
        var categories_arr = data.map(category => ({
            id: category.id,
            title: category.title,
            img_url: ("https://wiki-ads.onrender.com/" + category.img_url)
        }));

        return { categories: categories_arr };
    }

    list_categories();
};