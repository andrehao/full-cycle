const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "db",
  user: "admin",
  password: "admin",
  database: "nodedb",
});

// opening connection with database
connection.connect();

// Creating people table
connection.query(
  "CREATE TABLE people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id))",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Table people created, ", results);
  }
);

// Inserting
connection.query("INSERT INTO people (name) VALUES ('Andre')");
connection.query("INSERT INTO people (name) VALUES ('Maria')");
connection.query("INSERT INTO people (name) VALUES ('Paulo')");
connection.query("INSERT INTO people (name) VALUES ('Ana')");

let people;
// Getting all table records
connection.query("SELECT * from people", function (error, results, fields) {
  if (error) throw error;
  people = results;
});

// closing connection with database
connection.end();

app.get("/", (req, res) => {
  res.write("<p><h1>Full Cycle Rocks!</h1></p>");
  res.write("<p><ul>");
  people.forEach((person) => {
    res.write("<li>" + person.name + "</li>");
  });
  res.write("</ul></p>");
  res.end();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
