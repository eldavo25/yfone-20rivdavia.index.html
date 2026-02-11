import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertReservation } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateReservation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertReservation) => {
      // Need to transform date string/object to ISO string if needed by backend
      const payload = {
        ...data,
        // Ensure date is properly formatted if it's a Date object
        date: new Date(data.date).toISOString()
      };

      const res = await fetch(api.reservations.create.path, {
        method: api.reservations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al crear la reserva");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Reserva Confirmada!",
        description: "Te esperamos en La Rosadita.",
        variant: "default",
        className: "bg-primary text-white border-none"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
