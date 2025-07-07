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

    `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        DROP TABLE users;
    `)
};
