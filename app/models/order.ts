import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Item from '#models/item'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User> | null

  @column()
  declare status: OrderStatus

  @manyToMany(() => Item)
  declare items: ManyToMany<typeof Item>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  get getTotal() {
    return this.items.reduce((acc: number, item: Item) => acc + item.price, 0)
  }
}

export type OrderStatus = 'pending' | 'payed' | 'canceled' | 'finished'
