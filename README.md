
---

### ✅  **Backend Express**

```markdown
# ⚙️ API Backend - Express

Este proyecto es un servidor backend construido con Express.js para gestionar autenticación, registro de usuarios y perfil social.

## 🛠️ Requisitos previos

- Node.js y npm instalados

## 🚀 Comandos principales

### Instalar dependencias

```bash
npm install
```

### Iniciar el servicio de desarrollo

```bash
npm run dev
```

## 📁 Estructura del Proyecto
routes/: Define las rutas principales de la API

controllers/: Lógica de negocio (registro, login, etc.)

middlewares/: Validaciones y autenticación

models/: Modelos de usuario (si usas MongoDB, Sequelize, etc.)

config/: Variables de entorno y configuración

server.js o app.js: Entrada principal

## 🔐 Rutas principales
POST /api/register: Registrar un nuevo usuario

POST /api/login: Iniciar sesión

GET /api/profile: Obtener datos del perfil (requiere token)

## 🤝 Cómo unirse al proyecto

## 🤝 Cómo unirse al proyecto
git clone <URL-del-repo>
cd nombre-del-proyecto

## Crea un archivo .env con tus variables (por ejemplo):
PORT = 3000
JWT_SECRET = tu_secreto
DB_URI = tu_base_de_datos

## 🌐 Frontend conectado a este backend

Este backend está diseñado para ser consumido por una aplicación frontend hecha en Angular.

🔗 [Repositorio del Frontend Angular](<https://github.com/Ezequiel-2023/App_Angular_Login.git>)



