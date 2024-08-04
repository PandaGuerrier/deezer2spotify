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

router.get('/auth/spotify/redirect', [AlliesController, 'spotifyRedirect'])
router.get('/auth/spotify/callback', [AlliesController, 'spotifyCallback'])

router.on('/').renderInertia('Home')
