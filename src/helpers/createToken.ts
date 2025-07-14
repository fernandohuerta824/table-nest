import { UserTokenFields } from "../types"
import crypto from 'crypto'

function generateSecureSixDigitCode() {
  const buffer = crypto.randomBytes(4); 
  const num = buffer.readUInt32BE(0) % 1000000;
  return num.toString().padStart(6, '0'); 
}

export const createToken = (type: UserTokenFields['tokenType'], id: number) => {
    const rawToken = type === 'login_verification' ? generateSecureSixDigitCode() : crypto.randomBytes(32).toString('hex').substring(0, 32)
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    
    return { rawToken, token: { token: tokenHash, tokenType: type, userId: id } }
}