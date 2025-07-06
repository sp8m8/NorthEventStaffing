
import { db } from '../db';
import { roles, NewRole, Role } from '@shared/schema';
import { eq } from 'drizzle-orm';

export const rolesService = {
  async getAllRoles(): Promise<Role[]> {
    return db.select().from(roles);
  },

  async getRoleById(id: number): Promise<Role | undefined> {
    const result = await db.select().from(roles).where(eq(roles.id, id));
    return result[0];
  },

  async createRole(newRole: NewRole): Promise<Role> {
    const result = await db.insert(roles).values(newRole).returning();
    return result[0];
  },

  async updateRole(id: number, roleData: Partial<NewRole>): Promise<Role | undefined> {
    const result = await db.update(roles)
      .set(roleData)
      .where(eq(roles.id, id))
      .returning();
    return result[0];
  },

  async deleteRole(id: number): Promise<void> {
    await db.delete(roles).where(eq(roles.id, id));
  },
};
