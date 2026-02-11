import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/90 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-primary font-bold">La Rosadita</h3>
            <p className="text-background/70 leading-relaxed max-w-xs">
              Auténtica parrilla argentina en un ambiente familiar y acogedor. 
              Tradición y sabor en cada plato.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-primary font-semibold">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="/menu" className="hover:text-primary transition-colors">Menú</Link></li>
              <li><Link href="/reservations" className="hover:text-primary transition-colors">Reservas</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-primary font-semibold">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Av. Libertador 1234<br/>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@larosadita.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-16 pt-8 text-center text-sm text-background/50">
          <p>&copy; {new Date().getFullYear()} La Rosadita. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
