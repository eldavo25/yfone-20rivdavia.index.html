import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Argentinian Asado background */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop" 
            alt="Parrilla Argentina Tradicional" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary-foreground/90 font-sans tracking-widest uppercase text-sm md:text-base mb-4 font-semibold">
              Bienvenido a
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-lg">
              La Rosadita
            </h1>
            <p className="text-white/90 text-lg md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Auténtica parrilla argentina. Sabores que cuentan historias, 
              tradición que se siente en cada bocado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-full">
                  Ver Menú
                </Button>
              </Link>
              <Link href="/reservations">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full">
                  Reservar Mesa
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features/Highlights */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">Calidad Premium</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seleccionamos los mejores cortes de carne y productos frescos locales para garantizar una experiencia inolvidable.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">Ambiente Familiar</h3>
              <p className="text-muted-foreground leading-relaxed">
                Un espacio diseñado para compartir momentos especiales con familia y amigos, donde el tiempo se detiene.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">Ubicación Ideal</h3>
              <p className="text-muted-foreground leading-relaxed">
                Situados en el corazón de la ciudad, con fácil acceso y estacionamiento exclusivo para nuestros clientes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Image of Chef/Grill */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" 
                  alt="Chef cocinando" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full border-4 border-primary/20 rounded-2xl z-0" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                Tradición que se transmite de generación en generación
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
              <p className="text-lg text-muted-foreground leading-relaxed">
                En La Rosadita, el asado no es solo una comida, es un ritual. 
                Nuestra historia comenzó hace más de 30 años en un pequeño pueblo, 
                con la receta secreta del abuelo y una pasión inquebrantable por el fuego y la carne.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hoy, mantenemos vivo ese espíritu, respetando los tiempos de cocción, 
                la calidad de la leña y la calidez en el servicio que nos caracteriza.
              </p>
              <div className="pt-4">
                <Link href="/contact">
                  <Button variant="link" className="text-primary text-lg p-0 hover:text-primary/80 group">
                    Conoce más sobre nosotros <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-serif font-bold text-primary">Platos Destacados</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Una selección de nuestros clásicos favoritos, preparados con la maestría de nuestros parrilleros.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Static featured items for preview */}
             {[
               { title: "Ojo de Bife", desc: "Corte premium jugoso y tierno.", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop" },
               { title: "Empanadas Salteñas", desc: "Carne cortada a cuchillo.", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=2000&auto=format&fit=crop" },
               { title: "Matambre a la Pizza", desc: "Tierno, con muzzarella y tomate.", img: "https://images.unsplash.com/photo-1599925208477-805c86236961?q=80&w=2000&auto=format&fit=crop" },
               { title: "Flan Casero", desc: "Con dulce de leche y crema.", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1964&auto=format&fit=crop" }
             ].map((item, idx) => (
               <div key={idx} className="group cursor-pointer">
                 <div className="aspect-square overflow-hidden rounded-xl mb-4 relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                 </div>
                 <h3 className="text-xl font-serif font-bold text-primary mb-1">{item.title}</h3>
                 <p className="text-white/60 text-sm">{item.desc}</p>
               </div>
             ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90">
                Ver Menú Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
