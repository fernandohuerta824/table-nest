type FunctionParams = {
    fields?: Record<string, any>,
    resFunctions?: Record<string, jest.Mock>
}

export function mockExpressParams({
    fields,
    resFunctions = { }
}: FunctionParams) {
    const req = {
        body: fields
    } as any

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        ...resFunctions
    } as any
    const next = jest.fn();



    return {
        req, res, next
    }
}