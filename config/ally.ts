import env from '#start/env'
import { defineConfig, services } from '@adonisjs/ally'
import { InferSocialProviders } from '@adonisjs/ally/types'

const allyConfig = defineConfig({
  spotify: services.spotify({
    clientId: env.get('SPOTIFY_CLIENT_ID'),
    clientSecret: env.get('SPOTIFY_CLIENT_SECRET'),
    callbackUrl: env.get('SPOTIFY_CLIENT_CALLBACK_URL', 'http://127.0.0.1:3333/auth/spotify/callback'),
    scopes: ['user-read-email', 'user-read-private', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-private', 'playlist-modify-public', 'user-read-recently-played', 'user-top-read', 'user-library-read', 'user-library-modify', 'user-follow-read', 'user-follow-modify', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing'],
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
