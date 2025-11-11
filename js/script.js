// --- ELEMENTOS DO DOM ---
const modoSelect = document.getElementById('modo');
const labelEntrada = document.getElementById('label-entrada');
const valorEntrada = document.getElementById('valor-entrada');
const btnConverterA = document.getElementById('btn-converter-a');
const btnConverterB = document.getElementById('btn-converter-b');
const valorResultado = document.getElementById('valor-resultado');
const cotacaoInfo = document.getElementById('cotacao-info');
const taxaCambioDisplay = document.getElementById('taxa-cambio');

// --- ESTADO DA APLICAÇÃO ---
let taxaCambioBRL = 0; // 1 USD = X BRL
const API_URL = 'https://api.frankfurter.dev/latest?from=USD&to=BRL';

// --- FUNÇÕES ---

/**
 * Busca a taxa de câmbio mais recente da API.
 */
async function buscarTaxaCambio() {
    taxaCambioDisplay.textContent = 'Buscando...';
    taxaCambioDisplay.classList.add('loading-text'); // Adiciona classe para feedback visual

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro de rede ao buscar cotação.');
        }
        const data = await response.json();
        taxaCambioBRL = data.rates.BRL;

        if (taxaCambioBRL) {
            const taxaFormatada = taxaCambioBRL.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            taxaCambioDisplay.textContent = `1 USD = ${taxaFormatada}`;
        } else {
            taxaCambioDisplay.textContent = 'Taxa não disponível.';
        }
    } catch (error) {
        console.error("Erro na API:", error);
        taxaCambioDisplay.textContent = 'Erro ao buscar cotação.';
    } finally {
        taxaCambioDisplay.classList.remove('loading-text'); // Remove a classe ao finalizar
    }
}

/**
 * Converte o valor de entrada com base no modo e direção.
 * @param {'A' | 'B'} direcao - A direção da conversão.
 */
function converter(direcao) {
    const modo = modoSelect.value;
    const valor = parseFloat(valorEntrada.value);

    if (isNaN(valor)) {
        valorResultado.textContent = 'Insira um valor numérico válido.';
        return;
    }

    let resultado;
    let descricao;

    if (modo === 'temperatura') {
        if (direcao === 'A') { // C -> F
            resultado = (valor * 9 / 5) + 32;
            descricao = `${valor}°C = ${resultado.toFixed(2)}°F`;
        } else { // F -> C
            resultado = (valor - 32) * 5 / 9;
            descricao = `${valor}°F = ${resultado.toFixed(2)}°C`;
        }
    } else { // modo === 'moeda'
        if (taxaCambioBRL === 0) {
            valorResultado.textContent = 'Cotação de moeda não disponível.';
            return;
        }
        if (direcao === 'A') { // BRL -> USD
            resultado = valor / taxaCambioBRL;
            descricao = `${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} = ${resultado.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
        } else { // USD -> BRL
            resultado = valor * taxaCambioBRL;
            descricao = `${valor.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} = ${resultado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
        }
    }
    valorResultado.textContent = descricao;
}

/**
 * Atualiza a UI (rótulos, botões, placeholders) com base no modo selecionado.
 */
function atualizarUI() {
    const modo = modoSelect.value;
    valorEntrada.value = '';
    valorResultado.textContent = 'Aguardando conversão...';
    validarEntrada(); // Valida para desabilitar/habilitar botões

    if (modo === 'temperatura') {
        labelEntrada.textContent = 'Valor para converter:';
        valorEntrada.placeholder = 'Ex: 10';
        btnConverterA.textContent = '℃ para ℉';
        btnConverterB.textContent = '℉ para ℃';
        cotacaoInfo.style.display = 'none';
    } else { // modo === 'moeda'
        labelEntrada.textContent = 'Valor para converter:';
        valorEntrada.placeholder = 'Ex: 50,00';
        btnConverterA.textContent = 'R$ para U$';
        btnConverterB.textContent = 'U$ para R$';
        cotacaoInfo.style.display = 'block';
        if (taxaCambioBRL === 0) {
            buscarTaxaCambio();
        }
    }
}

/**
 * Valida a entrada do usuário para habilitar/desabilitar os botões de conversão.
 */
function validarEntrada() {
    const valorValido = valorEntrada.value.trim() !== '' && !isNaN(parseFloat(valorEntrada.value));
    btnConverterA.disabled = !valorValido;
    btnConverterB.disabled = !valorValido;
}

// --- EVENT LISTENERS ---

// Muda a UI ao trocar o modo de conversão
modoSelect.addEventListener('change', atualizarUI);

// Converte ao clicar nos botões
btnConverterA.addEventListener('click', () => converter('A'));
btnConverterB.addEventListener('click', () => converter('B'));

// Valida a entrada em tempo real
valorEntrada.addEventListener('input', validarEntrada);

// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    atualizarUI();
    buscarTaxaCambio(); // Busca a cotação em segundo plano ao carregar
});