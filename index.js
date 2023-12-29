const express = require('express')
const path = require('path')
const app = express()
const port = 8081

app.listen(port)
const fs = require('fs');
const { Session } = require('inspector');
const { json } = require('express');

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

const root = path.join(__dirname, 'public');

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})