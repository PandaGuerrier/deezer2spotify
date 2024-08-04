import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Permission from '#models/permission'

export default class extends BaseSeeder {
  async run() {
    await Permission.createMany([
      {
        name: 'Create User',
        slug: 'user:create',
        description: 'Create a new user'
      },
      {
        name: 'Edit User',
        slug: 'user:edit',
        description: 'Edit an existing user'
      },
      {
        name: 'Delete User',
        slug: 'user:delete',
        description: 'Delete an existing user'
      }
    ])
  }
}
