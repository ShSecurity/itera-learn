'use strict';
// Shared learning tools. No network calls or changes to saved course progress.
document.addEventListener('DOMContentLoaded', () => {
  const moduleId = Number(document.body.dataset.module || 0);
  const make = (tag, text) => { const e = document.createElement(tag); e.textContent = text; return e; };
  const storageKey = 'itera-results-' + moduleId;
  let history = [];
  try { history = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (!Array.isArray(history)) history = []; history=history.filter(e=>e&&typeof e.date==='string'&&typeof e.method==='string'&&typeof e.result==='string'&&e.inputs&&typeof e.inputs==='object').slice(-50); } catch { history=[]; }
  function download(text, name, type) {
    const url = URL.createObjectURL(new Blob(['\uFEFF', text], {type}));
    const a = document.createElement('a'); a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function csv(rows) {
    return rows.map(row => row.map(value => {
      let text = String(value ?? '');
      // Prevent spreadsheet formula execution in exported text cells.
      if (/^[=+@-]/.test(text) && !/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(text)) text = "'" + text;
      return '"' + text.replaceAll('"', '""') + '"';
    }).join(',')).join('\r\n');
  }
  let panel;
  function renderHistory() {
    if (!panel) return;
    panel.replaceChildren(make('summary', 'Historial de resultados de este módulo'));
    panel.append(make('p', 'Se guardan hasta 50 cálculos en este navegador. No acredita una evaluación.'));
    const list = make('ol', '');
    for (const entry of history.slice().reverse()) {
      const li = make('li', `${entry.date} · ${entry.method} · ${entry.result}`);
      const details = make('details', ''); details.append(make('summary', 'Datos utilizados'), make('pre', JSON.stringify(entry.inputs, null, 2))); li.append(details); list.append(li);
    }
    panel.append(history.length ? list : make('p', 'Aún no hay cálculos guardados.'));
    const exp = make('button', 'Descargar historial CSV'); exp.type = 'button'; exp.className = 'qbtn'; exp.disabled = !history.length;
    exp.onclick = () => download(csv([['Fecha','Método','Resultado','Datos'], ...history.map(e => [e.date,e.method,e.result,JSON.stringify(e.inputs)])]), `historial-modulo-${moduleId}.csv`, 'text/csv;charset=utf-8');
    const clear = make('button', 'Borrar historial'); clear.type = 'button'; clear.className = 'qbtn';
    clear.onclick = () => { if (confirm('¿Borrar únicamente el historial de cálculos de este módulo?')) { history = []; try { localStorage.removeItem(storageKey); } catch {} renderHistory(); } };
    panel.append(exp, clear);
  }
  if (moduleId) {
    panel = make('details', ''); panel.className = 'learning-guide'; document.querySelector('main').prepend(panel); renderHistory();
    document.addEventListener('submit', event => {
      const form = event.target;
      if (!form.matches('.course-fields')) return;
      const output = form.nextElementSibling;
      if (!output?.querySelector('h4') || output.querySelector('[role="alert"]')) return;
      const select = form.parentElement.querySelector('select');
      history.push({date: new Date().toLocaleString('es-PE'), method: select?.selectedOptions[0]?.textContent || 'Cálculo', inputs: Object.fromEntries(new FormData(form)), result: output.querySelector('h4').textContent});
      history = history.slice(-50); try { localStorage.setItem(storageKey, JSON.stringify(history)); } catch {} renderHistory();
    });
  }
  function addExports() {
    document.querySelectorAll('main table:not([data-csv-ready])').forEach(table => {
      table.dataset.csvReady = 'true';
      const button = make('button', 'Descargar tabla CSV'); button.type = 'button'; button.className = 'qbtn';
      button.onclick = () => download(csv(table.dataset.csvRows ? JSON.parse(table.dataset.csvRows) : [...table.rows].map(r => [...r.cells].map(c => c.textContent.trim()))), `modulo-${moduleId}-tabla.csv`, 'text/csv;charset=utf-8');
      table.after(button);
    });
  }
  addExports(); new MutationObserver(addExports).observe(document.querySelector('main'), {childList:true, subtree:true});
  if (moduleId === 1) document.querySelectorAll('.cres').forEach(result => {
    const button = make('button','Descargar resultado CSV'); button.type='button';button.className='qbtn';
    button.disabled=!result.classList.contains('show');new MutationObserver(()=>{button.disabled=!result.classList.contains('show');}).observe(result,{attributes:true,attributeFilter:['class']});
    button.onclick = () => download(csv([['Magnitud','Valor'],...[...result.querySelectorAll('.rrow')].map(row=>[row.querySelector('.rl')?.textContent,row.querySelector('.rv')?.textContent])]),'modulo-1-resultado.csv','text/csv;charset=utf-8');
    result.after(button);
  });
  const optional = {2:[8,9,10,11],3:[6,7],5:[2,3,4],6:[4,5,6],7:[1,2,3,4,5,6],8:[1,2,3,4]};
  for (const number of optional[moduleId] || []) {
    const section = document.getElementById('s'+number), note = make('p', 'Ampliación opcional · Estudia primero los métodos exigidos por la guía.');
    note.className = 'learning-guide'; section?.querySelector('.lesson-content')?.prepend(note);
    const link = document.querySelector(`#module-topics a[href="#s${number}"]`);
    if (link) (link.querySelector('span:last-child') || link).append(make('small', ' · Opcional'));
  }
  if (moduleId === 3) document.querySelector('#s5 .lesson-content')?.prepend(make('p','LU pertenece a la ruta principal. Cholesky es una ampliación opcional para matrices simétricas definidas positivas.'));
  if (moduleId === 5) document.querySelector('#s1 .lesson-content')?.prepend(make('p','Trapecio y Simpson pertenecen a la ruta principal. Romberg y las reglas adicionales son ampliaciones opcionales.'));
  document.querySelectorAll('.lesson-content').forEach(content => {
    const summary = make('aside',''); summary.className = 'learning-guide';
    const objective = [...content.querySelectorAll('h3')].find(h=>h.textContent==='Al terminar podrás…')?.parentElement.querySelector('p')?.textContent;
    const example = content.querySelector('.ex-res')?.textContent;
    summary.append(make('h3','Resumen del tema'),make('p',objective || 'Relaciona el método con sus condiciones y comprueba el resultado.'),make('p',example || 'Revisa el ejemplo resuelto y distingue el resultado del error o su cota.'),make('p','Antes de continuar: identifica las condiciones del método, interpreta el resultado y comprueba su precisión con una referencia o criterio adecuado.'));
    content.append(summary);
  });
  document.querySelectorAll('code.language-python').forEach(code=>{
    const button=make('button','Descargar código Python');button.type='button';button.className='qbtn';
    button.onclick=()=>download(code.textContent,`modulo-${moduleId}-${code.id||'referencia'}.py`,'text/plain;charset=utf-8');code.closest('pre').after(button);
  });
  if(moduleId===2){
    const guide=make('aside','');guide.className='learning-guide';guide.append(make('h3','Caso base: bisección y Newton'),make('p','Resuelve f(x)=x³−x−2 con tolerancia 10⁻⁶. En [1,2], f(1)=−2 y f(2)=4; la función es continua y f′(x)=3x²−1>0: hay una única raíz en ese intervalo.'),make('p','Bisección: el primer punto medio es 1.5 y f(1.5)=−0.125; el siguiente intervalo es [1.5,2]. La cota geométrica y el residuo miden aspectos distintos.'),make('p','Newton: desde x₀=1.5, x₁=1.5−(−0.125)/5.75≈1.5217391304. Comprueba tanto el incremento como el residuo. La referencia de la raíz es aproximadamente 1.5213797068; los dígitos mostrados no constituyen una cota.'),make('p','Prueba también [2,3] en bisección, una derivada nula en Newton y un máximo de una iteración. Explica por qué no alcanzar el criterio no demuestra ausencia de raíces.'));
    document.querySelector('#s3 .lesson-content')?.prepend(guide);
    const link=make('a','Comparar con Newton');link.href='#s5';link.className='qbtn';guide.append(link);
  }
  if (moduleId === 1) {
    document.addEventListener('click', event => {
      const button = event.target.closest('.calc button'); if (!button) return;
      const calc = button.closest('.calc');
      const result = calc.querySelector('.cres.show, #condition-result'); if (!result) return;
      const inputs = Object.fromEntries([...calc.querySelectorAll('input,select,textarea')].map(e => [e.id,e.value]));
      history.push({date:new Date().toLocaleString('es-PE'),method:calc.querySelector('.calc-head')?.textContent || 'Calculadora',inputs,result:result.textContent.trim().replace(/\s+/g,' ')});
      history=history.slice(-50);try{localStorage.setItem(storageKey,JSON.stringify(history));}catch{}renderHistory();
    });
  }
  const footer = make('aside', ''); footer.className = 'learning-guide';
  footer.append(make('p','Versión G3-2026.11.19 · Revisión del contenido: 19/11/2026.'));
  const book = make('a', 'Libro base y licencia de la editorial'); book.href = 'https://puertomaderoeditorial.com.ar/index.php/pmea/es/catalog/book/81'; book.target = '_blank'; book.rel = 'noopener';
  footer.append(make('p', 'Referencia: Cabrera Escobar, J. O., Orozco Cantos, L., y Cabrera Escobar, R. V. (2024). Métodos numéricos. Puerto Madero Editorial Académica. Licencia del libro: CC BY-NC-SA 4.0. El PDF se conserva sin modificaciones.'), book);
  document.querySelector('main').append(footer);
});
