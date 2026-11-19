'use strict';
// Original exercises: every distractor carries a reason, kept aligned when shuffled.
function authoredQuestion(text, correct, distractors, explanation, meta = {}) {
 const entries = [{text:String(correct), hint:''}, ...distractors.map(([text,hint])=>({text:String(text),hint}))];
 if (new Set(entries.map(entry=>entry.text)).size !== 4) throw new Error('Alternativas duplicadas');
 return {text, opts:entries.map(e=>e.text), feedback:entries.map(e=>e.hint), cor:0, exp:explanation, ...meta};
}
function calculationQuestion(text, answer, distractors, explanation, meta = {}) {
 const format = value => Number(value.toPrecision(10)).toString();
 const q=authoredQuestion(text,format(answer),distractors.map(([value,why])=>[format(value),why]),explanation,{numeric:true,answer,...meta});
 return q;
}
function expandedQuestion(sid, level='basico', mode='practice') {
 const exam=mode==='exam';
 const a=randomInt(exam?31:3,exam?69:9), b=randomInt(2,5);
 const tag=exam?'En una evaluación de laboratorio':mode==='quiz'?'En una autoevaluación':'En una práctica';
 let q;
 if(sid==='s1') {
  if(level==='basico') q=authoredQuestion(`${tag}, un modelo calcula el enfriamiento de ${a} equipos. ¿Qué debe definirse antes de programar?`,'Entradas, resultados esperados e hipótesis del modelo',[
   ['Solo el lenguaje de programación','El lenguaje no define las variables físicas, las hipótesis ni lo que se necesita calcular.'],['Solo el color de las gráficas','El formato visual no determina el problema matemático que se quiere resolver.'],['Únicamente cuántos equipos hay','Un conteo no especifica el fenómeno, las condiciones ni las salidas del modelo.']], 'Primero se especifica el problema: variables, unidades, restricciones e hipótesis; después se diseña y verifica el algoritmo.');
  else if(level==='intermedio') q=calculationQuestion(`${tag}, un algoritmo admite hasta ${a*b} pasos. Cada bloque consume ${b} pasos. ¿Cuántos bloques completos puede ejecutar?`,a,[[a*b,'Confundiste el número de pasos con el de bloques. Cada bloque consume varios pasos.'],[a*b*b,'Multiplicar por los pasos de cada bloque aumenta la cantidad en vez de repartir el presupuesto.'],[a+1,'Esa cantidad excede el presupuesto de pasos disponible.']],`Se divide el presupuesto entre el costo de cada bloque: ${a*b}/${b}=${a}. Una cota de iteraciones asegura que el programa termine.`);
  else q=authoredQuestion(`${tag}, la temperatura simulada cambia menos de ${a}×10⁻⁵ entre iteraciones, pero no se contrastó con mediciones. ¿Qué conclusión es válida?`,'Hay un indicador de parada, pero falta validar el modelo y el error',[
   ['El fenómeno real quedó descrito exactamente','Una pequeña variación de iteración no valida las hipótesis físicas ni elimina la incertidumbre de los datos.'],['Ya no es necesario verificar el programa','La convergencia aparente no descarta errores de implementación.'],['El número de iteraciones mide el error verdadero','Contar pasos no mide la distancia a una solución verdadera desconocida.']], 'Se deben distinguir verificación del algoritmo, validación del modelo y estimación del error; la variación entre iteraciones es solo un indicador.');
 } else if(sid==='s2') {
  if(level==='basico') {
   const hundred=a*100+2*b+randomInt(0,1), text=(hundred/100+0.005).toFixed(3), even=hundred%2===0?hundred:hundred+1;
   q=calculationQuestion(`${tag}, redondea ${text} a dos decimales con empate al par.`,even/100,[[even/100+0.01,'En un empate exacto, incrementar siempre no aplica la regla al par.'],[even/100-0.01,'El empate al par no significa disminuir siempre: revisa la paridad de la última cifra retenida.'],[Math.floor(even/100),'Eliminaste más posiciones de las solicitadas.']],`El descarte es exactamente 5 seguido de ceros. Se conserva la cifra si es par; si es impar, se incrementa: ${ (even/100).toFixed(2)}.`,{rounding:true,roundingMode:'even'});
  } else if(level==='intermedio') {
   const decimals=randomInt(1,4), bound=0.5*10**(-decimals);
   q=calculationQuestion(`${tag}, se redondea una lectura de ${a}.${b} a ${decimals} decimales. ¿Cuál es la cota máxima introducida por redondear al más cercano?`,bound,[[bound*2,'Usaste una unidad completa de la última posición, que corresponde a una cota de truncamiento, no al máximo del redondeo al más cercano.'],[bound*10,'Desplazaste un orden decimal el tamaño de la última posición retenida.'],[bound/10,'Asignaste una precisión un orden decimal más fina que la solicitada.']],`La unidad de la última posición vale 10^(-${decimals}); la cota es su mitad: ${bound}.`);
  } else {
   const x=-(a+0.125), rounded=-(a+0.13), truncated=-(a+0.12);
   q=calculationQuestion(`${tag}, una lectura ${x} se redondea a dos decimales alejando los empates de cero. ¿Qué valor debes informar?`,rounded,[[truncated,'Elegiste el truncamiento hacia cero o el empate al par, pero el enunciado exige alejar el empate de cero.'],[-rounded,'Cambiaste el signo de la medición al redondear.'],[rounded-0.01,'Modificaste la cifra retenida en más de una unidad.']],`Es un empate exacto. Alejarse de cero aumenta la magnitud: ${rounded}. Truncar habría dado ${truncated}.`,{rounding:true,roundingMode:'away'});
  }
 } else if(sid==='s3') {
  const exact=a*10, diff=b/10, approx=exact-diff;
  if(level==='basico') q=calculationQuestion(`${tag}, una referencia vale ${exact} ms y una estimación ${approx} ms. ¿Cuál es el error absoluto en ms?`,diff,[[diff/10,'La resta quedó desplazada una posición decimal.'],[diff*10,'La diferencia quedó multiplicada por diez.'],[approx,'Elegiste el valor aproximado, no la distancia entre referencia y aproximación.']],`Ea=|${exact}−${approx}|=${diff} ms. El error absoluto conserva la unidad del dato.`);
  else if(level==='intermedio') {
   const percent=100*diff/exact;
   q=calculationQuestion(`${tag}, referencia ${exact} y estimación ${approx}. Escribe el error porcentual como número, sin el símbolo %.`,percent,[[percent/100,'Calculaste una fracción relativa y la presentaste como si ya fuera porcentaje.'],[100*diff/approx,'Dividiste por la aproximación; aquí se pide normalizar por la referencia.'],[diff,'La diferencia absoluta no es un porcentaje.']],`Ea=${diff}; Er=${diff}/${exact}; E%=100×Er=${percent.toPrecision(6)} %.`,{unit:'%'});
  } else {
   const limit=diff/(exact-diff), central=diff/exact;
   q=calculationQuestion(`${tag}, una referencia positiva desconocida está en [${exact-diff}, ${exact+diff}] y se informa ${exact}. ¿Qué cota conservadora del error relativo respecto al valor verdadero garantiza ese intervalo?`,limit,[[central,'Usaste el valor central como divisor; el verdadero puede ser menor, y eso puede aumentar el error relativo.'],[limit*100,'Convertiste a porcentaje aunque se pide una fracción relativa.'],[limit/2,'Dividiste nuevamente la incertidumbre por dos sin una hipótesis que lo justifique.']],`La distancia es como máximo ${diff} y el valor verdadero es al menos ${exact-diff}; por eso Er≤${diff}/${exact-diff}=${limit.toPrecision(6)}.`);
  }
 } else if(sid==='s4') {
  const scenarios=[
   ['se desprecia la pérdida de calor al construir el modelo','Error del modelo o del problema','Se simplifica el fenómeno antes de hacer cálculos.'],
   ['un sensor tiene un sesgo de calibración antes del cálculo','Error inicial o de los datos','La incertidumbre ya está presente en la entrada.'],
   [`se detiene una serie infinita tras ${a} términos`,'Error residual por proceso finito','Se sustituye un proceso infinito por una parte finita; en la terminología habitual es truncamiento del método.']
  ];
  if(level==='basico') {
   const [scenario,answer,exp]=scenarios[randomInt(0,2)];
   const opts=['Error del modelo o del problema','Error inicial o de los datos','Error residual por proceso finito','Error de representación por redondeo'];
   const reasons=['Esta categoría corresponde a hipótesis simplificadoras del fenómeno.','Esta categoría se refiere a incertidumbres presentes antes de operar.','Esta categoría requiere detener un proceso matemático infinito.','Esta categoría se debe a limitar la representación de los números.'];
   q=authoredQuestion(`${tag}, ${scenario}. ¿Cómo lo clasifica el capítulo?`,answer,opts.map((text,i)=>[text,reasons[i]]).filter(([text])=>text!==answer),exp);
  } else if(level==='intermedio') q=authoredQuestion(`${tag}, se omite rozamiento, se leen sensores inciertos y se almacenan resultados con ${b} decimales. ¿Cómo deben analizarse los errores?`,'Separar error del modelo, de datos y de representación',[
   ['Atribuir todos al redondeo','Omitir un efecto físico y medir con incertidumbre no son consecuencias de almacenar pocos dígitos.'],['Atribuir todos a la medición','La medición no explica ni las hipótesis del modelo ni la representación finita.'],['Suponer que los errores se compensan siempre','No se conoce el signo de cada contribución; la cancelación no está garantizada.']], 'Las fuentes pueden coexistir y deben identificarse antes de estimar su propagación.');
  else q=authoredQuestion(`${tag}, se calcula con datos inciertos, pero el programa usa una fórmula equivocada. ¿Qué acción es necesaria?`,'Corregir el error lógico y después analizar las incertidumbres',[
   ['Aumentar los decimales para corregir la fórmula','Más dígitos no corrigen una expresión que modela otra operación.'],['Clasificar la fórmula equivocada como incertidumbre inevitable','Un fallo de implementación requiere corrección; no es una cota inherente del dato.'],['Promediar muchas ejecuciones idénticas','Repetir el mismo error sistemático no verifica la fórmula.']], 'La verificación comprueba la implementación; la propagación estudia cómo las incertidumbres de los datos afectan a una implementación válida.');
 } else if(sid==='s5') {
  if(level==='basico') {q=questionVariants.figures();q.text=tag+': '+q.text;}
  else if(level==='intermedio') {
   const n=randomInt(2,5), m=randomInt(0,3), bound=0.5*10**(m-n+1);
   q=calculationQuestion(`${tag}, a=${exam ? (a/10).toFixed(1) : a+"."+b}×10^${m}. Para garantizar n=${n} cifras exactas con el criterio absoluto del libro (m=${m}), ¿cuál es la cota máxima de Ea?`,bound,[[bound*10,'Omitiste una posición significativa en el exponente m−n+1.'],[bound/10,'Exigiste una posición adicional a la que pregunta el ejercicio.'],[bound*2,'Usaste una unidad completa en vez de la mitad de la última posición.']],`Ea≤0.5×10^(m−n+1)=0.5×10^(${m}−${n}+1)=${bound}. La escala m forma parte del criterio.`);
  } else q=authoredQuestion(`${tag}, una lectura de ${a}00 no informa su incertidumbre. ¿Cuál es la forma responsable de declarar precisión?`,'Indicar incertidumbre o notación científica con las cifras declaradas',[
   ['Añadir ceros después del punto para mejorar la medición','Cambiar la escritura no reduce la incertidumbre real del instrumento.'],['Afirmar que todos los ceros son confiables sin contexto','La escritura de un entero con ceros finales puede ser ambigua.'],['Confundir la cantidad de cifras con una cota medida de error','Contar dígitos no sustituye la información experimental sobre la incertidumbre.']], 'Se distingue precisión declarada de precisión comprobada. La notación científica aclara la escritura; la incertidumbre requiere información adicional.');
 } else if(sid==='s6') {
  if(level==='basico') {
   const du=a/100, dv=b/100;
   q=calculationQuestion(`${tag}, u=${a}±${du} y v=${b}±${dv}. ¿Cuál es una cota absoluta para u−v?`,du+dv,[[Math.abs(du-dv),'Restaste las incertidumbres porque la operación central era una resta; una cota debe cubrir los signos posibles de ambos errores.'],[du,'Omitiste la contribución incierta del segundo dato.'],[(du+dv)*10,'El resultado tiene una posición decimal desplazada; revisa las unidades de las incertidumbres.']],`La desigualdad triangular permite tomar Δ(u−v)=Δu+Δv=${du+dv}.`);
  } else if(level==='intermedio') {
   const pct=a/10+b/10;
   q=calculationQuestion(`${tag}, el numerador tiene error relativo ${a/10}% y el divisor ${b/10}%. El divisor está lejos de cero. ¿Cuál es la estimación de primer orden del error porcentual del cociente?`,pct,[[Math.abs(a/10-b/10),'Restaste errores relativos; las cotas de las contribuciones no tienen signos conocidos que permitan cancelarlas.'],[pct/100,'Expresaste el error como fracción, pero se pide el número porcentual.'],[a/10,'Omitiste la incertidumbre del divisor.']],`A primer orden, los aportes relativos se suman: ${a/10}+${b/10}=${pct} %.`,{unit:'%'});
  } else {
   const area=a*a, percent=b/10;
   q=calculationQuestion(`${tag}, un área de ${area} cm² tiene error relativo ${percent}%. Se estima el lado mediante raíz cuadrada. ¿Qué error porcentual de primer orden tiene el lado?`,percent/2,[[percent*2,'Multiplicaste por el índice de la raíz como si fuera una potencia; la derivada introduce el exponente recíproco.'],[percent,'Trasladaste el error relativo sin considerar la transformación por raíz.'],[percent/200,'Convertiste a fracción cuando se pide el número porcentual.']],`Para l=S^(1/2), El≈(1/2)ES=${percent/2} %.`,{unit:'%'});
  }
 } else if(sid==='s7') {
  if(level==='basico') q=authoredQuestion(`${tag}, pequeñas perturbaciones de datos producen grandes cambios relativos. ¿Qué propiedad se observa?`,'Sensibilidad elevada del problema',[
   ['Solo lentitud de la computadora','La velocidad de ejecución no define cómo cambia la solución al perturbar los datos.'],['Un resultado necesariamente exacto','La gran sensibilidad no garantiza exactitud; puede amplificar incertidumbres.'],['Una propiedad que cambia al renombrar variables','Los nombres no alteran la relación matemática entre entrada y salida.']], 'El condicionamiento pertenece al problema. La estabilidad describe los errores introducidos por un algoritmo concreto.');
  else if(level==='intermedio') {
   const x=a/(a+1), k=a;
   q=calculationQuestion(`${tag}, f(x)=1/(1−x) y x=${a}/${a+1}. ¿Cuál es κ=|x f′(x)/f(x)|?`,k,[[a+1,'Usaste solo el inverso de 1−x y omitiste el factor x de la medida relativa.'],[1/a,'Invertiste la amplificación de la perturbación.'],[a*a,'Confundiste la derivada con el cociente normalizado de sensibilidad.']],`f′=1/(1−x)²; κ=|x/(1−x)|=${a}.`);
  } else {
   const k=a, perturb=b/1000, output=k*perturb;
   q=calculationQuestion(`${tag}, κ≈${k} y la perturbación relativa de entrada es ${perturb}%. Si vale la linealización local, ¿qué cambio porcentual de salida se estima?`,output,[[perturb/k,'Dividiste por la amplificación en vez de aplicarla a la perturbación.'],[output/100,'Convertiste a fracción, pero se pide el número porcentual.'],[k+perturb,'Sumaste sensibilidad y perturbación, cantidades que se relacionan por un producto.']],`Cambio relativo de salida≈κ×cambio relativo de entrada: ${k}×${perturb}=${output} %. Es local, no una garantía global.`,{unit:'%'});
  }
 } else if(sid==='s8') {
  if(level==='basico') {
   const ratio=b/10;
   q=calculationQuestion(`${tag}, los errores satisfacen e(n+1)=${ratio}·e(n). ¿Qué orden p describe esa relación?`,1,[[2,'Una razón constante no introduce un cuadrado del error anterior.'],[ratio,'Confundiste la constante multiplicativa con el exponente del error.'],[3,'La relación no incluye un cubo del error.']],`La relación tiene exponente 1 y C=${ratio}<1: es convergencia lineal.`);
  } else if(level==='intermedio') {
   const first=a/100, second=first**2, third=second**2;
   q=calculationQuestion(`${tag}, errores consecutivos: ${first}, ${second.toPrecision(8)}, ${third.toPrecision(8)}. ¿Qué p estima el cociente de logaritmos?`,2,[[1,'No comparaste cómo cambia la razón entre errores; aquí no es constante.'],[0.5,'Invertiste el cociente de los dos cambios logarítmicos.'],[4,'Confundiste elevar dos veces al cuadrado con el orden de cada paso.']], 'ln(e₂/e₁)/ln(e₁/e₀)=2; cada error es el cuadrado del anterior.');
  } else {
   const first=a/(exam?1000:100), next=0.5*first*first;
   q=calculationQuestion(`${tag}, e(n)=${first}, p=2 y C=0.5. ¿Qué error predice e(n+1)≈C e(n)^p?`,next,[[first*0.5,'Aplicaste la constante pero omitiste la potencia que define el orden.'],[first*first,'Aplicaste la potencia pero omitiste la constante de convergencia.'],[next*10,'Desplazaste una posición decimal en la multiplicación final.']],`e(n+1)≈0.5×(${first})²=${next}. El orden debe interpretarse junto con C y el error actual.`);
  }
 }
 if(!q)throw new Error('Tema no válido');
 return {...q,topic:sid,level,source:mode};
}
function expandQuizBank(bank) {
 for(const sid of Object.keys(bank)) {
  // Include numerical quotient/root coverage in the assessed propagation topic.
  const levels=sid==='s6'?['basico','intermedio','reto']:['intermedio','reto'];
  levels.forEach(level=>bank[sid].questions.push({...expandedQuestion(sid,level,'quiz'),generatorLevel:level}));
  bank[sid].total=bank[sid].questions.length;
 }
}
function balancedExam() {
 const questions=[];
 for(let topic=1;topic<=8;topic++)for(const level of ['basico','intermedio','reto']) {
  const q=expandedQuestion('s'+topic,level,'exam');
  questions.push({...q,written:Boolean(q.numeric)});
 }
 return makeAttempt(questions,[]);
}
