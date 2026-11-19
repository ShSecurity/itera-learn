# Capítulos 2 al 5: alcance y comprobaciones

## Estructura conservada

Se completaron las tarjetas y secciones existentes del portal: capítulo 2, doce temas; capítulo 3, ocho; capítulo 4, ocho; capítulo 5, siete. Los enlaces del temario llevan al tema correspondiente. Las secciones posteriores continúan como próximas. El módulo 1 y su almacenamiento se conservan.

Las páginas nuevas reutilizan el CSS del módulo 1. El motor compartido en `assets/course/` contiene contenido original, algoritmos, campos de laboratorio, evaluaciones y respaldo. El contenido se renderiza como texto, sin ejecutar expresiones del usuario como JavaScript. El evaluador matemático admite aritmética, potencias, funciones elementales, x/y/z y constantes pi/e; no admite llamadas arbitrarias ni acceso a propiedades.

## Referencia académica

Cabrera Escobar, Orozco Cantos y Cabrera Escobar (2024), Métodos numéricos, DOI https://doi.org/10.55204/pmea.81; copia en `libros/`. Se revisaron el índice y las secciones pertinentes a los capítulos 2–5. Las páginas de la web son páginas impresas, no posiciones del PDF. Los ejemplos de la web son de elaboración propia y se verificaron sin copiar errores aritméticos del libro.

Se respetaron las ampliaciones ya existentes en el portal: normas y condición matricial, pivoteo total, LU, valores propios por potencia/QR, SVD y mínimos cuadrados por QR/SVD. La sección 3.7 se identifica como ampliación del portal y no como una sección de valores propios del libro. La sección 3.8 de aplicaciones corresponde al tema de aplicaciones de la p. 93 del texto base.

Referencias de apoyo para los fragmentos Python y las ampliaciones:

- https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html
- https://numpy.org/doc/stable/reference/generated/numpy.linalg.qr.html
- https://numpy.org/doc/stable/reference/generated/numpy.polynomial.laguerre.laggauss.html
- https://docs.scipy.org/doc/scipy/reference/generated/scipy.interpolate.CubicSpline.html

## Métodos y límites explícitos

- Raíces: métodos de intervalo exigen extremos ordenados y signos opuestos (salvo un cero en extremo); la continuidad debe comprobarla el estudiante. Una gráfica o barrido no garantiza enumerar todas las raíces. Newton y secante detectan denominadores problemáticos y se verifica residuo más incremento; no se garantiza convergencia global.
- Bairstow: polinomios reales de grado 2–12, división por x²−rx−s, Jacobiano de residuos por diferencias finitas y deflación solo al alcanzar tolerancia. Las semillas pueden fallar; se comunica salida incompleta y se evalúan raíces en el polinomio original.
- Müller: polinomios reales de grado 2–12, aritmética compleja y elección del denominador de mayor magnitud. Informa una raíz por ejecución.
- Sistemas no lineales: dos variables, Newton con Jacobiano numérico central o punto fijo simultáneo. Las expresiones del punto fijo se interpretan como transformaciones, no como residuos originales.
- Sistemas lineales: hasta 12 incógnitas en resolutores cuadrados. Pivotes pequeños se rechazan. Thomas exige estructura tridiagonal y no implementa pivoteo. Cholesky exige simetría y pivotes positivos.
- QR de valores propios: matrices reales simétricas, con desplazamiento. No representa un método general para valores propios complejos. La potencia devuelve solo el modo dominante alcanzado; la convergencia no está garantizada para cualquier semilla.
- SVD: hasta 12×12, reducida, por rotaciones de Jacobi de un lado, con reconstrucción y componentes de norma mínima. La tolerancia relativa de la pseudoinversa es 10⁻¹⁰. No se presenta la dependencia de columnas como identificabilidad única.
- Regresión: hasta 100 puntos y grado 0–6, centrado/escalado y QR con reortogonalización. Los coeficientes polinomiales pertenecen a la base z declarada. El R² es indefinido si SST=0; el error estándar requiere grados de libertad positivos. Modelos transformados ajustan en logaritmos y reportan residuos en la escala original.
- Interpolación: 2–16 nodos distintos. Splines lineal, cuadrático C¹ con primera pieza lineal y cúbico natural C². No extrapolan los splines; el polinomio global advierte si se evalúa fuera de los nodos.
- Newton-Cotes: hasta 10000 subintervalos. Simpson 1/3 requiere n par; 3/8, múltiplo de tres; Boole, múltiplo de cuatro. La regla del punto medio es abierta.
- Romberg: hasta diez niveles; el cambio de diagonal no se trata como cota garantizada.
- Gauss: Legendre y Chebyshev de 2–12 nodos; Laguerre y Hermite de 2 o 3 nodos tabulados. En familias con peso se introduce g sin duplicar el peso.
- Integrales múltiples: rectángulos o cajas con límites constantes, Simpson por coordenada y n par de 2–30. No se simulan dominios curvos o dependientes.
- Derivadas: diferencias hacia adelante, atrás, central, central de orden cuatro y segunda derivada central. Para datos irregulares se derivan los tres nodos más próximos. Se advierte sobre extrapolación, cancelación y ruido.

## Evaluaciones y datos

Los cuestionarios de tema, la práctica y los exámenes generan alternativas mediante Fisher–Yates y conservan la correspondencia entre opciones, pistas y respuesta. Una selección incorrecta no marca ni explica la correcta y permite volver a intentar. La solución aparece tras acertar; el examen muestra revisión al finalizar. Las preguntas conceptuales y de diagnóstico son diferentes de las de cálculo con variantes numéricas. El examen equilibra tres preguntas por tema y acepta fracción decimal con tolerancia relativa de 10⁻⁶ en las respuestas escritas, anunciada al responder.

Cada módulo guarda su estado por separado y no usa el progreso del módulo 1. Los archivos JSON se validan por módulo, versión, estructura, índices, preguntas y cobertura del examen antes de importar. Se usan nodos de texto para contenido del respaldo. Importación, reinicio y sustitución de examen requieren confirmación. Son herramientas de autoaprendizaje, no certificados de notas ni cuentas sincronizadas.

## Comprobaciones realizadas

- Referencias numéricas independientes: raíces conocidas, residuo de sistemas, inversas, factorizaciones, reconstrucción/ortogonalidad SVD, residuo de vectores propios, ajustes, reproducción de nodos, integrales exactas y derivadas de polinomios.
- 57 opciones distintas de laboratorio probadas con sus datos iniciales. 10500 preguntas nuevas generadas sin alternativas duplicadas o índices desalineados.
- 57 fragmentos Python analizados y ejecutados en un entorno con NumPy y SciPy; los fragmentos que definen funciones se verificaron sintácticamente y los ejemplos de importación se ejecutaron. No se afirma cobertura exhaustiva de todos los parámetros Python.
- Edge: recorrido real de las 35 secciones, 66 ejecuciones de calculadoras, respuestas incorrectas con pistas, práctica de tres niveles, respuesta escrita, exámenes completos, descarga del respaldo, cancelación/confirmación del reinicio, rechazo de respaldo de otro módulo, restauración y recarga.
- Anchos 390, 768 y 1440 px; menú móvil; revisión de capturas; tablas desplazables y gráficas locales; cálculo con la conexión desactivada después de cargar la página. No se garantiza abrir una página nunca cargada sin servidor o conexión.
- Regresión del módulo 1 para conservar su comportamiento previo.

Comandos: `npm test`; con servidor estático en el puerto 8000, `npm run test:browser`.

Las pruebas no sustituyen una evaluación docente ni estudios de comprensión con estudiantes. Los límites del laboratorio se muestran o se validan al calcular. No se añadieron videos propios ni se publicaron los cambios en GitHub.
