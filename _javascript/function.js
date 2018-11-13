var rol = [];
var vet_rol = [];
var vet_xi = [];
var vet_fi = [];
var vet_Fac = [];
var vet_fr = [];
var vet_Frac = [];
var vet_xifi = [];
var total_xifi = 0;
var vet_esq = [];
var vet_dir = [];
var vet_ic = [];
var vet_dp = [];
var DP = 0;
var CV = 0;
var classi = [];
var cont;
var total_fi;
var media;
var moda;
var mediana;
var Ic;
var medidas = [];
var erro = false;
var c;
var inseriu = false;
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

    for (var i = 0; i < fileArr.length; i++) {
        var fileLine = fileArr[i].split(',');
        for (var j = 0; j < fileLine.length; j++) {
            strDiv.push(fileLine[j].trim());
        }
    }
    var CSVsaida = document.getElementById('txtRol');
    CSVsaida.innerHTML = strDiv;
}

function insert() {
    var elemento = document.getElementById('elemento').value;
    if (elemento == '') {
        erro = true;
        alert("Você deve inserir o elemento no campo Elemento");
    }
    var vezes = document.getElementById('qtdElemento').value;
    if (isNaN(vezes) == true || vezes == '') {
        erro = true;
        alert("Você deve inserir a frequencia no campo Frequencia");
    }
    if (erro == false) {
        var textArea = elemento + ';';
        inseriu = true;
        for (i = 0; i < vezes - 1; i++) {
            textArea += elemento + ";";
        }
        document.getElementById('txtRol').value += textArea;
    }

}

function limpar() {
    document.getElementById('txtRol').value = "";
}

function mostrarSeparatriz() {
    var tipoVariavel = document.getElementById("variavel").value;

    if (tipoVariavel == 'quali' || tipoVariavel == '') {
        document.getElementById('selectSeparatriz').style.display = "none";
    } else {
        document.getElementById('selectSeparatriz').style.display = "block";
    }
}

function habilitarTxt() {
    var separatriz = document.getElementById('separatriz').value;
    if (separatriz !== "nenhuma") {
        document.getElementById('txtseparatriz').style.display = "block";
    } else {
        document.getElementById('txtseparatriz').style.display = "none";
    }
}

function ordenar() {
    var variavel = document.getElementById('variavel').value;
    var pesquisa = document.getElementById('pesquisa').value;
    var separatriz = document.getElementById('separatriz').value;
    var medida = document.getElementById('txtseparatriz').value;
    var erro = false;
    rol = document.getElementById('txtRol').value;
    rol = rol.split(';');
    for(i = 0; i < rol.length ; i++){
        rol[i] = rol[i].trim();
    }
    if (inseriu == true) {
        rol.pop();
    }

    document.getElementById('pRol').style.textAlign = 'left';
    document.getElementById('pRol').style.display = "block";

    switch (separatriz) {
        case "Quartil":
            if (medida < 0 || medida > 4) {
                alert("Digite um número de 1 a 4 no campo medida");
                document.getElementById('txtseparatriz').style.border = "2px solid red;";
                erro = true;
            }
            break;
        case "Quintil":
            if (medida < 0 || medida > 5) {
                alert("Digite um número de 1 a 5 no campo medida");
                document.getElementById('txtseparatriz').style.border = "2px solid red;";
                erro = true;
            }
            break;
        case "Decil":
            if (medida < 0 || medida > 10) {
                alert("Digite um número de 1 a 10 no campo medida");
                document.getElementById('txtseparatriz').style.border = "2px solid red;";
                erro = true;
            }
            break;
        case "Percentil":
            if (medida < 0 || medida > 100) {
                alert("Digite um número de 1 a 100 no campo medida");
                document.getElementById('txtseparatriz').style.border = "2px solid red;";
                erro = true;
            }
            break;
    }
    switch (variavel) {
        case '':
            alert("Selecione o tipo de variável");
            break;

        case 'quantiD':
            if (rol == '') {
                alert("Digite os dados do Rol");
            }
            if (rol[rol.length - 1].length == 0) {
                rol.pop();
            }
            for (var i = 0; i < rol.length; i++) {
                rol[i] = parseFloat(rol[i].replace(',', '.'));
            }
            for (i = 0; i < rol.length; i++) {
                if (isNaN(rol[i]) == true) {
                    alert("Certifique-se de que você digitou apenas números e os separou com ponto e vírgula\n que os dados não possuem espaços entre eles");
                    erro = true;
                    break;
                }
            }
            if (pesquisa == 'selecione' && erro != true) {
                alert("Selecione o tipo de pesquisa");
                erro = true;
            }
            if (erro == false) {
                document.getElementById('painelRol').style.display = 'block';
                document.getElementById('entrada').style.display = 'none';
                discreta(rol);
            }

            break;
        case 'quantiC':
            erro = false;
            if (rol == '') {
                alert("Digite os dados do Rol");
            }
            if (rol[rol.length - 1].length == 0) {
                rol.pop();
            }
            for (i = 0; i < rol.length; i++) {
                rol[i] = parseFloat(rol[i].replace(',', '.'));
            }
            for (i = 0; i < rol.length; i++) {
                if (isNaN(rol[i]) == true) {
                    alert("Os dados digitados apresentam alguma inconsistencia,\n certifique-se de que você digitou apenas números e os separou com ponto e vírgula\n que os dados não possuem espaços entre eles");
                    erro = true;
                    break;
                }
            }
            if (pesquisa == 'selecione' && erro != true) {
                alert("Selecione o tipo de pesquisa");
                erro = true;
            }

            if (erro != true) {
                continua(rol);
                document.getElementById('painelRol').style.display = 'block';
                document.getElementById('entrada').style.display = 'none';
            }
            break;
        case 'quali':
            if (rol[rol.length - 1].length == 0) {
                rol.pop();
            }
            quali();
            document.getElementById('painelRol').style.display = 'block';
            document.getElementById('entrada').style.display = 'none';
            break;
    }
}

function quali() {
    //bom;bom;bom;bom;bom;bom;bom;bom;ruim;ruim;ruim;ruim;ruim;ruim;ruim;razoavel;razoavel;razoavel;razoavel;razoavel;razoavel;razoavel;razoavel
    rol.sort();

    document.getElementById('pRol').innerHTML = document.getElementById('pRol').innerHTML + rol;
    for (var i = 0; i < rol.length; i++) {
        vet_xi[i] = rol[i];
    }
    total_fi = rol.length;
    calcularxiDiscreta(vet_xi);
    calcularfieFidiscreta(rol, vet_fi, vet_Fac);
    calcularfreFr(vet_fi, vet_Fac, vet_fr, vet_Frac, total_fi);

    vet_xi.push("|||||||||");
    vet_Fac.push("|||||||||");
    vet_Frac.push("|||||||||");
    var matriz = [
        vet_xi, vet_fi, vet_Fac, vet_fr, vet_Frac
    ];
    gerarPainel(medidas);
    gerarTabela(matriz);
    gerarGrafico();
}

function discreta(rol) {
    //4; 4; 5; 6; 7; 7; 8; 9; 5; 4; 4; 7; 7; 7; 9; 9; 9; 9; 4; 7
    quicksort(rol, 0, rol.length - 1);
    document.getElementById('pRol').innerHTML = document.getElementById('pRol').innerHTML + rol;
    for (i = 0; i < rol.length; i++) {
        vet_xi.push(rol[i]);
    }
    total_fi = rol.length;
    calcularxiDiscreta(vet_xi);
    calcularfieFidiscreta(rol, vet_fi, vet_Fac);
    calcularfreFr(vet_fi, vet_Fac, vet_fr, vet_Frac, total_fi);
    calcularxifi(vet_xi, vet_fi, vet_xifi);
    calcularMedia();
    calcularMediana();
    calcularModa();
    calcularDP();

    vet_xi.push("|||||||||");
    vet_Fac.push("||||||||||");
    vet_Frac.push("|||||||||");
    var matriz = [
        vet_xi, vet_fi, vet_Fac, vet_fr, vet_Frac
    ];
    var separatriz = document.getElementById('separatriz').value;
    if (separatriz != 'nenhuma') {
        medidaSeparatriz();
    }

    gerarPainel(medidas);
    gerarTabela(matriz);
    gerarGrafico();
}

function continua(rol) {
    //0; 0; 1; 1; 2; 2; 2; 3; 3; 3; 4; 4; 4; 5; 5; 5; 5; 6; 6; 6; 7; 7; 7; 7; 7; 8; 8; 9; 9; 10
    quicksort(rol, 0, rol.length - 1);
    document.getElementById('pRol').innerHTML = document.getElementById('pRol').innerHTML + rol;
    calcularContinua(rol);
    calcularfreFr(vet_fi, vet_Fac, vet_fr, vet_Frac, total_fi);
    calcularxifi(vet_xi, vet_fi, vet_xifi);
    calcularMedia();
    calcularModa();
    calcularMedianaC();
    calcularDP();

    vet_dir.push("||||||||||||");
    vet_xi.push("|||||||||");
    vet_Fac.push("||||||||||");
    vet_Frac.push("|||||||||");
    classi.push('||||||||||');
    vet_ic.push('||||||||||');

    var matriz = [
        classi, vet_ic, vet_fi, vet_Fac, vet_fr, vet_Frac, vet_xi
    ];
    var separatriz = document.getElementById('separatriz').value;
    if (separatriz != 'nenhuma') {
        medidaSeparatriz();
    }
    gerarPainel(medidas);
    gerarTabela(matriz);
    gerarGrafico();

}

function calcularContinua(vet) {
    //1º passo achar a Atlitude, At = xmax-xmin
    //O rol já está ordenado, então a Atlitude é o ultimo elemento menos o primeiro
    var At = (vet[vet.length - 1]) - vet[0];
    var n = vet.length;
    var k = Math.round(Math.sqrt(n));

    var vet_class = [];
    vet_class.push(k);
    vet_class.unshift(vet_class[0] - 1);
    vet_class.push(vet_class[1] + 1);


    var continuar = true;
    var classe = null;

    do {

        At++;

        for (var i = 0; i < vet_class.length; i++) {
            if (At % vet_class[i] === 0 && classe === null) {
                continuar = false;
                classe = vet_class[i];
            }
        }
    } while (continuar);
    Ic = At / classe;
    Ic = parseInt(Ic);
    c = Ic;

    //Criação das classes
    vet_esq[0] = rol[0];
    for (i = 1; i <= classe; i++) {
        var j = i - 1;
        vet_dir[j] = vet_esq[j] + Ic;
        vet_esq[i] = vet_dir[j];
    }
    vet_esq.pop();

    //Numero de classes para ser exibido
    for (i = 0; i < classe; i++) {
        classi[i] = i + 1;
    }

    for (i = 0; i < classe; i++) {
        vet_ic[i] = vet_esq[i] + " |- " + vet_dir[i];
    }
    //Criação da frequencia simples
    total_fi = 0;
    for (i = 0; i < classe; i++) {
        cont = 0;
        for (j = 0; j < rol.length; j++) {
            if (rol[j] >= vet_esq[i] && rol[j] < vet_dir[i]) {
                cont++;
            }
        }
        total_fi += cont;
        vet_fi.push(cont);
    }
    vet_fi.push(total_fi);

    vet_Fac[0] = vet_fi[0];
    for (i = 1; i < classe; i++) {
        vet_Fac[i] = vet_Fac[i - 1] + vet_fi[i];
    }

    //criação do ponto medio de classe, xi
    for (i = 0; i < classe; i++) {
        vet_xi[i] = (vet_esq[i] + vet_dir[i]) / 2;
    }
}
//Construção da coluna do xi, tira todos os elementos repetidos
function calcularxiDiscreta(vet) {
    cont = 1;
    for (i = 0; i < vet.length; i++) {
        cont = 1;
        for (j = i + 1; j < vet.length; j++) {
            while (vet[i] == vet[j]) {
                cont++;
                vet.splice(j, cont - 1);
                cont = 1;
            }
        }
    }
}
//Construção da coluna da frequencia acumulada da contínua
function calcularFicontinua(vet2, vet3) {
    vet3[0] = vet2[0];
    for (i = 1; i < vet2.length; i++) {
        vet3[i] = vet3[i - 1] + vet2[i];
    }
    vet2.push(tfi);
}
//Construção das colunas de frequencia e frequencia acumulada
function calcularfieFidiscreta(vet, vet2, vet3) {
    for (i = 0; i < vet.length; i++) {
        for (j = i + 1; j < vet.length; j++) {
            if (vet[i] == vet[j]) {
                cont++;
                i++;
            }
        }
        if (cont > 1) {
            vet2.push(cont);
        } else {
            vet2.push(1);
        }
        cont = 1;
    }
    tfi = 0;
    for (i = 0; i < vet2.length; i++) {
        vet3[i] = vet[i] * vet2[i];
        tfi = vet2[i] + tfi;
    }
    vet3[0] = vet2[0];
    for (i = 1; i < vet2.length; i++) {
        vet3[i] = vet3[i - 1] + vet2[i];
    }
    vet2.push(tfi);
}
//Construção das colunas de frequencia relativa e frequencia relativa acumulada
function calcularfreFr(vet, vet2, vet3, vet4, tElementos) {
    for (i = 0; i < vet.length; i++) {
        vet3[i] = (vet[i] / tElementos) * 100;
        vet3[i] = Math.round(vet3[i]) + "%";
    }

    for (i = 0; i < vet3.length - 1; i++) {
        vet4[i] = (vet2[i] / tElementos) * 100;
        vet4[i] = Math.round(vet4[i]) + "%";
    }
}
//Construção da conluna xi*fi
function calcularxifi(vet, vet2, vet3) {
    total_xifi = 0;
    for (i = 0; i < vet.length; i++) {
        vet3[i] = vet[i] * vet2[i];
        total_xifi += vet3[i];
    }
    vet3.push(total_xifi);
}

function particao(vet, left, right) {
    var i, j, aux;
    i = left;
    for (j = left + 1; j <= right; ++j) {
        if (vet[j] < vet[left]) {
            ++i;
            aux = vet[i];
            vet[i] = vet[j];
            vet[j] = aux;
        }
    }
    aux = vet[left];
    vet[left] = vet[i];
    vet[i] = aux;
    return i;
}

function quicksort(vet, left, right) {
    var r;
    if (right > left) {
        r = particao(vet, left, right);
        quicksort(vet, left, r - 1);
        quicksort(vet, r + 1, right);
    }
}
//Média
function calcularMedia() {
    media = total_xifi / total_fi;
    media = media;

    medidas.push("Média = " + media.toFixed(2));
}
//calculando moda
function calcularModa() {
    var maior = vet_fi[0];
    for (i = 0; i < vet_fi.length - 1; i++) {
        if (maior < vet_fi[i]) {
            maior = vet_fi[i];
        }
    }
    moda = vet_xi[vet_fi.indexOf(maior)];
    medidas.push("Moda = " + moda);
    if (document.getElementById('variavel').value == 'quantiC') {
        modasKingCzuber(moda);
    }
}

function modasKingCzuber(moda) {
    var indice = vet_xi.indexOf(moda);
    var ponto_inferior = vet_esq[indice];
    var fPost = vet_fi[indice + 1];
    var fAnt = vet_fi[indice - 1];
    var fModal = vet_fi[indice];

    if (classi[indice] == 1) {
        fAnt = 0;
    }
    if (total_fi == fPost) {
        fPost = 0;
    }
    var moKing = ponto_inferior + (c * (fPost / (fAnt + fPost)));

    medidas.push("Moda de King = " + moKing.toFixed(2));

    var moCzuber = ponto_inferior + (c * (fModal - fAnt) / ((2 * fModal) - (fAnt + fPost)));

    medidas.push("Moda de Czuber = " + moCzuber.toFixed(2));
}
//calculando mediana discreta
function calcularMediana() {
    variavel = document.getElementById('variavel').value;
    var p1;
    var p2;
    if (total_fi % 2 == 0 && variavel != "quali") {

        p1 = total_fi / 2;
        p2 = p1 + 1;
        mediana = (rol[p1] + rol[p2]) / 2;
    } else {
        p1 = Math.round(total_fi / 2);
        mediana = rol[p1];
    }
    medidas.push("Mediana = " + mediana.toFixed(2));
}

function calcularMedianaC() {
    //primeira parte
    var p1;
    var p2;
    if (total_fi % 2 == 0) {
        p1 = total_fi / 2;
        p2 = p1 + 1;
        mediana = (rol[p1] + rol[p2]) / 2;
    } else {
        p1 = Math.round(total_fi / 2);
        mediana = rol[p1];
    }
    var posicao = rol.indexOf(mediana);
    classe_pesquisada = 0;
    Fac_ant = 0;
    ponto_inferior = 0;
    fi_classe = 0;

    for (i = 0; i < vet_Fac.length; i++) {
        if (posicao > vet_Fac[i] && posicao <= vet_Fac[i + 1]) {
            classe_pesquisada = classi[i + 1];
            ponto_inferior = vet_esq[i + 1];
            Fac_ant = vet_Fac[i];
            fi_classe = vet_fi[i + 1];
        }
    }
    if (classe_pesquisada === 1) {
        Fac_ant = 0;
        ponto_inferior = vet_esq[0];
        fi_classe = vet_fi[0];
    }

    mediana = ponto_inferior + ((p1 - Fac_ant) / fi_classe) * Ic;
    var moPearson = 3 * mediana - 2 * media;
    medidas.push("Moda de Pearson = " + moPearson.toFixed(2));
    medidas.push("Mediana = " + mediana.toFixed(2));
}

function calcularDP() {
    var pesquisa = document.getElementById('pesquisa').value;
    for (i = 0; i < vet_xi.length; i++) {
        DP += (Math.pow((vet_xi[i] - media), 2)) * vet_fi[i];
    }
    switch (pesquisa) {
        case "selecione":
            location.reload();
            alert("Selecione o tipo de pesquisa");
            break;

        case 'populacao':
            DP = Math.sqrt((DP / total_fi)).toFixed(2);
            break;

        case 'amostra':
            DP = Math.sqrt(DP / (total_fi - 1)).toFixed(2);
            break;
    }
    CV = ((DP / media) * 100).toFixed(2);

    medidas.push("Desvio Padrão = " + DP);
    medidas.push("Coeficiente de Variação = " + CV + "%");
}

function gerarTabela(matriz) {
    var variavel = document.getElementById('variavel').value;
    var nomeFi = document.getElementById('nomeFi').value;

    if (nomeFi.length == 0) {
        nomeFi = "fi";
    }
    var nomeVariavel = document.getElementById('nomeVariavel').value;
    if (nomeVariavel.length == 0 && variavel == "quantiC") {
        nomeVariavel = "Int.Classe";
    } else if (nomeVariavel.length == 0 && variavel == "quantiD") {
        nomeVariavel = "xi";
    }
    var tabela = document.getElementById("tabelaTeste");
    var cab = document.createElement("thead");
    var trhead = document.createElement("tr");
    var corpo = document.createElement("tbody");
    var head;

    if (variavel == 'quantiC') {
        head = ["Classes", nomeVariavel, nomeFi, "Fac", "fr", "Frac", "Ponto médio"];
    } else {
        head = [nomeVariavel, nomeFi, "Fac", "fr", "Frac"];
    }

    for (i = 0; i < head.length; i++) {
        var th = document.createElement("th");

        th.appendChild(document.createTextNode(head[i]));
        trhead.appendChild(th);
    }
    cab.appendChild(trhead);
    tabela.appendChild(cab);

    for (i = 0; i < vet_fi.length; i++) {
        var tr = document.createElement("tr");
        for (j = 0; j < head.length; j++) {
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(matriz[j][i]));
            tr.appendChild(td);
        }
        corpo.appendChild(tr);
    }
    tabela.appendChild(corpo);
    document.getElementById('tabela').style.display = 'block';
    document.getElementById('txtPainel').innerHTML = "Os elementos já foram ordenados e estão visíveis abaixo junto com a tabela";
}

function gerarPainel(medidas) {
    var painelMedidas = document.getElementById("medidas");
    var corpoMedidas = document.createElement("tbody");

    for (i = 0; i < medidas.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(medidas[i]));
        tr.appendChild(td);
        corpoMedidas.appendChild(tr);
    }
    painelMedidas.appendChild(corpoMedidas);
}
//Medida Separatriz
function medidaSeparatriz() {
    var separatriz = document.getElementById('separatriz').value;
    var variavel = document.getElementById('variavel').value;
    var n = document.getElementById("txtseparatriz").value;

    switch (separatriz) {
        case "Quartil":
            ms = 4;
            break;
        case "Quintil":
            ms = 5;
            break;
        case "Decil":
            ms = 10;
            break;
        case "Percentil":
            ms = 100;
            break;
    }
    var posicao = Math.round((n / ms) * total_fi) - 1;
    if (variavel == "quantiD") {
        medidas.push(((100 / ms) * n) + "% da série é igual a " + rol[posicao] + " ou - e " + ((100 / ms) * (ms - n)) + "% da série é igual a " + rol[posicao] + " ou +");
    } else {
        var Fac_ant = 0;
        var ponto_inferior = 0;
        var fi_classe = 0;

        for (i = 0; i < vet_Fac.length; i++) {
            if (posicao > vet_Fac[i] && posicao <= vet_Fac[i + 1]) {
                classe_pesquisada = classi[i + 1];
                ponto_inferior = vet_esq[i + 1];
                Fac_ant = vet_Fac[i];
                fi_classe = vet_fi[i + 1];
            } else {
                classe_pesquisada = 1;
            }
        }
        if (classe_pesquisada == 1) {
            Fac_ant = 0;
            ponto_inferior = vet_esq[0];
            fi_classe = vet_fi[0];
        }
        mediana = ponto_inferior + ((posicao - Fac_ant) / fi_classe) * Ic;
        medidas.push(((100 / ms) * n) + "% da série é igual a " + Math.round(mediana) + " ou - e " + ((100 / ms) * (ms - n)) + "% da série é igual a " + Math.round(mediana) + " ou +");
    }
}

function gerarGrafico() {
    var ctx = document.getElementsByClassName("line-chart");
    var nomeVariavel = document.getElementById('nomeVariavel').value;
    var nomeFi = document.getElementById('nomeFi').value;
    var tipoVariavel = document.getElementById('variavel').value;
    var tipoGraf;
    var titulo;
    var label;
    vet_xi.pop();
    vet_ic.pop();
    vet_fi.pop();
    switch (tipoVariavel) {
        case 'quali':
            tipoGraf = 'pie';
            titulo = "Variável Qualitativa";
            label = vet_xi;
            break;
        case 'quantiD':
            tipoGraf = 'bar';
            label = vet_xi;
            titulo = "Variável Quantitativa Discreta";
            break;
        case 'quantiC':
            tipoGraf = 'bar';
            label = vet_ic;
            titulo = "Variável Quantitativa Contínua";
            break;
    }
    var cores = ["#FF00FF", "#00BFFF", "#FFFF00", "#00FF00", "#D2691E", "#A0522D", "#4B0082", "#7B68EE", "#DC143C", "#FF8C00", "#F08080", "#8A2BE2", "#ff2200", "#00008B", "#228B22", "#4169E1", "#ADFF2F", "#DAA520", "#A0522D", "#4B0082", "#7B68EE", "#DC143C"];
    var chartGraph = new Chart(ctx, {
        type: tipoGraf,
        data: {
            labels: label,
            datasets: [{
                labels: nomeVariavel,
                data: vet_fi,
                backgroundColor: cores,
            }, ]
        },
        options: {
            title: {
                display: true,
                fontSize: 25,
                text: titulo
            },
            legend: {
                display: false,
            },
            animation: {
                animateScale: true
            },
            scales: {
                yAxes: [{
                    barPercentage: 0.9,
                    categoryPercentage: 0.9,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}