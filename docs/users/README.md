# Tabla de users

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    username VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(80) UNIQUE,
    phone_number VARCHAR(15) UNIQUE,
    phone_ext VARCHAR(5),
    pending_email VARCHAR(80),
    pending_phone_number VARCHAR(15),
    two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    is_banned BOOLEAN NOT NULL DEFAULT false,
    -- Al menos un método de contacto
    CHECK (
      email IS NOT NULL OR phone_number IS NOT NULL
    )
);
```
- Contiene datos personales, credenciales y estados de confirmación

## Datos personales:
- `first_name`: Nombre del usuario
- `last_name`: Apellido del usuario
- `email`: Correo electrónico del usuario
- `phone_number`: Número de teléfono del usuario

---

## Credenciales:
- `username`: Nombre de usuario único
- `email`: Correo electrónico único (opcional)
- `phone_number`: Número de teléfono único (opcional)
- `password`: Contraseña encriptada

---

## Estados de confirmación:
- `pending_email`: Correo electrónico pendiente de confirmación
- `pending_phone_number`: Número de teléfono pendiente de confirmación
- `two_factor_enabled`: Habilita el inicio de sesión en dos pasos
- `is_banned`: Indica si el usuario está prohibido

---

## Timestamps:
- `created_at`: Fecha y hora de creación del usuario
- `updated_at`: Fecha y hora de la última actualización del usuario

---

## Restricciones:
- `id`: Clave primaria autoincremental
- `username`: Debe ser único
- `email`: Debe ser único (opcional)
- `phone_number`: Debe ser único (opcional)
- `CHECK`: Al menos un método de contacto debe estar presente (email o phone_number)
- `is_banned`: No puede ser nulo, por defecto es `false`
- `two_factor_enabled`: No puede ser nulo, por defecto es `false`
- `created_at` y `updated_at`: No pueden ser nulos, por defecto son la fecha y hora actual
- `pending_email` y `pending_phone_number`: Opcionales, para gestionar confirmaciones pendientes

---

## Notas:

* Confirmación de correo electrónico y número de teléfono:
  Al crear un usuario, se puede establecer un correo electrónico y/o número de teléfono pendientes. e
  Se establece `email` al correo que se uso para crear el usuario
  Se establece `phone_number` al número de teléfono que se uso para crear el usuario
  Se establece `pending_email` y `pending_phone_number` a `email` y `phone_number` respectivamente
  Solo sera posible que tanto `email` como `phone_number` sean a `pending_email` y `pending_phone_number` respectivamente cuando se cree la cuenta por primera vez.
  Un trigger de que jamas se pueda cambiar el `email` y `phone_number` a `pending_email` y `pending_phone_number` respectivamente.
   Con esta lógica se puede deducir cuando se necesita confirmar el correo electrónico y el número de teléfono por primera vez y cuando lo esta cambiando desde el panel de usuario.

   - Workflow de confirmación:
      - Correo proporcionado: correo@correo.com
      - Número de teléfono proporcionado: 1234567890

       1. Al crear el usuario:
          - `email` se establece a `correo@correo.com`
          - `phone_number` se establece a `1234567890`
          - `pending_email` se establece a `correo@correo.com`
          - `pending_phone_number` se establece a `1234567890`

        2. Se crea un token para confirmar el correo electrónico y el número de teléfono.
        
        3. Una vez que el usuario confirma el correo electrónico:
           - `pending_email` se establece a `NULL`
           - `email` se mantiene como `correo@correo.com`

        4. Una vez que el usuario confirma el número de teléfono:
           - `pending_phone_number` se establece a `NULL`
           - `phone_number` se mantiene como `1234567890`

        5. Con un trigger al actualizar el usuario jamas sera posible que:
              - `email` sea igual a `pending_email`
              - `phone_number` sea igual a `pending_phone_number`

        
---

## Triggers:

`set_users_updated_at`:
- Se activa antes de cada actualización en la tabla `users`.
- Actualiza el campo `updated_at` con la fecha y hora actual.

`validate_pending_email`:
- Se activa antes de cada inserción o actualización en la tabla `users
- Verifica que `email` no sea igual a `pending_email` 

`validate_pending_phone_number`:
- Se activa antes de cada inserción o actualización en la tabla `users`
- Verifica que `phone_number` no sea igual a `pending_phone_number`

`initial_pending_email`:
- Se activa antes de cada inserción en la tabla `users`.
- Establece `pending_email` al valor de `email` al crear un nuevo usuario si `email` no es nulo.

`initial_pending_phone_number`:
- Se activa antes de cada inserción en la tabla `users`.
- Establece `pending_phone_number` al valor de `phone_number` al crear un nuevo usuario si `phone_number` no es nulo.

---

# Tabla de user_tokens

```sql
CREATE TABLE user_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(64) UNIQUE NOT NULL,
  token_type VARCHAR(20) NOT NULL CHECK (
    token_type IN ('reset_password', 'confirm_email', 'confirm_phone', 'login_verification')
  ),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '15 minutes',
  is_active BOOLEAN NOT NULL DEFAULT true,
  used BOOLEAN NOT NULL DEFAULT false,
  revoked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

- Contiene todos los tokens creados para los usuarios

## Datos:
- `token`: Token único generado para la acción específica
- `token_type`: Tipo de token (reset_password, confirm_email, confirm_phone, login_verification)

---

## Estados:
- `is_active`: Indica si el token está activo (por defecto es `true`)
- `used`: Indica si el token ya ha sido utilizado (por defecto es `false`)
- `revoked`: Indica si el token ha sido revocado (por defecto es `false`)

---

## Timestamps:
- `expires_at`: Fecha y hora de expiración del token (por defecto es 15
minutos después de la creación)
- `created_at`: Fecha y hora de creación del token (por defecto es la fecha y hora actual)

---

## Relaciones:
- `user_id`: Clave foránea que referencia al usuario al que pertenece el token. Un usuario puede tener múltiples tokens, pero un token pertenece a un solo usuario.

---

## Notas:

* La longitud del token puede variar segun el tipo de token

---

# Tabla de ban_logs

```sql
CREATE TABLE ban_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DEFAULT CASCADE,
  applied_by INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_from TIMESTAMPTZ NOT NULL,
  valid_to TIMESTAMPTZ,
  lifted_at TIMESTAMPTZ,
  reason VARCHAR(255) NOT NULL DEFAULT ''
)
```

- Tabla para guardar los logs de los baneos aplicados

## Datos
- `reason`: La razon de porque el baneo fue aplicado

---

## Timestamps:
- `created_at`: Fecha y hora de cuando el baneo fue aplicado 
- `valid_from`: Fecha y hora de cuando el baneo empieza a ser valido
- `valid_to`: Fecha y hora de cuando el baneo deja de ser valido
- `lifted_at`: Fecha y hora de cuando el baneo fue levantado si es que fue levantado

---

## Relaciones:
- `user_id`: Clave foránea que referencia al usuario que fue baneado. Un usuario puede tener múltiples baneos, pero un baneo pertenece a un solo usuario.
- `applied_by`: Clave foránea que referencia al usuario que aplicó el baneo. Un usuario puede aplicar múltiples baneos, pero un baneo es aplicado por un solo usuario.


