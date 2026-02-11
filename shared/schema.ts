import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Centavos (e.g., 1500 = $15.00)
  category: text("category").notNull(), // 'entradas', 'parrilla', 'guarniciones', 'postres', 'bebidas'
  imageUrl: text("image_url").notNull(),
  available: boolean("available").default(true),
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  date: timestamp("date").notNull(),
  partySize: integer("party_size").notNull(),
  status: text("status").default("pending"), // 'pending', 'confirmed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertReservationSchema = createInsertSchema(reservations).omit({ id: true, status: true, createdAt: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });

// === TYPES ===

export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
