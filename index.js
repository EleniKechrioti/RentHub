const config = require('./models/db');
const express = require('express')
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 8080
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

//-------------------------------------------------------------------------
const user = require('./models/user');
const { log } = require('console');
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === "" || password === "") {
        res.json({
            status: "FAIL",
            message: "Empty input field."
        });
    } else {
        console.log(username);
        user.findOne({ username, password }).then(data => {
            console.log(data);
            // User exists
            if (data) {
                // UUID
                const sessionId = {'sessionId': uuidv4()};
                console.log(sessionId);
                const responseData = {
                    ...data,
                    ...sessionId
                };
                res.type('application/json');
                res.status(200).send(responseData);
            } else {
                res.json({
                    status: "FAIL",
                    message: "Incorrect username or password."
                });
            }
        }).catch(error => {
            res.status(500).json({
                status: "FAIL",
                message: "Internal Server Error"
            });
        });
    }
});
//-------------------------------------------------------------------------

app.patch('/add_favorites',(req,res)=>{
    const username = req.body.username;
    const updateDocument = req.body;
    // if(sessionId != req.body.sessionId){
    //     console.log(data);
    //     res.status(401).send(`User and SessionId do not match`);
    // }else{
        user.updateOne({username:username}, updateDocument).then(result=>{
            res.status(200).send(result);
        }).catch(err=>{
            console.log(err);
            res.status(500).send(err);
        });
    //}
});

//-------------------------------------------------------------------------

app.post('/favorites_list',(req,res)=>{
    let{username,id}=req.body;
    console.log(req.body);
    user.findOne({username}).then(data=>{
        //if(sessionID.sessionId == id){
            res.type('application/json');
            console.log("all good");
            console.log(data);
            res.status(200).send(data.favorites);
        // }else{
        //     console.log(id);
        //     console.log(sessionId);
        //     res.status(401).send(`User and SessionId do not match`);
        // }
    }).catch(err =>{
        console.log(err);
    })
})

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})