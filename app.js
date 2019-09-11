// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var things = ["Learn Web Development", "Workout", "Shopping"];

app.get("/", function(req, res) {
  res.render('index', {date: date.getDate(), things: things});
});

app.post("/", function(req, res) {
  let newItem = req.body.newItem;
  if (newItem) {
    things.push(newItem);
  }
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  let deleteItem = req.body.deleteItem;
  things.splice(things.indexOf(deleteItem), 1);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
