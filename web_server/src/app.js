const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cotacoes = require('./util/cotacao');

//-----------------------------------------------------------------------------------//
const app = express();
//-----------------------------------------------------------------------------------//
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//-----------------------------------------------------------------------------------//
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
//-----------------------------------------------------------------------------------//
//---------------------------------Definição de Rotas--------------------------------//
//-----------------------------------------------------------------------------------//

//Rota para a página home...
app.get('',(req, res) => {
    res.render('index',{
        title: 'Sistema de cotações',
        author: 'Rafael Silva'
    })
});

//Rota para uma página sobre...
app.get('/about',(req, res) => {
    res.render('about',{
        title: 'Sobre',
        author: 'Rafael Silva'
    })
});

//Rota para uma página de ajuda...
app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Conteúdo Help',
        author: 'Rafael Silva'
    })
});

//Definindo uma rota para API de consulta da cotação da bolsa de valores...
app.get('/cotacoes', (req, res) => {
    
    if (!req.query.ativo){
        return res.status(400).json({
            error:{
                message: 'O ativo deve ser informado como query parameter...',
                code: 400
            }   
        });    
    }

    const symbol = req.query.ativo.toUpperCase();

    cotacoes.pesquisar(symbol, (err, dados) => {
        if(err){

            return res.status(err.code).json({error: {
                message: err.message,
                code: err.code
            }})

        }
        res.status(200).json(dados);
    });  
});

//Defindo uma rota para erros... Qualquer rota não definida cairá aqui...
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'Rafael Silva'
    })
});





//-----------------------------------------------------------------------------------//

//Informa que a aplicação estará escutando na porta 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

//-----------------------------------------------------------------------------------//