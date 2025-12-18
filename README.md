# NexusPay - Landing Page

Uma landing page moderna e production-ready para um gateway de pagamentos fictício, construída com foco em performance, SEO e acessibilidade.

![Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)

## ✨ Features

- **Design Moderno** - Glassmorphism, gradientes e animações suaves
- **Responsivo** - Otimizado para desktop, tablet e mobile
- **SEO Otimizado** - Meta tags, Open Graph e Twitter Cards
- **Acessível** - ARIA labels, skip links e suporte a screen readers
- **Performance** - CSS e JS modulares, preconnect para fontes
- **PWA Ready** - Web manifest e favicon SVG

## 🚀 Quick Start

1. Clone o repositório:
```bash
git clone https://github.com/NeoticoZ/nexus-example-lp.git
```

2. Abra o `index.html` no navegador ou use um servidor local:
```bash
npx serve .
```

## 📁 Estrutura

```
nexus-lp/
├── index.html          # HTML principal
├── css/
│   └── styles.css      # Estilos com design tokens
├── js/
│   └── app.js          # JavaScript modular
├── favicon.svg         # Favicon SVG
├── robots.txt          # Configuração SEO
└── site.webmanifest    # PWA manifest
```

## 🎨 Tecnologias

- **HTML5** - Semântico e acessível
- **Tailwind CSS v4** - Via CDN para prototipagem rápida
- **CSS Custom Properties** - Design tokens para cores e transições
- **Vanilla JavaScript** - Sem dependências, modular com IIFE

## ♿ Acessibilidade

- Skip link para navegação por teclado
- Atributos ARIA em elementos interativos
- Suporte a `prefers-reduced-motion`
- Focus styles visíveis
- Estrutura semântica com `<main>`, `<nav>`, `<section>`

## 📱 Seções

1. **Hero** - Headline com animação de texto gradiente e mockup 3D do dashboard
2. **Trust Bar** - Marquee com logos de empresas parceiras
3. **Features** - 6 cards com recursos do produto
4. **Integrações** - Grid de plataformas compatíveis
5. **Preços** - Cards de taxas (Pix, Cartão, Boleto)
6. **Footer** - Links e informações legais

## 🔧 Customização

### Cores
Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --color-primary: #22c55e;
    --color-bg-primary: #000000;
    --color-text-primary: #ffffff;
}
```

### Conteúdo
Edite diretamente o `index.html` para alterar textos, links e imagens.

## 📄 Licença

Este projeto é apenas um exemplo/template para fins educacionais.

---

Feito com 💚
