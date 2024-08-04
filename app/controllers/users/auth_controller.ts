import type { HttpContext } from '@adonisjs/core/http'
import { createAuthLoginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(createAuthLoginValidator)

    const user = await User.verifyCredentials(data.email, data.password)

    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' })
    }

    return response.json({ message: 'Logged in successfully' })
  }

}
