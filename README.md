# Clikalia test

## Instalación

1. Clona el repositorio: `https://github.com/cvillanueva94/clikalia-test`
2. Navega al directorio del proyecto: `cd clikalia-test`
3. Instala las dependencias: `yarn`

## Configuración

Antes de ejecutar la API, asegúrate de configurar las siguientes variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto.
2. Completa los valores de las variables de entorno en el archivo `.env` guiándote por el fichero de ejemplo `.env.example` según tus necesidades.

Asegúrate de no compartir tu archivo `.env` en un repositorio público, ya que puede contener información sensible.

## Uso

1. Ejecuta la API: `yarn dev`
2. Accede a la API en tu navegador o a través de herramientas como Postman:
   - URL base: `http://localhost:{PORT}`

## Endpoints

A continuación se detallan los endpoints disponibles en esta API:

- `GET /`: Retorna un saludo de bienvenida.
