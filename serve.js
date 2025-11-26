import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json()); // API vai aceitar json

//Conectar no MongoDB
mongoose.connect(process.env.MONGODB_URI,{dbName:'Cardapio'})
.then(()=>console.log('Conectado ao MongoDB'))
.catch(err=>console.error('Erro na conexão:',err.message));

//Modelo Prato
const pratoSchema = new mongoose.Schema({
  nome: {type: String, required: true, trim: true, minlength:2},
  preco: {type: Number, required: true},
  descricao: {type: String}
},{collection: 'pratos',timestamps:true});
const Prato = mongoose.model('Prato',pratoSchema,'pratos');

//Modelo Refrigerante
const refriSchema = new mongoose.Schema({
  nome: {type: String, required: true, trim: true, minlength:2},
  preco: {type: Number, required: true},
  descricao: {type: String, required: true, trim: true}
},{collection: 'refrigerante', timestamps: true});
const Refrigerante = mongoose.model('Refrigerante',refriSchema,'Refrigerantes');

//Rota inicial
app.get('/',(req,res)=>res.json({msg:'API rodando'}));

//Criar Prato
app.post('/pratos',async(req,res)=>{
  const pratos = await Prato.create(req.body);
  res.status(201).json(pratos);
});

//Criar refrigerante
app.post('/refrigerantes',async(req,res)=>{
  const refrigerante = await Refrigerante.create(req.body);
  res.status(201).json(refrigerante);
});

//Listas pratos
app.post('/pratos',async(req,res)=>{
  const pratos = await Prato.find();
  res.json(pratos);
});

//Listar refrigerantes
app.post('/refrigerantes',async(req,res)=>{
  const refrigerantes = await Refrigerante.find();
  res.json(refrigerantes);
});

//Iniciar servidor
app.listen(process.env.PORT,()=>
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
);

