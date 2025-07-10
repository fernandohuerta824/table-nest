/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
        CREATE TABLE user_tokens (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            token VARCHAR(32) UNIQUE NOT NULL,
            token_type VARCHAR(20) NOT NULL CHECK (
                token_type IN ('reset_password', 'confirm_email', 'confirm_phone', 'login_verification')
            ),
            expires_at TIMESTAMPTZ NOT NULL DEFAULT now() + INTERVAL '24 hours',
            is_active BOOLEAN NOT NULL DEFAULT true,
            used BOOLEAN NOT NULL DEFAULT false,
            revoked BOOLEAN NOT NULL DEFAULT false,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
    `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        DROP TABLE user_tokens;
    `)
};
