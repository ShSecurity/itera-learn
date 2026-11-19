'use strict';
const BOOK_SECTIONS = [
 ['1.1','Conceptos','s1',1],['1.2','Algoritmos y modelos','s1',1],['1.3','Uso de la computadora','s1',2],
 ['1.4','Exactos y aproximados','s2',3],['1.5','Redondeo','s2',4],['1.6','Error y cotas','s3',5],
 ['1.7','Clasificación de errores','s4',6],['1.8','Cifras significativas','s5',7],
 ['1.9','Suma y diferencia','s6',8],['1.10','Producto','s6',11],['1.11','Cociente','s6',13],
 ['1.12','Potencia y raíz','s6',14],['1.13','Cálculo combinado','s6',16]
];
function learningPanel(title, body) {
 const panel=document.createElement('article');panel.className='learning-guide';
 const heading=document.createElement('h3');heading.textContent=title;panel.append(heading);
 const content=document.createElement('div');content.innerHTML=body;panel.append(content);return panel;
}
const academicLessons={
 s1:[['1.1–1.3 · Del problema al programa',`<p>Un método numérico transforma una pregunta en operaciones que se pueden ejecutar. Primero se define el <strong>modelo</strong>: variables, unidades, relaciones y supuestos. El algoritmo indica cómo calcular; el programa implementa ese algoritmo.</p><ol><li>Especifica entradas, salidas y restricciones.</li><li>Diseña pasos sin ambigüedad, con un límite de iteraciones y una condición de parada.</li><li>Implementa y verifica con resultados conocidos y casos límite.</li><li>Valida si el modelo describe los datos reales con la precisión requerida.</li><li>Documenta unidades, tolerancia y límites de uso antes de emplearlo.</li></ol><p><strong>Ejemplo propio:</strong> para estimar el tiempo de descarga de una batería, un modelo de consumo constante es fácil de calcular, pero omite cambios de temperatura y carga. Más decimales no corrigen esas hipótesis. Verificar el código y validar el modelo son tareas distintas.</p>`]],
 s2:[['1.4 · Valor exacto, medición y aproximación',`<p>Contar 12 paquetes recibidos puede dar un valor exacto. Medir 12.0 ms con un instrumento da una aproximación cuya incertidumbre depende del instrumento. La escritura del número no decide por sí sola si es exacto.</p><p>Como 1.41 &lt; √2 &lt; 1.42, el primero aproxima <strong>por defecto</strong> y el segundo <strong>por exceso</strong>. Eso informa el sentido; el error absoluto informa la distancia.</p>`],['1.5 · Dos reglas para un empate',`<p>El capítulo usa <strong>redondeo al par</strong> cuando la parte descartada es exactamente la mitad: 2.345 → 2.34, pero 2.355 → 2.36 al conservar dos decimales. Si queda algo después del 5, como en 2.3451, ya no hay empate y el más cercano es 2.35.</p><p>Otra convención aleja los empates de cero: 2.345 → 2.35 y −2.345 → −2.35. La calculadora permite elegir. En los ejercicios se declara la regla cuando importa.</p><p>Al redondear a d decimales, Ea ≤ 0.5 × 10<sup>−d</sup>. Al truncar hacia cero, Ea &lt; 10<sup>−d</sup>. Conserva dígitos de guarda y redondea al final.</p>`]],
 s3:[['1.6 · Error conocido y cota de error',`<p>Si conocemos A, podemos calcular el error con signo A−a y su magnitud Ea=|A−a|. Si A es desconocido pero está en [a−Δa, a+Δa], <strong>Δa es una cota</strong>: Ea≤Δa. La cota no implica que el error real alcance ese máximo.</p><p>Ejemplo: si A está entre 9.98 y 10.02, informar a=10 con Δa=0.02 cubre el intervalo. El error relativo verdadero es |A−a|/|A|. Como |A|≥9.98, una cota conservadora es 0.02/9.98≈0.002004, es decir, 0.2004 %.</p><p>El libro también normaliza cotas por el valor aproximado: Δa/|a|. Aquí se indica explícitamente el divisor: <strong>verdadero</strong> al medir un error conocido y <strong>central aproximado</strong> al propagar incertidumbres. No son cantidades idénticas.</p>`]],
 s4:[['1.7 · Las cinco categorías del capítulo',`<dl><dt><strong>Error del problema o modelo</strong></dt><dd>Se idealiza el fenómeno, por ejemplo al despreciar pérdidas de calor.</dd><dt><strong>Errores numéricos</strong></dt><dd>Se aproximan operaciones o números: truncamiento y redondeo.</dd><dt><strong>Errores iniciales</strong></dt><dd>Los parámetros o mediciones ya son inciertos antes de calcular.</dd><dt><strong>Errores de operación</strong></dt><dd>Las incertidumbres de los operandos se transmiten al resultado.</dd><dt><strong>Error residual</strong></dt><dd>Se usa una parte finita de un proceso infinito.</dd></dl><p>La clasificación del libro se solapa con la terminología moderna: detener una serie se llama habitualmente <em>truncamiento del método</em>; cortar cifras se llama <em>truncamiento de representación</em>. Hay que describir el mecanismo además de nombrarlo.</p><p>Un error lógico de programación requiere corregir el código. No debe confundirse con una incertidumbre inevitable del dato.</p>`]],
 s5:[['1.8 · Cifras escritas y cifras exactas',`<p>Contar cifras declaradas no prueba que sean correctas. Para a=c×10<sup>m</sup>, con 1≤|c|&lt;10, el capítulo garantiza n cifras exactas si <strong>Ea≤0.5×10<sup>m−n+1</sup></strong>. El exponente m indica la escala del valor, no el exponente escrito en una notación sin normalizar.</p><ol><li>Normaliza a=12.34=1.234×10¹, de modo que m=1.</li><li>Para n=4, la última posición es 10<sup>−2</sup>.</li><li>La condición es Ea≤0.005. Una cota 0.004 cumple; 0.02 no.</li></ol><p>El umbral relativo 0.5×10<sup>1−n</sup> se usa aquí como criterio orientativo adicional. No es una equivalencia universal con el criterio absoluto del libro ni garantiza que una medición tenga esa incertidumbre. Para asegurar una posición concreta, usa la escala y una cota absoluta.</p>`]],
 s6:[['1.9–1.10 · Cotas y aproximaciones',`<p>Si los errores de los datos pueden tener cualquier signo, una cota válida para suma y resta es Δu+Δv. Puede sobreestimar el error efectivo; no hay cancelación garantizada.</p><p>Para el producto, la parte lineal es |v|Δu+|u|Δv. Una cota conservadora completa añade ΔuΔv. Con u=10±0.1 y v=2±0.02: valor central 20, estimación lineal 0.4 y cota completa 0.402. Informar 20±0.4 es una aproximación de primer orden.</p>`],['1.11 · Cociente: procedimiento completo',`<p>Ejemplo propio: u=12±0.06 y v=3±0.03.</p><ol><li>El intervalo [2.97,3.03] del divisor no contiene cero.</li><li>Valor central q=12/3=4.</li><li>Estimación relativa: 0.06/12+0.03/3=0.015.</li><li>Estimación absoluta: 4×0.015=0.06.</li><li>A primer orden: q≈4±0.06 y error relativo≈1.5 %.</li></ol><p>Para una cota conservadora sin linealizar: Δq≤(Δu+|q|Δv)/(|v|−Δv)=0.18/2.97≈0.0606061. Si |v|≤Δv, el divisor puede ser cero: esa operación no admite una cota finita general.</p>`],['1.12 · Potencias y raíces',`<p>Para f(u)=u<sup>p</sup>, la estimación absoluta es |p·u<sup>p−1</sup>|Δu. Si u y f(u) no son cero, la relativa es |p|Δu/|u|. El exponente se considera exacto.</p><p>Para una raíz de índice n: p=1/n, de modo que el error relativo se divide por n. Ejemplo: S=25±0.10 cm² y l=√S. l=5 cm; Δl≈(1/(2√25))×0.10=0.01 cm; error relativo≈0.2 %.</p><p>Una comprobación por intervalos da l∈[√24.9,√25.1]. La raíz real par exige radicando no negativo; cerca de cero la derivada puede crecer sin límite y la estimación local deja de ser fiable. El laboratorio de raíces usa intervalos estrictamente positivos.</p>`],['1.13 · Caso integrador: caudal por área',`<p>Se estima v=Q/(πr²), con Q=10±0.1 L/s y r=2±0.01 dm. Usa π como constante matemática y unidades compatibles: 1 L=1 dm³.</p><ol><li>Área central A=π×2²≈12.5663706 dm².</li><li>Error relativo del área: 2×0.01/2=0.01.</li><li>Velocidad central v≈0.7957747 dm/s.</li><li>Error relativo lineal: 0.1/10+0.01=0.02.</li><li>Error absoluto lineal: 0.7957747×0.02≈0.0159155 dm/s.</li></ol><p>Se puede comunicar aproximadamente 0.796±0.016 dm/s como estimación lineal. Para una cobertura garantizada, evalúa los extremos positivos: v∈[(9.9)/(π·2.01²),(10.1)/(π·1.99²)]≈[0.7799975,0.8118305] dm/s. Esa comprobación cubre la no linealidad de la expresión. No sumes una misma fuente incierta como si fueran mediciones independientes; el radio repetido se trata con la potencia.</p>`]],
 s7:[['Ampliación A · Qué añade al capítulo',`<p>Este tema amplía el capítulo 1; no corresponde a una sección 1.14 del libro. Estudia cuánto se amplifican los cambios de entrada. Una formulación estable puede evitar pérdida numérica sin modificar el condicionamiento matemático del problema.</p>`]],
 s8:[['Ampliación B · Qué añade al capítulo',`<p>Este tema amplía el capítulo 1; no corresponde a una sección 1.15 del libro. Analiza la evolución del error en iteraciones. Una tolerancia debe indicar si se refiere al incremento, al residuo o a una cota del error verdadero.</p>`]]
};
function workedSteps(id) {
 const val=key=>document.getElementById(key).value;
 const txt=key=>document.getElementById(key).textContent;
 const fmt=number=>Number.isFinite(number)?Number(number.toPrecision(9)).toString():'no definido';
 if(id==='round')return [
  `Datos: x=${val('c-round-num')}; d=${val('c-round-dec')} decimales; empate ${val('c-round-mode')==='even'?'al par':'alejado de cero'}.`,
  `La posición conservada vale 10^(−${val('c-round-dec')}). Al cortar hacia cero se obtiene ${txt('rr-trunc')}.`,
  `Al elegir el vecino más cercano con la regla indicada se obtiene ${txt('rr-round')}.`,
  `Ea del truncamiento=|${val('c-round-num')}−(${txt('rr-trunc')})|=${txt('rr-etrunc')}.`,
  `Ea del redondeo=|${val('c-round-num')}−(${txt('rr-round')})|=${txt('rr-eround')}. El redondeo al más cercano no debe introducir un error mayor que media unidad de la última posición.`];
 if(id==='err') {
  const x=readNumber('c-xv'), a=readNumber('c-xa'), e=Math.abs(x-a);
  return [`Error con signo: A−a=${fmt(x-a)}.`, `Ea=|${x}−(${a})|=${fmt(e)}; conserva las unidades de A.`,x===0?'A=0: no se divide entre cero; el error relativo verdadero no está definido.':`Er=${fmt(e)}/|${x}|=${fmt(e/Math.abs(x))}. E%=100×Er=${fmt(100*e/Math.abs(x))} %.`,`Los decimales del resultado usan la cota Ea≤0.5×10^(−d), no el conteo de cifras significativas.`];
 }
 if(id==='sig') {
  const n=Number(txt('rs-count')), x=Number(val('c-sig').replace(',','.')), m=Math.floor(Math.log10(Math.abs(x))), bound=0.5*10**(m-n+1);
  return [`Escritura analizada: ${val('c-sig')}. Se omiten ceros iniciales y se consideran los ceros finales declarados por el coeficiente.`, `Se cuentan n=${n} cifras: ${txt('rs-digits')}. Normalización: ${txt('rs-sci')}; escala m=${m}.`, `Para garantizar esas n cifras con el criterio absoluto del libro, se requeriría Ea≤0.5×10^(${m}−${n}+1)=${fmt(bound)}.`, `El umbral relativo orientativo del curso vale ${txt('rs-er')}. No se ha medido ni deducido una incertidumbre real del dato.`];
 }
 if(id==='prop') {
  const u=readNumber('c-u'),du=readNumber('c-du'),v=readNumber('c-v'),op=val('c-op'),dv=['pow','root'].includes(op)?0:readNumber('c-dv');
  const result=Number(txt('rp-res')), error=Number(txt('rp-abs'));
  const formulas={add:`Δf=Δu+Δv=${du}+${dv}`,sub:`Δf=Δu+Δv=${du}+${dv}`,mul:`Δf≈|v|Δu+|u|Δv=|${v}|×${du}+|${u}|×${dv}`,div:`Δf≈Δu/|v|+|u|Δv/|v|²=${du}/|${v}|+|${u}|×${dv}/(${v}²)`,pow:`Δf≈|n·u^(n−1)|Δu=|${v}×(${u})^(${v}−1)|×${du}`,root:`Δf≈(1/n)u^(1/n−1)Δu=(1/${v})×${u}^(1/${v}−1)×${du}`};
  const steps=[`Datos: u=${u}, Δu=${du}; ${op==='root'?'índice n':op==='pow'?'exponente n':'v'}=${v}${['pow','root'].includes(op)?' (exacto)':', Δv='+dv}.`, `Valor central calculado: ${txt('rp-res')}.`,`${formulas[op]}=${txt('rp-abs')}.`,result===0?'El resultado central es cero: la medida relativa respecto a ese centro no está definida.':`Error relativo central=Δf/|f|=${txt('rp-rel')}; porcentaje=${txt('rp-pct')}.`];
  if(op==='mul')steps.push(`Cota completa del producto: estimación lineal + ΔuΔv=${fmt(error+du*dv)}. El término de segundo orden omitido es ${fmt(du*dv)}.`);
  if(op==='div')steps.push(`Divisor en [${fmt(v-dv)}, ${fmt(v+dv)}], sin cero. Cota conservadora: (Δu+|u/v|Δv)/(|v|−Δv)=${fmt((du+Math.abs(u/v)*dv)/(Math.abs(v)-dv))}.`);
  if(op==='root') {const low=(u-du)**(1/v),high=(u+du)**(1/v);steps.push(`Comprobación sin linealizar: raíz en [${fmt(low)}, ${fmt(high)}]; cota absoluta alrededor del centro=${fmt(Math.max(u**(1/v)-low,high-u**(1/v)))}.`);}
  steps.push(['add','sub'].includes(op)?'La suma de cotas es válida para todos los signos posibles de los errores.':'El resultado con ± es una estimación lineal, válida para incertidumbres pequeñas; una cota por intervalos puede ser más amplia.');return steps;
 }
 if(id==='conv') {
  const errors=val('c-conv').trim().split(/\s+/).map(x=>Number(x.replace(',','.'))),steps=[];
  for(let j=1;j<errors.length-1&&j<=8;j++)steps.push(`p${j}=ln(${errors[j+1]}/${errors[j]}) / ln(${errors[j]}/${errors[j-1]})=${fmt((Math.log(errors[j+1])-Math.log(errors[j]))/(Math.log(errors[j])-Math.log(errors[j-1])))}.`);
  steps.push(`Promedio de los cocientes válidos (solo para secuencia decreciente): p≈${txt('rc-p')}. Se usan todos los datos; arriba se muestran hasta ocho sustituciones.`,`C≈e final/(e anterior)^p=${txt('rc-c')}; clasificación: ${txt('rc-type')}.`,`Una muestra finita permite estimar el comportamiento, no demostrar convergencia. Revisa que el régimen sea asintótico y el error no esté dominado por redondeo.`);return steps;
 }
 return [];
}
// Called by the existing calculator wrappers after a valid calculation.
explainCalculation=function(id) {
 const result=document.getElementById('res-'+id);document.getElementById('steps-'+id)?.remove();
 const box=document.createElement('div');box.id='steps-'+id;box.className='calculation-steps';
 const title=document.createElement('h3');title.textContent='Procedimiento e interpretación';box.append(title);
 const list=document.createElement('ol');for(const text of workedSteps(id)){const item=document.createElement('li');item.textContent=text;list.append(item);}box.append(list);result.append(box);
};
document.addEventListener('DOMContentLoaded',()=>{
 for(const [sid,panels] of Object.entries(academicLessons)) {
  const content=document.querySelector('#'+sid+' .lesson-content');
  for(const [title,body] of panels)content.append(learningPanel(title,body));
 }
 const map=document.createElement('details');map.className='learning-guide';map.id='book-map';
 const summary=document.createElement('summary');summary.textContent='Ruta del capítulo 1 · Libro y actividades';map.append(summary);
 const intro=document.createElement('p');intro.innerHTML='Referencia: Cabrera Escobar, Orozco Cantos y Cabrera Escobar (2024). <a href="../libros/Metodos_Numericos_Cabrera_Orozco_2024.pdf" target="_blank" rel="noopener">Abrir el libro</a>. Las páginas indicadas son las impresas; el PDF tiene 19 páginas preliminares. Las explicaciones y ejercicios añadidos son de elaboración propia.';map.append(intro);
 const list=document.createElement('ol');BOOK_SECTIONS.forEach(([section,title,sid,page])=>{const li=document.createElement('li');li.innerHTML=`<a href="#${sid}">${section} · ${title}</a> · p. ${page} · Tema ${sid.slice(1)}`;list.append(li);});map.append(list);document.querySelector('#s1 .lesson-content').prepend(map);
 for(const sid of ['s7','s8']) {const link=document.querySelector(`[data-sid="${sid}"]`);const label=document.createElement('small');label.className='extension-tag';label.textContent='Ampliación';link.append(label);}
 const instructions=document.querySelectorAll('[id^="level-"]');instructions.forEach(select=>{const p=document.createElement('p');p.textContent='Básico: concepto o cálculo directo. Intermedio: procedimiento con condiciones. Reto: interpretación o combinación de conceptos. Las pistas no revelan la solución; puedes seguir intentando.';select.closest('.learning-guide').append(p);});
 renderModuleMath(document.body);
});
