# Users

## Tabla de users

Se creo la tabla `users` para almacenar información de los usuarios del sistema.

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

- Contiene datos personales del usuario:
  - `first_name`: Nombre del usuario
  - `last_name`: Apellido del usuario
  - `email`: Correo electrónico del usuario
  - `phone_number`: Número de teléfono del usuario
  - `username`: Nombre de usuario único

- Contiene credenciales del usuario:
  - `username`: Nombre de usuario único
  - `email`: Correo electrónico único (opcional)
  - `phone_number`: Número de teléfono único (opcional)
  - `password`: Contraseña encriptada

- Contiene estados de confirmación del usuario:
  - `pending_email`: Correo electrónico pendiente de confirmación
  - `pending_phone_number`: Número de teléfono pendiente de confirmación
  - `two_factor_enabled`: Habilita el inicio de sesión en dos pasos
  - `is_banned`: Indica si el usuario está prohibido

### Triggers

- `set_users_updated_at`: Se activa antes de cada actualización en la tabla `users`. Actualiza el campo `updated_at` con la fecha y hora actual.

- `validate_pending_email`: Se activa antes de cada inserción o actualización en la tabla `users`. Verifica que `email` no sea igual a `pending_email`.

- `validate_pending_phone_number`: Se activa antes de cada inserción o actualización en la tabla `users`. Verifica que `phone_number` no sea igual a `pending_phone_number`.

---

## Tabla de user_tokens

Se creo la tabla `user_tokens` para almacenar los tokens de acceso de los usuarios. La idea de la creacion de esta tabla fue para poder tener un registro de los tokens de acceso que han sido generados por los usuarios. Pensando en feautures como limite de tokens por tiempo, detectar bots, etc.


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

---

## Tabla de ban_logs

Se creo la tabla `ban_logs` para almacenar los registros de baneo de los usuarios. Esta tabla permite llevar un control de los usuarios que han sido baneados, así como la razón y duración del baneo.

```sql
CREATE TABLE ban_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason VARCHAR(255) NOT NULL,
  duration INTERVAL NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '1 hour'
);
```
