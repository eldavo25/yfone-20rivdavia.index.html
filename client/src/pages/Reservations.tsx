import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReservationSchema, type InsertReservation } from "@shared/schema";
import { useCreateReservation } from "@/hooks/use-reservations";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Reservations() {
  const { mutate, isPending } = useCreateReservation();
  
  const form = useForm<InsertReservation>({
    resolver: zodResolver(insertReservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      partySize: 2,
    },
  });

  function onSubmit(data: InsertReservation) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        {/* Left side: Content/Image */}
        <div className="relative hidden lg:block bg-foreground text-white">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
            alt="Ambiente Restaurante" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center p-16">
            <h1 className="font-serif text-6xl font-bold mb-6">Reserva tu experiencia</h1>
            <p className="text-xl text-white/90 max-w-md leading-relaxed">
              Prepárate para disfrutar de una velada inolvidable. 
              El fuego está prendido y la mesa está lista para recibirte.
            </p>
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 text-white/80">
                <span className="w-12 h-[1px] bg-white/50" />
                <span className="font-serif uppercase tracking-widest text-sm">Horarios</span>
              </div>
              <p className="text-2xl font-serif">Martes a Domingo</p>
              <p className="text-lg">12:00 PM - 3:00 PM (Almuerzo)</p>
              <p className="text-lg">8:00 PM - 12:00 AM (Cena)</p>
            </div>
          </div>
        </div>

        {/* Right side: Form */}
        <div className="p-6 md:p-12 lg:p-20 flex flex-col justify-center bg-white pt-24 lg:pt-20">
          <div className="lg:hidden mb-10 text-center">
            <h1 className="font-serif text-4xl font-bold text-primary mb-4">Reserva tu Mesa</h1>
            <p className="text-muted-foreground">Completa el formulario para asegurar tu lugar.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto w-full"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Pérez" {...field} className="h-12 bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="juan@ejemplo.com" {...field} className="h-12 bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+54 11 ..." {...field} className="h-12 bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-12 w-full pl-3 text-left font-normal bg-background",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: es })
                                ) : (
                                  <span>Seleccionar fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="partySize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personas</FormLabel>
                        <Select 
                          onValueChange={(val) => field.onChange(parseInt(val))} 
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-background">
                              <SelectValue placeholder="Cantidad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Persona' : 'Personas'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 mt-4"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Confirmando...
                    </>
                  ) : (
                    "Confirmar Reserva"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
