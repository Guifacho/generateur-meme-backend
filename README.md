# 🐢 Meme Generator API (Backend)

Ce projet est le backend d'une application de génération de mèmes. Il permet de gérer le stockage des images et des métadonnées associées (textes, positions, titres).

---

## 🚀 Technologies utilisées

- **Framework :** [NestJS](https://nestjs.com) (Node.js)
- **Base de données :** PostgreSQL
- **ORM :** TypeORM
- **Conteneurisation :** Docker & Docker Compose
- **Gestion d'images :** Multer (Stockage local)

---

## ⚙️ Installation et Lancement

### 1. Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installé et lancé.
- [Git](https://git-scm.com) pour cloner le projet.

### 2. Récupérer le projet

```bash
git clone https://github.com/Guifacho/generateur-meme-backend.git
cd generateur-meme-backend
```

### 3. Lancer l'infrastructure (Docker)

```bash
docker-compose up --build
```

> Le backend sera accessible sur : **http://localhost:3001**

---

## 📄 Documentation de l'API

### Points d'entrée (Endpoints)

| Méthode  | Route               | Description                    | Format              |
|----------|---------------------|--------------------------------|---------------------|
| `POST`   | `/api/memes`        | Créer un mème (upload + data)  | `multipart/form-data` |
| `GET`    | `/api/memes`        | Liste tous les mèmes           | JSON                |
| `GET`    | `/api/memes/:id`    | Détails d'un mème spécifique   | JSON                |
| `PUT`    | `/api/memes/:id`    | Modifier titre ou textes       | JSON                |
| `DELETE` | `/api/memes/:id`    | Supprimer le mème et l'image   | JSON                |
| `GET`    | `/uploads/:filename`| Visualiser l'image brute       | Fichier Statique    |

---

## 🔴 Architecture & Fonctionnement (Important pour le Front)

Il est important de noter que le Backend **ne génère pas** une image finale avec le texte incrusté. Il sépare les **ressources** des **données**.

### 1. Stockage des Images

Les images sont stockées physiquement dans le dossier `/backend/uploads`. Pour afficher une image dans le Frontend, utilisez l'URL :

```
http://localhost:3001/uploads/{nom_du_fichier.png}
```

### 2. Base de données (PostgreSQL)

La base de données ne contient que les **métadonnées**. Voici à quoi ressemble un enregistrement :

- **`id`** : UUID unique.
- **`title`** : Titre du mème.
- **`image`** : Le nom du fichier stocké (ex: `171325...png`).
- **`texts`** : Un tableau JSON contenant le texte et les coordonnées `x` et `y`.

### 3. Rôle du Frontend

Le Frontend est responsable de la **reconstitution**. Il doit :

1. Récupérer l'image brute via la route `/uploads`.
2. Superposer les textes aux coordonnées indiquées par les métadonnées `texts` (via Canvas ou CSS).

---

## 📁 Structure du Projet

```
/
├── /src                  # Logique NestJS
├── /backend/uploads      # Volume Docker pour le stockage persistant des images
└── docker-compose.yml    # Configuration de l'orchestration de la base de données et de l'API
```

---

## 🔒 CORS

Le backend autorise toutes les origines (`*`) par défaut en développement pour faciliter la communication avec le serveur de dev du Frontend (Vite, React, etc.).

---

*Développé avec NestJS et ❤️ pour le projet Meme Generator.*
