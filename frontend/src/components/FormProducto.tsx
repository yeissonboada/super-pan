import { useState, type FormEvent } from 'react'
import type { NuevoProducto } from '../types'

type Props = {
  onGuardar: (p: NuevoProducto) => Promise<void>
}

export default function FormProducto({ onGuardar }: Props) {
  // "Inputs controlados": el valor de cada campo vive en el estado de React, no en el DOM.
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [guardando, setGuardando] = useState(false)

  async function enviar(e: FormEvent) {
    e.preventDefault() // evita que el navegador recargue la página al enviar el form
    setGuardando(true)
    await onGuardar({ nombre: nombre.trim(), precio: Number(precio) })
    setGuardando(false)
    setNombre('')
    setPrecio('')
  }

  return (
    <form className="form" onSubmit={enviar}>
      <input
        placeholder="Nombre (ej. Pan de bono)"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        min={1}
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <button disabled={guardando}>{guardando ? 'Guardando…' : 'Agregar'}</button>
    </form>
  )
}
