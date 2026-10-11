// Los tipos de TypeScript cumplen el papel de tus DTOs/records de Java.
// Deben coincidir con lo que devuelve el backend.
export type Producto = {
  id: number
  nombre: string
  precio: number
}

export type NuevoProducto = Omit<Producto, 'id'>
