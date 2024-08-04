export class PermissionsManager {
    permissions: any[]; // exemple: ['user:create', 'user:edit', 'user:delete'], define by a list of slug's permission

    constructor() {
      this.permissions = [];
    }

    addPermission(permission: any): void {
      this.permissions.push(permission);
    }

    getPermissions(): any[] {
      return this.permissions;
    }

    toJson(): any {
      return this.permissions;
    }

    static fromJson(json: any): PermissionsManager {
      const permissionsManager = new PermissionsManager();
      json.forEach((permission: any) => {
        permissionsManager.addPermission(permission);
      });
      return permissionsManager;
    }
}
