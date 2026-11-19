# Capítulos 6 al 8

## Temario preservado

Se completan siete secciones del capítulo 6, seis del 7 y cuatro del 8, tal como estaban en el portal. Las tarjetas se habilitan y los temas del índice enlazan a sus secciones. Cada módulo usa progreso, examen y respaldo independientes. No se añadieron videos ni se cambió el avance de los módulos anteriores.

## Referencias

El capítulo 6 usa Cabrera Escobar, Orozco Cantos y Cabrera Escobar (2024), Métodos numéricos, DOI https://doi.org/10.55204/pmea.81, capítulo 6, pp. 172–239, más las ampliaciones del temario original del portal. Se revisaron las fórmulas de un paso, Adams/Milne, disparo, frontera y EDP. Los ejemplos web son originales y se contrastan con referencias conocidas.

Los capítulos 7 y 8 no forman parte del libro. Sus recursos se identifican como complementarios:

- SciPy, métodos y tolerancias de EDO: https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html
- SciPy, optimización: https://docs.scipy.org/doc/scipy/tutorial/optimize.html
- SciPy, mínimos cuadrados no lineales y LM: https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.least_squares.html
- Goldberg, fundamentos de aritmética flotante: https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html

Las implementaciones del navegador son locales, de elaboración propia; no son llamadas a SciPy. Los fragmentos Python son referencias o pasos ilustrativos, no una copia literal de todos los controles del motor web.

## Cobertura

| Sección | Contenido y laboratorio |
| --- | --- |
| 6.1 | Orden, grado, solución general/particular, condición inicial y verificación |
| 6.2 | Métodos analíticos frente a discretización; contraste con referencia indicada |
| 6.3 | Euler, Heun de una corrección, Taylor de orden dos con derivada total, RK4, RK45 Dormand–Prince, sistema de dos EDO y estabilidad |
| 6.4 | AB4–AM4, Milne–Simpson, arranque RK4 y corrector iterado; Euler implícito por Newton y rigidez |
| 6.5 | Disparo de segundo orden con secante/RK4; diferencias finitas lineales y Newton amortiguado para frontera no lineal |
| 6.6 | Laplace en placa cuadrada, calor FTCS y onda explícita con condiciones de estabilidad |
| 6.7 | Enfriamiento con perfil de referencia y unidades |
| 7.1 | Mínimos locales/globales, estacionariedad, Hessiana y convexidad |
| 7.2 | Sección dorada y Newton amortiguado de una variable |
| 7.3 | Gradiente y Newton de dos variables con búsqueda de Armijo y dirección de respaldo |
| 7.4 | Gauss-Newton y LM, exponencial y saturación en escala original |
| 7.5 | Tableau simplex, regla de Bland, holguras y estados distintos de salida |
| 7.6 | Aplicación de asignación de recursos, unidades e integridad de variables |
| 8.1 | Campos binary64, normales/subnormales, epsilon, espaciado, suma decimal y cancelación |
| 8.2 | Contratos, máximos, convergencia, costo y sumas compensadas |
| 8.3 | atol+rtol, casos conocidos, refinamiento y contraste independiente |
| 8.4 | Datos, agregación, simulación pseudoaleatoria, semilla y error estándar |

## Límites y decisiones explícitas

- EDO escalares: intervalo creciente y 1–2000 pasos uniformes. Adams y Milne requieren al menos cuatro; se arrancan con tres pasos RK4. Un corrector que no converge produce error, no un paso aceptado.
- RK45 adapta por tolerancia absoluta y relativa del mismo valor, usando escala tol·(1+max(|y|)). Tiene límite de 10000 intentos. El error local estimado no es una garantía global.
- Taylor se implementa en orden dos y requiere la derivada total f_x+f_y f suministrada coherentemente por el estudiante. Una referencia de usuario se etiqueta como indicada, no verificada automáticamente.
- Euler implícito se resuelve por Newton en cada paso; no se presenta como una implementación general de BDF o Radau.
- Sistemas de EDO: dos estados y tiempo, mediante RK4 coherente por etapas.
- Frontera lineal: malla uniforme de hasta 200 subintervalos; forma y″=p(x)y′+q(x)y+r(x), con condiciones Dirichlet. Frontera no lineal: hasta 80 subintervalos y Jacobiano tridiagonal por diferencias numéricas; no se garantiza unicidad de solución.
- Disparo: dos condiciones de valor para una EDO de segundo orden, con secante sobre la pendiente. No se acepta una secante degenerada como éxito.
- EDP: modelos didácticos concretos. Laplace en cuadrado unitario con borde superior constante y otros ceros (esquinas cero); se controla residuo discreto. Calor y onda unidimensionales con seno inicial, extremos fijos y velocidad inicial cero para onda. Se comprueban r≤1/2 y CFL≤1 respectivamente. No es un solver general de geometrías arbitrarias.
- Sección dorada exige unimodalidad para la interpretación de mínimo encajonado. Newton unidimensional rechaza curvatura no positiva. Gradiente/Hessiana multivariable se estiman por diferencias finitas; cuando Newton no ofrece curvatura positiva se usa gradiente negativo.
- Estacionariedad y curvatura se informan por separado; no se promete mínimo global de funciones arbitrarias.
- Ajuste no lineal: dos parámetros, modelos a exp(bx) o a x/(b+x), 3–100 puntos; Jacobiano numérico y QR. LM usa aumento con sqrt(lambda) I y adapta amortiguación. No implementa restricciones generales de parámetros ni prueba unicidad.
- Simplex: max c·x con Ax≤b, x≥0 y b≥0; hasta 8 variables y 12 restricciones. Tiene base factible inicial de holguras, no fase I. No resuelve programación entera. Distingue óptimo, no acotado y límite de iteraciones.
- Punto flotante: se analizan números finitos binary64 y el vecino hacia +infinito. El mayor finito tiene como siguiente infinito; esto se explica sin confundirlo con un número finito.
- Suma decimal exacta: hasta 500 escrituras con escala decimal acotada, usando BigInt. Es exacta para esas escrituras, no para una medición real desconocida. Kahan y Neumaier no se presentan como exactos universalmente.
- Monte Carlo usa un generador congruencial de 32 bits y hasta un millón de muestras. Es reproducible, no criptográfico; el error estándar es una aproximación estadística, no una cota determinista.

## Verificación

`tests/advanced.test.cjs` contrasta referencias analíticas: exp, oscilador, frontera cuadrática, modo seno de calor/onda, óptimo cuadrático, ajuste exponencial conocido, objetivo de un LP conocido, estados LP inválidos/no acotados, bits de 0.1, subnormales, suma decimal y reproducción de semilla. Comprueba 36 métodos nuevos y 5100 preguntas generadas.

`tests/advanced.browser.test.cjs` recorre las 17 secciones, ejecuta 46 cálculos, responde práctica y exámenes por la interfaz, exporta/importa respaldos, cancela y confirma reinicios, rechaza archivos de otro módulo y verifica recarga. Comprueba 390, 768 y 1440 px, menú móvil y cálculo tras desconectar la red. Se revisan capturas de escritorio/móvil.

Los 93 fragmentos Python de los módulos 2–8 se verificaron sintácticamente; se ejecutaron importaciones y ejemplos de nivel superior en un entorno con NumPy/SciPy. No se afirma cobertura exhaustiva de cada parámetro de las funciones de referencia.

Las pruebas son comprobaciones de ingeniería y no sustituyen una revisión docente o una evaluación de comprensión con estudiantes. Comandos: `npm test`; servidor estático en 8000 y `npm run test:browser`.
