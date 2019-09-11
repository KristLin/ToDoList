// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = {
  name: {
    type: String,
    required: [true, "No Name Specified"]
  }
};

const Item = mongoose.model("Item", itemSchema);

// const item1 = new Item({ name: "Learn Web Development" });
// const item2 = new Item({ name: "Workout" });
// const item3 = new Item({ name: "Shopping" });
// const defaultItems = [item1, item2, item3];

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems) {
    // if the item list is empty, return the default item list
    // if(foundItems.length === 0) {
    //   Item.insertMany(defaultItems, function(err) {
    //     console.log("Successfully Saved Default Items to Database.");
    //   });
    //   res.redirect("/");
    // } else {
    //   res.render('index', {date: date.getDate(), items: foundItems});
    // }
    res.render('index', {date: date.getDate(), items: foundItems});
  });
});

app.post("/", function(req, res) {
  let newItemName = req.body.newItemName;

  if (newItemName) {
    let newItem = new Item({name: newItemName});
    newItem.save(function(err){
      console.log("Successfully Saved New Item to Database.");
    });
  }
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  let deleteItemId = req.body.deleteItemId;
  Item.deleteOne({_id: deleteItemId}, function(err) {
    console.log("Successfully Deleted Item from Database.");
  });
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
