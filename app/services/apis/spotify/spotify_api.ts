import Http from '../contracts/http.js'
import SpotifyPlaylist from '#services/objects/spotify_playlist'
import Song from '#services/objects/song'
import DeezerPlaylist from '#services/objects/deezer_playlist'

export default class SpotifyApi extends Http {
  public async getPlaylists(accessToken: string) {
    const response = await this.get(`/me/playlists?limit=50`, {
      Authorization: `Bearer ${accessToken}`
    })

    const payload = await response.json()
    // @ts-ignore
    return SpotifyPlaylist.fromArray(payload.items)
  }

  public async getTracks(accessToken: string, playlist: SpotifyPlaylist) {
    const pages = Math.ceil(playlist.tracks / 50)
    const tracks = []
    console.log(accessToken)

    console.log(pages)

    for (let i = 0; i < pages; i++) {
      console.log(i)
      const response = await this.get(`/playlists/${playlist.id}/tracks?limit=50`, {
        Authorization: `Bearer ${accessToken}`
      })
      const payload = await response.json() as any
      console.log(`Page ${i + 1}`)
      console.log(payload)
      tracks.push(...payload.items)
    }

    return Song.fromArray(tracks)
  }

  public async deleteAllPlaylists(accessToken: string) {
    const playlists = await this.getPlaylists(accessToken)

    for (const playlist of playlists) {
      const tracks = await this.getTracks(accessToken, playlist)
      const body = {
        tracks: tracks.map((track) => {
          return {
            uri: `spotify:track:${track.id}`
          }
        })
      }
      console.log("-------------- body --------------")
      console.log(body)
      console.log("-------------- body fin --------------")

      const response = await this.delete(`/playlists/${playlist.id}/tracks`, {
          Authorization: `Bearer ${accessToken}`
        },
        body
      )
      console.log(response.statusText)

      const payload = await response.json()
      console.log(payload)
    }
  }

  public async createPlaylist(accessToken: string, deezerPlaylist: DeezerPlaylist, userId: string) {
    const response = await this.post(`/users/${userId}/playlists`, {
      name: deezerPlaylist.title,
      public: deezerPlaylist.public,
      description: "Playlist created from Deezer, thanks Jules :D !"
    }, {
      Authorization: `Bearer ${accessToken}`
    })

    const payload: any = await response.json()
    console.log(payload)

    return payload.id
  }

  public async getSongFromName(accessToken: string, name: string): Promise<string> {
    const response = await this.get(`/search?q=${name}&type=track&limit=1`, {
      Authorization: `Bearer ${accessToken}`
    })

    const payload: any = await response.json()
    console.log(payload)

    return payload.tracks.items[0].id
  }

  public async addTracksToPlaylist(accessToken: string, playlistId: string, tracks: string[]) {
    const body = {
      uris: tracks.map((track) => `spotify:track:${track}`)
    }

    const response = await this.post(`/playlists/${playlistId}/tracks`, body, {
      Authorization: `Bearer ${accessToken}`
    })

    const payload = await response.json()
    console.log(payload)
  }
}


