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
                list_subcategories();
            });
    }

    function list_subcategories() {
        let subcategoriesUrl = "https://wiki-ads.onrender.com/subcategories";
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        let init = {
            method: 'GET',
            headers: headers
        };
        fetch(subcategoriesUrl, init)
            .then(response => response.json())
            .then(subcategoriesData => {
                // Map subcategories to their respective categories
                fetched_data.categories.forEach(category => {
                    category.subcategories = getSubcategoriesForCategory(subcategoriesData, category.id);
                });
    
                // Render categories and subcategories
                renderCategories();
            });
    }

    function getSubcategoriesForCategory(subcategoriesData, categoryId) {
        return subcategoriesData
            .filter(subcategory => subcategory.category_id === categoryId)
            .map(subcategory => ({
                id: subcategory.id,
                title: subcategory.title
                // Add more properties if needed
            }));
    }

    function parseData(data) {
        var categories_arr = data.map(category => ({
            id: category.id,
            title: category.title,
            img_url: ("https://wiki-ads.onrender.com/" + category.img_url),
            subcategories: []
        }));

        return { categories: categories_arr };
    }

    list_categories();
};