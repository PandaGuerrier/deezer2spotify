import Services from '#services/services'
import DeezerApi from '#services/apis/deezer/deezer_api'
import SpotifyApi from '#services/apis/spotify/spotify_api'

export default class DeezerPlaylist {
  public id: number
  public title: string
  public duration: number
  public public: boolean
  public nb_tracks: number
  public fans: number
  public link: string
  public picture: string
  public picture_small: string
  public creation_date: string
  public tracksEndpoint: string
  public creator: {
    id: number
    name: string
    tracklist: string
    type: string
  }
  public type: string

  constructor(data: any) {
    this.id = data.id
    this.title = data.title
    this.duration = data.duration
    this.public = data.public
    this.nb_tracks = data.nb_tracks
    this.fans = data.fans
    this.link = data.link
    this.picture = data.picture
    this.picture_small = data.picture_small
    this.creation_date = data.creation_date
    this.creator = data.creator
    this.type = data.type
    this.tracksEndpoint = data.tracklist
  }

  public static fromArray(data: any[]) {
    return data.map((item) => new DeezerPlaylist(item))
  }

  public async getTracks(deezerAccessToken: string, spotifyAccessToken: string) {
    const deezerApi = Services.resolve<DeezerApi>('deezer')
    const spotifyApi = Services.resolve<SpotifyApi>('spotify')

    const response = await deezerApi.get("/playlist/" + this.id + "/tracks", {
      Authorization: `Bearer ${deezerAccessToken}`
    })

    const payload: any = await response.json()

    console.log("-------------- body deezer get tracks  --------------")
    console.log(payload)
    console.log("-------------- body deezer get tracks fin --------------")
    const tracks: string[] = []
    for (const track of payload.data) {
      const song = await spotifyApi.getSongFromName(spotifyAccessToken, track.title)
      if (song) {
        tracks.push(song)
      }
      console.log("-------------- song --------------")
      console.log(song)
      console.log("-------------- song fin --------------")
    }

    return tracks
  }
}
