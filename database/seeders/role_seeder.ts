import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import { PermissionsManager } from '../../app/types/PermissionsManager.js'
import Permission from '#models/permission'

export default class extends BaseSeeder {
  async run() {
    const allPermissions = await Permission.query().exec()

    await Role.createMany([
      {
        name: 'Member',
        description: 'Le membre par défault',
        power: 100,
        slug: 'member',
        permissions: new PermissionsManager()
      },
      {
        name: 'Admin',
        description: 'L\'administrateur',
        power: 1000,
        slug: 'admin',
        permissions: PermissionsManager.fromJson(allPermissions.map(p => p.slug))
      }
    ])
  }
}
