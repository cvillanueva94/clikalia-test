# Clikalia test

## Instalación

1. Clona el repositorio: `https://github.com/cvillanueva94/clikalia-test`
2. Navega al directorio del proyecto: `cd clikalia-test`
3. Instala las dependencias: `npm i`

## Configuración

Antes de ejecutar la API, asegúrate de configurar las siguientes variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto.
2. Completa los valores de las variables de entorno en el archivo `.env` guiándote por el fichero de ejemplo `.env.example` según tus necesidades.

Asegúrate de no compartir tu archivo `.env` en un repositorio público, ya que puede contener información sensible.

## Uso

1. Ejecuta la API: `npm run dev`
2. Accede a la API en tu navegador o a través de herramientas como Postman:
   - URL base: `http://localhost:{PORT}`

## Endpoints

A continuación se detallan los endpoints disponibles en esta API:

- `GET /`: Retorna un saludo de bienvenida.
- `POST /payment/pay`: Ruta para procesar los pagos.
- `POST /payment/refund`: Ruta para procesar reembolsos totales.
- `POST /payment/partial-refund`: Ruta para procesar los reembolsos parciales.

## Descripción de la solución

### Pasarelas de pagos

Se creó un modulo para las pasarelas de pago, el mismo cuanta con un README en el cual se describe brevemente el módulo y se da una guía de cómo agregar una nueva pasarela.

** Explicar como seria mejor habilitar/deshabilitar las difertentes pasarelas y tambien las opciones que tenga cada una

### Linterns

Se utiliza [ESLint](https://eslint.org) como linter en el proyecto. Con algunas reglas y guías para TypeScript.

Se utiliza [Prettier](https://prettier.io) para garantizar un correcto formato del código.

### Patrones y arquitectura

El proyecto se divide en dos modulos principales `gateway` y `payment`, los cuales tienen una arquitectura por capas. Actualmente tiene funcional dos capas, Aplicación e Infraestructura. Se pretendía implementar un enfoque de tres capas (Dominio, Aplicación e Infraestructura) pero por falta de tiempo no se logró integrar la capa de Dominio en el sistema. Se hace uso de los patrones Singleton y Repositorio, en la solución de la problemática planteada.

### Recomendaciones

**Explicar que para llevar a produccion seria bueno configurar un ci/cd al igual que dockerizar el api de ser necesario para la infraestructura
