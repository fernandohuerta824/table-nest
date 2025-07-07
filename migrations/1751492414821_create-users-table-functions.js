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
        CREATE OR REPLACE FUNCTION set_initial_pending_email()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.email IS NOT NULL THEN
                NEW.pending_email := NEW.email;
            END IF;
            RETURN NEW; 
        END;
        $$ LANGUAGE plpgsql;

        CREATE OR REPLACE FUNCTION set_initial_pending_phone_number()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.phone_number IS NOT NULL THEN
                NEW.pending_phone_number := NEW.phone_number;
            END IF;
            RETURN NEW; 
        END;
        $$ LANGUAGE plpgsql;

        CREATE OR REPLACE FUNCTION validate_new_pending_email()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.pending_email = NEW.email THEN
                RAISE EXCEPTION 'Pending email cannot be the same as the current email';
            END IF;
        END;
        $$ LANGUAGE plpgsql;

        CREATE OR REPLACE FUNCTION validate_new_pending_phone_number()
        RETURNS TRIGGER AS $$
        BEGIN
            IF NEW.pending_phone_number = NEW.phone_number THEN
                RAISE EXCEPTION 'Pending phone number cannot be the same as the current phone number';
            END IF;
        END;
        $$ LANGUAGE plpgsql;
    `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        DROP FUNCTION IF EXISTS set_initial_pending_email();
        DROP FUNCTION IF EXISTS set_initial_pending_phone_number();
        DROP FUNCTION IF EXISTS validate_new_pending_email();
        DROP FUNCTION IF EXISTS validate_new_pending_phone_number();
    `)
};
