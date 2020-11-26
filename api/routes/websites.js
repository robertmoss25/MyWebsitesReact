var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const functions = require("../functions.js");

let categoryArray = {};
const itemsPerPage = 6;
var currentPos = 0;
var totalSize = 0;
let results = {};
let array = {};

function SetUpResults() {
    totalSize = results.totalSize;
    results.Categories = categoryArray;
    results.itemsPerPage = itemsPerPage;
    let total = currentPos + itemsPerPage;
    console.log("total " + total + " totalSize " + Number(results.totalSize));
    let nextHidden = total >= Number(results.totalSize);
    console.log("nextHidden " + nextHidden);
    results.currentPos = currentPos;
    results.nextHidden = nextHidden;
    results.array = array;
}

/* GET users listing. */
router.get('/', async(req, res, next) => {
    let returnResults = {};
    categoryArray = await functions.getCategories(categoryArray, currentPos);
    results = await functions.loadQuestions(itemsPerPage, currentPos);
    SetUpResults();
    returnResults.categoryArray = categoryArray;
    returnResults.results = results;
    let jsonString = JSON.stringify(returnResults);
    res.send(returnResults);
});

router.post("/documents", function(req,res, next) {
    let newURL = {
        url: req.body.url,
        Category: req.body.Categories,
        Comment: req.body.Comment
    }
    console.log(newURL);
    functions.saveWebsite(newURL);
    currentPos = 0;
    res.send(newURL);
});

router.get("/category", async (req,res, next) => {
    let returnResults = {};
    console.log("Categories " + req.query.key + " Value " + categoryArray[req.query.key]);
    array = await functions.loadCategoryQuestions(req.query.key);
    console.log("Categories " + JSON.stringify(array));
    ////SetUpResults();
    returnResults.array = array;
    res.send(returnResults);
});

router.get("/paging", async (req,res, next) => {
    console.log("currentPos " + currentPos);
    let command = req.query.command;
    let item = req.query.value;
    console.log("command " + command + " item " + item);

    if (command == 'begin') {
        currentPos = 0;
    } 
    else if (command == 'end') 
    {
        let totalPages = Math.ceil((totalSize / itemsPerPage));
        currentPos = (Number(totalPages)-1) * itemsPerPage;
    }
    else if (command == 'previous')
        currentPos = Math.max(0, Number(currentPos) - Number(itemsPerPage));
    else if (command == 'next')
        currentPos = Math.min(totalSize, Number(currentPos) + Number(itemsPerPage));
    else if (command == 'link')
        currentPos = Math.min(totalSize, (Number(itemsPerPage) * (Number(item)-1)));
    results = await functions.loadQuestions(itemsPerPage, currentPos);
    SetUpResults();
    res.send(results);
    console.log("currentPos " + currentPos);
});

module.exports = router;
