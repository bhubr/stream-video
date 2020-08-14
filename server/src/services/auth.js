import { sign } from 'jsonwebtoken'

export default {
  async generateJwt(reqUser) {
    const { id, firstname, lastname, avatar } = reqUser
    const jwtPayload = { id, firstname, lastname, avatar }
    const jwt = await sign(jwtPayload, process.env.JWT_SECRET)
    return [jwtPayload, jwt]
  }
}
