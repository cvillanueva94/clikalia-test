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

Se ha desarrollado un módulo para la gestión de pasarelas de pago. Este módulo proporciona una guía detallada sobre su implementación y cómo agregar nuevas pasarelas de manera efectiva.

Para mejorar la habilitación y deshabilitación de las diferentes pasarelas, se sugiere implementar un sistema dinámico que permita activar o desactivar pasarelas de forma fácil y rápida, posiblemente a través de un archivo de configuración o una interfaz de usuario intuitiva. Además, sería útil proporcionar opciones personalizadas para cada pasarela, permitiendo configurar parámetros específicos según las necesidades del usuario.

### Linterns

El proyecto utiliza [ESLint](https://eslint.org) como linter, que proporciona reglas y directrices para mantener un código limpio y consistente, especialmente en entornos TypeScript.

También se integra [Prettier](https://prettier.io) para asegurar un formato coherente y legible del código en todo el proyecto.

### Patrones y arquitectura

El proyecto se estructura en dos módulos principales: `gateway` y `payment`, cada uno con una arquitectura de capas. Actualmente, estas capas incluyen Aplicación e Infraestructura. Aunque se tenía la intención de implementar un enfoque de tres capas (Dominio, Aplicación e Infraestructura), esta última no se integró debido a restricciones de tiempo.

Se hacen uso de los patrones Singleton y Repositorio para abordar la problemática planteada, lo que ayuda a garantizar la eficiencia y la coherencia en la gestión de las pasarelas de pago.

### Pruebas

Se llevaron a cabo pruebas de extremo a extremo (E2E) para asegurar una integración más sólida entre las distintas capas del sistema. Los resultados obtenidos se presentan a continuación:

| % Stmts | % Branch | % Funcs | % Lines|
| -------- | ------- | ------- | ------- |
| 90.25 |    55.17 |   83.33 |   90.74   |

Estos resultados reflejan una cobertura sustancial del código, lo que indica una amplia gama de casos de prueba abordados en el proceso de pruebas E2E. Sin embargo, es importante tener en cuenta que la cobertura de ramificaciones es relativamente más baja, lo que sugiere áreas donde se podrían mejorar las pruebas para abordar diferentes caminos de ejecución dentro del código.

### Git

Se sigue el estándar de Conventional Commits para la estructura de los mensajes de commit, lo que facilita la comprensión y el seguimiento de los cambios en el repositorio. Además, se ha implementado un script automatizado para versionar el API al llevarlo a producción, lo que incluye la generación de un CHANGELOG y la creación de una etiqueta (tag) en Git correspondiente a la versión. Esta práctica asegura una gestión ordenada y consistente de las versiones del software, lo que simplifica el proceso de seguimiento y despliegue de nuevas versiones en producción.

> OJO: a pesar de usar Conventional Commits, los mensajes de los commit no son los mejores.

### Documentación

Se emplea la herramienta [Swagger](https://swagger.io) para documentar exhaustivamente el API, lo que proporciona una referencia clara y detallada de los endpoints, parámetros y respuestas disponibles. Además, se ha elaborado un README completo que ofrece orientación sobre cómo utilizar la aplicación de manera efectiva, incluyendo instrucciones de instalación, configuración y ejemplos de uso. Esta combinación de recursos asegura una documentación completa y accesible para los desarrolladores que trabajan con el API.

### Recomendaciones

Para llevar el proyecto a producción de manera óptima, se recomienda configurar un proceso de integración y entrega continuas (CI/CD) para automatizar pruebas y despliegues. Además, si es necesario para la infraestructura, se sugiere dockerizar el API para facilitar la gestión y escalabilidad de los recursos en producción.
