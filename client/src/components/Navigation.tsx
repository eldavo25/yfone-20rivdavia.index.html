import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/menu", label: "Menú" },
    { href: "/gallery", label: "Galería" },
    { href: "/reservations", label: "Reservas" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
          </div>
          <span className="font-serif text-2xl font-bold text-foreground tracking-tight">
            La Rosadita
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.href ? "text-primary font-bold" : "text-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/reservations">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Reservar Mesa
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border/50 overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-4">
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-lg font-medium py-2 border-b border-border/40 ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/reservations">
                <Button className="w-full bg-primary mt-4">Reservar Mesa</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
