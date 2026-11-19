# Revisión local del Grupo 3 — ITERA Learn

Versión de trabajo: revisión G3 2026-11-19. Fecha: 19/11/2026, America/Lima. Estado: cambios locales; no se ha publicado esta revisión.

## Alcance autorizado

Se atendieron las observaciones del documento `Observaciones_Paginas_Web.docx` para el Grupo 3. Por indicación del responsable, quedan pendientes URL, despliegue, portal común y videos. No se modifican las calificaciones del Excel ni los informes originales. Esta revisión no acredita actividades o pruebas de semanas anteriores.

## Cambios

| Observación | Implementación y evidencia |
| --- | --- |
| Contadores en cero | Se elimina la animación que restablecía los números a cero durante la carga. Se muestran 60 lecciones publicadas; el contador de apartados se obtiene del temario. |
| Índices desordenados | Los módulos 2 y 3 presentan sus números correlativamente. Se conservan los identificadores y las claves del progreso existente. |
| Tolerancia del caso base | Las calculadoras de raíces y los métodos iterativos del laboratorio principal precargan 10⁻⁶. Las referencias Python de raíces usan el mismo valor. RK45 precarga también 10⁻⁶; los pasos de Euler, Heun y RK4 se controlan mediante n, no mediante una tolerancia ficticia. |
| Integración sin referencia | Campo de antiderivada F(x), con valor inicial x³/3 para x². Se calcula F(b)−F(a), error absoluto y refinamiento de hasta tres niveles según el límite de cada algoritmo. Al editar f se borra la referencia para evitar conservar la de otro problema. |
| EDO: contraste y refinamiento | Los casos escalares incorporan referencia y error por nodo y al tiempo final. Se comparan n, 2n y 4n; RK45 compara tolerancias locales decrecientes. Se valida la condición inicial de la referencia y se borra al editar la ecuación o sus datos iniciales. |
| Respaldo de progreso | Exportación JSON, importación validada, confirmación de sustitución/reinicio y aislamiento entre módulos en los ocho módulos. |
| CSV | Exportación de tablas, incluyendo todas las filas aunque la vista esté limitada a 501. Exportación de resultados del módulo 1 e historial por módulo. Los textos se escapan para CSV y se neutralizan fórmulas de hoja de cálculo en campos textuales. |
| Profundidad y ampliaciones | Etiquetas de temas opcionales; distinción explícita entre LU y Cholesky, y entre trapecio/Simpson y reglas complementarias. Caso guiado de bisección y Newton, hipótesis y situaciones de fallo. |
| Resumen e historial | Resumen por lección y hasta 50 cálculos guardados por módulo en el navegador. Permite revisar entradas, descargar y borrar el historial sin borrar el progreso. |
| Código de referencia | Descarga del fragmento Python correspondiente al método seleccionado. |
| Libro y bibliografía | Atribución visible, enlace a la ficha oficial y constancia de CC BY-NC-SA 4.0 en `libros/LICENCIA.md`. La ficha editorial confirma licencia abierta: no fue necesario retirar el PDF. |

## Pruebas y límites

- `npm test`: batería completa del proyecto aprobada.
- `node tests/ode-review.browser.test.cjs`: 11 métodos escalares de EDO, órdenes de reducción de error, tolerancias adaptativas, CSV, referencias, condición inicial y móvil/escritorio; aprobado.
- `node tests/course.test.cjs`: referencias numéricas independientes, dominios, reconstrucción SVD, residuos propios, 57 laboratorios y 10 500 preguntas generadas; aprobado.
- `node tests/advanced.test.cjs`: batería de algoritmos avanzados; aprobada.
- `node tests/formulas.test.cjs`: 52 temas y 156 expresiones TeX/MathML; aprobado.
- `node tests/review.browser.test.cjs`: contadores, resúmenes, índices, tolerancia, CSV descargado, historial persistente, entradas inválidas, referencia analítica, refinamiento y eliminación de referencia obsoleta; aprobado. Sin desbordamiento a 375 px. Capturas de integración revisadas visualmente.
- `node tests/review-labs.browser.test.cjs`: 112 cálculos en navegador con los ejemplos de todos los métodos de los módulos 2–8; aprobado, sin errores de entrada en los casos precargados.
- `tests/browser.test.cjs`: módulo 1, 11 vistas, teclado, calculadoras, respaldo/importación/reinicio, persistencia y cálculo sin conexión; aprobado.
- `tests/course.browser.test.cjs`: módulos 2–5, 66 ejecuciones de calculadora, evaluaciones, progreso y respaldos; aprobado.
- `tests/advanced.browser.test.cjs`: módulos 6–8, 46 ejecuciones, evaluaciones y respaldos; aprobado.
- `tests/formulas.browser.test.cjs`: formularios y ejemplos en siete módulos, MathML y tres anchos, más comprobación del módulo 1; aprobado en ejecución independiente.
- `npm run test:home:browser`: progreso, almacenamiento, búsqueda, navegación, modo oscuro, enlaces locales y seis anchos; aprobado.

Se resolvieron los bloqueos preexistentes: el arnés combinado del módulo 1 ahora reproduce las funciones globales del navegador antes de aplicar sus envoltorios; sus pruebas invocan el cálculo con el procedimiento real. Se incorporaron las vistas y controles de respaldo que faltaban en el HTML del módulo 1 y en el motor de los módulos 2–8. Las pruebas de resultados seleccionan explícitamente el encabezado principal, separado del nuevo encabezado de refinamiento.

Las expresiones analíticas editadas por el estudiante no se certifican como soluciones exactas generales de una EDO. Los casos precargados sí utilizan soluciones analíticas conocidas. Para referencias personalizadas se comprueba la condición inicial, pero no se demuestra simbólicamente la ecuación diferencial.

La antiderivada introducida es una referencia proporcionada por el estudiante: no se certifica simbólicamente que F′=f. No se obtiene una solución exacta general de cualquier expresión. Las cuadraturas con peso, integrales múltiples y datos tabulados conservan sus métodos originales; el nuevo contraste por antiderivada corresponde a reglas en una variable sobre un intervalo finito.

El historial es local, puede borrarse y no es evidencia autenticada para calificación. Los informes S1–S6 no estaban disponibles para edición; el equipo debe incorporar esta revisión y sus evidencias reales al informe que entregue. La fecha de publicación se registrará cuando se publique, no se inventa ahora.

## Reproducir

Desde la raíz: `npm ci`, iniciar `python -m http.server 8000` y ejecutar los comandos anteriores. El sitio sigue siendo estático. Las nuevas funciones no requieren un servidor de cálculo ni envían el historial a servicios externos.
