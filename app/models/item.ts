import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ItemsCategory from '#models/items_category'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare description: string

  @column()
  declare image: string | null

  @column()
  declare stock: number | null // can be null if dont want to show the stock

  @column()
  declare showStock: boolean // show stock in the frontend

  @column()
  declare show: boolean // show item in the frontend

  @column()
  declare disabled: boolean // disable item in the frontend

  @column()
  declare categoryId: number

  @belongsTo(() => ItemsCategory)
  declare category: BelongsTo<typeof ItemsCategory>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
