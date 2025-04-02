# 🚀 Todo App

Une application moderne de gestion de tâches, construite avec React en frontend et NestJS en backend.

## ✨ Fonctionnalités

- ✅ **Gestion de tâches** - Ajout, modification et suppression de tâches
- 🔍 **Recherche** - Filtrage des tâches par mot-clé
- 🏷️ **Filtres par statut** - Organisation des tâches selon leur statut (À faire, En cours, Terminé, Archivé)
- 📊 **Suivi de progression** - Visualisation de l'avancement global
- 📱 **Interface responsive** - Design moderne adapté à tous les appareils
- 🌙 **Mode sombre** - Interface élégante avec un thème sombre
- 🔄 **API RESTful** - Backend robuste pour la persistance des données

## 🛠️ Technologies utilisées

### Frontend

- **React** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool
- **TailwindCSS** - Framework CSS
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes modernes

### Backend

- **NestJS** - Framework Node.js
- **TypeScript** - Typage statique
- **PostgreSQL** - Base de données relationnelle
- **Docker** - Conteneurisation

### Tests

- **Jest** - Tests unitaires frontend
- **Playwright** - Tests end-to-end
- **React Testing Library** - Tests de composants

## 🚦 Démarrage rapide

### Prérequis

- Node.js (v18+)
- npm ou yarn
- Docker et Docker Compose (pour le backend)

### Structure du projet

- `/app` - Application frontend React (Vite)
- `/api` - API backend NestJS

### Installation

1. Installer les dépendances du frontend :

```bash
cd app
npm install
```

2. Installation du backend avec Docker :

```bash
cd ../api
docker-compose up -d
```

Cela lancera un conteneur PostgreSQL et Adminer pour la gestion de la base de données. Adminer sera accessible à l'adresse [http://localhost:8080](http://localhost:8080).

3. Installation des dépendances du backend :

```bash
cd ../api
npm install
```

## 🏃‍♂️ Exécution de l'application

### Backend (API)

1. Démarrer le serveur API en mode développement :

```bash
cd api
npm run start:dev
```

L'API sera disponible à l'adresse [http://localhost:8000/api](http://localhost:8000/api).

### Frontend

1. Démarrer l'application frontend en mode développement :

```bash
cd app
npm run dev
```

L'application frontend sera accessible à l'adresse [http://localhost:5173](http://localhost:5173).

## 🧪 Tests

### Tests du frontend

```bash
cd app
npm run test:unit     # Exécuter les tests unitaires
npm run test:e2e      # Exécuter les tests end-to-end
```

## 🏗️ Build

### Frontend

```bash
cd app
npm run build
```

Les fichiers compilés seront disponibles dans le dossier `app/dist`.

### Backend

```bash
cd api
npm run build
```

Les fichiers compilés seront disponibles dans le dossier `api/dist`.

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.
