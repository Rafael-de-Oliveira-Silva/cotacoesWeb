console.log('javascript no frontend');

const cotacoesForm = document.querySelector('form');
const mainMensage = document.querySelector('h3');
const codigo = document.querySelector('#symbol');
const precoAtual = document.querySelector('#price');
const precoAbertura = document.querySelector('#open');
const precoAlta = document.querySelector('#high');
const precoBaixa = document.querySelector('#low');
const precoFechamento = document.querySelector('#close');
const dtPesquisa = document.querySelector('#data-pesquisa');

//Ajusta os valores no formato de moeda
function formatarMoeda(valor){
    var vr = valor;

    vr = parseFloat(vr);
    vr = vr.toFixed(2);
    vr = "R$ " + vr;

    return vr.replace(".",",");
};

//Exibir a data formatada da consulta
function getDataAtual(){
    var dNow = new Date();
    var localDate = dNow.getDate()+'/'+(dNow.getMonth()+1) +'/'+dNow.getFullYear()+' '+dNow.getHours()+':'+dNow.getMinutes();
    return localDate;
}

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...';

    codigo.innerHTML = '';
    precoAtual.innerHTML = '';
    precoAbertura.innerHTML = '';
    precoAlta.innerHTML = '';
    precoBaixa.innerHTML = '';
    precoFechamento.innerHTML = '';
    dtPesquisa.innerHTML = '';

    event.preventDefault();
    const ativo = document.querySelector('input').value
    
    if(!ativo){
        const alerta_msg = `<div class="alert alert-danger" role="alert">
                                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span class="sr-only">Erro:</span>
                                O ativo deve ser informado!
                            </div>`
        mainMensage.innerHTML = alerta_msg;
        return;
    }

    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error){
                const alerta_msg = `<div class="alert alert-danger" role="alert">
                                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                        <span class="sr-only">Erro:</span>
                                        Alguma coisa deu errado: ${data.error.message} | código: ${data.error.code}
                                    </div>`
                mainMensage.innerHTML = alerta_msg
            }else{
                mainMensage.innerText = '';
                codigo.innerHTML = `<strong>Código ativo:</strong> ${data.symbol}`;
                precoAtual.innerHTML = `<strong>Preço:</strong> ${formatarMoeda(data.price)}`;
                precoAbertura.innerHTML = `<strong>Preço de Abertura:</strong> ${formatarMoeda(data.open)}`;
                precoAlta.innerHTML = `<strong>Maior Alta:</strong> ${formatarMoeda(data.high)}`;
                precoBaixa.innerHTML = `<strong>Maior Baixa:</strong> ${formatarMoeda(data.low)}`;
                precoFechamento.innerHTML = `<strong>Fechamento:</strong> ${formatarMoeda(data.close)}`;
                dtPesquisa.innerHTML = `Data da consulta: ${getDataAtual()}`;
            }
        });   
    });
});
