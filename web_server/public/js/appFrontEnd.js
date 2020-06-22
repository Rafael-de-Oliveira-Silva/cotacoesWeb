console.log('javascript no frontend');

const cotacoesForm = document.querySelector('form');
const mainMensage = document.querySelector('h3');
const codigo = document.querySelector('#symbol');
const precoAtual = document.querySelector('#price');
const precoAbertura = document.querySelector('#open');
const precoAlta = document.querySelector('#high');
const precoBaixa = document.querySelector('#low');
const precoFechamento = document.querySelector('#close');

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...';

    codigo.innerHTML = '';
    precoAtual.innerHTML = '';
    precoAbertura.innerHTML = '';
    precoAlta.innerHTML = '';
    precoBaixa.innerHTML = '';
    precoFechamento.innerHTML = '';

    event.preventDefault();
    const ativo = document.querySelector('input').value
    
    if(!ativo){
        mainMensage.innerHTML = 'O ativo deve ser informado!';
        return;
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error){
                mainMensage.innerHTML = `Alguma coisa deu errado: ${data.error.message} | código: ${data.error.code}`
            }else{
                mainMensage.innerText = '';
                codigo.innerHTML = `Código ativo: ${data.symbol}`;
                precoAtual.innerHTML = `Preço: ${data.price}`;
                precoAbertura.innerHTML = `Preço de Abertura: ${data.open}`;
                precoAlta.innerHTML = `Maior Alta: ${data.high}`;
                precoBaixa.innerHTML = `Maior Baixa: ${data.low}`;
                precoFechamento.innerHTML = `Fechamento: ${data.close}`;
            }
        });   
    });
});
