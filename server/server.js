//server.js without hashing functions

import express, { json } from 'express';
import { getConnection } from './db.js';
import bodyparser from "body-parser";
import path from 'path';
import {fileURLToPath} from 'url';

const app = express()
const port = 8080

//to serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../site')));

//body parser
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// log in
app.post('/user/:userName?/:password?', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await getConnection();

        //get parameters for JSON query
        var userName = req.params.userName;
        var userPassword = req.params.password;

        // create a new query  
        var query = "SELECT userID FROM user WHERE userName=" + conn.escape(userName) + " AND userPassword=" + conn.escape(userPassword);

        console.log(query);

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);

        if (rows.length == 0){
            // if the account doesn't exist, return a json object to signify that
            var returnObject = {
                accountExists : false,
            }
            res.json(returnObject);
        } else {

            var userID = rows[0].userID;
            console.log("userID to get cats with: " + userID);
            var queryCat = "SELECT catID,catName,catPalletteName,catHat,catShirt,catPants,catShoes,catPolaroidBG FROM cat WHERE userID = " + userID + " ORDER BY catID DESC LIMIT 10;";
            console.log(queryCat);
            var rowsCat = await conn.query(queryCat);
            console.log(rowsCat);
            rowsCat.accountExists = true;
            // return the results
            res.json(rowsCat);
        }



    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

//create new user
app.post('/createuser/:userName?/:password?', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await getConnection();

        //get parameters for JSON query
        var userName = req.params.userName;
        var userPassword = req.params.password;

        // make sure we are not creating a user that already exists
        var querySignupCheck = "SELECT userID FROM user WHERE userName=" + conn.escape(userName);

        // execute the query and set the result to a new variable
        var rows = await conn.query(querySignupCheck);

        if (rows.length == 0){ //if the username/password combination doesnt exist, we can create the account.

            var newIDResponse = await conn.query("SELECT MAX(userID) AS userID FROM user;");
            var newID = newIDResponse[0].userID;
            newID++;

            var insertStatement = "INSERT INTO user(userID,userName,userPassword) VALUES (" + newID +","+ conn.escape(userName) + "," + conn.escape(userPassword) +");"
            console.log(insertStatement);

            var response = await conn.query(insertStatement);
            console.log(response);

            res.send("created")
        } else {
            console.log("not created")
            res.send("username / password combination already exists!")
        }
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

//add new cat to db
app.post('/dist/addcat/:userName?/:password?', async (req, res) => {
    let conn;
    try {
        conn = await getConnection();
        //get the right ID for the cat
        var userName = req.params.userName;
        var userPassword = req.params.password;

        var query = "SELECT userID FROM user WHERE userName=" + conn.escape(userName) + " AND userPassword=" + conn.escape(userPassword);
        var rows = await conn.query(query);
        var userID = rows[0].userID;

        //get the cat ID, incremented
        var newIDResponse = await conn.query("SELECT MAX(catID) AS catID FROM cat;");
        var newID = newIDResponse[0].catID;
        newID++;

        var insertQuery = `INSERT INTO cat(catID,catName,catPalletteName,catHat,catShirt,catPants,catShoes,catPolaroidBG,userID) VALUES(${newID}, '${req.body.catName}', '${req.body.catPalletteName}', '${req.body.catHat}', '${req.body.catShirt}','${req.body.catPants}','${req.body.catShoes}','${req.body.polaroidBG}',${userID})`;
        var response = await conn.query(insertQuery);
        console.log(response);

        var queryCat = "SELECT catID,catName,catPalletteName,catHat,catShirt,catPants,catShoes,catPolaroidBG FROM cat WHERE userID = " + userID + " ORDER BY catID DESC LIMIT 10;";

        var rowsCat = await conn.query(queryCat);

        res.json(rowsCat);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

//load cats from within the game (after adding a new cat to db)
app.post('/dist/user/:userName?/:password?', async (req, res) => {
    let conn;
    try {
        // establish a connection to MariaDB
        conn = await getConnection();

        //get parameters for JSON query
        var userName = req.params.userName;
        var userPassword = req.params.password;

        // create a new query  
        var query = "SELECT userID FROM user WHERE userName=" + conn.escape(userName) + " AND userPassword=" + conn.escape(userPassword);
        console.log(query);

        // execute the query and set the result to a new variable
        var rows = await conn.query(query);

        if (rows.length == 0){
            var rows = {
                userID : -4,//if the username/password aren't found, return this signifier ID which does not exist in the db
            }
            // return the results
            res.json(rows);
        } else {

            var userID = rows[0].userID;
            console.log("userID to get cats with: " + userID);
            var queryCat = "SELECT catID,catName,catPalletteName,catHat,catShirt,catPants,catShoes,catPolaroidBG FROM cat WHERE userID = " + userID + " ORDER BY catID DESC LIMIT 10;";
            console.log(queryCat);
            var rowsCat = await conn.query(queryCat);
            console.log(rowsCat);
            // return the results
            res.json(rowsCat);
        }



    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
