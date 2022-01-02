const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "e7941767011b5de96246d1058e32d264";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>The Temperature in ${query} is ${temp} &#176; Celsius</h1>`
      );
      res.write(`<h3>The weather is currently ${desc}</h3>`);
      res.write(`<img src="${imageUrl}"/>`);
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// https docs -> https://nodejs.org/api/https.html#httpsgeturl-options-callback
