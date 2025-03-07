import type { HttpContext } from '@adonisjs/core/http'
import Services from '#services/services'
import DeezerApi from '#services/apis/deezer/deezer_api'
import SpotifyApi from '#services/apis/spotify/spotify_api'

export default class PlaylistsController {
  public async index({ inertia, auth }: HttpContext) {
    const user = auth.use('web').user!
    const deezerApi = Services.resolve<DeezerApi>('deezer')
    const spotifyApi = Services.resolve<SpotifyApi>('spotify')
    const deezerPlaylist = await deezerApi.getPlaylists(user.deezerToken.token)
    const spotifyPlaylist = await spotifyApi.getPlaylists(user.spotifyToken.token)

    return inertia.render('playlists/index', {
      user: user,
      deezerPlaylist,
      spotifyPlaylist
    })
  }

  public async deleteDeezer({ response, auth }: HttpContext) {
    const deezerApi = Services.resolve<DeezerApi>('deezer')
    const user = auth.use('web').user!

    await deezerApi.deleteAllPlaylists(user.deezerToken.token)

    return response.redirect('/playlists')
  }

  public async deleteSpotify({ response, auth }: HttpContext) {
    const spotifyApi = Services.resolve<SpotifyApi>('spotify')
    const user = auth.use('web').user!

    await spotifyApi.deleteAllPlaylists(user.spotifyToken.token)

    return response.redirect('/playlists')
  }

  public async publishToSpotify({ response, auth }: HttpContext) {
    const user = auth.use('web').user!
    const spotifyApi = Services.resolve<SpotifyApi>('spotify')
    const deezerApi = Services.resolve<DeezerApi>('deezer')

    const deezerPlaylist = await deezerApi.getPlaylists(user.deezerToken.token)

    for (const playlistD of deezerPlaylist) {
      const tracks = await playlistD.getTracks(user.deezerToken.token, user.spotifyToken.token)
      const playlist = await spotifyApi.createPlaylist(user.spotifyToken.token, playlistD, user.spotifyId)

      await spotifyApi.addTracksToPlaylist(user.spotifyToken.token, playlist, tracks)
    }

    return response.redirect('/playlists')
  }
}
