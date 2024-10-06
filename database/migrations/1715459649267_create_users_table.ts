import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('email').notNullable().unique()
      table.string('username').notNullable()
      table.string('password').nullable()
      table.string('remember_me_token').nullable()

      table.string('spotify_id').nullable()
      table.json('spotify_token').nullable()
      table.text('spotify_refresh_token').nullable()

      table.string('deezer_id').nullable()
      table.json('deezer_token').nullable()
      table.string('deezer_refresh_token').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
