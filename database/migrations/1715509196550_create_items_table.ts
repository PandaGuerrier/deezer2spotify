import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('image').nullable()
      table.integer('category_id').unsigned().references('id').inTable('items_categories').onDelete('CASCADE')
      table.float('price').notNullable()
      table.integer('stock').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.boolean('show_stock').defaultTo(true)
      table.boolean('show').defaultTo(true)
      table.boolean('disabled').defaultTo(false)


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
