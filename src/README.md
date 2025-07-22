# TableNest API Documentation


## Estructura de la API de TableNest

```
src/
├── classes/
├── controllers/
├── helpers/
├── middleware/
├── models/
├── routes/
├── schemas/
├── services/
├── types/
├── utils/
├── app.ts
├── server.ts
└── README.md
```
## Características Principales
- **Clases**: Contiene las clases que ayudan a estructurar y abstraer la lógica del negocio.
- **Controladores**: Manejan las solicitudes HTTP y definen la lógica de respuesta.
- **Helpers**: Funciones auxiliares que proporcionan funcionalidades reutilizables.
- **Middleware**: Funciones que se ejecutan durante el ciclo de vida de una solicitud HTTP, permitiendo la manipulación de la solicitud y respuesta.
- **Modelos**: Definiciones de los modelos de datos utilizados en la aplicación.
- **Rutas**: Definición de las rutas de la API y su asociación con los controladores.
- **Schemas**: Esquemas de validación de datos, generalmente utilizando la librería `zod`.
- **Servicios**: Contienen la lógica de negocio y las interacciones con la base de datos.
- **Tipos**: Definiciones de tipos TypeScript para mejorar la seguridad de tipos en la aplicación.
- **Utils**: Funciones utilitarias que no encajan en las otras categorías.
- **app.ts**: Configuración principal de la aplicación, incluyendo middlewares y rutas.
- **server.ts**: Punto de entrada para iniciar el servidor y escuchar las solicitudes entrantes.


## Endpoints Principales

### POST /auth/signup

    - Datos esperados: 
        - `phoneNumber: string` -opcional-
        - `email: string` -opcional-
        - `password: string`
        - `username: string`
        - `firstName: string`
        - `lastName: string` -opcional-
    
    - Respuesta:
        - `201 Created`: Usuario creado exitosamente.
        - `400 Bad Request`: Datos inválidos, campos de mas o faltantes.
        - `409 Conflict`: El usuario ya existe (email, phoneNumber o username ya en uso).
        - `422 Unprocessable Entity`: Datos de entrada no válidos (contraseña débil, email inválido, nombre de usuario muy corto, etc.).
    - Consideraciones:
        - Al menos un metodo de contacto debe ser proporcionado (email o phoneNumber).

