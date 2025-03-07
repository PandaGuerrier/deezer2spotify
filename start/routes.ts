/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AlliesController from '#controllers/users/allies_controller'
import { middleware } from '#start/kernel'
import PlaylistsController from '#controllers/common/playlists_controller'

router.group(() => {
  router.group(() => {
    router.get('/redirect', [AlliesController, 'spotifyRedirect'])
    router.get('/callback', [AlliesController, 'spotifyCallback'])
  }).prefix('spotify')

  router.group(() => {
    router.get('/redirect', [AlliesController, 'deezerRedirect'])
    router.get('/callback', [AlliesController, 'deezerCallback'])
  }).prefix('deezer').middleware(middleware.auth())

  router.get('/logout', [AlliesController, 'logout']).use(middleware.auth())
}).prefix('auth')

router.group(() => {
  router.get('/', [PlaylistsController, 'index'])

  router.group(() => {
    router.get('/delete', [PlaylistsController, 'deleteSpotify']).use(middleware.auth())
  }).prefix('spotify')

  router.group(() => {
    router.get('/delete', [PlaylistsController, 'deleteDeezer'])
    router.get('/publish', [PlaylistsController, 'publishToSpotify'])
  }).prefix('deezer').middleware(middleware.auth())

}).use(middleware.auth()).prefix('playlists')

router.on('/').renderInertia('Home')


