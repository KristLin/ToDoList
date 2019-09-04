// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var things = ["Learn Web Development", "Workout", "Shopping"];

app.get("/", function(req, res) {
  res.render('index', {date: getDate(), things: things});
});

app.post("/", function(req, res) {
  let newItem = req.body.newItem;
  if (newItem) {
    things.push(newItem);

  }
  res.render("index", {date: getDate(), things: things});
});

app.post("/delete", function(req, res) {
  let deleteItem = req.body.deleteItem;
  things.splice(things.indexOf(deleteItem), 1);
  res.render("index", {date: getDate(), things: things});
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});


function getDate() {
  let date = new Date().toDateString().split(" ");
  return date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];
}
