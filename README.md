<div align="center">
    <img src = https://github.com/user-attachments/assets/34480e10-6b6c-4d6a-879f-62d8e3529942 width = "300px">
</div>

## Description 📌

RentHub is a website that provides a simplified listing service for various rental and sale categories. It features multiple pages (home, listings, about us, contact, etc.), with core functionalities including user login, browsing listings, saving favorite listings, and communication via contact forms.

Listings are categorized into sections such as housing, vehicles, jobs, and technology, each further divided into subcategories to ensure intuitive navigation. Each listing includes key details such as price, description, images, technical specifications (if applicable), and other essential information. Additionally, an embedded map feature allows users to view the exact location of listings, enhancing the browsing experience and making it easier to find nearby options.

<div align="center">
    <img src=https://github.com/user-attachments/assets/bcc14e14-408f-4125-8d7b-04196bb33958 alt="Home" height="230">
</div>
<div align="center">
    <img src=https://github.com/user-attachments/assets/4335d6cf-ca83-4e14-a533-f1983807c9c7 alt="Houses" height="240">
    <img src=https://github.com/user-attachments/assets/2be5b292-26f1-41ef-8405-e9a32e4ea3da alt="House" height="240">
</div>

## Project Structure 🏗️

This project consists of two main parts:

* Static Content (First Part): The first part of the website contains only static content, which is displayed directly in the web browser without requiring interaction with a web server. It is built using HTML5, CSS, and JavaScript, with JavaScript used solely for complex form validation. You can find the first part [here](https://github.com/EleniKechrioti/aueb-projects/tree/main/7th%20semester/Web%20Development/Part%201%20-%20HTML%20%26%20CSS).

* Dynamic Content & API Integration (Second Part): The second part builds upon the first part by incorporating dynamic content. Categories and listings are dynamically generated using JavaScript and injected into the appropriate sections of the web pages. This is achieved by retrieving data from an external API, which provides information about categories, subcategories, and listings through structured requests. Additionally, JavaScript and Web Browser APIs enable functionalities such as user authentication and adding listings to favorites.

## Libraries used 📚

- [Handlebars](https://handlebarsjs.com/guide/): A templating language for dynamically generating HTML content.
- [expressjs](https://expressjs.com/en/guide/routing.html): A framework for quickly building web services.
- [uuid](https://www.npmjs.com/package/uuid): A tool for generating unique identifiers.
- [nodemon](https://www.npmjs.com/package/nodemon): A utility for automatically restarting a Node.js application when changes are made to its files.
