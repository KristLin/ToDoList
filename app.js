// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var things = ["Learn Web Development", "Workout", "Shopping"];

app.get("/", function(req, res) {
  res.render('index', {title: getTitle(), things: things});
});

app.post("/", function(req, res) {
  let newThing = req.body.newThing;
  things.push(newThing);
  res.render("index", {title: getTitle(), things: things});
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});


function getTitle() {
  let today = new Date().getDay();
  let dateList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let title_result = "";
  if (today == 6 || today == 0) {
    titleResult = "Todya is " + dateList[today] + "! Yeaaaah!";
  } else {
    titleResult = "Todya is " + dateList[today] + ".";
  }
  return titleResult;
}
