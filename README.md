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
├─ tests/
├─ seeds/
├─ .env.example
├─ package.json
├─ package-lock.json
├─ LICENSE
└── .gitignore
```

**Documentación específica de carpeta:**

Cada carpeta del proyecto contiene su propia documentación específica para facilitar la comprensión, cualquier duda sobre como usar o cada parte del proyecto, se puede consultar en los archivos `README.md` de cada carpeta.

- [API REST](src/README.md)
- [tests](tests/README.md)
- [seeds](seeds/README.md)


---

## Justificación de la estructura de carpetas

### Migraciones
Las migraciones estan generadas o son ejecutadas por node-pg-migrate, y siguen la convención de nombrado `timestamp_action.sql`, todas apiladas en la carpeta `migrations`. 


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

5. Crea un archivo `.env.test` basado en el archivo `.env.test.example` para las pruebas y configura tus variables de entorno para el entorno de pruebas.

6. Ejecuta las migraciones para crear el esquema de la base de datos ya sea para desarrollo o pruebas:
   Para desarrollo:
   ```bash
   npm run migrate:up
   ```
   Para pruebas:
   ```bash
   npm run migrate:up:test
   ```

7. Inicia el servidor:
   ```bash
    npm start
    ```
8. Accede a la API en `http://localhost:8080` (o el puerto que hayas configurado).

9. Si desea ejecutar los seeds a la base de datos, ejecuta:
   Tener en cuenta que:
   - Los seeds automáticamente ejecutan las migraciones antes de correr los seeds.
   - Los borran los datos ya existentes en las tablas.
   Para desarrollo:
   ```bash
   npm run seed:up
   ```
   Para pruebas:
   ```bash
   npm run seed:up mode=test
   ```



---

## Licencia
Este proyecto es de uso privado/portafolio. El esquema y documentación no pueden ser usados para fines comerciales sin autorización previa del autor.
Si deseas adaptar o usar este diseño para proyectos con fines de lucro, contacta al autor para negociar permisos o regalías

---



