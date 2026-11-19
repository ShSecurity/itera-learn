'use strict';
const lessonGuides = [
 ['Introducción','Reconocer cuándo usar una aproximación y distinguir precisión de exactitud.','Un algoritmo puede converger y aun así detenerse antes de alcanzar la precisión requerida.','Una simulación de tráfico obtiene un resultado aproximado. ¿Qué dato adicional necesitas?','Una estimación o cota del error para juzgar su utilidad.'],
 ['Redondeo','Redondear y truncar, declarando la cantidad de decimales y la regla de empate.','El libro usa empates al par: −1.25 a un decimal da −1.2. La calculadora también permite alejarse de cero: −1.3. Truncar elimina dígitos hacia cero.','Redondea y trunca −2.675 a dos decimales.','Redondeo: −2.68. Truncamiento: −2.67. Sus errores absolutos son ambos 0.005.'],
 ['Error absoluto y relativo','Calcular e interpretar errores absolutos, relativos y porcentuales.','El error relativo divide por el valor verdadero en valor absoluto. Multiplica por 100 solo para expresarlo como porcentaje. Si el verdadero es cero, el relativo está indefinido.','Dos sensores tienen error absoluto 0.1: uno mide 1 y otro 1000. ¿Son igualmente precisos en términos relativos?','No. Sus errores relativos son 10 % y 0.01 %, respectivamente. La escala importa.'],
 ['Clasificación','Distinguir errores de los datos, del método y de la representación numérica.','Truncar una serie es error de truncamiento; almacenar pocos dígitos es redondeo; una medición incierta aporta error inherente.','Una medición incierta se usa en una serie de cinco términos calculada con cuatro decimales. ¿Hay un solo tipo de error?','No: pueden coexistir error inherente, truncamiento y redondeo.'],
 ['Cifras significativas','Identificar cifras significativas y expresar sin ambigüedad la precisión declarada.','Los ceros iniciales no cuentan. Los finales tras el punto sí. Un entero como 1200 necesita notación científica para declarar su precisión. El criterio absoluto del libro considera la posición decimal. El umbral relativo orientativo no sustituye una cota de medición.','Compara 1.20 × 10³ con 1.2 × 10³.','Representan el mismo valor, pero declaran tres y dos cifras significativas.'],
 ['Propagación','Estimar cotas de error y reconocer las condiciones de una linealización.','Las cotas absolutas se suman en suma y resta. Productos, cocientes y potencias usan aproximaciones de primer orden. Esto no es la combinación estadística de incertidumbres independientes por raíz de suma de cuadrados.','Para u=10 ±0.1 y v=2 ±0.02, estima la cota del producto.','uv=20; Δ(uv) ≈ |v|Δu+|u|Δv=0.4. El término omitido ΔuΔv vale 0.002.'],
 ['Condicionamiento','Separar sensibilidad del problema y estabilidad del algoritmo.','Un κ pequeño indica baja amplificación relativa local. κ puede ser menor que 1. La fórmula relativa no está definida si f(x)=0; cerca de singularidades una linealización puede fallar.','Para f(x)=1/(1−x), compara x=0.5 y x=0.99.','κ=|x/(1−x)|: vale 1 y 99. Cerca de 1, la misma perturbación relativa se amplifica mucho más.'],
 ['Convergencia','Estimar el orden y distinguirlo de la exactitud alcanzada.','El orden se estima en el régimen asintótico. Para convergencia lineal se necesita p=1 y 0<C<1. Una secuencia finita no demuestra por sí sola convergencia.','Compara errores 0.1, 0.01, 0.001 con 0.5, 0.25, 0.0625.','La primera secuencia es lineal con C=0.1; la segunda es cuadrática con C=1. El orden no basta para comparar el error actual.']
];
function explainCalculation(id, text) {
 const result = document.getElementById('res-' + id);
 let box = document.getElementById('steps-' + id);
 if (!box) { box = document.createElement('p'); box.id = 'steps-' + id; box.className='calculation-steps'; result.append(box); }
 box.textContent = text;
}
// Validation stays in each calculator; the learning layer renders its worked steps.
for (const [name,id] of [['calcRound','round'],['calcError','err'],['calcSig','sig'],['calcProp','prop'],['calcConv','conv']]) {
 const original=window[name];
 window[name]=function(...args){const result=document.getElementById('res-'+id);result.classList.remove('show');original(...args);if(result.classList.contains('show'))explainCalculation(id);};
}
function conditionResult(x, delta) {
 if (![x,delta].every(Number.isFinite) || x === 0 || delta === 0 || x === 1 || x + delta === 1) return null;
 const y=1/(1-x), changed=1/(1-x-delta), k=Math.abs(x/(1-x));
 const input=Math.abs(delta/x), output=Math.abs((changed-y)/y);
 if (![y,changed,k,input,output].every(Number.isFinite)) return null;
 return {y,changed,k,input,output,crosses:(x-1)*(x+delta-1)<0};
}
function calcCondition() {
 const out=document.getElementById('condition-result');
 const r=conditionResult(readNumber('condition-x'),readNumber('condition-delta'));
 out.textContent = r ? `f(x)=${r.y.toPrecision(6)}; f(x+δ)=${r.changed.toPrecision(6)}; κ=${r.k.toPrecision(5)}. Perturbación relativa de entrada: ${(100*r.input).toPrecision(4)} %; cambio relativo de salida: ${(100*r.output).toPrecision(4)} %. Estimación local: κ·|δ/x| = ${(100*r.k*r.input).toPrecision(4)} %. ${r.crosses ? 'El intervalo cruza la singularidad x=1: la predicción local no es fiable.' : 'Compara predicción y cambio real; reduce δ para observar la aproximación local.'}` : 'Ingresa x y δ finitos y distintos de cero, evitando x=1 y x+δ=1.';
}
function createPractice(sid) {
 const level=document.getElementById('level-'+sid).value;
 const i=Number(sid.slice(1))-1;
 let q=expandedQuestion(sid,level,'practice');
 q=makeAttempt([q],[])[0];
 const box=document.getElementById('practice-'+sid); box.replaceChildren();
 const text=document.createElement('p'); text.textContent=q.text; box.append(text);
 const feedback=document.createElement('p');feedback.setAttribute('role','status');
 q.opts.forEach((option,index)=>{
  const button=document.createElement('button');button.className='qbtn';button.textContent=option;button.type='button';button.setAttribute('aria-pressed','false');
  button.onclick=()=>{
   box.querySelectorAll('button').forEach(b=>{b.setAttribute('aria-pressed',String(b===button));b.classList.remove('practice-wrong');});
   if(index===q.cor){box.querySelectorAll('button').forEach(b=>b.disabled=true);feedback.innerHTML='Correcto. '+q.exp;}
   else {button.classList.add('practice-wrong');feedback.textContent=incorrectFeedback(q,index,sid);}
  };box.append(button);
 });
 box.append(feedback);
}
function renderDiagnosis() {
 const container=document.getElementById('exam-diagnosis'); if(!container)return;
 container.replaceChildren();
 if(!examSubmitted) return;
 const heading=document.createElement('h3');heading.textContent='Tu repaso por tema';container.append(heading);
 lessonGuides.forEach((guide,i)=>{const sid='s'+(i+1);const questions=EXAM_DATA.map((q,j)=>({q,j})).filter(({q})=>q.topic===sid);const score=questions.filter(({q,j})=>correctExamAnswer(q,examAnswers[j])).length;
 const row=document.createElement('p'); const link=document.createElement('a');link.href='#'+sid;link.textContent=guide[0];row.append(link,` · ${questions.length?score+'/'+questions.length:'Sin preguntas clasificadas en este intento antiguo'}${questions.length&&score<questions.length?' · Repasa: '+guide[1]:''}`);container.append(row);});
}
const originalResults=examShowResults;
examShowResults=function(score){originalResults(score);renderDiagnosis();};
document.addEventListener('DOMContentLoaded',()=>{
 const notice=document.createElement('div');notice.className='ibox info';notice.setAttribute('role','status');notice.textContent='Acierta todas las preguntas del cuestionario para completar un tema. Hay intentos ilimitados y la práctica adicional no cuenta para el avance. El examen se habilita al completar al menos el 75 % de los temas. Los nuevos intentos se aprueban con 16/24. El avance se guarda en este navegador.';
 document.querySelector('#s1 .lesson-content').prepend(notice);
 lessonGuides.forEach((guide,i)=>{const sid='s'+(i+1), content=document.querySelector('#'+sid+' .lesson-content'); const objective=document.createElement('div');objective.className='learning-guide';const title=document.createElement('h3');title.textContent='Al terminar podrás…';const description=document.createElement('p');description.textContent=guide[1];objective.append(title,description);content.prepend(objective);
 const details=document.createElement('details');details.className='learning-guide';const summary=document.createElement('summary');summary.textContent='Errores frecuentes y ejemplo de interpretación';const p=document.createElement('p');p.textContent=guide[2];const example=document.createElement('p');example.textContent=guide[3]+' '+guide[4];details.append(summary,p,example);content.append(details);
 const practice=document.createElement('div');practice.className='learning-guide';practice.innerHTML=`<h3>Práctica adicional</h3><label for="level-${sid}">Dificultad</label> <select id="level-${sid}"><option value="basico">Básico</option><option value="intermedio">Intermedio</option><option value="reto">Reto con interpretación</option></select> <button class="qbtn" type="button">Generar ejercicio</button><div id="practice-${sid}" aria-live="polite"></div>`;practice.querySelector('button').onclick=()=>createPractice(sid);content.append(practice);
 });
 const condition=document.createElement('div');condition.className='learning-guide';condition.innerHTML='<h3>Laboratorio de sensibilidad</h3><p>Explora f(x)=1/(1−x). Cerca de x=1 aumenta la sensibilidad. κ es una medida relativa local.</p><label for="condition-x">Entrada x</label><input id="condition-x" value="0.99" inputmode="decimal"><label for="condition-delta">Perturbación δ</label><input id="condition-delta" value="0.0001" inputmode="decimal"><button type="button" class="qbtn">Comparar</button><p id="condition-result" role="status"></p>';condition.querySelector('button').onclick=calcCondition;document.querySelector('#s7 .lesson-content').append(condition);calcCondition();
 const diagnosis=document.createElement('div');diagnosis.id='exam-diagnosis';document.getElementById('exam-results').append(diagnosis);renderDiagnosis();
 const review=document.createElement('details');review.className='learning-guide';review.innerHTML='<summary>Resumen del módulo y lista de comprobación</summary>';lessonGuides.forEach((guide,i)=>{const p=document.createElement('p');const a=document.createElement('a');a.href='#s'+(i+1);a.textContent=guide[0];p.append(a,': '+guide[1]);review.append(p);});document.querySelector('#s8 .lesson-content').append(review);
 document.querySelectorAll('[id^="status-"],.qdone').forEach(el=>el.setAttribute('aria-live','polite'));
 const refs=document.createElement('details');refs.className='learning-guide';refs.innerHTML='<summary>Referencias para profundizar</summary><p><a href="https://www.cs.cornell.edu/courses/cs4220/2026sp/lec/2026-02-02.html" target="_blank" rel="noopener">Cornell: error y condicionamiento</a></p><p><a href="https://dlmf.nist.gov/3.1" target="_blank" rel="noopener">NIST: aritmética y medidas del error</a></p><p>En este módulo se calculan cotas deterministas de error. La incertidumbre estándar estadística emplea otro modelo: <a href="https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-law-propagation-uncertainty" target="_blank" rel="noopener">NIST: propagación de incertidumbre</a>.</p>';document.getElementById('formulas').append(refs);
 const network=document.createElement('p');network.className='network-status';network.setAttribute('role','status');document.querySelector('main').prepend(network);
 const update=()=>{network.hidden=navigator.onLine;network.textContent='Sin conexión: los ejercicios y las calculadoras funcionan si la página ya está cargada. El video requiere internet.';};window.addEventListener('online',update);window.addEventListener('offline',update);update();
});
