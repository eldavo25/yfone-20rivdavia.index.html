import { db } from "./db";
import {
  menuItems,
  reservations,
  contacts,
  type InsertMenuItem,
  type InsertReservation,
  type InsertContact,
  type MenuItem,
  type Reservation,
  type Contact
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Menu
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  // Reservations
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  
  // Contact
  createContact(message: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  // Menu
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.category, category));
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  // Reservations
  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [newReservation] = await db.insert(reservations).values(reservation).returning();
    return newReservation;
  }

  // Contact
  async createContact(message: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(message).returning();
    return newContact;
  }
}

export const storage = new DatabaseStorage();
