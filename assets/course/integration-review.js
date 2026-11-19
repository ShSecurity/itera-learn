'use strict';
(() => {
  const L = CourseLabs, originalFields = L.fields, originalRun = L.run;
  const methods = ['trap','midpoint','simpson','threeEighths','boole','romberg','legendre'];
  L.fields = method => {
    const fields = originalFields(method);
    if (methods.includes(method)) fields.push({key:'primitive', label:'Antiderivada F(x), opcional: verifica que F′=f. Vacía para omitir referencia.', value:'x^3/3', type:'text'});
    return fields;
  };
  document.addEventListener('input', event => {
    if (event.target.name === 'f') {
      const reference = event.target.form?.elements.namedItem('primitive');
      if (reference) reference.value = '';
    }
  });
  L.run = (method, values) => {
    const result = originalRun(method, values);
    if (!methods.includes(method)) return result;
    const a = Number(values.a), b = Number(values.b), n = Number(values.n), f = CourseMath.expression(values.f);
    const evaluate = count => method === 'romberg' ? CourseMath.romberg(f,a,b,count).value : method === 'legendre' ? CourseMath.gauss(f,a,b,count,method).value : CourseMath.integrate(f,a,b,count,method).value;
    const value = evaluate(n);
    const primitive = values.primitive?.trim() ? CourseMath.expression(values.primitive) : null;
    const reference = primitive ? primitive(b)-primitive(a) : null;
    const rows = [];
    // Respect each algorithm's existing documented size limits.
    const limit = method === 'romberg' ? 10 : method === 'legendre' ? 12 : 10000;
    for (let level=0; level<3; level++) {
      const count = method === 'romberg' ? n+level : n*2**level;
      if (count>limit) break;
      const estimate = level ? evaluate(count) : value;
      rows.push([count, method==='romberg' ? (b-a)/2**(count-1) : method==='legendre' ? null : (b-a)/count, estimate, reference, reference===null?null:Math.abs(estimate-reference)]);
    }
    result.refinement = {columns:[method==='romberg'?'Nivel':'n','h','Aproximación','Referencia indicada','Error absoluto'], rows};
    result.steps.push(reference===null ? 'Sin referencia analítica: el cambio al refinar no es un error exacto.' : `Referencia F(b)−F(a)=${L.format(reference)}; error absoluto=${L.format(Math.abs(value-reference))}. Comprueba que la antiderivada indicada corresponde al integrando actual; no se verifica simbólicamente.`);
    result.summary += reference===null ? '; sin referencia analítica' : `; referencia=${L.format(reference)}; error absoluto=${L.format(Math.abs(value-reference))}`;
    return result;
  };
})();
