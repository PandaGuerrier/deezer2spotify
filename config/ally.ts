import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'
import { InferSocialProviders } from '@adonisjs/ally/types'
import { DeezerDriverService } from 'deezer-ally-driver'

const allyConfig = defineConfig({
  spotify: services.spotify({
    clientId: env.get('SPOTIFY_CLIENT_ID'),
    clientSecret: env.get('SPOTIFY_CLIENT_SECRET'),
    callbackUrl: env.get('SPOTIFY_CLIENT_CALLBACK_URL', 'http://127.0.0.1:3333/auth/spotify/callback'),
    scopes: [
      'ugc-image-upload', 'user-read-recently-played', 'user-top-read', 'user-read-playback-position', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'app-remote-control', 'streaming', 'playlist-modify-public', 'playlist-modify-private', 'playlist-read-private', 'playlist-read-collaborative', 'user-follow-modify', 'user-follow-read', 'user-library-modify', 'user-library-read', 'user-read-email', 'user-read-private']
  }),
  // @ts-ignore
  deezer: DeezerDriverService({
    scopes: ['manage_library', 'delete_library', 'listening_history', 'email', 'offline_access', 'basic_access'],
    clientId: env.get('DEEZER_CLIENT_ID'),
    clientSecret: env.get('DEEZER_CLIENT_SECRET'),
    callbackUrl: env.get('DEEZER_CLIENT_CALLBACK_URL', 'http://')
  })

})

export default allyConfig

declare module '@adonisjs/ally/types' {
  // @ts-ignore
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {
  }
}
