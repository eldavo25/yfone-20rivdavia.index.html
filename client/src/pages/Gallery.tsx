import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    { src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", alt: "Parrilla" },
    { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop", alt: "Chef" },
    { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop", alt: "Ambiente" },
    { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop", alt: "Carne" },
    { src: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=2000&auto=format&fit=crop", alt: "Empanadas" },
    { src: "https://images.unsplash.com/photo-1599925208477-805c86236961?q=80&w=2000&auto=format&fit=crop", alt: "Matambre" },
    { src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop", alt: "Postre" },
    { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop", alt: "Vino" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop", alt: "Plato" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Nuestra Galería</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un recorrido visual por nuestros platos, nuestro espacio y los momentos que compartimos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 duration-500" />
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
