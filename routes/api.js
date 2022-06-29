const express = require("express").Router();
const { v4: uuid } = require("uuid");
const fs = require("fs");

express.get("/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.json(JSON.parse(data));
  });
});

express.post("/notes", async (req, res) => {
  const { title, text } = req.body;
  console.log(text);
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const parsedNote = JSON.parse(data);
        parsedNote.push(newNote);
        console.log(parsedNote);

        fs.writeFile(
          "db/db.json",
          JSON.stringify(parsedNote, null, 4),
          (err, data) => {
            if (err) {
              console.log(err);
            }
            res.json(data);
          }
        );
      }
    });
  }
});

module.exports = express;
