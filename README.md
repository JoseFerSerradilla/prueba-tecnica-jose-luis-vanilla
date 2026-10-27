# Prueba técnica — versión Vanilla JS

Versión sin frameworks del reto: la misma aplicación de gestión de lista
de textos (añadir, seleccionar, eliminar, deshacer), construida solo con
HTML, CSS y JavaScript, sin build ni librerías de UI. Se desarrolló
después de la versión en React, reutilizando el mismo diseño de dominio,
que al no depender de ningún framework se pudo portar sin modificaciones.

## Puesta en marcha

No requiere build ni instalación para verla funcionando, basta con servir
los ficheros estáticos:

```bash
npx serve .
# o cualquier servidor estático, o la extensión Live Server
```

Para verificar que el dominio se comporta correctamente (sin necesidad de
navegador):

```bash
npm run selfcheck
```

Es un script con asserts estándar —sin frameworks de test, innecesarios
para este alcance— que comprueba que no se admiten textos vacíos ni
duplicados, que no se puede eliminar sin selección previa y que el
deshacer restaura el estado anterior.

Y para un test end-to-end real, en navegador (añadir, seleccionar,
eliminar, deshacer, validaciones y cambio de idioma):

```bash
npx playwright install chromium   # solo la primera vez
npm run test:e2e
```

Hay un workflow de GitHub Actions (`.github/workflows/ci.yml`) que corre
`selfcheck` y el E2E en cada push.

## Arquitectura

Se mantiene la misma organización por capas que en la versión React,
adaptada a que aquí no hay componentes como tal, sino funciones que
devuelven nodos del DOM:

- **`domain/`**: las reglas de negocio puras (`TextItem`, `TextList`): no
  se admite texto vacío ni duplicado, no se borra sin selección. Sin
  dependencia del DOM. Es el mismo código que en la versión React,
  reutilizado tal cual al no depender de ningún framework.
- **`application/`**: los casos de uso (añadir, eliminar, deshacer) y el
  contrato `ListRepository`, que define cómo debe comportarse quien
  almacene la lista, sin especificar cómo lo hace. Es la inversión de
  dependencias de SOLID: la aplicación no conoce si los datos están en
  memoria, en `localStorage` o en un servidor, solo que existe algo que
  cumple el contrato.
- **`infrastructure/`**: el adaptador concreto (en memoria, por ahora).
- **`ui/`**: la librería de componentes reutilizables, implementada como
  funciones factoría (`createButton`, `createTextField`, `createModal`,
  `createListBox`, `createLanguageSwitcher`...) que construyen el DOM
  manualmente. Cada una vive en su propia carpeta junto a su CSS.
- **`i18n/`**: el sistema de traducción, un diccionario plano (`en`/`es`)
  más una función `createTranslator(locale)` que devuelve un `t(key)`.
- **`features/`**: `text-list` (el listado con selección) y `add-item`
  (el modal), cada una centrada únicamente en su presentación, sin
  conocimiento de cómo se almacenan los datos.
- **`app/`**: el punto de composición. Al no contar con el re-renderizado
  selectivo de React, se implementó un `Store` con el patrón Observer:
  cuando cambia el estado, se repinta la card completa. Para una lista de
  este tamaño es suficiente, y evita introducir un sistema de diffing
  innecesario para el alcance del ejercicio.

## Funcionalidades añadidas

Igual que en la versión React, se incluyeron todos los puntos marcados
como deseables en el enunciado, junto con algunos detalles adicionales:

- Selección múltiple con Ctrl/Cmd + click.
- Historial de deshacer apilable, no limitado a un único paso.
- Mensaje de estado vacío cuando la lista no tiene elementos.
- Accesibilidad básica: roles `listbox`/`option`, `aria-selected`,
  `aria-label` en el botón de deshacer, cierre del modal con Escape y
  foco automático al abrirlo.

## Gestión de errores

Las validaciones de negocio viven en el dominio, no en el formulario:
`TextList.add()` lanza `EmptyTextError` si el texto está vacío y
`DuplicateItemError` si ya existe un elemento con ese mismo texto en la
lista (sin distinguir mayúsculas ni espacios al borde). Esos errores
llevan un mensaje en inglés "técnico" por defecto, pero el dominio no
sabe nada de idiomas: es el modal de añadir (`AddItemFeature.js`) quien,
al capturar el error con `try/catch`, mira de qué tipo es (`instanceof
EmptyTextError`, `instanceof DuplicateItemError`...) y pinta el mensaje
ya traducido al idioma activo. Un error que no reconoce cae en su propio
`message` tal cual, así que el sistema sigue funcionando aunque aparezca
un tipo de error nuevo que todavía no se haya traducido.

## Internacionalización (i18n)

La app se puede ver en inglés o en español con el selector de la esquina
superior de la card. No metí ninguna librería de i18n para esto: con una
docena de textos, un diccionario plano y una función de traducción son
más que suficientes, y evita una dependencia que aquí no se justifica.

- `i18n/translations.js` tiene el diccionario `{ en: {...}, es: {...} }`.
  El texto de relleno ("lorem ipsum") se deja igual en los dos idiomas a
  propósito, porque no es una frase real que tenga sentido traducir.
- `i18n/i18n.js` tiene `createTranslator(locale)`, que da una función
  `t(key)`, más la lectura/escritura del idioma en `localStorage`.
- El idioma se guarda en el `Store` junto con la lista y la selección, así
  que cambiarlo dispara el mismo ciclo de re-render que cualquier otro
  cambio de estado: no hace falta un mecanismo aparte.
- El idioma por defecto es inglés, el mismo que el mockup original; al
  cambiarlo se guarda en `localStorage` y se recupera en la siguiente
  visita.
- El `<title>` de la pestaña también se traduce, como detalle menor pero
  que demuestra que el cambio de idioma no se queda solo en el HTML
  visible.

## Diseño

El maquetado sigue las especificaciones extraídas del inspector de Adobe
XD: colores exactos (`#324BFF` como color primario), tipografía
Montserrat con los tamaños y pesos indicados, radios y sombras de
card/modal, y el degradado de fondo.
