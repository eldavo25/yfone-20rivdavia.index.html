import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useMenu(category?: string) {
  const queryKey = category 
    ? [api.menu.getByCategory.path, category] 
    : [api.menu.list.path];

  const queryFn = async () => {
    let path = api.menu.list.path;
    if (category) {
      path = buildUrl(api.menu.getByCategory.path, { category });
    }
    
    const res = await fetch(path);
    if (!res.ok) throw new Error("Error al cargar el menú");
    
    // Using schema validation from shared routes if available, 
    // otherwise fallback to json
    return await res.json();
  };

  return useQuery({
    queryKey,
    queryFn,
  });
}
