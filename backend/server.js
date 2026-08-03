const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const { produits } = require("./data");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/produits", (req, res) => {
  res.json(produits);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Le serveur fonctionne sur http://localhost:${PORT}`)
);
