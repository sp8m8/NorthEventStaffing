
import { db } from '../db';
import { users, NewUser, User } from '@shared/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const usersService = {
  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  },

  async getUserById(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  },

  async createUser(newUser: NewUser): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newUser.passwordHash, salt);
    const result = await db.insert(users).values({ ...newUser, passwordHash }).returning();
    return result[0];
  },

  async updateUser(id: number, userData: Partial<NewUser>): Promise<User | undefined> {
    const result = await db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return result[0];
  },

  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  },
};
