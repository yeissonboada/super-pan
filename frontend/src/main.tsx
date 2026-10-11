// Punto de entrada: el equivalente a tu `public static void main`.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // StrictMode ejecuta algunas cosas dos veces en desarrollo para detectar errores.
  // Si ves un console.log duplicado, es por esto (en producción no pasa).
  <StrictMode>
    <App />
  </StrictMode>,
)
