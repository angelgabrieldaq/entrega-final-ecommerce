# Mi E-commerce - Proyecto Front-End

## Propósito
Sitio de e-commerce interactivo desarrollado como Entrega Final del curso Front-End JS (Talento Tech). Muestra un catálogo de productos consumido en vivo desde una API REST, permite agregarlos a un carrito de compras persistente y ofrece un formulario de contacto validado.

## Características
- **Sección de Productos**: catálogo renderizado dinámicamente desde FakeStore API, con imagen, título, precio y botón "Agregar al carrito"
- **Carrito de Compras**: contador en el header, vista editable (sumar/restar/eliminar) y total dinámico, persistente entre recargas con `localStorage`
- **Sección de Reseñas**: testimonios de clientes organizados en grid
- **Formulario de Contacto**: validado con JavaScript (campos requeridos + formato de email) e integrado con Formspree
- **Diseño Responsivo**: adaptado a celulares, tablets y escritorio con Media Queries
- **SEO y Accesibilidad**: meta description, jerarquía de encabezados, atributos `alt` en imágenes, navegación accesible por teclado

## Tecnologías Usadas
- **HTML5**: estructura semántica
- **CSS3**: Flexbox, CSS Grid, Media Queries
- **JavaScript vanilla**: Fetch API, manipulación del DOM, `localStorage`, validación de formularios (sin frameworks ni bundlers)
- **FakeStore API**: fuente de datos de productos (`https://fakestoreapi.com`)
- **Google Fonts**: Roboto
- **Formspree**: envío del formulario de contacto

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
3. Los productos se cargan automáticamente desde la API; agregalos al carrito y probá el formulario de contacto

## Layouts Usados
- **Productos**: Flexbox con `flex-direction: column`
- **Reseñas**: CSS Grid con 3 columnas (1 columna en móvil)
- **Carrito**: Flexbox horizontal por ítem, con wrap en mobile
- **Formulario**: Flexbox centrado

## Media Queries
- **Móvil** (hasta 768px): una columna para productos y reseñas, ítems de carrito en wrap
- **Tablet/Desktop** (768px+): múltiples columnas

## JavaScript
- Fetch a `https://fakestoreapi.com/products` con manejo de errores HTTP
- Carrito con `localStorage` (persiste entre recargas): agregar, sumar/restar cantidad, eliminar, total dinámico
- Validación del formulario de contacto antes de enviarlo a Formspree

## Formulario
Los mensajes se envían a través de Formspree. Cada envío genera un email de confirmación.

## Deploy
URL del deploy: [pendiente]

## Autor
Angel Acuña
