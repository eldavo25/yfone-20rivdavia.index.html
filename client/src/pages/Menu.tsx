import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useMenu } from "@/hooks/use-menu";
import { MenuCard } from "@/components/MenuCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Menu() {
  const { data: menuItems, isLoading } = useMenu();

  const categories = [
    { id: "all", label: "Todo" },
    { id: "entradas", label: "Entradas" },
    { id: "parrilla", label: "Parrilla" },
    { id: "guarniciones", label: "Guarniciones" },
    { id: "postres", label: "Postres" },
    { id: "bebidas", label: "Vinos y Bebidas" },
  ];

  // Helper to filter items
  const getItems = (category: string) => {
    if (!menuItems) return [];
    if (category === "all") return menuItems;
    return menuItems.filter((item: any) => item.category === category);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Menu Header */}
      <div className="bg-foreground py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Nuestro Menú
          </motion.h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Descubre los sabores auténticos de nuestra tierra, preparados con pasión y respeto por la tradición.
          </p>
        </div>
      </div>

      <main className="flex-grow py-16 container mx-auto px-4 md:px-6">
        <Tabs defaultValue="all" className="w-full space-y-12">
          <div className="flex justify-center overflow-x-auto pb-4 md:pb-0">
            <TabsList className="bg-transparent h-auto p-0 gap-2 md:gap-4 flex-wrap justify-center">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="rounded-full border border-primary/20 bg-white/50 px-6 py-3 text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-white hover:bg-primary/10 transition-all"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-0 focus-visible:outline-none">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4">
                      <Skeleton className="h-64 w-full rounded-xl" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getItems(cat.id).map((item: any, idx: number) => (
                    <MenuCard key={item.id} item={item} index={idx} />
                  ))}
                </div>
              )}
              
              {!isLoading && getItems(cat.id).length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-xl">No hay items disponibles en esta categoría por el momento.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
