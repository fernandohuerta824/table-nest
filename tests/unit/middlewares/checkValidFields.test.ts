import { checkValidFields } from "../../../src/middleware/checkValidFields";
import { mockExpressParams } from "../../helpers/expressParams";
import { requiredFields, optionalFields, requiredFieldsArray, optionalFieldsArray } from "../../helpers/fields";



describe('Validate correct sent fields middleware', () => {
    it('should execute next function when all the required fields are sent', () => {

        const { req, res, next } = mockExpressParams({ fields: requiredFields })

        checkValidFields({ fields: requiredFieldsArray })(req, res, next)

        expect(next).toHaveBeenCalled()
    })

    it('should execute next function when all the required and optional fields are sent', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields, ...optionalFields } })

        checkValidFields({ fields: requiredFieldsArray, optionalFields: optionalFieldsArray })(req, res, next)

        expect(next).toHaveBeenCalled()
    })

    it('should execute next function when only optional fields are required', () => {
        const { req, res, next } = mockExpressParams({ fields: optionalFields })

        checkValidFields({ optionalFields: optionalFieldsArray })(req, res, next)

        expect(next).toHaveBeenCalled()
    })

    it('should throw an error when a required field is missing', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields, confirmPassword: undefined } })

        expect(() => {
            checkValidFields({ fields: requiredFieldsArray })(req, res, next)
        }).toThrow('Bad Request: Fields are missing: confirmPassword')
    })

    it('should throw an error when no one of the required fields is sent', () => {
        const { req, res, next } = mockExpressParams({ fields: {} })

        expect(() => {
            checkValidFields({ fields: requiredFieldsArray })(req, res, next)
        }).toThrow('Bad Request: Fields are missing: username, firstName, password, confirmPassword')
    })

    it('should throw an error when an invalid field is sent', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields, invalidField: 'invalid' } })

        expect(() => {
            checkValidFields({ fields: requiredFieldsArray })(req, res, next)
        }).toThrow('Bad Request: They were sent invalid fields: invalidField')
    })
})