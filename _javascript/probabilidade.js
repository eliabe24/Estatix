function selecionar_dist() {
	var distribuicao = document.getElementById('distribuicao').value;
	switch (distribuicao) {
		case 'selecione':
			document.getElementById('entradaUniforme').style.display = "none";
			document.getElementById('entradaBinomial').style.display = "none";
			document.getElementById('entradaNormal').style.display = "none";
			document.getElementById('voltar').style.display = "inherit";
			break;

		case 'normal':
			document.getElementById('entradaNormal').style.display = "block";
			document.getElementById('entradaUniforme').style.display = "none";
			document.getElementById('entradaBinomial').style.display = "none";
			document.getElementById('voltar').style.display = "none";
			break;
		case 'uniforme':
			document.getElementById('entradaUniforme').style.display = "block";
			document.getElementById('entradaBinomial').style.display = "none";
			document.getElementById('entradaNormal').style.display = "none";
			document.getElementById('voltar').style.display = "none";
			break;
		case 'binomial':
			document.getElementById('entradaBinomial').style.display = "block";
			document.getElementById('entradaUniforme').style.display = "none";
			document.getElementById('entradaNormal').style.display = "none";
			document.getElementById('voltar').style.display = "none";
			break;

	}
}

function limpar() {
	var distribuicao = document.getElementById('distribuicao').value;

	switch (distribuicao) {
		case 'binomial':
			document.getElementById("K").value = "";
			document.getElementById('N').value = "";
			document.getElementById('P').value = "";
			document.getElementById('Q').value = "";
			document.getElementById('tabela').style.display = "none";
			break;
		case 'normal':
			document.getElementById("dados").value = "";
			document.getElementById("DP").value = "";
			document.getElementById("media").value = "";
			break;
		case 'uniforme':
			document.getElementById('numeros_intervalo').value = "";
			document.getElementById('ponto_min').value ="";
			document.getElementById('ponto_max').value ="";
			document.getElementById('opcaoUniforme').value ="selecione";
			break;
	}


}

function testar() {
	var distribuicao = document.getElementById('distribuicao').value;
	var erro = false;
	switch (distribuicao) {
		case 'normal':
			var opcao = document.getElementById("opcaoNormal").value;
			var dados = document.getElementById("dados").value;
			dados = dados.split(';');
			for (var i = 0; i < dados.length; i++) {
				dados[i] = parseFloat(dados[i].replace(',', '.'));
			}
			var DP = parseFloat(document.getElementById('DP').value) + 0;
			var media = parseFloat(document.getElementById('media').value) + 0;
			erro = false;

			for (i = 0; i < dados.length; i++) {
				if (isNaN(dados[i]) == true) {
					alert("Os dados digitados apresentam alguma inconsistencia,\n certifique-se de que você digitou apenas números e os separou com ponto e vírgula\n que os dados não possuem espaços entre eles");
					erro = true;
					break;
				}
			}
			if ((isNaN(media) == true || media == "") && erro != true) {
				alert("Voce precisa digitar um número no campo média");
				erro = true;
			}
			if ((isNaN(DP) == true || DP == "") && erro != true) {
				alert("Voce precisa digitar um número no campo Desvio Padrão");
				erro = true;
			}
			if (opcao == "selecione") {
				alert("Selecione uma opção");
				erro = true;
			}
			if (erro == false) {
				normal(opcao, dados, DP, media);
			}
			break;
		case 'binomial':
			var k = document.getElementById("K").value;
			var n = parseFloat(document.getElementById('N').value) + 0;
			var p = parseFloat(document.getElementById('P').value) + 0;
			var q = parseFloat(document.getElementById('Q').value) + 0;
			erro = false;

			k = k.split(';');
			for (i = 0; i < k.length; i++) {
				k[i] = parseFloat(k[i].replace(',', '.'));
			}
			for (i = 0; i < k.length; i++) {
				if (isNaN(k[i]) == true) {
					alert("Os dados digitados no campo K apresentam alguma inconsistencia,\n certifique-se de que você digitou apenas números e os separou com ponto e vírgula\n que os dados não possuem espaços entre eles");
					erro = true;
					break;
				}
			}
			if ((isNaN(n) == true || n == "") && erro != true) {
				alert("Voce precisa digitar um número no tamanho da amostra(N)");
				erro = true;
			}
			if ((isNaN(p) == true || p == "") && erro != true) {
				alert("Você precisa digitar um número no campo sucesso(P)");
				erro = true;
			}
			if ((isNaN(q) == true || q == "") && erro != true) {
				alert("Você precisa digitar um número no campo fracasso(Q)");
				erro = true;
			}
			if ((p + q) < 1) {
				erro = true;
				alert("Os valores do sucesso e do fracasso somados devem ser iguais a um\nOs dados estão incorretos, corrija para prosseguir");
			}
			if (erro == false) {
				binomial(k, n, p, q);
			}
			break;
		case 'uniforme':
			erro = false;
			var intervalo = document.getElementById('numeros_intervalo').value;
			var min = parseFloat(document.getElementById('ponto_min').value) + 0;
			var max = parseFloat(document.getElementById('ponto_max').value) + 0;
			var selecao = document.getElementById('opcaoUniforme').value;
			intervalo = intervalo.split(';');
			if (selecao == "entre" || selecao == "deate") {
				if (intervalo.length != 2) {
					alert("Digite dois números no campo intervalo");
					erro = true;
				}
			} else if (selecao == "maior" || selecao == "menor") {
				if (intervalo.length != 1) {
					alert("Digite apenas um número no campo intervalo");
					erro = true;
				}
			}

			for (i = 0; i < intervalo.length; i++) {
				intervalo[i] = parseFloat(intervalo[i].replace(',', '.'));
			}

			for (i = 0; i < intervalo.length; i++) {
				if (isNaN(intervalo[i]) == true) {
					alert("Os dados digitados no campo intervalo apresentam alguma inconsistencia,\n certifique-se de que você digitou apenas números e os separou com ponto e vírgula\n que os dados não possuem espaços entre eles");
					erro = true;
					break;
				}
			}
			if ((isNaN(min) == true || min == "") && erro != true) {
				alert("Voce precisa digitar um número no campo Ponto Mínimo");
				erro = true;
			}
			if ((isNaN(max) == true || max == "") && erro != true) {
				alert("Voce precisa digitar um número no campo Ponto Máximo");
				erro = true;
			}
			if (selecao == "selecione") {
				alert("Selecione uma opção");
				erro = true;
			}
			if (erro == false) {
				uniforme(intervalo, min, max, selecao);
			}
			break;
	}
}

function binomial(k, n, p, q) {

	document.getElementById('resultado').innerHTML = " ";

	var probabilidade = [];
	var total = 0;

	for (i = 0; i < k.length; i++) {
		var resultado = fatorial(n) / (fatorial(k[i]) * fatorial(n - k[i]));
		probabilidade[i] = ((resultado * (Math.pow(p, k[i]) * Math.pow(q, n - k[i]))) * 100);
		total += probabilidade[i];
		probabilidade[i] = " Probabilidade de " + k[i] + " = " + probabilidade[i].toFixed(2) + "%";
	}
	probabilidade.push("Total = " + total.toFixed(2) + "%");
	painelResultado(probabilidade);
	document.getElementById('tabela').style.display = "block";
}

function normal(opcao, dados, DP, media) {
	var z = [];
	var zReta = [];
	var mediaReta = 0;
	var lado = 0.5;
	var p1 = [];
	var p2 = [];
	var pTabela = [];
	var pTabela2 = [];

	var tabela = [
		['z0', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0.0, 0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
		[0.1, 0.0398, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0753],
		[0.2, 0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
		[0.3, 0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
		[0.4, 0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
		[0.5, 0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
		[0.6, 0.2257, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2518, 0.2549],
		[0.7, 0.2580, 0.2611, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
		[0.8, 0.2881, 0.2910, 0.2939, 0.2967, 0.2995, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
		[0.9, 0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
		[1.0, 0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
		[1.1, 0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
		[1.2, 0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
		[1.3, 0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
		[1.4, 0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
		[1.5, 0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
		[1.6, 0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
		[1.7, 0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
		[1.8, 0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
		[1.9, 0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
		[2.0, 0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4803, 0.4808, 0.4812, 0.4817],
		[2.1, 0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
		[2.2, 0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
		[2.3, 0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
		[2.4, 0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
		[2.5, 0.4938, 0.4940, 0.4941, 0.4943, 0.4945, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
		[2.6, 0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
		[2.7, 0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
		[2.8, 0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
		[2.9, 0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
		[3.0, 0.4987, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
		[3.1, 0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
		[3.2, 0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
		[3.3, 0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
		[3.4, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
		[3.5, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
		[3.6, 0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
		[3.7, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
		[3.8, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
		[3.9, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000]
	];

	switch (opcao) {
		case 'entre':
			if (dados.length != 2) {
				alert("Você pode digitar até dois números");
				location.reload();
			}
			//testa se os numeros sao iguais a media
			if (dados[0] == media) {

				z.push(((dados[1] - media) / DP).toFixed(2));
				if (z[0] < 0) {
					p1.push(z[0].substring(1, 4));
					p2.push(z[0].substring(4, 5));
				} else {
					p1.push(z[0].substring(0, 3));
					p2.push(z[0].substring(3, 4));
				}

			}
			if (dados[1] == media) {
				z.push(((dados[0] - media) / DP).toFixed(2));
				if (z[0] < 0) {
					p1.push(z[0].substring(1, 4));
					p2.push(z[0].substring(4, 5));
				} else {
					p1.push(z[0].substring(0, 3));
					p2.push(z[0].substring(3, 4));
				}
			}
			if (dados[0] != media && dados[1] != media) {
				for (i = 0; i < dados.length; i++) {
					z.push(((dados[i] - media) / DP).toFixed(2));
					if (z[i] < 0) {
						p1.push(z[i].substring(1, 4));
						p2.push(z[i].substring(4, 5));
					} else {
						p1.push(z[i].substring(0, 3));
						p2.push(z[i].substring(3, 4));
					}
				}
			}
			//convertendo o numero de acordo com a tabela
			pesquisaTabela(tabela, z, p1, p2, zReta, pTabela, pTabela2);
			if (zReta.length == 1) {
				zReta.unshift(0);
			}
			if (zReta[0] != 0) {
				if ((z[0] > 0 && z[1] > 0) || (z[0] < 0 && z[1] < 0)) {
					prob = ((zReta[1] - zReta[0]) * 100).toFixed(2);
					if (prob < 0) {
						prob = prob.substring(1, 6);
					}

				} else {
					prob = ((zReta[0] + zReta[1]) * 100).toFixed(2);

				}
			} else {
				prob = ((zReta[0] + zReta[1]) * 100).toFixed(2);

			}
			break;
		case 'maior':
			if (dados.length != 1) {
				alert("Você pode digitar apenas 1 número nesta opção");
				location.reload();
			}

			z.push(((dados[0] - media) / DP).toFixed(2));
			if (z[0] < 0) {
				p1.push(z[0].substring(1, 4));
				p2.push(z[0].substring(4, 5));
			} else {
				p1.push(z[0].substring(0, 3));
				p2.push(z[0].substring(3, 4));
			}
			pesquisaTabela(tabela, z, p1, p2, zReta, pTabela, pTabela2);

			if (z[0] > 0) {
				prob = ((0.5 - zReta[0]) * 100).toFixed(2);

			} else {
				prob = ((0.5 + zReta[0]) * 100).toFixed(2);

			}
			break;
		case 'menor':
			if (dados.length != 1) {
				alert("Você pode digitar apenas 1 número nesta opção");
				location.reload();
			}

			z.push(((dados[0] - media) / DP).toFixed(2));
			if (z[0] < 0) {
				p1.push(z[0].substring(1, 4));
				p2.push(z[0].substring(4, 5));
			} else {
				p1.push(z[0].substring(0, 3));
				p2.push(z[0].substring(3, 4));
			}
			pesquisaTabela(tabela, z, p1, p2, zReta, pTabela, pTabela2);

			if (z[0] < 0) {
				prob = ((0.5 - zReta[0]) * 100).toFixed(2);

			} else {
				prob = ((0.5 + zReta[0]) * 100).toFixed(2);

			}
			break;
	}
	if (prob < 0) {
		prob = prob + (prob * 2);
	}
	prob = prob.replace('.', ',');
	prob = prob + "%";
	document.getElementById('prob').innerHTML = "Probabilidade = " + prob;
}

function fatorial(numero) {
	if (numero == 0) {
		return 1;
	} else {
		var resultado = 1;
		for (var i = 1; i <= numero; i++) {
			resultado *= i;
		}
		return resultado;
	}
}

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

function pesquisaTabela(tabela, z, p1, p2, zReta, pTabela, pTabela2) {
	for (i = 0; i < z.length; i++) {
		for (j = 0; j < tabela.length; j++) {
			if (p1[i] == tabela[j][0]) {
				pTabela.push(j);
			}
		}
		for (j = 0; j < tabela[0].length; j++) {
			if (p2[i] == tabela[0][j]) {
				pTabela2.push(j);
			}
		}
		zReta.push(tabela[pTabela[i]][pTabela2[i]]);
	}
}

function uniforme(intervalo, min, max, selecao) {
	
	var num;
	var mostrar = [];
	var media = (max + min) / 2;
	mostrar.push("Média = " + media.toFixed(2));
	var DP = Math.sqrt((Math.pow((max - min), 2) / 12));
	mostrar.push("Desvio Padrão = " + DP.toFixed(2));
	mostrar.push("Coeficiente de Variação " + ((DP / media) * 100).toFixed(2) + "%");
	switch (selecao) {
		case "entre":
			if (intervalo[0] > intervalo[1]) {
				num = intervalo[0] - intervalo[1];
			} else {
				num = intervalo[1] - intervalo[0];
			}
			break;
		case "maior":
			num = max - intervalo[0];
			break;
		case "menor":
			num = intervalo[0] - min;
			break;
		case "deate":
			num = (intervalo[1] - 1) - intervalo[0];
			break;
	}

	var prob = (1 / (max - min)) * num;
	prob = prob * 100;
	mostrar.push("Probabilidade = " + prob.toFixed(2) + "%");

	painelResultado(mostrar);
	document.getElementById('tabela').style.display = "block";
}