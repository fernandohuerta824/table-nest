import { validateBody } from "../../../src/middleware/validFields";
import { optionalFields, requiredFields, testSchema } from "../../helpers/fields"
import { mockExpressParams } from "../../helpers/expressParams"


describe('Validate body middleware', () => {
    it('should call next when body is valid', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields, ...optionalFields } })

        validateBody(testSchema)(req, res, next)

        expect(next).toHaveBeenCalled()
    })

    it('should throw an error when body is invalid', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields, ...optionalFields, email: 'invalid' } })

        expect(() => {
            validateBody(testSchema)(req, res, next)
        }).toThrow('One or more validation errors')
    })

    it('should throw an error when there is no body', () => {
        const { req, res, next } = mockExpressParams({ fields: {} })

        expect(() => {
            validateBody(testSchema)(req, res, next)
        }).toThrow('One or more validation errors')
    })

    it('should throw an error when a required field is missing', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields, confirmPassword: undefined } })

        expect(() => {
            validateBody(testSchema)(req, res, next)
        }).toThrow('One or more validation errors')
    })

    it('should throw an error when a required field is empty', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields, username: '' } })

        expect(() => {
            validateBody(testSchema)(req, res, next)
        }).toThrow('One or more validation errors')
    })

    it('should throw an error when no method contact is provided', () => {
        const { req, res, next } = mockExpressParams({ fields: { ...requiredFields } })

        expect(() => {
            validateBody(testSchema)(req, res, next)
        }).toThrow('One or more validation errors')
    })
})
     
    