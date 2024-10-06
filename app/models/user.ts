import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  declare rememberMeToken: string | null

  // spotify

  @column()
  declare spotifyId: string

  @column()
  declare spotifyToken: {
    token: string
    type: string
    expiresIn: number
  }

  @column()
  declare spotifyRefreshToken: string

  // deezer

  @column()
  declare deezerId: string

  @column()
  declare deezerToken: {
    token: string
    type: string
    expiresIn: number
  }

  @column()
  declare deezerRefreshToken: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
