var xi = [];
var yi = [];
var xi2 = [];
var yi2 = [];
var total_xi = 0;
var total_yi = 0;
var total_xi2 = 0;
var total_yi2 = 0;
var total_xy = 0;
var correlacao;
var a;
var b;
var dados = [];
var mostrar = [];
var result;

var leitorDeCSV = new FileReader();
window.onload = function init() {
    leitorDeCSV.onload = leCSV;
};

function pegaCSV(inputFile) {
    var file = inputFile.files[0];
    leitorDeCSV.readAsText(file);
}

function leCSV(evt) {
    var fileArr = evt.target.result.split('\n');
    var strDiv = [];
    var dados = strDiv;
    
    var x = document.getElementById('X');
    var y = document.getElementById('Y');
    x.value = fileArr[0];
    y.value = fileArr[1];
}

function limpar() {
    document.getElementById('X').value = '';
    document.getElementById('Y').value = '';
    if (document.getElementById('btnConfirm').style.display == 'none') {
        location.reload();
    }
}

function testar() {
    xi = document.getElementById('X').value;
    xi = xi.split(';');
    yi = document.getElementById('Y').value;
    yi = yi.split(';');
    var erro = false;
    if (xi[xi.length - 1].length == 0) {
        xi.pop();
    }
    if (yi[yi.length - 1].length == 0) {
        yi.pop();
    }
    if(xi.length != yi.length){
        erro = true;
        alert("As variáveis tem que ter o mesmo número de elementos");
    }
    for (i = 0; i < xi.length; i++) {
        xi[i] = parseFloat(xi[i].replace(',', '.'));
    }
    for (i = 0; i < yi.length; i++) {
        yi[i] = parseFloat(yi[i].replace(',', '.'));
    }
    for (i = 0; i < xi.length; i++) {
        if (isNaN(xi[i]) == true && erro != true) {
            alert("Os dados digitados no campo X apresentam alguma inconsistencia,\n certifique-se de que você digitou apenas números e os separou com ponto e vírgula\n que os dados não possuem espaços entre eles");
            erro = true;
            break;
        }
    }
    for (i = 0; i < yi.length; i++) {
        if (isNaN(yi[i]) == true && erro != true) {
            alert("Os dados digitados no campo Y apresentam alguma inconsistencia,\n certifique-se de que você digitou apenas números e os separou com ponto e vírgula\n que os dados não possuem espaços entre eles");
            erro = true;
            break;
        }
    }
    if (xi == "" || yi == "" && erro != true) {
        alert("Preencha os dados nos campos para continuar");
        erro = true;
    }
    if (erro == false) {
        correlacao_linear();
    }
}

function correlacao_linear() {
    document.getElementById('btnFile').style.display ="none";
    var xy = [];
    //x-33;25;24;18;12
    //y-300;400;500;600;700
    document.getElementById('btnConfirm').style.display = "none";

    n = xi.length;

    for (i = 0; i < yi.length; i++) {
        total_yi += yi[i];
    }
    for (i = 0; i < xi.length; i++) {
        total_xi += xi[i];
    }

    calcular_xy(xi, yi, xy);
    potencia();

    r = ((n * total_xy) - (total_xi * total_yi)) / (Math.sqrt(((n * total_xi2) - Math.pow(total_xi, 2)) * ((n * total_yi2) - Math.pow(total_yi, 2))));

    if (r == 0) {
        correlacao = "Não há correlação";
    }
    if (r > 0 && r < 0.3) {
        correlacao = "Correlação Fraca";
    }
    if (r == 1) {
        correlacao = "Correlaçao perfeita e positiva";
    }
    if (r == -1) {
        correlacao = "Correlaçao perfeita e positiva";
    }
    if ((r >= 0.3 && r < 0.6) || (r <= -0.3 && r > -0.6)) {
        correlacao = " Correlação média";
    }
    if ((r >= 0.6 && r < 1) || (r <= -0.6 && r > -1)) {
        correlacao = " Correlação média a forte";
    }
    mostrar.push(correlacao);
    mostrar.push("Ceficiente Linear = " + r.toFixed(2));
    //media x
    var mediax = total_xi / n;
    //media y
    var mediay = total_yi / n;
    //constante a
    a = ((n * total_xy) - (total_xi * total_yi)) / ((n * total_xi2) - Math.pow(total_xi, 2));
    //contante b
    b = mediay - a * mediax;
    //regressao
    mostrar.push("Equação da reta: y = " + a.toFixed(2) + " x " + b.toFixed(2));
    document.getElementById("btnProjecao").style.display = "inline";
    document.getElementById('painel').style.display = "block";
    gerarGrafico();
    painelResultado(mostrar);
}
//x * y
function calcular_xy(xi, yi, xy) {
    for (i = 0; i < xi.length; i++) {
        xy[i] = xi[i] * yi[i];
        total_xy += xy[i];
    }
}
//potencia de x e y
function potencia() {
    for (i = 0; i < xi.length; i++) {
        xi2[i] = Math.pow(xi[i], 2);
        total_xi2 += xi2[i];
        yi2[i] = Math.pow(yi[i], 2);
        total_yi2 += yi2[i];
    }
}

function entradaProjecao() {
    document.getElementById('painelProjecao').style.display = "table";
}

function projecao() {
    var tipoVariavel = document.querySelector('input[name="select"]:checked').value;

    var valor = document.getElementById('txtProjecao').value;

    if (tipoVariavel == 'x') {
        result = a * valor + b;
        dados.push({
                x: valor,
                y: result
            }),
            document.getElementById('valorFuturo').innerHTML = "Valor da dependente(y) = " + result.toFixed(2);
        yi.push(result);
    } else {
        result = (valor - b) / a;
        dados.push({
                x: result,
                y: valor
            }),
            document.getElementById('valorFuturo').innerHTML = "Valor da independente(x) = " + result.toFixed(2);
        yi.push(valor);
    }
    gerarGrafico();
}

function gerarGrafico() {
    var ctx = document.getElementsByClassName("line-chart");
    var maior = yi[0];
    var menor = yi[0];

    for (var i = 0; i < yi.length; i++) {
        dados.push({
            x: xi[i],
            y: yi[i]
        });
        if (maior < yi[i]) {
            maior = yi[i];
        }
        if (menor > yi[i]) {
            menor = yi[i];
        }
    }

    var dadosLinha = [{
        x: (menor - b) / a,
        y: menor
    }, {
        x: (maior - b) / a,
        y: maior
    }];

    var chartGraph = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                    data: dados,
                    borderColor: '#0199BE',
                    backgroundColor: "#0199BE",
                },
                {
                    data: dadosLinha,
                    type: 'line',
                    fill: false,
                    borderColor: "black",
                    backgroundColor: "black",
                    showLine: true,
                    pointRadius: 2,
                    borderRadius: 1
                },
            ]
        },
        options: {
            legend: {
                display: false,
            }
        }
    });
}
//y - 15,00; 16,00; 17,00; 19,00; 18,00; 23,00; 21,00; 27,00; 25,00; 25,00; 22,00; 27,00
//x - 1,90; 2,00; 2,20; 2,50; 2,30; 2,60; 2,50;2,90; 2,70; 2,80; 2,60; 2,70
function painelResultado(medidas) {
    var painel = document.getElementById("resultado");
    var corpo = document.createElement("tbody");
    for (i = 0; i < medidas.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(medidas[i]));
        tr.appendChild(td);
        corpo.appendChild(tr);
    }
    painel.appendChild(corpo);
}