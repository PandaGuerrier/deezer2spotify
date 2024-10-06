import Http from '../contracts/http.js'

export default class Deezer_api extends Http {
  public baseUrl: string = 'https://api.deezer.com'
  public headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }


  public async getPlaylists(accessToken: string) {
    return this.get(`${this.baseUrl}/user/me/playlists`, {
      Authorization: `Bearer ${accessToken}`
    })
  }
}
