import express from "express";

const app = express();
app.use(express.json());

const produtos = [
  {
    id: 1,
    name: "Maçã",
    quantity: 2,
    type: "fruta",
  },

  {
    id: 2,
    name: "Melancia",
    quantity: 1,
    type: "fruta",
  },
];

app.post("/produtos", (req, res) => {
  const { name, quantity, type } = req.body;

  if (!name || !quantity || !type) {
    return res.status(422).send("Unprocessable Entity");
  }
  const produto = { id: produtos.length + 1, name, quantity, type };
  produtos.push(produto);
  res.status(201).send("Created");
});

app.get("/produtos", (req, res) => {
  res.send(produtos);
});

app.get("/produtos/type/:type", (req, res) => {
  const type = req.params.type.toLowerCase();
  const produto = produtos.filter((produto) => {
    return produto.type.toLowerCase() === type;
  });
  res.send(produto);
});

app.get("/produtos/id/:id", (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).send("Bad Request");
  }

  const numericId = Number(id);

  if (numericId < 0 || numericId > produtos.length) {
    return res.status(404).send("Not Found");
  }

  const produto = produtos.find((produto) => {
    return produto.id === Number(id);
  });
  res.send(produto);
});

app.listen(5000, () => {
  console.log("Esta rodando na porta 5000!");
});
