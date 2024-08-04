import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { PermissionsManager } from '../types/PermissionsManager.js'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string

  @column()
  declare power: number

  @column({
    serializeAs: null,
    consume: (value: string) => PermissionsManager.fromJson(value),
    prepare: (value: PermissionsManager) => JSON.stringify(value.toJson()),
  })
  declare permissions: PermissionsManager

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
