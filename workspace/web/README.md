# Cardápio Web

Projeto React + Vite com SCSS modular, pensado para compor páginas com componentes reutilizáveis.

## Scripts

- `npm install` – instala dependências
- `npm run dev` – ambiente de desenvolvimento (default em `http://localhost:5173`)
- `npm run build` – build para produção (gera `dist/`)
- `npm run preview` – serve o build localmente

## Estrutura de pastas

- `src/main.tsx` – bootstrap do React
- `src/App.tsx` – conecta rotas/páginas
- `src/pages/` – páginas (ex.: `Home.tsx`)
- `src/components/` – componentes divididos em `layout/` e `ui/`
- `src/styles/` – SCSS global, variáveis e mixins
- `vite.config.ts` – aliases (`@`, `@styles`, `@components`, `@pages`)

## Começando

1. Na pasta `web`, instale as dependências: `npm install`
2. Rode o dev server: `npm run dev`
3. Crie novas páginas em `src/pages` e componha com blocos de `src/components`
4. Para novos estilos globais, use `src/styles/variables.scss` e `mixins.scss`
