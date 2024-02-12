# Módulo gateway

Este módulo se desarrolla para gestionar toda lógica de las pasarelas.

Se declaró una interfaz `IGateway` para definir todos los método que tendrán las pasarelas.

También se creo una clase abstracta `AbstractGateway` de la cual heredaran todas las clases de las diferentes pasarelas y poder hacer uso del polimorfismo en el servicio del módulo.

## Agregar una nueva pasarela

Para agregar una nueva pasarela se debe:

1 - Crear en la carpeta utils una carpeta para la pasarela que se desea agregar.

2 - Crear una clase que herede de la clase `AbstractGateway`.

3 - Implementar la lógica de todos los métodos de la clase padre.

4 - Importar esta nueva clase en el fichero `index` de la carpeta `utils` que funciona como un registro de acceso a todas las lógicas.
