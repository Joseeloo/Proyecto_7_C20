# Proyecto 7: DailyMarket – Aplicación Fullstack de Comercio Electrónico

> DailyMarket es una aplicación fullstack de comercio electrónico que permite a los usuarios explorar productos de distintas categorías, gestionar un carrito de compras, autenticarse de forma segura y realizar pagos en línea mediante una pasarela de pago integrada.
 Proyecto desarrollado para el Proyecto 7 del Bootcamp Desarrollo Web Full Stack (UDD).

# Índice

- [Introducción](#introducción)
- [Descripción general](#descripción-general)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Backend](#backend)
- [Frontend](#frontend)
- [Funcionalidades principales](#funcionalidades-principales)
- [Autentificación y autorización](#autentificación-y-autorización)
- [Gestión de productos](#gestión-de-productos)
- [Checkout y pagos](#checkout-y-pagos)
- [Despliegue](#despliegue)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estado del proyecto](#estado-del-proyecto)

# Introducción

El comercio electrónico ha crecido de forma exponencial en los últimos años, haciendo indispensable que las aplicaciones modernas integren catálogos de productos, autenticación segura y sistemas de pago confiables.

DailyMarket aborda este desafío mediante una solución fullstack que integra frontend y backend de forma coherente, permitiendo una experiencia de compra completa y realista.

# Descripción general
DailyMarket es una multitienda digital, donde los usuarios pueden:
- Explorar productos organizados por categorías
- Ver el detalle de cada producto
- Agregar productos al carrito y modificar cantidades
- Registrarse e iniciar sesión
- Acceder a un perfil privado
- Realizar pagos en línea mediante Stripe (modo prueba)

# Arquitectura del proyecto

El proyecto se divide en dos capas principales:
```
📁 proyecto7-DWFS
├── 📁 backend
└── 📁 frontend
```

Cada capa mantiene responsabilidades claras y se comunica mediante una API REST.

# Backend
El backend implementa una API RESTful desarrollada con Node.js, Express y MongoDB, encargada de:
- Autenticación y autorización con JWT
- Gestión de usuarios
- Gestión de productos (CRUD completo)
- Gestión de carrito de compras
- Integración con Stripe para pagos
- Manejo global de errores
- Documentación mediante Swagger

### Funcionalidades del backend
- CRUD completo de productos (Create, Read, Update, Delete)
- Carrito asociado al usuario autenticado
- Protección de rutas mediante middleware de autenticación
- Sesiones stateless mediante JWT
- Validaciones y respuestas estandarizadas

# Frontend
El frontend está desarrollado con React + Vite, utilizando Context API y useReducer para el manejo de estado global.

### Funcionalidades del frontend
- Home con presentación de la tienda
- Listado de productos con filtro por categoría
- Vista de producto individual
- Carrito editable (sumar, restar, eliminar productos)
- Registro e inicio de sesión
- Perfil privado
- Checkout integrado con Stripe
- Manejo de rutas públicas y privadas
El diseño utiliza TailwindCSS, manteniendo una estética moderna, clara y consistente.

# Autenticación y autorización
La aplicación implementa autenticación basada en JSON Web Tokens (JWT):
- Registro e inicio de sesión de usuarios
- Persistencia de sesión mediante token
- Rutas protegidas (perfil, carrito, checkout)
- Logout seguro

# Gestión de productos
La gestión de productos cumple con todos los criterios solicitados:
- Creación de productos (backend)
- Consulta de productos (listado y detalle)
- Actualización de productos (backend)
- Eliminación de productos (backend)
Las operaciones de actualización y eliminación están disponibles a nivel de API y pueden ser probadas mediante herramientas como Thunder Client o Postman, ya que corresponden a acciones administrativas.

# Checkout y pagos
DailyMarket integra Stripe Checkout (modo prueba):
- Creación de sesión de pago desde el backend
- Redirección segura a Stripe
- Páginas de pago exitoso y cancelado
- Limpieza del carrito tras pago exitoso

Tarjeta de prueba:
```
4242 4242 4242 4242
```

# Despliegue
La aplicación se encuentra desplegada utilizando servicios cloud:
- Frontend: Netlify
- Backend: Railway / Render
- Base de datos: MongoDB Atlas
> Los enlaces de despliegue se incluyen en la entrega final del proyecto.

# Tecnologías utilizadas
### Frontend
- React (Vite)
- React Router DOM
- Context API + useReducer
- TailwindCSS
- Axios

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Stripe
- Swagger
- dotenv, cors

# Estado del proyecto

| Criterio                | Estado |
| ----------------------- | ------ |
| Proyecto individual     | ✅      |
| Frontend funcional      | ✅      |
| Backend funcional       | ✅      |
| Autenticación JWT       | ✅      |
| CRUD productos completo | ✅      |
| Carrito de compras      | ✅      |
| Pasarela de pagos       | ✅      |
| Rutas protegidas        | ✅      |
| Despliegue cloud        | ✅      |

---

**Autor:** José Esteban  
**Fecha de entrega:** 06-02-2026
