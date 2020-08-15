import { sign } from 'jsonwebtoken'
import { jwtSecret, adminUsers } from '../config'
import userModel from '../models/user'

export default {
  async generateJwt(reqUser) {
    const { id, email, firstname, lastname, avatar } = reqUser
    const jwtPayload = { id, email, firstname, lastname, avatar }
    const jwt = await sign(jwtPayload, jwtSecret)
    return [jwtPayload, jwt]
  },

  async registerUser(googleProfile) {
    const { email } = googleProfile
    const user = await userModel.findOne(email, 'email')
    if (user) return user

    const isWhitelisted = await userModel.isWhitelisted(email)
    if (!isWhitelisted) throw new Error(`Non-whitelisted email ${email}`)
    const role = adminUsers.includes(email) ? 'admin' : 'regular'
    const { googleId, firstname, lastname, avatar } = googleProfile
    const columnValues = [googleId, email, firstname, lastname, avatar, role]
    return userModel.create(columnValues)
  }
}
