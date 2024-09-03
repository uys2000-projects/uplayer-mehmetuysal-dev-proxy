const { setULogger } = require("u-logger");
const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;

const axios = require("axios");

setULogger(true, false);

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.get("/get", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send({ result: "" });
  const result = await axios.get.pLogger(url);
  return res.send({ result: result.data });
});

app.listen(port, () => {
  console.clear();
  console.log(`\nApplication runs on:`);
  console.log(`\nhttp://localhost:${port}`);
});
