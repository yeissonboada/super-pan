// Un componente de React es una función que recibe datos y devuelve lo que se pinta (JSX).
// Cada vez que su "estado" cambia, React vuelve a llamar a la función y actualiza la pantalla.
import { useEffect, useState } from 'react'
import { crearProducto, eliminarProducto, listarProductos } from './api'
import FormProducto from './components/FormProducto'
import ListaProductos from './components/ListaProductos'
import type { NuevoProducto, Producto } from './types'

export default function App() {
  // useState = una variable que, al cambiarla con su "setter", provoca un re-render.
  // Nunca modifiques `productos` directamente (productos.push...); usa siempre setProductos.
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // useEffect = código con efectos secundarios (llamadas HTTP, timers...).
  // El arreglo vacío [] significa "ejecútalo una sola vez, al mostrar el componente".
  useEffect(() => {
    listarProductos()
      .then(setProductos)
      .catch((e: Error) => setError(e.message))
      .finally(() => setCargando(false))
  }, [])

  async function agregar(nuevo: NuevoProducto) {
    try {
      const creado = await crearProducto(nuevo)
      // Inmutabilidad: se crea un arreglo nuevo en lugar de modificar el actual.
      setProductos((actuales) => [...actuales, creado])
      setError(null)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  async function quitar(id: number) {
    try {
      await eliminarProducto(id)
      setProductos((actuales) => actuales.filter((p) => p.id !== id))
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <main>
      <h1>🥐 Panadería</h1>

      {/* Los "props" son los parámetros del componente: aquí le pasamos una función callback */}
      <FormProducto onGuardar={agregar} />

      {/* Renderizado condicional: && pinta lo de la derecha solo si lo de la izquierda es verdadero */}
      {error && <p className="error">{error}</p>}

      {cargando ? <p>Cargando…</p> : <ListaProductos productos={productos} onEliminar={quitar} />}
    </main>
  )
}
