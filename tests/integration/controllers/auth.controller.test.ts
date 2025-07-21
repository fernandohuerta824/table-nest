import request from 'supertest';
import app from '../../../src/app';
import { AppDataSource } from '../../../src/models/dataSource';
import { execSync } from 'child_process';
import '../../helpers/mocks';

jest.mock('../../../src/helpers/rateLimits', () => ({
    __esModule: true,
    signupRateLimiter: jest.fn().mockImplementation((req, res, next) => {
        next();
    })
}))

describe('Auth Signup Endpoint', () => {
    beforeAll(async () => {
        execSync('npm run seed:down mode=test');
        await AppDataSource.initialize();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    const user1 = {
        username: 'testuser',
        email: 'testuser@example.com',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        password: '12345678A1Ba2?'
    }

    const user2 = {
        username: 'testuser2',
        email: 'testuser2@example.com',
        firstName: 'Test',
        lastName: 'User',
        phoneNumber: '1234567890',
        password: '12345678A1Ba2?'
    }

    it('should return a 201 response on successful signup', async () => {

        const response = await request(app)
            .post('/auth/signup')
            .send(user1)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('User has been created successfully')
    })

    it('should be inserted in the database', async () => {
        const user = await AppDataSource.getRepository('User').findOneBy({ email: user1.email })!
        expect(user).toBeDefined()
        expect(user?.username).toBe(user1.username)
        expect(user?.email).toBe(user1.email)
        expect(user?.firstName).toBe(user1.firstName)
        expect(user?.lastName).toBe(user1.lastName)
        expect(user?.phoneNumber).toBe(user1.phoneNumber)
        expect(user?.password).toHaveLength(60)
        
    })

    test.each(['confirm_email', 'confirm_phone'])('should be inserted a %s token', async (tokenType) => {
        const user = await AppDataSource.getRepository('User').findOneBy({ email: user1.email })!
        const token = await AppDataSource.getRepository('UserTokens').findOneBy({ userId: user?.id, tokenType })!
        expect(token).toBeDefined()
        expect(token?.userId).toBe(user?.id)
        expect(token?.token).toBeDefined()
        expect(token?.tokenType).toBe(tokenType)
        expect(token?.isActive).toBe(true)
        expect(token?.used).toBe(false)
        expect(token?.revoked).toBe(false)
        expect(token?.expiresAt).toBeDefined()
        expect(new Date(token?.expiresAt)).toBeInstanceOf(Date)

    })

    it('should return a 409 response if the user phone number is already taken', async () => {
        const response = await request(app)
            .post('/auth/signup')
            .send({ ...user2, phoneNumber: user1.phoneNumber })

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('The user has already been taken')
        expect(response.body.extra.phoneNumber).toBe(`The phone number '${user1.phoneNumber}' already exists`)
    })

    test.each([
        ['phoneNumber', { ...user2, phoneNumber: user1.phoneNumber }, 'phone number'],
        ['email', { ...user2, email: user1.email }, 'email'],
        ['username', { ...user2, username: user1.username }, 'username'],
    ])('should return a 409 response if the user %s is already taken', async (field, fields, fieldName) => {
        const response = await request(app)
            .post('/auth/signup')
            .send(fields)


        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('The user has already been taken')
        expect(response.body.extra[field]).toBe(`The ${fieldName} '${fields[field]}' already exists`)
    })

    test.each([
        ['username', { ...user1, username: undefined }],
        ['password', { ...user1, password: undefined }],
        ['firstName', { ...user1, firstName: undefined }],
    ])('should return a 400 response if the user %s is not sent', async (field, fields) => {
        const response = await request(app)
            .post('/auth/signup')
            .send(fields)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe(`Bad Request: Fields are missing: ${field}`)
    })

    it('should return a 422 either if the email and phone number are not sent', async () => {
        const response = await request(app)
            .post('/auth/signup')
            .send({ ...user1, email: undefined, phoneNumber: undefined })

        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message')
        expect(response.body.message).toBe('One or more validation errors')
        expect(response.body.errors).toHaveProperty('contactMethod')
        expect(response.body.errors.contactMethod).toHaveProperty('_errors')
        expect(response.body.errors.contactMethod._errors).toContain('At least one contact method (email or phone number) is required')
    })
})
