
document.getElementById('formulario').addEventListener('submit', cadastrarVeiculo);

function cadastrarVeiculo(e){
	
	var modeloVeiculo = document.getElementById('modeloVeiculo').value.trim().toUpperCase();
	var placaVeiculo = document.getElementById('placaVeiculo').value.trim().toUpperCase();
	var precoHora = document.getElementById('precoHora').value;
	var horaEntrada = new Date();

	if(modeloVeiculo == "" || placaVeiculo == "" || precoHora == ""){
		
		alert("Preencha todos os campos!");
		return false;
	} 

	// Cria objeto com os dados preenchidos

	var veiculo = {
		modelo: modeloVeiculo,
		placa: placaVeiculo,
		preco: precoHora,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes() 	
	};

	if(localStorage.getItem('patio') === null){
		var veiculos = [];
		veiculos.push(veiculo);
		localStorage.setItem('patio', JSON.stringify(veiculos));
	} else {
		var veiculos = JSON.parse(localStorage.getItem('patio'));
		veiculos.push(veiculo);
		localStorage.setItem('patio', JSON.stringify(veiculos));
	}

	document.getElementById('formulario').reset();

	mostraPatio();

	e.preventDefault();
}
function confirma(placa){

	var c = confirm("Deseja realmente excluir?");

	if (c) {
		removeVeiculo(placa);
		console.log('Carro removido!');
	} else {
		console.log('Carro não removido!');
		return false;
	}

}


function removeVeiculo(placa){
	var patio = JSON.parse(localStorage.getItem('patio'));
	console.log(patio);


	for(var i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
}

function calculaHoras(placa, preco, horas, minutos) {
	var tot = 0;
	var preco = parseInt(preco);
	var horas = parseInt(horas);
	var minutos = parseInt(minutos);

	var total = document.getElementById('total');
	clear = document.getElementById('clear');

	var date = new Date();
	var horaAtual = parseInt(date.getHours());
	var minAtual = parseInt(date.getMinutes());

	var qtdHoras = horaAtual - horas;

	var qtdMinutos = minAtual - minutos;

	var precoHora = qtdHoras  *preco;

	var precoMin = (qtdMinutos/60) * preco;

	if (precoHora == 0){
		tot = precoMin.toFixed(2);
		
	} else {
		tot = (precoHora + precoMin).toFixed(2);
	}

	total.style.border = " 2px solid black";



	total.innerHTML ='R$: ' + tot;
	
}

function mostrarTudo(num) {
	
	if (num ==1) {
		mostraPatio();		
	}
	document.getElementById('total').innerHTML = '';
	document.getElementById('esconde').innerHTML = 'Esconder todos';
	document.getElementById('tabela').style.display = "block";
	document.getElementById('esconde').style.display = "inline-block";
	document.getElementById('mostra').style.display = "none";
	document.getElementById('total').style.display = "block";
}

function escondeTudo() {
	document.getElementById('tabela').style.display = "none";
	document.getElementById('mostra').style.display = "inline-block";
	document.getElementById('esconde').style.display = "none";
	document.getElementById('total').style.display = "none";
	clear.style.display = "none";
}

function pesquisar() {	
	var pesq = document.getElementById('procurar').value.trim().toUpperCase();
	veiculos = JSON.parse(localStorage.getItem('patio'));

	var patioResultado = document.getElementById('resultados');


	for (var i = 0; i < veiculos.length; i++){

		if (pesq == veiculos[i].placa) {
			var modelo = veiculos[i].modelo;
			var placa = veiculos[i].placa;
			var preco = veiculos[i].preco;
			var hora = veiculos[i].hora;
			var minutos = veiculos[i].minutos;
			patioResultado.innerHTML = '<tr><td>'+ modelo + '</td>'+
			'<td>'+ placa + '</td>' +
			'<td>'+ preco + '</td>' +
			'<td>'+ hora + ':' + minutos + '</td>' +
			'<td><button type="button" class="btn btn-primary" onclick="calculaHoras(\''+ placa +'\',\''+ preco +'\',\''+ hora +'\',\''+ minutos +'\')"> calcular R$ </button></td>'+
			'<td><button type="button" class="btn btn-danger" onclick="confirma(\'' +placa + '\')" > Excluir</button></td>'+
			'</tr>';

			mostrarTudo(0);
			document.getElementById('esconde').innerHTML = 'Esconder';
			document.getElementById('procurar').style.border= "none";
			return true;
		} else{
			document.getElementById('procurar').style.border= "2px solid red";
			alert('Não existe');
			return false;
		}

	}
}



function mostraPatio(){
	var veiculos = JSON.parse(localStorage.getItem('patio'));
	var patioResultado = document.getElementById('resultados');

	patioResultado.innerHTML = '';

	for(var i = 0; i < veiculos.length; i++){
		var modelo = veiculos[i].modelo;
		var placa = veiculos[i].placa;
		var preco = veiculos[i].preco;
		var hora = veiculos[i].hora;
		var minutos = veiculos[i].minutos;
		patioResultado.innerHTML += '<tr><td>'+ modelo + '</td>'+
		'<td>'+ placa + '</td>' +
		'<td>'+ preco + '</td>' +
		'<td>'+ hora + ':' + minutos + '</td>' +
		'<td><button type="button" class="btn btn-primary" onclick="calculaHoras(\''+ placa +'\',\''+ preco +'\',\''+ hora +'\',\''+ minutos +'\')"> calcular R$ </button></td>'+
		'<td><button type="button" class="btn btn-danger" onclick="confirma(\'' +placa + '\')" > Excluir</button></td>'+
		'</tr>';
	}
}


