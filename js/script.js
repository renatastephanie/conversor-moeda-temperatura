// Constantes para elementos do DOM
const modoSelect = document.getElementById('modo');
const labelEntrada = document.getElementById('label-entrada');
const valorEntrada = document.getElementById('valor-entrada');
const btnConverterA = document.getElementById('btn-converter-a');
const btnConverterB = document.getElementById('btn-converter-b');
const valorResultado = document.getElementById('valor-resultado');
const cotacaoInfo = document.getElementById('cotacao-info');
const taxaCambioDisplay = document.getElementById('taxa-cambio');

// Variáveis de Configuração da API
let taxaCambioBRL = 0; // Armazena a taxa: 1 USD = X BRL

const FASTFOREX_API_KEY = "c3ee243b19-7eb4abf772-t5xm97"; 


// --- 1. LÓGICA DA API (Cotação Real) ---

/**
 * Busca a taxa de câmbio USD para BRL na API FastForex.
 */
async function buscarTaxaCambio() {
    taxaCambioDisplay.textContent = 'Buscando...';
    const API_URL = `https://api.fastforex.io/fetch-multi?from=USD&to=BRL&api_key=${FASTFOREX_API_KEY}`;

    try {
        if (FASTFOREX_API_KEY === "INSIRA_SUA_CHAVE_AQUI") {
            throw new Error('Por favor, insira sua API Key do FastForex no código JavaScript.');
        }

        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.error) {
            throw new Error(`Erro da API: ${data.error}`);
        }
        
        const taxa = data.results.BRL; 

        if (taxa && typeof taxa === 'number') {
            taxaCambioBRL = taxa;
            taxaCambioDisplay.textContent = `1 U$ = ${taxaCambioBRL.toFixed(4)} R$`;
        } else {
            throw new Error('Taxa de câmbio BRL inválida ou não encontrada na resposta da API.');
        }

    } catch (error) {
        console.error("Erro na API:", error);
        taxaCambioDisplay.textContent = 'Erro ao carregar cotação.';
        taxaCambioBRL = 0; 
    }
}

// --- 2. LÓGICA DE CONVERSÃO ---

/**
 * Converte um valor de Celsius para Fahrenheit.
 * @param {number} celsius - A temperatura em Celsius.
 * @returns {number} A temperatura em Fahrenheit.
 */
function celsiusParaFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

/**
 * Converte um valor de Fahrenheit para Celsius.
 * @param {number} fahrenheit - A temperatura em Fahrenheit.
 * @returns {number} A temperatura em Celsius.
 */
function fahrenheitParaCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

/**
 * Realiza a conversão com base no modo e na direção.
 * @param {string} direcao - A direção da conversão ('A' ou 'B').
 */
function converter(direcao) {
    const modo = modoSelect.value;
    const valor = parseFloat(valorEntrada.value);

    // Validação básica de entrada
    if (isNaN(valor) || valor === null) {
        valorResultado.textContent = 'Insira um valor numérico válido.';
        return;
    }
    
    // Validação específica para Moeda
    if (modo === 'moeda' && taxaCambioBRL === 0) {
        valorResultado.textContent = 'A cotação ainda não carregou. Tente novamente.';
        buscarTaxaCambio();
        return; 
    }

    let resultado;

    if (modo === 'temperatura') {
        if (direcao === 'A') { // C° para F°
            resultado = celsiusParaFahrenheit(valor);
            valorResultado.textContent = `${resultado.toFixed(2)} F°`;
        } else { // F° para C°
            resultado = fahrenheitParaCelsius(valor);
            valorResultado.textContent = `${resultado.toFixed(2)} C°`;
        }
    } else { // modo === 'moeda'
        if (direcao === 'A') { // R$ para U$
            resultado = valor / taxaCambioBRL;
            valorResultado.textContent = `U$ ${resultado.toFixed(2)}`;
        } else { // U$ para R$
            resultado = valor * taxaCambioBRL;
            valorResultado.textContent = `R$ ${resultado.toFixed(2)}`;
        }
    }
}

// --- 3. LÓGICA DE ATUALIZAÇÃO DA INTERFACE (UI) ---

/**
 * Atualiza a UI com base no modo selecionado.
 */
function atualizarUI() {
    const modo = modoSelect.value;
    
    valorResultado.textContent = 'Aguardando conversão...';
    valorEntrada.value = '';

    if (modo === 'temperatura') {
        labelEntrada.textContent = 'Valor em Celsius (C°):'; // Padrão inicial
        btnConverterA.textContent = 'C° para F°';
        btnConverterB.textContent = 'F° para C°';
        cotacaoInfo.style.display = 'none';
    } else {
        labelEntrada.textContent = 'Valor em Real (R$):';
        btnConverterA.textContent = 'R$ para U$';
        btnConverterB.textContent = 'U$ para R$';
        cotacaoInfo.style.display = 'block';
        
        if (taxaCambioBRL === 0) {
            buscarTaxaCambio(); 
        } else {
            taxaCambioDisplay.textContent = `1 U$ = ${taxaCambioBRL.toFixed(4)} R$`;
        }
    }
}

// --- 4. CONFIGURAÇÃO DE EVENT LISTENERS ---

modoSelect.addEventListener('change', atualizarUI);

// Eventos de clique nos botões de conversão
btnConverterA.addEventListener('click', () => {
    if (modoSelect.value === 'temperatura') {
        labelEntrada.textContent = 'Valor em Celsius (C°):';
    }
    converter('A');
});

btnConverterB.addEventListener('click', () => {
    if (modoSelect.value === 'temperatura') {
        labelEntrada.textContent = 'Valor em Fahrenheit (F°):';
    }
    converter('B');
});

// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    atualizarUI();
    buscarTaxaCambio(); 
});