# Panadería

Base mínima para ir construyendo el sistema de la panadería.

```
panaderia/
├── backend/            Spring Boot 3 + Java 21 + PostgreSQL
│   └── src/main/java/com/panaderia/
│       └── producto/   Producto, Repository, Controller
├── frontend/           React 19 + TypeScript + Vite
│   └── src/
│       ├── api.ts          llamadas al backend
│       ├── types.ts        tipos (como tus DTOs)
│       ├── App.tsx         componente principal (estado y lógica)
│       └── components/     componentes de presentación
└── docker-compose.yml  solo PostgreSQL
```

## Cómo correrlo

Requisitos: Java 21, Maven, Node 20+ y Docker.

```bash
# 1. Base de datos
docker compose up -d

# 2. Backend (puerto 8080)
cd backend
mvn spring-boot:run

# 3. Frontend (puerto 5173), en otra terminal
cd frontend
npm install
npm run dev
```

Abre http://localhost:5173. Vite reenvía `/api/*` al backend, así que no necesitas CORS en desarrollo.

## API

| Método | Ruta                  | Descripción          |
|--------|-----------------------|----------------------|
| GET    | /api/productos        | Lista productos      |
| POST   | /api/productos        | Crea `{nombre, precio}` |
| DELETE | /api/productos/{id}   | Elimina un producto  |

## Para ir aprendiendo React

Sigue el flujo en este orden: `main.tsx` → `App.tsx` → `components/`. Los comentarios explican cada concepto
(`useState`, `useEffect`, props, `key`, inputs controlados) comparándolo con Java.

Ejercicios sugeridos para practicar con este mismo código:
1. Agrega un campo `categoria` (backend + tipo + formulario).
2. Crea un componente `BuscadorProductos` que filtre la lista mientras escribes.
3. Permite editar el precio de un producto.

## Siguientes pasos (cuando tengas los requerimientos)

- Cada módulo nuevo (pedidos, clientes, caja) va en su propio paquete en `backend/` y su carpeta en `frontend/src/`.
- Cambiar `ddl-auto: update` por migraciones con Flyway.
- Agregar un router (React Router) cuando haya más de una pantalla.
