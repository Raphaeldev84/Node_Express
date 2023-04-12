const express = require("express");
const app = express();
const alunos = require("./alunos");
app.use(express.json());

// Crie uma rota GET para “/alunos” que lista todos os alunos. Deve conter query opcional para filtrar por nome e por média.
app.get("/alunos", (req, res) => {
  const { nome, media } = req.query;

  if (nome) {
    const filtrarAlunos = alunos.filter((aluno) => aluno.nome.toLowerCase().includes(nome.toLowerCase()));
    res.json(filtrarAlunos)
  } else if (media) {
    const filtrarAlunos = alunos.filter((aluno) => aluno.media >= parseFloat(media));
    res.json(filtrarAlunos)
  } else {
    res.json(alunos);
  }
  
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
