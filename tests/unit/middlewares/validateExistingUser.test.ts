import { validateExistingUser } from "../../../src/middleware/validateExistingUser";
import { User } from "../../../src/models/User"; 
import { mockExpressParams } from "../../helpers/expressParams";


describe('validateExistingUser middleware', () => {
    beforeEach(() => {
        User.findOne = jest.fn()
    })

    it('should call next when user does not exist', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null)
        const { req, res, next } = mockExpressParams({ fields: { email: 'no@existe.com' } })
        await validateExistingUser(req, res, next)
        expect(next).toHaveBeenCalled()
    })

    test.each([
        ['email', { email: 'existe@email.com' }, "The email 'existe@email.com' already exists"],
        ['phoneNumber', { phoneNumber: '1234567890' }, "The phone number '1234567890' already exists"],
        ['username', { username: 'user1' }, "The username 'user1' already exists"],
    ])('should throw error when user with %s exists', async (field, fields, expectedMessage) => {
        (User.findOne as jest.Mock).mockResolvedValue({
            email: 'existe@email.com',
            username: 'user1',
            phoneNumber: '1234567890'
        })
        const { req, res, next } = mockExpressParams({ fields })
        try {
            await validateExistingUser(req, res, next)
        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toContain('The user has already been taken')
            expect(error.status).toBe(409)
            expect(error.name).toBe('userTaken')
            expect(error.extra).toEqual({
                [field]: expectedMessage
            })
        }
    })
})
