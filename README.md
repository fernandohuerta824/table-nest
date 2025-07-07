# Proyecto: TableNest

## Descripción

**Tablenest** es una plataforma de reservas y gestión de restaurantes, que permite a restaurantes administrar mesas y horarios, a usuarios reservar y dejar reseñas, y a administradores controlar la plataforma.

---

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
- 📊 Dashboard de estadísticas para administradores.
- 📅 Calendario de reservas y disponibilidad.

---

## Estructura del proyecto

Este proyecto contiene:

- Definición y documentación del esquema de base de datos
- Migraciones organizadas para versionar los cambios en el esquema
- Documentación clara para facilitar la comprensión y uso del esquema

* Ejemplo de estructura del proyecto, de manera ilustrativa, no refleja necesariamente las carpetas y archivos del proyecto:

```plaintext
|─ schema/
├─ README.md
├─ migrations/
|    ├── 17273232832_create_users_table.sql
|    ├── 17273232833_create_user_tokens_table.sql
|    ├── 17273232834_create_ban_logs_table.sql
|    └── 17273232835_create_restaurants_table.sql
├─ docs/
│    ├── users/
│    │   ├── README.md
│    ├── restaurants/
│    │   ├── README.md
│    ├── roles/
│    │   ├── README.md
│    └─ permissions/
│        └── README.md
├─ src/
├─ .env.example
├─ package.json
├─ package-lock.json
├─ LICENSE
└── .gitignore
```

---

## Justificación de la estructura de carpetas

### Migraciones
Las migraciones estan generadas o son ejecutadas por node-pg-migrate, y siguen la convención de nombrado `timestamp_action.sql`, todas apiladas en la carpeta `migrations`. 

### Schema
Aunque con las migraciones se puede reconstruir el esquema de la base de datos, y traves de lo commits se puede ver el historial de cambios, considero que es importante la carpeta `schema`, ya que quiza para algunos desarrolladores les sea mas comodo ver el esquema de la base de datos en un formato jerárquizado por carpetas y archivos, en lugar de ver el historial de cambios en los commits. El schema no sirve para reconstruir la base de datos, ya que las migraciones son las que se encargan de eso, pero si sirve para ver el esquema actual de la base de datos, y para ver los cambios que se han realizado en cada version del esquema.

### Documentación
La carpeta `docs` contiene la documentación actualizada del esquema de la base de datos, organizada por módulos. Cada módulo tiene su propia carpeta con un archivo `README.md` en donde se describe el schema actual, las relaciones entre tablas, los triggers y las funciones asociadas. Simplemente es la snapshot actual del esquema de la base de datos, y no es necesario que se mantenga el historial de cambios, ya que las migraciones ya lo hacen.

### Source o recursos
La carpeta `src` contiene el código fuente de la API, incluyendo controladores, modelos, servicios y cualquier otro recurso necesario para la implementación de la lógica de negocio (Hasta este punto no se ha decidido que tipo API se usara, REST o GraphQL, por lo que la carpeta `src` no contiene mucho aun).

---

## Technologías utilizadas
- Node.js + Express.js
- PostgreSQL
- WebSockets (Socket.IO)
- Stripe (para pagos)
- Multer (para subida de archivos)
- JWT (para autenticación)
- PDFKit (para generación de facturas en PDF)
- bcrypt (para encriptación de contraseñas)
- Nodemailer (para envío de correos electrónicos)

---

## Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:
   ```bash
    cd tablenest
    ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea un archivo `.env` basado en el archivo `.env.example` y configura tus variables de entorno.

5. Ejecuta las migraciones para crear el esquema de la base de datos:
   ```bash
   npx node-pg-migrate up
   ```
6. Inicia el servidor:
   ```bash
    npm start
    ```
7. Accede a la API en `http://localhost:3000` (o el puerto que hayas configurado).

---

## Roadmap

1. Creacion del esquema de base de datos
2. Implementación las migraciones
3. Documentación del esquema
4. Implementación de la API REST
5. Implementación de la lógica de negocio

Mas información de cada parte:

- [Esquema de base de datos](docs/schema/README.md)
- [Documentación de la base de datos](docs/README.md)
- [API REST](src/README.md)

---

## Licencia
Este proyecto es de uso privado/portafolio. El esquema y documentación no pueden ser usados para fines comerciales sin autorización previa del autor.
Si deseas adaptar o usar este diseño para proyectos con fines de lucro, contacta al autor para negociar permisos o regalías

---



