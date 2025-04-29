# 📡 API Endpoints - Enlaces Sociales

Documentación de los endpoints disponibles en esta API.

## 🔐 Auth

### POST /auth/register

Registra un nuevo usuario.

**Body (JSON):**
```json
{
  "handle": "Juan",
  "name": "Juan",
  "email": "juan@email.com",
  "password": "123456"
}
```
Respuesta (200 OK):

{
  "msg": "Usuario registrado correctamente"
}



### POST /auth/login

Ingresar a mi Perfil

**Body (JSON):**
```json
{
  "email": "juan@email.com",
  "password": "123456"
}

```
```json
Respuesta (200 OK):

{
  "token": "jwt-token-aqui",
  "user": {
    "id": "abc123",
    "name": "Juan"
  }
}
```
### POST /user
```json
Authorization: Bearer <token>

{
  "name": "Juan",
  "email": "juan@email.com",
  "handle": "@juanito"
}
```

### PUT /user
```json
{
  "handle": "@nuevohandle",
  "description": "Descripción actualizada"
}
```

