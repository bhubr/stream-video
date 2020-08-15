import { sign } from 'jsonwebtoken'
import { jwtSecret } from '../config'

export default {
  async generateJwt(reqUser) {
    const { id, firstname, lastname, avatar } = reqUser
    const jwtPayload = { id, firstname, lastname, avatar }
    const jwt = await sign(jwtPayload, jwtSecret)
    return [jwtPayload, jwt]
  }
}
