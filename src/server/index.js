var path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/api/*", async (req, res) => {
  try {
    const link = req.params[0];
    const api = "https://api.meaningcloud.com/sentiment-2.1";
    const key = process.env.API_KEY;

    const apiResponse = await axios.get(
      `${api}?key=${key}&url=${link}&lang=en`
    );
    const { agreement, subjectivity, confidence, irony } = apiResponse.data;

    console.log(agreement, subjectivity, confidence, irony);
    res.json({
      agreement: agreement,
      subjectivity: subjectivity,
      confidence: confidence,
      irony: irony,
    });
  } catch (err) {
    console.json(err);
    res.status(500).send(err);
  }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
