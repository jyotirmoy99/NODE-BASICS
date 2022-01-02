const express = require("express");
const app = express();

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/contact", (req, res) => {
  res.send("Contact me");
});

app.get("/about", (req, res) => {
  res.send("About us");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
