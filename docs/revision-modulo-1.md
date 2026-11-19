# Revisión académica del módulo 1

## Fuente y alcance

Cabrera Escobar, J. O., Orozco Cantos, L. S., y Cabrera Escobar, R. V. (2024). Métodos numéricos. Puerto Madero Editorial Académica. DOI: https://doi.org/10.55204/pmea.81. Copia local en `libros/`. Se revisaron el índice y el capítulo 1, páginas impresas 1–19 (páginas 20–38 del archivo). Se contrastó texto extraído y se inspeccionaron visualmente las páginas con las fórmulas de redondeo, error relativo, cifras exactas, cocientes, potencias y raíces.

Las explicaciones y ejercicios incorporados son originales. El libro se usa como referencia temática, no como garantía de corrección de cada igualdad que contiene. Esta revisión no pretende validar los demás capítulos.

## Cobertura

| Libro | Contenido en la web | Actividad |
| --- | --- | --- |
| 1.1 | Conceptos, modelo y aproximación · tema 1 | Conceptos y validación |
| 1.2 | Algoritmos finitos y definidos · tema 1 | Presupuesto de pasos e interpretación |
| 1.3 | Especificación, implementación, verificación y documentación · tema 1 | Diferenciar verificación y validación |
| 1.4 | Conteos, mediciones, defecto y exceso · tema 2 | Aproximación y redondeo |
| 1.5 | Empates al par y alejados de cero · tema 2 | Selector y ejercicios con regla explícita |
| 1.6 | Error con signo, absoluto, relativo y cotas · tema 3 | Error porcentual y cota conservadora |
| 1.7 | Cinco categorías y equivalencias terminológicas · tema 4 | Clasificación y escenarios combinados |
| 1.8 | Cifras declaradas, criterio absoluto y escala · tema 5 | Conteo y cota exigida |
| 1.9 | Cotas de suma y diferencia · tema 6 | Resta con incertidumbres |
| 1.10 | Producto lineal y término de segundo orden · tema 6 | Calculadora y ejemplo |
| 1.11 | Cociente, dominio y cota conservadora · tema 6 | Ejercicios y calculadora |
| 1.12 | Potencias y raíces · tema 6 | Raíces con contraste por intervalos |
| 1.13 | Expresión compuesta con unidades · tema 6 | Caudal, área y velocidad |
| Complementario | Condicionamiento y estabilidad · ampliación A | Laboratorio de sensibilidad |
| Complementario | Convergencia y estimador de orden · ampliación B | Ejercicios y gráfica |

## Decisiones matemáticas

- El libro usa empates al par. Se conserva también la convención de alejarse de cero, pero cada empate debe declarar su regla.
- Se distinguen el error absoluto efectivo y una cota superior. En propagación se comunica que el producto, cociente, potencia y raíz usan linealización.
- El libro usa en algunos desarrollos el valor aproximado como normalizador. La calculadora de error conocido usa el verdadero; las cotas de propagación usan el centro. Se explica la diferencia.
- Se reemplazó la equivalencia entre cifras significativas y error relativo por el criterio absoluto del capítulo, Ea ≤ 0.5×10^(m−n+1), y se identifica el antiguo criterio relativo como orientativo.
- La clasificación de cinco grupos del libro se presenta junto a los términos usados habitualmente, evitando confundir truncar una serie y cortar dígitos.
- Se verifican resultados propios sin copiar inconsistencias del libro. Por ejemplo, 0.05/28.1 = 0.00177936… (0.177936… %), frente a los pasos intermedios inconsistentes del ejemplo de resta de la p. 10. La identidad entre fracción y porcentaje del área en la p. 15 también requiere cuidado.
- La raíz del laboratorio exige índice entero ≥2 y radicando positivo en todo el intervalo. No se promete cubrir raíces impares de intervalos negativos ni derivadas singulares en cero.
- La estimación de convergencia no demuestra por sí sola convergencia a partir de un conjunto finito de datos.

## Verificación

`npm test` comprueba reglas de empate, dominios, valores de propagación y raíces, pasos, corrección numérica, balance del examen, pistas sin solución, mezcla de alternativas y validación/saneamiento/restauración de respaldos. También genera miles de variantes para detectar opciones duplicadas e índices inconsistentes.

Con un servidor en el puerto 8000, `npm run test:browser` prueba Edge (o Chromium), navegación por teclado, las once vistas en anchos de 390, 768 y 1440 px, fórmulas, exportación real, cancelación y confirmación de reinicio, archivo inválido, importación válida, persistencia y cálculo tras perder la conexión. Se revisaron capturas de escritorio y móvil; se corrigió el recorte de texto en los procedimientos de las calculadoras.

Los tests no sustituyen una revisión docente o un estudio con estudiantes. La batería aleatoria detecta propiedades estructurales; los ejemplos numéricos clave tienen comprobaciones independientes.

## Fuera de alcance por indicación del usuario

Video propio, capítulos audiovisuales y transcripción: pendientes de que termine su producción. No se añadió un reproductor vacío ni se generó material audiovisual en este cambio.
