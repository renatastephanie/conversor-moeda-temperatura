# 🌡️ Conversor Universal de Moeda e Temperatura 💸

Este é um projeto de portfólio que demonstra habilidades essenciais em desenvolvimento web Front-end, incluindo a manipulação do DOM, estilização com variáveis CSS, e o consumo de APIs externas para dados em tempo real.

O projeto permite ao usuário alternar entre dois modos de conversão:

1.  **Temperatura:** Converte entre Celsius (C°) e Fahrenheit (F°).
2.  **Moeda:** Converte entre Real Brasileiro (R$) e Dólar Americano (U$).

---

## ✨ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estrutura semântica (`<main>`, `<section>`, `<header>`, `<footer>`) e acessível da página. |
| **CSS3** | Estilização moderna utilizando **Variáveis CSS** (Custom Properties) para gerenciar o tema e a paleta de cores. |
| **JavaScript (ES6+)** | Lógica de conversão, manipulação do DOM e comunicação assíncrona com a API. |
| **API Externa** | **Frankfurter API** (`https://api.frankfurter.dev/`) para obter a cotação do Dólar em tempo real. |

---

## 🎨 Paleta de Cores

O projeto utiliza uma paleta de cores coesa e com bom contraste, totalmente configurada via variáveis CSS (`:root`), o que facilita a manutenção e futuras alterações de tema.

| Variável CSS | Código Hex | Descrição |
| :--- | :--- | :--- |
| `--cor-primaria` | `#594F3B` | Fundo principal da página. |
| `--cor-secundaria` | `#776258` | Fundo do container principal do conversor. |
| `--cor-acento-1` | `#896279` | Cor base para botões e interações. |
| `--cor-acento-2` | `#9C7CA5` | Cor de destaque em *hover* e elementos ativos. |
| `--cor-fundo-claro` | `#ADB2D3` | Cor para textos e elementos de alto contraste. |

---

## 🚀 Como Executar o Projeto Localmente

Siga estes passos simples para rodar o projeto em sua máquina:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/renatastephanie/conversor-moeda-temperatura](https://github.com/renatastephanie)
    ```
2.  **Entre na Pasta:**
    ```bash
    cd conversor-moeda-temperatura
    ```
3.  **Abra no Navegador:**
    Abra o arquivo `index.html` diretamente no seu navegador. Você também pode usar a extensão "Live Server" no VS Code para uma visualização com recarregamento automático.

## ⚙️ Funcionalidades Chave

* **Alternância de Modo:** Um seletor (`<select>`) permite trocar instantaneamente a interface e a lógica de conversão entre Temperatura e Moeda.
* **API Assíncrona:** A cotação do Dólar é buscada e exibida em tempo real utilizando `fetch()` no JavaScript, garantindo dados atualizados.
* **Validação Simples:** O código lida com entradas não numéricas.
* **Design Responsivo:** A interface é adaptável a diferentes tamanhos de tela (desktop e mobile) através de *Media Queries*.

---

## 🧑‍💻 Desenvolvedor

Este projeto foi desenvolvido por:

**Renata Stephanie**

[![GitHub Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/renatastephanie) 
[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/renata-stephanie/)

## Para visualizar o projeto, clique no link abaixo:

[🔗Clique Aqui](https://renatastephanie.github.io/conversor-moeda-temperatura/)
---