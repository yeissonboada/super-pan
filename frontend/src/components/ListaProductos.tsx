import type { Producto } from '../types'

// Las props se tipan como un objeto: es la "firma" del componente.
type Props = {
  productos: Producto[]
  onEliminar: (id: number) => void
}

const pesos = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

// Este componente no tiene estado propio: solo pinta lo que recibe ("componente de presentación").
export default function ListaProductos({ productos, onEliminar }: Props) {
  if (productos.length === 0) {
    return <p>Aún no hay productos. Agrega el primero.</p>
  }

  return (
    <ul className="lista">
      {/* .map() convierte cada producto en un <li>. La `key` le ayuda a React a saber qué fila cambió. */}
      {productos.map((p) => (
        <li key={p.id}>
          <span>{p.nombre}</span>
          <strong>{pesos.format(p.precio)}</strong>
          <button onClick={() => onEliminar(p.id)} aria-label={`Eliminar ${p.nombre}`}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
