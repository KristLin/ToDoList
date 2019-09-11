// jshint esversion:6

// different ways to export
// exports = getDate;
// exports.getDate = getDate;
// exports.getDate = getDate() {...};

exports.getDate = getDate;

function getDate() {
  let date = new Date().toDateString().split(" ");
  return date[0] + ", " + date[1] + " " + date[2] + ", " + date[3];
}
