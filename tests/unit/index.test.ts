import { execSync } from "child_process"

beforeAll(async () => {
  execSync('npm run migrate:up:test')
})

it('should work', () => {
    expect(1).toBe(1)
})