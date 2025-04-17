# 🍽️ TableNest

**Tablenest** es una plataforma de reservas y gestión de restaurantes, diseñada como aplicación monolítica en Node.js con MongoDB.
Permite a restaurantes administrar mesas y horarios, a usuarios reservar y dejar reseñas, y a administradores controlar la plataforma.

## 🚀 Características

- 📋 Registro y gestión de restaurantes.
- 🧑‍💼 Roles de usuario: Cliente, Administrador de Restaurante, Administrador Global.
- 💡 Sistema de reservas con control de disponibilidad en tiempo real.
- 🔔 Notificaciones en vivo usando WebSockets.
- 💳 Integración para pagos con Stripe (modo test).
- 🖼️ Soporte para subida de imágenes de restaurantes y menús.
- 📝 Reseñas y valoraciones de restaurantes.
- 🔐 Gestión de sesiones y autenticación segura.
- 🧾 Generación de facturas en PDF para reservas.

## 🗂️ Estructura del Proyecto

```
TableNest/
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── middleware/
├── helpers/
├── uploads/
├── config/
├── app.js
└── package.json

```
## 🛠️ Tecnologías Usadas

- Node.js + Express.js
- MongoDB + Mongoose
- EJS (Motor de plantillas)
- Socket.io (Notificaciones en tiempo real)
- Multer (Subida de imágenes)
- Bcrypt (Hash de contraseñas)
- Stripe API (Pagos de prueba)
- PDFKit (Generación de PDFs)
- Nodemailer (Correo de confirmación)
- express-session + connect-mongo (Gestión de sesiones)

## ⚙️ Configuración Inicial

**1 -** Clona este repositorio:

```
git clone https://github.com/tu-usuario/tablenest.git
```

**2 -** Instala la dependecias:

```
npm install
```

**3 -** Crea un archivo ```.env```:

```
MONGODB_URI=your_mongo_connection_string
SECRET_SESSION=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

**4 -** Ejecuta en desarrollo

```
npm run dev
```

## 🎯  Roadmap de Desarrollo - TableNest

### 1- Incializacion y Preparacion
- [x] Inicializacion del repositorio
- [ ] Configuración del entorno de desarrollo
- [ ] Instalación de dependencias básicas
- [ ] Creación de archivos base (.env, app.js, etc.)

### 2- Modelado de la Base de Datos
- [ ] Crear los esquemas de Usuarios
- [ ] Establecer relaciones entre las entidadades

### 3- Definicion de rutas y planificacion de Endpoints
- [ ] Rutas publicas
- [ ] Rutas para clientes
- [ ] Rutas para dueños de restaurantes
- [ ] Rutas para dueños de cadenas
- [ ] Rutas para Administrador Global

### 🟢 Fase 1: Páginas Públicas
*Pediente*
### 🟠 Fase 2: Registro y Autenticación
*Pediente*
### Fase 3: Registro de Restaurantes
*Pendiente*
### 🟣 Fase 4: Registro de Cadena
*Pendiente*
### 🔴 Fase 5: Sistema de Reservas
*Pendiente*
### 🟤 Fase 6: Funcionalidades Extras
*Pendiente*

### 💾 Funcionalidades Avanzandas
***Validaciones y estados***
- [ ] Validacion manual por Admin cuando un restaurante se registra
- [ ] Estados de restaurantes: Pendiente, aprobado, rechazado
- [ ] Middleware para controlar accesos segun estado

***Politica de cancelacion configurable por restaurante***
- [ ] Definir politica de cancelacion configurable
- [ ] Bloqueo manual de horarios por el dueño
- [ ] Restriccion 
