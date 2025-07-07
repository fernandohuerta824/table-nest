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