import Http from '../contracts/http.js'

export default class SpotifyApi extends Http {
  public baseUrl: string = 'https://api.spotify.com'
  public headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }


  public async getPlaylists(accessToken: string) {
    return this.get(`${this.baseUrl}/user/me/playlists`, {
      Authorization: `Bearer ${accessToken}`
    })
  }
}
