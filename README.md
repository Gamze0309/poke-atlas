# 🧭 Poke Atlas

> A modern **Pokédex web application** built with **Next.js**, **React**, and **Redux Toolkit**.  
> Poke Atlas allows users to explore detailed Pokémon information — including abilities, evolution chains, and stats — through a clean, responsive, and automated development workflow.

---

## 🌟 Features

- 🔍 **Pokémon Search & Pagination** — browse and navigate through Pokémon lists easily
- 📜 **Detailed Pokémon Pages** — view stats, abilities, and evolution chains
- ⚡ **Fast & Responsive UI** — powered by Next.js and React Bootstrap
- 💾 **State Management** — Redux Toolkit
- 🔁 **Dynamic Routing** — Next.js routes for `/main/[pageNumber]` and `/pokemonDetail/[pokemonName]`
- 🧩 **Component-Based Architecture** — modular and maintainable React components
- ✅ **Test Coverage** — Jest unit tests for Redux reducers and components

---

## 🛠️ Tech Stack

| Layer                | Technology                              |
| -------------------- | --------------------------------------- |
| **Framework**        | Next.js 14                              |
| **Frontend**         | React 18 + TypeScript + React Bootstrap |
| **State Management** | Redux Toolkit                           |
| **HTTP Client**      | Axios                                   |
| **Testing**          | Jest                                    |
| **Styling**          | CSS Modules, Bootstrap                  |
| **CI/CD**            | GitHub Actions                          |
| **Deployment**       | Vercel-ready setup                      |

---

## 📸 Demo / Screenshots

<img src="https://github.com/Gamze0309/poke-atlas/assets/28878225/eedc7ca7-d875-4fae-865c-913d378011b4" alt="Home Page Screenshot" width="500"/>
<img src="https://github.com/Gamze0309/poke-atlas/assets/28878225/54c1e375-9738-46a1-bb07-6df2da3dcdf1" alt="Detail Page Screenshot" width="500"/>

---

## 🚀 Getting Started

### 🧩 Prerequisites

Make sure you have installed:

- **Node.js** ≥ 18
- **npm** or **yarn**

### ⚙️ Installation

```bash
git clone https://github.com/yourusername/poke-atlas.git
cd poke-atlas
npm install
```

---

## ⚙️ Continuous Integration (CI)

This project includes a **GitHub Actions CI pipeline** located at:  
`.github/workflows/ci.yml`

### 🔄 What It Does

Each time code is **pushed** or a **pull request** is created, the CI workflow automatically:

1. 🧱 Installs dependencies using `npm ci`
2. 🧪 Runs Jest tests to ensure code integrity
3. 💅 Runs ESLint to enforce coding standards
4. ⚙️ Builds the project using Next.js

### ✅ Benefits

- Ensures code is stable before merging
- Prevents broken builds from reaching production
- Enforces consistent code quality automatically

You can view the pipeline status with this badge:

[![CI](https://github.com/gamze0309/poke-atlas/actions/workflows/ci.yml/badge.svg)](https://github.com/gamze0309/poke-atlas/actions)

---

## 📚 Project Structure

poke-atlas/
├── public/ # Static assets
├── src/
│ └── app/
│ ├── components/ # Reusable UI components
│ ├── redux/ # Redux store and reducers
│ ├── main/[pageNumber]/page.tsx
│ ├── pokemonDetail/[pokemonName]/page.tsx
│ ├── globals.css
│ └── layout.tsx
├── .github/workflows/ci.yml # CI pipeline config
├── package.json
├── tsconfig.json
└── README.md

```

---

## 🧠 How It Works

1. **Data Source:** Pokémon data is fetched from the [PokéAPI](https://pokeapi.co/).
2. **State Management:** Redux Toolkit handles Pokémon list, details, and caching.
3. **Routing:**
   - `/main/[pageNumber]` → paginated Pokémon list
   - `/pokemonDetail/[pokemonName]` → Pokémon details page
4. **CI/CD:** GitHub Actions automatically tests, lints, and builds every commit to ensure stability.
```
