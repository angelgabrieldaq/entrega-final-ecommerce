# MAN TO MEN - Ropa de Hombre y Accesorios

## Propósito
Sitio de e-commerce interactivo de ropa de hombre y accesorios, desarrollado como Entrega Final del curso Front-End JS (Talento Tech). Consume en vivo el catálogo de una API REST (ropa de hombre + joyería/accesorios), permite agregar productos a un carrito lateral persistente y ofrece un formulario de contacto validado.

## Características
- **Sección de Productos**: catálogo renderizado dinámicamente desde FakeStore API (categorías "men's clothing" y "jewelery"), con imagen, título, precio y botón "Agregar al carrito"
- **Carrito lateral (drawer)**: se abre al agregar un producto o desde el ícono del header, contador dinámico, vista editable (sumar/restar/eliminar) y total dinámico, persistente entre recargas con `localStorage`
- **Sección de Reseñas**: testimonios de clientes organizados en grid
- **Formulario de Contacto**: validado con JavaScript (campos requeridos + formato de email) e integrado con Formspree
- **Diseño Responsivo**: adaptado a celulares, tablets y escritorio con Media Queries
- **SEO y Accesibilidad**: meta description, jerarquía de encabezados, atributos `alt` en imágenes, navegación accesible por teclado, `aria-hidden` sincronizado en el carrito

## Tecnologías Usadas
- **HTML5**: estructura semántica
- **CSS3**: Flexbox, CSS Grid, Media Queries, variables CSS (paleta de marca)
- **Bootstrap 5** (vía CDN): uso puntual de `container`, `img-fluid` y `btn`, combinado con el CSS propio (que tiene mayor especificidad y prevalece)
- **JavaScript vanilla**: Fetch API (`Promise.all`), manipulación del DOM, `localStorage`, validación de formularios (sin frameworks ni bundlers)
- **FakeStore API**: fuente de datos de productos (`https://fakestoreapi.com`)
- **Google Fonts**: Roboto
- **Formspree**: envío del formulario de contacto

## Paleta de Marca
- Negro `#111111`: header, footer y carrito
- Azul `#1e5aa8`: color primario (botones, links, foco de inputs)
- Verde `#2e9e5b`: confirmación al agregar un producto al carrito
- Naranja `#f2820a`: acento (precios, badge del contador)
- Rojo `#d63b2f`: errores del formulario y botón eliminar

## Estructura del Proyecto
```
preentrega-final-ecommerce-main/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
```

## Cómo Usar
1. Clonar el repositorio
2. Abrir `index.html` en un navegador (o servir la carpeta con un servidor local, ej. `python -m http.server`)
3. Los productos se cargan automáticamente desde la API; agregalos al carrito lateral y probá el formulario de contacto

## Layouts Usados
- **Productos**: Flexbox con `flex-direction: column`
- **Reseñas**: CSS Grid con 3 columnas (1 columna en móvil)
- **Carrito**: drawer lateral fijo con overlay, ítems en Flexbox horizontal (wrap en mobile)
- **Formulario**: Flexbox centrado

## Media Queries
- **Móvil** (hasta 768px): una columna para productos y reseñas, ítems de carrito en wrap, drawer a ancho completo
- **Tablet/Desktop** (768px+): múltiples columnas, drawer de 380px

## JavaScript
- Fetch en paralelo (`Promise.all`) a `products/category/men's%20clothing` y `products/category/jewelery`, con manejo de errores HTTP
- Carrito con `localStorage` (persiste entre recargas): agregar, sumar/restar cantidad, eliminar, total dinámico
- Drawer del carrito: abre al agregar un producto o desde el header, cierra con la X, el overlay o la tecla Escape
- Validación del formulario de contacto antes de enviarlo a Formspree

## Formulario
Los mensajes se envían a través de Formspree. Cada envío genera un email de confirmación.

## Deploy
URL del deploy: https://angelgabrieldaq.github.io/entrega-final-ecommerce/

## Autor
Angel Acuña
