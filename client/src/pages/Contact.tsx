import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useCreateContact } from "@/hooks/use-contact";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useCreateContact();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertContact) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl font-bold text-foreground mb-4">Contáctanos</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estamos aquí para responder tus consultas, escuchar tus sugerencias o ayudarte con eventos especiales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold">Ubicación</h3>
                <p className="text-muted-foreground">Av. Libertador 1234<br/>Buenos Aires, Argentina</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold">Teléfono</h3>
                <p className="text-muted-foreground">+54 11 1234-5678<br/>+54 11 9876-5432</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold">Email</h3>
                <p className="text-muted-foreground">info@larosadita.com<br/>eventos@larosadita.com</p>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold">Horarios</h3>
                <p className="text-muted-foreground">Mar-Dom: 12:00 - 15:00<br/>Mar-Dom: 20:00 - 00:00</p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted rounded-2xl h-64 w-full flex items-center justify-center text-muted-foreground relative overflow-hidden">
               <div className="absolute inset-0 bg-neutral-200" />
               <p className="relative z-10 font-medium">Mapa de Ubicación (Google Maps Placeholder)</p>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border/50"
          >
            <h3 className="font-serif text-2xl font-bold mb-6">Envíanos un mensaje</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="¿Cómo podemos ayudarte?" 
                          className="min-h-[150px] resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
