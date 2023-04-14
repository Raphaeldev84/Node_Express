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

// Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). Valide os campos passados e caso contrário indique um erro (400);

app.post("/alunos/novo", (req, res) => {
  const {nome, email, matricula, media} = req.body;
console.log(alunos)
  if (!nome || !matricula || !media) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios "});
  } else { 
    alunos.push({
      nome: nome,
      email: email,
      media: media,
      matricula: matricula
  })
  console.log(alunos)
    return res.status(201).json({ message: 'Aluno criado com sucesso' });
  }

})