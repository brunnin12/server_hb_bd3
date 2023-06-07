const express = require("express")
const app = express()
const exphbs = require("express-handlebars") 
const conn = require("./db/conn")
const Verdura = require('./models/Verdura')
const PORT = 3000
const hostname = "localhost"

//---------------------Config express-----------------------------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
// --------------Config express-handlebars------------------------
app.set("view engine", "handlebars")
app.engine("handlebars", exphbs.engine())
// ---------------------------------------------------------------
app.post('/apagar', async(req,res)=>{
    const id = req.body.id
    console.log(id)
    const pesq = await Verdura.findOne({raw:true, where: {id:id}})
    console.log(pesq)
    Verdura.destroy({where: {id:pesq.id}})
    res.redirect('/')
})
app.get("/apagar",  (req,res)=>{
    res.render('apaga')
})
app.post('/cadastrar', async(req,res)=>{
    const verduras = req.body.verduras
    const qtde = req.body.qtde
    const preco_un = req.body.preco_un
    console.log(verduras,qtde,preco_un)
    await Verdura.create({verduras,qtde,preco_un})
    res.redirect('/')
})
app.get("/cadastrar",  (req,res)=>{
    res.render('cadastro')
})
app.get("/pesquisar",  (req,res)=>{
    res.render('pesquisa')
})
app.post("/pesquisar",  async (req,res)=>{
    const codigo = req.body.codigo
    console.log(codigo)
    const pesq = await Verdura.findOne({raw:true, where: {id:codigo}})
    console.log('------------')
    console.log(pesq)
    res.render('pesquisa', {valores: pesq})
})

app.get("/listar", async (req,res)=>{
    const dados = await Verdura.findAll({raw:true})
    console.log(dados)
    res.render('lista', {valores: dados})
})
app.get("/", (req,res)=>{
    res.render('home')
})

// ---------------------------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT,hostname,()=>{
    console.log(`Servidor rodando ${hostname}:${PORT}`)
})
}).catch((error)=>{
    console.log("Não foi possivel conectar ao banco de dados!"+ error)



})




