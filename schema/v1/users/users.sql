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

    CHECK (
      email IS NOT NULL OR phone_number IS NOT NULL
    )
);

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