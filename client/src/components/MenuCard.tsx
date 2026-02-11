import { type MenuItem } from "@shared/schema";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  // Format price from centavos
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(item.price / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow bg-white h-full flex flex-col group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl font-bold text-foreground">{item.name}</h3>
            <span className="font-semibold text-primary text-lg">{formattedPrice}</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
            {item.description}
          </p>
          {!item.available && (
            <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full self-start">
              Agotado
            </span>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
