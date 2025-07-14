/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.sql(`
        CREATE TRIGGER set_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();

        CREATE TRIGGER validate_pending_email
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION validate_new_pending_email();

        CREATE TRIGGER validate_pending_phone_number
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION validate_new_pending_phone_number();

        CREATE TRIGGER initial_pending_email
        BEFORE INSERT ON users
        FOR EACH ROW
        EXECUTE FUNCTION set_initial_pending_email();

        CREATE TRIGGER initial_pending_phone_number
        BEFORE INSERT ON users
        FOR EACH ROW
        EXECUTE FUNCTION set_initial_pending_phone_number();
    `)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DROP TRIGGER IF EXISTS set_users_updated_at ON users;
        DROP TRIGGER IF EXISTS validate_pending_email ON users;
        DROP TRIGGER IF EXISTS validate_pending_phone_number ON users;
        DROP TRIGGER IF EXISTS initial_pending_email ON users;
        DROP TRIGGER IF EXISTS initial_pending_phone_number ON users;
    `)
};
