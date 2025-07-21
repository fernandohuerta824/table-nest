import request from 'supertest'
import app from './../../src/app'
import './../helpers/mocks'

describe('GET /working', () => {
    it('should be working', async () => {
        const res = await request(app).get('/working')

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ message: 'working' })
    })
}) 