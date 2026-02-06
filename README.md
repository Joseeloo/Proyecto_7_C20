# Proyecto 7: DailyMarket – Aplicación Fullstack de Comercio Electrónico

> DailyMarket es una aplicación fullstack de comercio electrónico que permite a los usuarios explorar productos de distintas categorías, gestionar un carrito de compras, autenticarse de forma segura y realizar pagos en línea mediante una pasarela de pago integrada.
 Proyecto desarrollado para el Proyecto 7 del Bootcamp Desarrollo Web Full Stack (UDD).

# Índice

- [Introducción](#introducción)
- [Descripción general](#descripción-general)
- [Prototipado Simple](#prototipado-simple)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Backend](#backend)
- [Frontend](#frontend)
- [Autentificación y autorización](#autentificación-y-autorización)
- [Gestión de productos](#gestión-de-productos)
- [Checkout y pagos](#checkout-y-pagos)
- [Despliegue](#despliegue)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estado del proyecto](#estado-del-proyecto)
- [Resultados](#resultados)

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

# Prototipado Simple

<img width="525" height="809" alt="image" src="https://github.com/user-attachments/assets/ebbb2259-fca1-41a9-877d-08e278883faa" />


# Arquitectura del proyecto

El proyecto se divide en dos capas principales:
```
📁 proyecto7-DWFS
├── 📁 backend
└── 📁 frontend
```
Cada capa mantiene responsabilidades claras y se comunica mediante una API REST.


### Backend

```
📁 backend
├── 📁 src
│   ├── 📁 config
│   │   └── db.js
│   ├── 📁 controllers
│   │   ├── auth.controller.js
│   │   ├── cart.controller.js
│   │   ├── payment.controller.js
│   │   └── product.controller.js
│   ├── 📁 docs
│   │   ├── swagger.js
│   │   └── swagger.yaml
│   ├── 📁 middleware
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── 📁 models
│   │   ├── Cart.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── 📁 routes
│   │   ├── auth.routes.js
│   │   ├── cart.routes.js
│   │   ├── payment.routes.js
│   │   └── product.routes.js
│   └── 📁 utils
│       ├── asyncHandler.js
│       ├── response.js
│       └── validators.js
├── 📄 .env
├── 📄 .env.template
├── 📄 .gitignore
├── 📄 package.json
└── 📄 package-lock.json
```

# Frontend

```
📁 frontend
├── 📁 public
│   └── _redirects
├── 📁 src
│   ├── 📁 assets
│   ├── 📁 components
│   │   ├── 📁 Auth
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── 📁 Cart
│   │   │   └── index.jsx
│   │   ├── 📁 Checkout
│   │   │   └── index.jsx
│   │   ├── 📁 ErrorPage
│   │   │   └── index.jsx
│   │   ├── 📁 Home
│   │   │   └── index.jsx
│   │   ├── 📁 Layout
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── index.jsx
│   │   ├── 📁 Product
│   │   │   ├── 📁 List
│   │   │   │   └── index.jsx
│   │   │   ├── 📁 Single
│   │   │   │   └── index.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── 📁 Profile
│   │   │   └── index.jsx
│   │   └── 📁 SuccessPage
│   │       └── index.jsx
│   ├── 📁 config
│   │   └── axios.js
│   ├── 📁 contexts
│   │   ├── 📁 Auth
│   │   │   ├── AuthContext.js
│   │   │   ├── AuthReducer.js
│   │   │   └── AuthState.jsx
│   │   ├── 📁 Cart
│   │   │   ├── CartContext.js
│   │   │   ├── CartReducer.js
│   │   │   └── CartState.jsx
│   │   └── 📁 Product
│   │       ├── ProductContext.js
│   │       ├── ProductReducer.js
│   │       └── ProductState.jsx
│   ├── 📁 routes
│   │   ├── AppRouter.jsx
│   │   ├── PrivateRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── 📁 services
│   │   ├── cart.service.js
│   │   ├── payment.service.js
│   │   └── product.service.js
│   ├── 📁 utils
│   │   ├── formatCLP.js
│   │   └── storage.js
│   ├── App.jsx
│   ├── Router.jsx
│   ├── main.jsx
│   └── index.css
├── 📄 .env
├── 📄 .env.template
├── 📄 .gitignore
├── 📄 index.html
├── 📄 package.json
├── 📄 package-lock.json
└── 📄 vite.config.js
```

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

# Autentificación y autorización
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
> El resto de los datos se deben inventar

# Despliegue
La aplicación se encuentra desplegada utilizando servicios cloud:
- Frontend: Netlify
- Backend: Render
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

# Resultados
En esta sección se presentan los resultados obtenidos tras la implementación y despliegue de la aplicación Fullstack DailyMarket. Se valida el correcto funcionamiento del sistema en un entorno productivo real, incluyendo el despliegue del frontend y backend, la conexión con la base de datos en la nube y la ejecución de las principales funcionalidades solicitadas en el proyecto.

**Frontend (Netlify):** https://dailymarket-dwfs.netlify.app/

**Backend (Render):** https://proyecto-7-c20-backend.onrender.com

**Documentación API (Swagger):** https://proyecto-7-c20-backend.onrender.com/api/docs

# CRUD Productos
En esta sección se validan las operaciones de creación, consulta, actualización y eliminación (CRUD) de productos, las cuales son un requisito fundamental del proyecto. Las pruebas fueron realizadas utilizando Thunder Client, interactuando directamente con la API del backend desplegado, demostrando la correcta implementación de la lógica de negocio y la protección de rutas mediante autenticación.

### 1. Creación de producto (CREATE)

Método: POST

Endpoint: /api/products

Autenticación: requerida (JWT)

**Thunder Client**
<img width="1847" height="516" alt="image" src="https://github.com/user-attachments/assets/caeffa56-cd24-4b84-902c-092b80e2f5c0" />

**MongoDB**
<img width="1915" height="904" alt="image" src="https://github.com/user-attachments/assets/81cee3bc-02fd-4f62-b29f-64014aaf0eba" />

**STRIPE**
<img width="1893" height="897" alt="image" src="https://github.com/user-attachments/assets/11c69d11-403c-42a6-81bd-eefef1124dfc" />


### 2. Listado de productos (READ ALL)

Método: GET

Endpoint: /api/products

Autenticación: no requerida

<img width="1848" height="517" alt="image" src="https://github.com/user-attachments/assets/c730d702-2eac-407a-b634-fc20981da78d" />


### 3. Obtención de producto por ID o slug (READ ONE)

Método: GET

Endpoint: /api/products/:id o /api/products/slug/:slug

**ID**
<img width="1845" height="509" alt="image" src="https://github.com/user-attachments/assets/7a33b76a-1629-4a17-9a87-b09e7116a92b" />

**SLUG**
<img width="1843" height="512" alt="image" src="https://github.com/user-attachments/assets/3f8c9256-ac25-40ed-9b3f-d28803b7832a" />


### 4. Actualización de producto (UPDATE)

Método: PUT

Endpoint: /api/products/:id

Autenticación: requerida

**Thunder Client**
<img width="1845" height="516" alt="image" src="https://github.com/user-attachments/assets/a18f9ec6-f54e-46b3-8628-f115d87edbd5" />

**MongoDB**
<img width="1910" height="903" alt="image" src="https://github.com/user-attachments/assets/94ed7635-b8f0-4b1e-a689-1e594bf048ef" />


### 5. Eliminación de producto (DELETE)

Método: DELETE

Endpoint: /api/products/:id

Autenticación: requerida

<img width="1850" height="516" alt="image" src="https://github.com/user-attachments/assets/985aee23-788b-419f-8bb2-7401702a058b" />



# E-commerce
En esta sección se presentan los resultados del flujo completo de comercio electrónico implementado en DailyMarket. El objetivo es demostrar que el usuario puede recorrer todas las etapas del proceso de compra, desde la exploración del catálogo hasta la finalización del pago mediante una pasarela segura, validando así el correcto funcionamiento integral de la plataforma.

### 1. Visualización del catálogo de productos.
<img width="1890" height="862" alt="image" src="https://github.com/user-attachments/assets/b89e7256-ab09-4323-96ff-fae8dedffb58" />

### 2. Selección de un producto y visualización de su detalle.
<img width="1916" height="868" alt="image" src="https://github.com/user-attachments/assets/836b0689-a6a5-4406-8227-91156a9b78de" />


### 3. Selección de cantidad y agregado al carrito. (Login tras agregar al carrito 2 Unidades)
<img width="1916" height="868" alt="image" src="https://github.com/user-attachments/assets/ca50a187-3e95-42ce-803a-f68efc3bdb0c" />
<img width="1915" height="866" alt="image" src="https://github.com/user-attachments/assets/c09f5836-138e-4f18-af56-ca9354dbc181" />


### 4. Gestión del carrito (aumento y disminución de cantidades).
<img width="1911" height="865" alt="image" src="https://github.com/user-attachments/assets/89d17969-3cbc-4c94-a36c-979cdccbcd62" />

**Si llega a 0 se elimina el producto o se peude eliminar directamente ocn el boton**
<img width="1915" height="862" alt="image" src="https://github.com/user-attachments/assets/10353c8e-1765-4c33-9370-24f6f1da0dbd" />


### 5. Inicio del proceso de pago.
<img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/f48a5156-6b5f-4a3a-8ec0-5153f28c154c" />


### 6. Redirección a Stripe Checkout.
<img width="1893" height="863" alt="image" src="https://github.com/user-attachments/assets/21e4ca95-7718-4f98-8f85-19928362255d" />


### 7. Confirmación de pago exitoso.
<img width="1911" height="859" alt="image" src="https://github.com/user-attachments/assets/ca04ad51-0bcb-4cac-905e-f7879c283c8a" />


### 8. Limpieza del carrito tras la compra.
<img width="1914" height="863" alt="image" src="https://github.com/user-attachments/assets/5332a191-d908-467c-8295-f1c3d356247b" />

### Pasarela de pago (Stripe)
La aplicación integra Stripe Checkout en modo de pruebas, permitiendo simular pagos reales de forma segura. Al completar el pago, el usuario es redirigido nuevamente a la aplicación y el sistema registra correctamente la transacción, confirmando la integración exitosa de la pasarela de pagos.
<img width="1891" height="867" alt="image" src="https://github.com/user-attachments/assets/2faef465-fc54-4e2f-932b-b7806e0522de" />


# Despliegue
En esta sección se presentan los resultados asociados al despliegue de la aplicación Fullstack DailyMarket. El objetivo de este despliegue es demostrar que tanto el backend como el frontend funcionan correctamente en entornos productivos reales, utilizando servicios cloud, y que la aplicación puede ser accedida públicamente mediante URLs disponibles. Asimismo, se valida la correcta conexión con la base de datos MongoDB Atlas y la documentación de la API a través de Swagger.

## BACKEND - RENDER
El backend de la aplicación fue desplegado en la plataforma Render, utilizando Node.js y Express como entorno de ejecución. El servicio se encuentra correctamente configurado con variables de entorno para la conexión a MongoDB Atlas, autenticación JWT y pasarela de pagos Stripe. Además, se incluye documentación Swagger accesible públicamente, lo que permite inspeccionar y probar los endpoints de la API directamente desde el navegador.

### SWAGGER UI
<img width="1889" height="903" alt="image" src="https://github.com/user-attachments/assets/3cb9e598-036f-4391-a35d-39be4a6a3c90" />

## FRONTEND - NETLIFY
El frontend fue desplegado en Netlify como una aplicación SPA desarrollada con React y Vite. El sitio se encuentra optimizado para producción y correctamente configurado para consumir la API del backend desplegado en Render mediante variables de entorno. La interfaz presenta una experiencia de usuario completa y coherente, permitiendo la navegación entre las distintas vistas del sistema.

### HOME
<img width="1913" height="908" alt="image" src="https://github.com/user-attachments/assets/b5116890-b048-48e0-94ea-7fff222321df" />

## BASE DE DATOS - MongoDB Cloud
La aplicación utiliza MongoDB Atlas como base de datos en la nube, lo que permite el almacenamiento persistente de usuarios, productos y carritos. Se valida la correcta escritura y lectura de datos desde la aplicación, evidenciando que tanto los productos como los usuarios creados se almacenan correctamente en la base de datos.

### USERS
<img width="1913" height="857" alt="image" src="https://github.com/user-attachments/assets/76290446-8171-4bf8-816c-666561748ff2" />

### PRODUCTS
<img width="1918" height="863" alt="image" src="https://github.com/user-attachments/assets/39f364ea-dac8-40db-9e47-f0a0c2b1cc39" />

# Cierre de resultados
Los resultados obtenidos demuestran que la aplicación DailyMarket cumple con todos los requisitos funcionales establecidos para el Proyecto 7, incluyendo despliegue en la nube, flujo eCommerce completo y gestión CRUD de productos. La plataforma presenta una arquitectura robusta y un comportamiento consistente tanto en el frontend como en el backend.


---

**Autor:** José Esteban  
**Fecha de entrega:** 06-02-2026
