# 🖥️ SmartDevices API — Backend

Este proyecto corresponde al **módulo Back-end** de la aplicación *Smart Devices*.  
Desarrollado con **Node.js**, **Express**, **Sequelize** y **MySQL**.  
Incluye autenticación JWT y control de acceso para el módulo de administración.

---

## 🚀 Requisitos

- [Node.js](https://nodejs.org/) versión 22.12 o superior  
- [MySQL](https://dev.mysql.com/) versión 8.x  
- (Opcional) [Postman](https://www.postman.com/) para pruebas de API  

---

## ⚙️ Configuración inicial

1. Clona el repositorio:  
   ```bash
   git clone git@github.com:Alejoxo123/Smart-Devices.git
   cd backend/api
   ```

2. Instala dependencias:  
   ```bash
   npm install
   ```

3. Crea el archivo `.env` en `backend/api/.env` con lo siguiente:  

   ```dotenv
   DATABASE_URL=mysql://usuario:password@localhost:3306/smart_devices
   JWT_SECRET=clave_secreta_segura
   PORT=3000
   ALLOWED_ORIGIN=http://localhost:4200
   ```

---

## 🗄️ Base de datos

En la carpeta `database/` se incluyen diagrama y dump SQL:

- `dump-smart_devices-202509221623.sql` → Crea tablas relaciones y data inicial.  


Ejecuta:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS smart_devices CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p smart_devices < database/create_schema.sql
```

---

## ▶️ Ejecución del servidor

```bash
npm run dev
```

- Servidor en: `http://localhost:3000`  
- Healthcheck: `http://localhost:3000/health` → `{ "ok": true }`

---

## 👤 Autenticación

### Registrar admin
```bash
curl -X POST http://localhost:3000/api/auth/register   -H "Content-Type: application/json"   -d '{"name":"admin","email":"admin@example.com","password":"admin123","role":"admin"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login   -H "Content-Type: application/json"   -d '{"email":"admin@example.com","password":"admin123"}'
```

Esto devuelve un token JWT que se debe incluir en el header:  
```
Authorization: Bearer <token>
```

---

## 📂 Estructura del proyecto

```
backend/api/
 ├── src/
 │   ├── server.js          # Punto de entrada
 │   ├── app.js             # Configuración Express
 │   ├── routes/            # Definición de rutas
 │   ├── controllers/       # Controladores de negocio
 │   ├── middlewares/       # Autenticación / Errores
 │   ├── db/                # Configuración Sequelize + modelos
 │   └── utils/             # Utilidades
 └── database/              # Scripts SQL
```

---

## 🔗 Endpoints principales

### 🔑 Autenticación
- `POST /api/auth/register` → Registrar usuario  
- `POST /api/auth/login` → Iniciar sesión  

### 🏷️ Marcas
- `GET /api/brands` → Listar  
- `POST /api/brands` → Crear (admin)  
- `PUT /api/brands/:id` → Actualizar (admin)  
- `DELETE /api/brands/:id` → Eliminar (admin)  

### 📂 Categorías
- `GET /api/categories` → Listar  
- `POST /api/categories` → Crear (admin)  
- `PUT /api/categories/:id` → Actualizar (admin)  
- `DELETE /api/categories/:id` → Eliminar (admin)  

### 📱 Dispositivos
- `GET /api/devices` → Listar (filtros: marca, categoría, búsqueda, orden, paginación)  
- `GET /api/devices/:id` → Detalle  
- `POST /api/devices` → Crear (admin)  
- `PUT /api/devices/:id` → Actualizar (admin)  
- `DELETE /api/devices/:id` → Eliminar (admin)  

### 🖼️ Imágenes
- `GET /api/images?deviceId=...` → Listar por dispositivo  
- `POST /api/images` → Subir imagen de dispositivo (admin)  

### 🏷️ Tags
- `GET /api/tags` → Listar  
- `POST /api/tags` → Crear (admin)  
- `POST /api/tags/:id/devices/:deviceId` → Asociar a un dispositivo  

### 💬 Comentarios
- `GET /api/comments?deviceId=...` → Listar  
- `POST /api/comments` → Crear comentario  

---

## 📋 Notas

- Middleware `requireAuth` → protege rutas privadas.  
- Middleware `requireAdmin` → solo accesible para admins.  
- Respuestas de error siguen formato:  

```json
{ "error": "Mensaje explicativo" }
```

Códigos más comunes:  
`400` datos inválidos · `401` no autenticado · `403` sin permisos · `404` no encontrado · `500` error interno.  

---

## 🤝 Contribución

1. Haz un fork del repositorio.  
2. Crea una rama para tu cambio:  
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza commits descriptivos.  
4. Abre un Pull Request en GitHub.  

---
