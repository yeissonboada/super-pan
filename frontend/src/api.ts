// Capa de acceso al backend: piensa en ella como un "cliente REST" (tipo Feign o RestClient).
// Mantenerla separada de los componentes hace que la UI no sepa nada de URLs ni de fetch.
import type { NuevoProducto, Producto } from './types'

const BASE = '/api/productos'

// async/await funciona como un CompletableFuture que se "espera" sin bloquear el hilo.
export async function listarProductos(): Promise<Producto[]> {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error(`Error ${res.status} al cargar productos`)
  return res.json()
}

export async function crearProducto(p: NuevoProducto): Promise<Producto> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(p),
  })
  if (!res.ok) throw new Error(`Error ${res.status} al crear producto`)
  return res.json()
}

export async function eliminarProducto(id: number): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Error ${res.status} al eliminar producto`)
}
