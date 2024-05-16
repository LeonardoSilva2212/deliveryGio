const express = require("express")
const exphbs = require ("express-handlebars")

const app = express()

//Configurando o handlebars como template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Os arquivos públicos ficarão na pasta public
app.use(express.static("public"))

app.get('/', (req, res) =>{
    res.render('home')
})

app.listen(3000, () => {
    console.log("Servior rodando na porta 3000!")
})