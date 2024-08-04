import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { Fidelity } from '../types/Fidelity.js'
import Order from '#models/order'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column({
    serializeAs: null,
    consume: (value: string) => Fidelity.fromJson(value),
    prepare: (value: Fidelity) => JSON.stringify(value.toJson()),
  })
  declare fidelity: Fidelity

  @manyToMany(() => Order)
  declare orders: ManyToMany<typeof Order>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>

  @column()
  declare roleId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  getFidelityPoints() {
    return this.fidelity.getPoints()
  }

  setFidelityPoints(points: number) {
    this.fidelity.setPoints(points)
  }

  @beforeCreate()
  public static async beforeCreate(user: User) {
    user.uuid = User.createUuid()
    user.fidelity = new Fidelity(user.getFullName(), 0)
    const role = await Role.query().where('slug', 'member').firstOrFail()
    user.roleId = role.id
  }

  private static createUuid() {
    return 'xxxx-xxxx-fdxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
