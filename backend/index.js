const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/dict/:lang", (req, res) => {
  const data = require(`./Dict/${req.params.lang}.json`);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
