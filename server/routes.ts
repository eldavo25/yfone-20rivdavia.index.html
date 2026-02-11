import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Menu Routes
  app.get(api.menu.list.path, async (req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  app.get(api.menu.getByCategory.path, async (req, res) => {
    const items = await storage.getMenuItemsByCategory(req.params.category);
    res.json(items);
  });

  // Reservation Routes
  app.post(api.reservations.create.path, async (req, res) => {
    try {
      const input = api.reservations.create.input.parse(req.body);
      const reservation = await storage.createReservation(input);
      res.status(201).json(reservation);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Contact Routes
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Menu Data if empty
  await seedMenu();

  return httpServer;
}

async function seedMenu() {
  const existing = await storage.getMenuItems();
  if (existing.length > 0) return;

  const initialMenu = [
    // Entradas
    {
      name: "Empanadas Criollas",
      description: "Carne cortada a cuchillo, cebolla de verdeo, huevo duro y especias tradicionales.",
      price: 2500,
      category: "entradas",
      imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Provoleta a la Parrilla",
      description: "Queso provolone fundido con orégano y un toque de aceite de oliva.",
      price: 6500,
      category: "entradas",
      imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&auto=format&fit=crop&q=60" // Generic cheese/food
    },
    // Parrilla
    {
      name: "Asado de Tira",
      description: "Corte clásico argentino, jugoso y con mucho sabor.",
      price: 18000,
      category: "parrilla",
      imageUrl: "https://images.unsplash.com/photo-1544025162-d76690b67f61?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Bife de Chorizo",
      description: "Bife angosto tierno y sabroso, punto de cocción a elección.",
      price: 21000,
      category: "parrilla",
      imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Matambre a la Pizza",
      description: "Tierno matambre cubierto con salsa de tomate, muzzarella y jamón.",
      price: 16500,
      category: "parrilla",
      imageUrl: "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=800&auto=format&fit=crop&q=60"
    },
    // Guarniciones
    {
      name: "Papas Fritas a la Provenzal",
      description: "Crocantes, con ajo y perejil fresco.",
      price: 4500,
      category: "guarniciones",
      imageUrl: "https://images.unsplash.com/photo-1630384060421-a4323ce66488?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Ensalada Mixta",
      description: "Lechuga, tomate y cebolla.",
      price: 3500,
      category: "guarniciones",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60"
    },
    // Postres
    {
      name: "Flan Casero con Dulce de Leche",
      description: "El clásico flan de huevo, acompañado de dulce de leche y crema.",
      price: 5000,
      category: "postres",
      imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&auto=format&fit=crop&q=60"
    },
    {
      name: "Panqueques con Dulce de Leche",
      description: "Dos panqueques rellenos con abundante dulce de leche.",
      price: 4800,
      category: "postres",
      imageUrl: "https://images.unsplash.com/photo-1514867990434-60dd66b5790d?w=800&auto=format&fit=crop&q=60" // Generic pancake look
    }
  ];

  for (const item of initialMenu) {
    await storage.createMenuItem(item);
  }
}
