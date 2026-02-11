import { useMutation } from "@tanstack/react-query";
import { api, type InsertContact } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al enviar mensaje");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensaje Enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
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
