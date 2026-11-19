'use strict';
(() => {
  const L=CourseLabs, fields=L.fields, run=L.run;
  const supported=method=>(method.startsWith('ode')&&!['odeSystem','odeBenchmark'].includes(method))||method.startsWith('cooling');
  L.fields=method=>fields(method).map(field=>supported(method)&&field.key==='tol'?{...field,value:1e-6}:field);
  document.addEventListener('input',event=>{
    if(['f','a','y0'].includes(event.target.name)){
      const reference=event.target.form?.elements.namedItem('reference');if(reference)reference.value='';
    }
  });
  L.run=(method,values)=>{
    const result=run(method,values);if(!supported(method))return result;
    const ref=values.reference?.trim()?CourseMath.expression(values.reference):null;
    const a=Number(values.a),b=Number(values.b),n=Number(values.n),adaptive=method.endsWith('RK45');
    if(ref&&Math.abs(ref(a)-Number(values.y0))>1e-6*Math.max(1,Math.abs(Number(values.y0))))throw Error('La referencia no satisface la condición inicial. Corrige y(x) o deja ese campo vacío.');
    const exact=ref?ref(b):null,rows=[];
    for(let level=0;level<3;level++){
      const steps=adaptive?n:n*2**level;if(steps>2000)break;
      const tolerance=Number(values.tol??1e-6)/4**level;
      const current=level?run(method,{...values,n:steps,...(adaptive?{tol:tolerance}:{})}):result;
      const value=current.rows.at(-1)[2];
      rows.push([adaptive?tolerance:steps,adaptive?null:(b-a)/steps,value,exact,exact===null?null:Math.abs(value-exact)]);
    }
    result.refinement={columns:[adaptive?'Tolerancia local':'n','h','y(b) calculado','Referencia y(b)','Error absoluto final'],rows};
    result.steps.push(adaptive?'Se reduce la tolerancia local por un factor de cuatro en cada ejecución. RK45 elige sus propios pasos; esto no es una malla uniforme.':'Se comparan n, 2n y 4n pasos, dentro del límite de 2000. El error global se compara al mismo tiempo final.');
    if(exact!==null)result.summary+=`; referencia y(${b})=${L.format(exact)}`;
    else result.summary+='; sin referencia analítica: no se afirma un error exacto';
    return result;
  };
})();
