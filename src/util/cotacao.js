const request = require("request");
const chalk = require('chalk');

const token_api = '2QGT53RDXI7EMA4C';
const url_api_cotacao_global = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE';

const pesquisar = (symbolAtivo, callback) => {
    
    if(symbolAtivo === ''){
        throw new Error(chalk.red.inverse('Código do ativo não informado...'))
    }

    const url = `${url_api_cotacao_global}&symbol=${symbolAtivo}&apikey=${token_api}`

    request({url: url, json: true}, (err, response) => {
        if (err){

            callback({
                message: `Algo deu errado: ${err}`,
                code: 500
            }, undefined)   

        }else if(response.body['Error Message'] !== undefined){

            callback({
                message: 'Ativo não encontrado',
                code: 404
            }, undefined)

        }else{
            const bodyJSON = response.body
            
            const dados = {
                symbol: bodyJSON['Global Quote']['01. symbol'],
                price:  bodyJSON['Global Quote']['05. price'],
                open:   bodyJSON['Global Quote']['02. open'],
                high:   bodyJSON['Global Quote']['03. high'],
                low:    bodyJSON['Global Quote']['04. low'],
                close:  bodyJSON['Global Quote']['08. previous close']
            }

            callback(undefined, dados);

        }        
    });
}

module.exports = {
    pesquisar
}