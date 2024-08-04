import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'website_settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().defaultTo('Original FoodTruck')
      table.string('description').notNullable().defaultTo('Original FoodTruck is a food truck.')
      table.string('tags').notNullable().defaultTo('food, truck, original')
      table.json('socials').notNullable().defaultTo({})

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
