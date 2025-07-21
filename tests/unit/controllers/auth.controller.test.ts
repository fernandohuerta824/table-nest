import { mockExpressParams } from "../../helpers/expressParams";
import { signupService } from "../../../src/services/auth.service";
import '../../helpers/mocks'
import { signup } from "../../../src/controllers/auth.controller";
jest.mock("../../../src/services/auth.service", () => ({
    signupService: jest.fn()
}));

describe('Auth Controller - Signup', () => {
    it('should call signupService and return 201 status with success message', async () => {

        (signupService as jest.Mock).mockResolvedValue({
            tokenEmail: 'email-token',
            tokenPhone: 'phone-token',
            user: {
                username: 'testuser',
            }
        
        })

        const { req, res, next } = mockExpressParams({ 
            fields: { user: {
                    username: 'testuser',
                }
            }
        })

        await signup(req, res, next)

        expect(signupService).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'User has been created successfully' });
    });

});