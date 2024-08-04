import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AlliesController {
  public async spotifyRedirect({ ally }: HttpContext) {
    return ally.use('spotify').redirect()
  }

  public async spotifyCallback({ ally, inertia }: HttpContext) {
    const spotify = ally.use('spotify')
    const accessToken = await spotify.accessToken()
    const spotifyUser = await spotify.userFromToken(accessToken.token)

    let user = await User.query().where('email', spotifyUser.email).first()

    if (!user) {
      user = await User.create({
        email: spotifyUser.email,
        username: spotifyUser.name,
      })
    }

    user.spotifyId = spotifyUser.id
    user.spotifyToken = {
      token: spotifyUser.token.token,
      type: spotifyUser.token.type,
      expiresIn: accessToken.expiresIn,
    }
    user.spotifyRefreshToken = accessToken.refreshToken

    await user.save()

    return inertia.render('auth/spotifySuccess', {
      user,
    })
  }
}
