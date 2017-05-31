![shieldsIO](https://img.shields.io/github/issues/Fictizia/aireMAD.svg)
![shieldsIO](https://img.shields.io/github/release/Fictizia/aireMAD.svg)
![shieldsIO](https://img.shields.io/github/license/Fictizia/aireMAD.svg)
![shieldsIO](https://img.shields.io/david/Fictizia/aireMAD.svg)

# AireMAD

### Importante
**VERSION 0.0.1 - CAMBIOS PRÓXIMAMENTE**
**VERSIÓN DISTINTA A PRODUCCIÓN. EN PROCESO DE CERRAR LA RELEASE v.1.0.0**

[AireMAD](http://airemad.com/) es un portal que nos muestra la información de contaminación en el aire, contaminación acústica, niveles de polen, niveles de gripe y el tiempo. Es una aplicación de código abierto desarrollada por [los profesores de Fictizia](http://www.fictizia.com/).

[AireMAD](http://airemad.com/) es la evolución de [Aire Madrid](https://github.com/UlisesGascon/Aire-Madrid), se utilizan datos abiertos del Ayuntamiento de Madrid junto con otras fuentes oficiales como la Comunidad de Madrid y no oficiales como Open Weather Map.

### Documentación

#### Developers

- [Contribuir](https://github.com/Fictizia/aireMAD/blob/angular/README.md#contribuir)
- [Instalación y primeros pasos](https://github.com/Fictizia/aireMAD/tree/angular#instalación-y-primeros-pasos)
- [Actualización de la información](https://github.com/Fictizia/aireMAD/tree/angular#actualización-de-la-información)
- [Modos Avanzados](https://github.com/Fictizia/aireMAD/tree/angular#modos-avanzados)

#### Wiki

- **[Sobre](https://github.com/Fictizia/aireMAD/wiki/Sobre)**
- **[Historia](https://github.com/Fictizia/aireMAD/wiki/Historia)**
  - [Aire Madrid](https://github.com/Fictizia/aireMAD/wiki/Historia#historia-de-aire-madrid)
- **[Datos](https://github.com/Fictizia/aireMAD/wiki/Datos)**
  - [Información importante](https://github.com/Fictizia/aireMAD/wiki/Datos#informaci%C3%B3n-importante)
  - [Estaciones](https://github.com/Fictizia/aireMAD/wiki/Datos#estaciones)
  - [Polución](https://github.com/Fictizia/aireMAD/wiki/Datos#poluci%C3%B3n)
  - [Meteorología](https://github.com/Fictizia/aireMAD/wiki/Datos#meteorolog%C3%ADa)
  - [Polen](https://github.com/Fictizia/aireMAD/wiki/Datos#polen)
  - [Contaminación acústica](https://github.com/Fictizia/aireMAD/wiki/Datos#contaminaci%C3%B3n-ac%C3%BAstica)
  - [Gripe](https://github.com/Fictizia/aireMAD/wiki/Datos#gripe)
- **[API](https://github.com/Fictizia/aireMAD/wiki/API)**
  - [Información importante](https://github.com/Fictizia/aireMAD/wiki/API#informaci%C3%B3n-importante)
  - [/stations/{id}](https://github.com/Fictizia/aireMAD/wiki/API#stationsid)
  - [/pollution/{id}](https://github.com/Fictizia/aireMAD/wiki/API#pollutionid)
  - [/weahter/{id}](https://github.com/Fictizia/aireMAD/wiki/API#weatherid)
  - [/pollen/{id}](https://github.com/Fictizia/aireMAD/wiki/API#pollenid)
  - [/acustic/{id}](https://github.com/Fictizia/aireMAD/wiki/API#acusticid)
  - [/flu](https://github.com/Fictizia/aireMAD/wiki/API#flu)
- **[Reutilización](https://github.com/Fictizia/aireMAD/wiki/Reutilización)**
  - [LCD Air Mad de superzen](https://github.com/Fictizia/aireMAD/wiki/Reutilización#lcd-air-mad)
- **[Difusión](https://github.com/Fictizia/aireMAD/wiki/Difusión)**
- **[Agradecimientos](https://github.com/Fictizia/aireMAD/wiki/Agradecimientos)**
- **[Change Log](https://github.com/Fictizia/aireMAD/wiki/Changelog)**



### Instalación y primeros pasos

Instalar dependencias de Node:

```bash
npm install
```

Levantar el servidor

```bash
node server
```


Lanzar las tareas de gulp:

```bash
gulp
```

### Contribuir

**Notificaciones y peticiones (errores, peticiones de mejora...)**

1. Buscar en los [issues]() para verificar que el tema no esta reportado o en una discursión activa.
2. Abrir un nuevo issue detallando lo ms posible lo que se necesita mejorar :-)


**Aportar código (solución de bugs, mejoras, etc...)**

1. Verificar en los issues si ya alguien esta trabajando en ello.
2. Si no existe un issue relacionado con tu aporte de código... ¡crealo!
3. Asignate o comenta el issue para avisar que ya estas trabajando en ello.
4. Las mejoras se realizan mediante Pull Request a la `rama Dev`.
5. La solución de bugs criticos se realiza a la `rama Hot-fix`

Nota: Si es una funcionalidad muy grande o experimental... se puede utilizar una rama espacial para ello. Indica en los issue donde estas trabajando que lo necesitas.

### Actualización de la información

**Cada Hora**
- Se recoge la información de contaminación del aire.

**Cada Dos Horas**
- Se recoge información meteorológica

**Una vez al día**
- Se recoge información de polen
- Se recoge información de contaminación acústica

**Una vez a la semana**
- Se recoge información de gripe


### Modos Avanzados

**Arranque con la información de los archivos .json en /data**

Nota: Por defecto, GoblinDB recupera su último estado. Este proceso revierte la información almacenada.

```bash
node server -clean
```
