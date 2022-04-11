class GetUrl {
    request(HttpRequest) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.url + HttpRequest, false);
        xhttp.send();
        return JSON.parse(xhttp.responseText)
    }
    constructor(url) {
        this.url = url;
    }
}
const HttpRequest = new GetUrl("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/");
function alerta(){
    Swal.fire(
        'Bom Trabalho!',
        'Tabela gerada com Sucesso!',
        'success'
      )
}

function alertaFalha(){
    Swal.fire(
        'Error!',
        'Data Invalida!',
        'error'
      )
}

 function Moeda() {
     let moeda = document.getElementById("table");
     let rows = []
     for (valor of HttpRequest.request("Moedas?%24format=json").value) {
        const nomeFormatado = valor.nomeFormatado
         const simbolo = valor.simbolo
         const tipoMoeda = valor.tipoMoeda
        rows.push([nomeFormatado, simbolo, tipoMoeda])
     }
     let table = tabela(['Nome', 'Simbolo', 'Tipo'], rows)
    moeda.appendChild(table)
 }
 async function select(){
    const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json&%24orderby=simbolo`)
    const myJson = await response.json();
    for (var i = 0; i < myJson.value.length; i++) {
        const option = document.createElement('option')
        option.innerHTML = `${myJson.value[i].nomeFormatado}(${myJson.value[i].simbolo})`
        option.value = myJson.value[i].simbolo
        document.querySelector(".selectMoeda").appendChild(option);
    }
}
function CotacaoDolarDia(DataCotacao) {
    return HttpRequest.request(`CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao='${DataCotacao}'&%24format=json`)
}
function CotacaoDolarPeriodo(DataInicial, DataFinal) {
    return HttpRequest.request(`CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40dataInicial='${DataInicial}'&%40dataFinalCotacao='${DataFinal}'&%24format=json`)
}
function CotacaoMoedaDia(moeda, DataCotacao) {
    return HttpRequest.request(`CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?%40moeda='${moeda}'&%40dataCotacao='${DataCotacao}'&%24format=json`)
}
function CotacaoMoedaPeriodo(moeda, DataInicial, DataFinal) {
    return HttpRequest.request(`CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40moeda='${moeda}'&%40dataInicial='${DataInicial}'&%40dataFinalCotacao='${DataFinal}'&%24format=json`)
}
function CotacaoMoedaAberturaIntermediario(moeda, DataCotacao) {
    return HttpRequest.request(`CotacaoMoedaAberturaOuIntermediario(codigoMoeda=@codigoMoeda,dataCotacao=@dataCotacao)?%40codigoMoeda='${moeda}'&%40dataCotacao='${DataCotacao}'&%24format=json`)
}
function CotacaoMoedaPeriodoFechamento(moeda, DataInicial, DataFinal) {
    return HttpRequest.request(`CotacaoMoedaPeriodoFechamento(codigoMoeda=@codigoMoeda,dataInicialCotacao=@dataInicialCotacao,dataFinalCotacao=@dataFinalCotacao)?%40codigoMoeda='${moeda}'&%40dataInicialCotacao='${DataInicial}'&%40dataFinalCotacao='${DataFinal}'&%24format=json`)
}
function formatDate(data){
    const splittedDate = data.split('-')
    return `${splittedDate[1]}-${splittedDate[2]}-${splittedDate[0]}`
}
function pesquisarMoeda() {
    var dinheiro = document.getElementById("dinheiro1").value
    var data = formatDate(document.getElementById("date1").value)
    const resultados = CotacaoMoedaDia(dinheiro, data)
    var dia = document.getElementById("dia")
    var table = dia.querySelector("table")
    if (resultados.value.length == 0){
        return alertaFalha();
    }
    if (table != null) {
        table.parentElement.removeChild(table)
    }
    const headers = ['Cotação Compra', 'Cotação Venda', 'Paridade Compra', 'Paridade Venda']
    const rows = []
    for(let resultado of resultados.value){
        rows.push([resultado.cotacaoCompra, resultado.cotacaoVenda, resultado.paridadeCompra, resultado.paridadeVenda])
    }
    dia.appendChild(tabela(headers, rows))
    alerta();
}
function pesquisarDolarDia() {
    var data = formatDate(document.getElementById("date2").value)
    const resultados = CotacaoDolarDia(data)
    document.getElementById("DolarDia")
    var DolarDia = document.getElementById("DolarDia")
    if (resultados.value.length == 0){
        return alertaFalha();
    }
    var table = DolarDia.querySelector("table")
    if (table != null) {
        table.parentElement.removeChild(table)
    }
    const headers = ['Cotação Compra', 'Cotação Venda']
    const rows = []
    for(let resultado of resultados.value){
        rows.push([resultado.cotacaoCompra, resultado.cotacaoVenda])
    }
    DolarDia.appendChild(tabela(headers, rows))
    alerta();
}
function pesquisarDolarPeriodo() {
    var dataInicial = formatDate(document.getElementById("date3").value)
    var dataFinal = formatDate(document.getElementById("date31").value)
    const resultados = CotacaoDolarPeriodo(dataInicial, dataFinal)
    if (dataInicial > dataFinal || resultados.value.length == 0){
        return alertaFalha();
    }
    document.getElementById("DolarPeriodo")
    var DolarPeriodo = document.getElementById("DolarPeriodo")
    var table = DolarPeriodo.querySelector("table")
    if (table != null) {
        table.parentElement.removeChild(table)
    }
    const headers = ['Cotação Compra', 'Cotação Venda']
    const rows = []
    for(let resultado of resultados.value){
        rows.push([resultado.cotacaoCompra, resultado.cotacaoVenda])
    }
    DolarPeriodo.appendChild(tabela(headers, rows))
    alerta();
}

function pesquisarPeriodo() {
    var dinheiro = document.getElementById("dinheiro4").value
    var dataInicial = formatDate(document.getElementById("date4").value)
    var dataFinal = formatDate(document.getElementById("date41").value)
    const resultados = CotacaoMoedaPeriodo(dinheiro, dataInicial, dataFinal)
    document.getElementById("MoedaPeriodo")
    var MoedaPeriodo = document.getElementById("MoedaPeriodo")
    var table = MoedaPeriodo.querySelector("table")
    if (dataInicial > dataFinal || resultados.value.length == 0){
        return alertaFalha();
    }
    if (table != null) {
        table.parentElement.removeChild(table)
    }
    const headers = ['Cotação Compra', 'Cotação Venda']
    const rows = []
    for(let resultado of resultados.value){
        rows.push([resultado.cotacaoCompra, resultado.cotacaoVenda])
    }
    MoedaPeriodo.appendChild(tabela(headers, rows))
    alerta();
}

function pesquisarAbertura() {
    var dinheiro = document.getElementById("dinheiro5").value
    var data = formatDate(document.getElementById("date5").value)
    const resultados = CotacaoMoedaAberturaIntermediario(dinheiro, data)
    document.getElementById("abertura")
    var abertura = document.getElementById("abertura")
    var table = abertura.querySelector("table")
    if (resultados.value.length == 0){
        return alertaFalha();
    }
    if (table != null) {
        table.parentElement.removeChild(table)
    }
    const headers = ['Cotação Compra', 'Cotação Venda']
    const rows = []
    for(let resultado of resultados.value){
        rows.push([resultado.cotacaoCompra, resultado.cotacaoVenda])
    }
    abertura.appendChild(tabela(headers, rows))
    alerta();
}

function pesquisarFechamento() {
    var dinheiro = document.getElementById("dinheiro6").value
    var dataInicial = formatDate(document.getElementById("date6").value)
    var dataFinal = formatDate(document.getElementById("date61").value)
    const resultados = CotacaoMoedaPeriodoFechamento(dinheiro, dataInicial, dataFinal)
    document.getElementById("fechamento")
    var fechamento = document.getElementById("fechamento")
    var table = fechamento.querySelector("table")
    if (dataInicial > dataFinal || resultados.value.length == 0){
        return alertaFalha();
    }
    if (table != null) {
        table.parentElement.removeChild(table)
    }
    const headers = ['Cotação Compra', 'Cotação Venda']
    const rows = []
    for(let resultado of resultados.value){
        rows.push([resultado.cotacaoCompra, resultado.cotacaoVenda])
    }
    fechamento.appendChild(tabela(headers, rows))
    alerta();
}