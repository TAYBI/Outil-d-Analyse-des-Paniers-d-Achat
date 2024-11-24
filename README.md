### Outil Simplifié d'Analyse des Paniers d'Achat

---

#### 📌 **Description**

outil d'analyse pour aider un administrateur de site e-commerce à obtenir
des informations simples sur les produits les plus vendus, la répartition des ventes par
catégorie, et les tendances de ventes

---

### 🚀 **Prérequis**

- **Node.js** (20 ou supérieur)
- **MongoDB** (local ou cloud)
- **NPM** ou **Yarn**

---

### ⚙️ **Installation**

#### 1. **Clonez le dépôt :**

```bash
git clone https://github.com/TAYBI/Outil-d-Analyse-des-Paniers-d-Achat.git
cd Outil-d-Analyse-des-Paniers-d-Achat
```

#### 2. **Installation des dépendances :**

**Backend :**

```bash
cd Backend
npm install
```

**Frontend :**

```bash
cd Frontend
npm install
```

---

### 💻 **Lancement de l'Application**

#### **Démarrer le Backend :**

```bash
cd Backend
npm run start
```

Par défaut, le serveur démarre sur `http://localhost:3000`.

#### **Démarrer le Frontend :**

```bash
cd Frontend
npm run dev
```

Par défaut, l'application est accessible sur `http://localhost:5173/`.

---

### 🌐 **Documentation de l'API**

L'API est documentée via **Swagger**. Pour consulter la documentation interactive :
`http://localhost:3000/docs`

Ou en ligne :
[https://app.swaggerhub.com/apis-docs/BILALTAYBI36/OutilAnalyse/1.0.0](https://app.swaggerhub.com/apis-docs/BILALTAYBI36/OutilAnalyse/1.0.0)

**Endpoints Principaux :**

1. **Total des Ventes :**  
   `GET /analytics/total_sales`  
   _Retourne le montant total des ventes pour une période sélectionnée._

2. **Produits Tendance :**  
   `GET /analytics/trending_products`  
   _Retourne le top 3 des produits les plus vendus._

3. **Répartition des Ventes par Catégorie :**  
   `GET /analytics/category_sales`  
   _Retourne la répartition des ventes par catégorie._

4. **Liste des Produits :**  
   `GET /products`  
   _Retourne tous les produits avec leurs ventes._

---

### 📊 **Fonctionnalités Clés**

- **Tableau de bord interactif** affichant :
  - Ventes totales
  - Top 5 des produits les plus vendus
  - Graphiques de répartition des ventes par catégorie
- **Filtres de temps** dynamiques (7 jours, 30 jours, 12 mois)
- **Visualisations simples** avec graphiques à barres et histogrammes

---

### 📄 **Licence**

Ce projet est sous licence MIT.
