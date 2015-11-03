# Ejemplos : Uso de Grunt

[Grunt](http://gruntjs.com/) es un sistema para la automatización de tareas.
Es utilizado en los proyectos de desarrollo para realizar tareas repetitivas de minificación, compilación y pruebas.
Este repositorio contiene una conjunto de ejemplos que muestran como usar Grunt en un proyectos Javascript, en particular proyectos que usan AngularJS.

## Ejemplo2

* Ejemplo 1 : Uso de `npm` (`package.json`) y `bower` (`bower.json`)
* Ejemplo 2 : Uso de `grunt` (`Gruntfile.js`). Copiado de archivos
* Ejemplo 3 : Inyección de dependencias.
* Ejemplo 4 : Copiado de archivos de la aplicación AngularJS
* Ejemplo 5 : Uso de CDN de Google
* Ejemplo 6 : Minificación del código


## Uso de Bootstrap 3.3.x

> *NOTA:* Bootstrap 3.3.5 tiene cambios en la forma como se incluyen las hojas
> de estilo (*.css)  en el bower.json. Al usar Wiredep con esta versión de
> bootstrap, las hojas de estilo no se agregan al archivo index.html. Los ejemplos
> usan bootstrap en la versión 3.3.4.

Al usar Grunt/Gulp con Bootstrap 3.3.5, las dependencias no se agregan apropiadamente al archivo index.html.
El problema se debe a la definición existente en el archivo `bower.json` que indica que se deben incluir los archivos `.less` en lugar de los archivos `.css`.
El archivo `bower.json` incluye una definición como la siguiente:

```javascript
"main": [ "less/bootstrap.less", "dist/js/bootstrap.js" ]
```

Para que funcionen las dependencias, es necesario usar una versión anterior de Bootstrap (p.ej. 3.3.4) o modificar el archivo `bower.json` de forma que incluya la definición apropiada:

```javascript
"main": [ "dist/css/bootstrap.css", "dist/js/bootstrap.js" ]
```