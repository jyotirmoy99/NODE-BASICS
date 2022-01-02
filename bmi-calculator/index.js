const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

app.get("/bmi-calculator", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/bmi-calculator", (req, res) => {
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);

  let bmi = weight / (height * height);

  if (bmi < 18.5) {
    res.send(bmi + ". You are underweight. Eat some food.");
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    res.send(bmi + ". Congrats! You are healthy. Enjoy your life.");
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    res.send(bmi + ". You are overweight. Do some exercise.");
  } else if (bmi >= 30.0) {
    res.send(bmi + ". You will die!");
  } else {
    res.send("Invalid Input!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
