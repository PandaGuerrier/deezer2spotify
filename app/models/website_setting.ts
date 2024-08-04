import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class WebsiteSetting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number // always 0

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare tags: string // website tags

  @column()
  declare socials: Map<string, string> // list of social media links

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
