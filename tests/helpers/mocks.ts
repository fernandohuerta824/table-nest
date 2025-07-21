// tests/helpers/mocks.ts
jest.mock("../../src/models/dataSource", () => ({
    __esModule: true,
    AppDataSource: {
        manager: {
            transaction: jest.fn().mockImplementation((cb) => cb({
                save: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' })
            }))
        }
    }
}))

jest.mock('../../src/classes/Notification', () => ({
  __esModule: true,
  default: {
    sendConfirmation: jest.fn().mockResolvedValue(undefined)
  }
}))

jest.mock('../../src/classes/Email', () => ({
  __esModule: true,
  default: {
    sendConfirmation: jest.fn().mockResolvedValue(undefined)
  }
}))


jest.mock('../../src/helpers/rateLimits', () => ({
    __esModule: true,
    signupRateLimiter: jest.fn().mockImplementation((req, res, next) => {
        next();
    })
}))
