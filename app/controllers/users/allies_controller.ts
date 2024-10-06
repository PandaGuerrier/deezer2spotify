import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AlliesController {
  public async spotifyRedirect({ ally }: HttpContext) {
    return ally.use('spotify').redirect()
  }

  public async spotifyCallback({ ally, inertia, auth }: HttpContext) {
    const spotify = ally.use('spotify')
    const accessToken = await spotify.accessToken()
    const spotifyUser = await spotify.userFromToken(accessToken.token)

    let user = await User.query().where('email', spotifyUser.email).first()
    const password = Math.random().toString(36).substring(7)

    if (!user) {
      user = await User.create({
        email: spotifyUser.email,
        username: spotifyUser.name,
        password: password,
      })
    }

    user.spotifyId = spotifyUser.id
    user.spotifyToken = {
      token: spotifyUser.token.token,
      type: spotifyUser.token.type,
      expiresIn: accessToken.expiresIn,
    }
    user.spotifyRefreshToken = accessToken.refreshToken
    user.password = password
    await user.save()

    user = await User.verifyCredentials(user.email, password)
    await auth.use('web').login(user)

    return inertia.render('auth/spotifySuccess', {
      user,
    })
  }

  public async deezerRedirect({ ally }: HttpContext) {
    return ally.use('deezer').redirect()
  }

  public async deezerCallback({ ally, auth, inertia }: HttpContext) {
    const deezer = ally.use('deezer')
    const accessToken = await deezer.customAccessToken()
    const deezerUser = await deezer.userFromToken(accessToken.token)
    const user = auth.use('web').user

    if (!user) {
      return 'not authenticated'
    }

    user.deezerId = deezerUser.id

    user.deezerToken = {
      token: accessToken.token,
      type: deezerUser.token.type,
      expiresIn: accessToken.expiresIn,
    }

    await user.save()

    return inertia.render('auth/deezerSuccess', {
      user,
    })
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
