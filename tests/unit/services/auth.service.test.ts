import { signupService } from "../../../src/services/auth.service";
import '../../helpers/mocks'
jest.mock("../../../src/models/dataSource", () => ({
    AppDataSource: {
        manager: {
            transaction: jest.fn().mockImplementation((cb) => cb({
                save: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' })
            }))
        }
    }
}))

describe('Auth Signup Service', () => {
    it('should return user and tokens on successful signup', async () => {
        const user = {
            username: 'testuser',
            email: 'testuser@example.com',
            firstName: 'Test',
            lastName: 'User',
            phoneNumber: '1234567890'
        }

        const result = await signupService({...user, password: 'password123'})

        expect(result).toHaveProperty('user')
        expect(result.user.id).toBe(1)
        expect(result.user.password).toHaveLength(60)
        expect(result).toHaveProperty('tokenEmail')
        expect(result).toHaveProperty('tokenPhone')
        expect(result.tokenEmail).toBeDefined()
        expect(result.tokenPhone).toBeDefined()

    })

})

         