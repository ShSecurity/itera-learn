
// ═══════════════════════════════════════════════════════
// DATOS: QUIZZES
// ═══════════════════════════════════════════════════════
const QUIZ_BANK = {
  's1': {
    total: 2,
    questions: [
      {
        text: '¿Cuál es la principal ventaja de los métodos numéricos frente a los métodos analíticos?',
        opts: ['Siempre producen resultados exactos','Pueden resolver problemas sin solución analítica cerrada','Son más fáciles de entender','No requieren computadoras'],
        cor: 1,
        exp: 'Los métodos numéricos son especialmente útiles cuando la solución analítica exacta es imposible o impráctica: ecuaciones no lineales complejas, integrales sin forma cerrada, sistemas muy grandes. Su desventaja es que producen soluciones <em>aproximadas</em>.'
      },
      {
        text: '¿Qué tipo de error introduce la computadora al detener una serie de Taylor después de 4 términos?',
        opts: ['Error inherente','Error de redondeo','Error de truncamiento','Error absoluto'],
        cor: 2,
        exp: 'El <strong>error de truncamiento</strong> ocurre al reemplazar un proceso matemático infinito (una serie infinita) por uno finito (4 términos). Es distinto del error de redondeo, que viene de la representación binaria de punto flotante.'
      }
    ]
  },
  's2': {
    total: 2,
    questions: [
      {
        text: 'Al redondear 3.7452 a dos decimales, el resultado es:',
        opts: ['3.74','3.75','3.7','3.745'],
        cor: 1,
        exp: 'Para redondear a 2 decimales se mira el tercer decimal: 3.74<strong>5</strong>2. Como el tercer decimal es 5, el segundo decimal sube: 3.74 → <strong>3.75</strong>.'
      },
      {
        text: '¿Qué es la cancelación catastrófica?',
        opts: ['Un error de desbordamiento en la memoria','Pérdida de cifras significativas al restar dos números casi iguales','Error cuando el número es demasiado grande','Un error en la suma de muchos términos'],
        cor: 1,
        exp: 'La cancelación catastrófica ocurre al <strong>restar dos números casi iguales</strong>: los dígitos significativos se cancelan y el resultado relativo tiene muy poca información útil. Ej: 1.0001 − 1.0000 = 0.0001 con muchas c.s. perdidas.'
      }
    ]
  },
  's3': {
    total: 3,
    questions: [
      {
        text: 'El error absoluto al aproximar √3 ≈ 1.732 (siendo √3 = 1.73205...) es:',
        opts: ['5.08 × 10⁻⁵','2.93 × 10⁻³','0.00508','5.08 × 10⁻³'],
        cor: 0,
        exp: 'E_abs = |x_v − x_a| = |1.73205... − 1.732| = 0.00005... = <strong>5.08 × 10⁻⁵</strong>. Es un error pequeño: solo la quinta cifra decimal difiere.'
      },
      {
        text: 'Si x_verdadero = 10 y x_aproximado = 9.5, el error relativo porcentual es:',
        opts: ['5%','0.5%','50%','5.26%'],
        cor: 0,
        exp: 'E_abs = |10 − 9.5| = 0.5. E_r = 0.5 / 10 = 0.05. E_% = 0.05 × 100 = <strong>5%</strong>. Nota: si usaras el valor aproximado como divisor obtendrías 5.26%, que es una medida relativa respecto al aproximado, distinta de la solicitada.'
      },
      {
        text: 'En un proceso iterativo, cuando no se conoce el valor verdadero, el error se estima como:',
        opts: ['|x_n+1 − x_n| / |x_n+1| × 100%','|x_n+1 − x_v| / |x_v|','Δx / x','x_n / x_n+1'],
        cor: 0,
        exp: 'Cuando no conocemos x_v, comparamos iteraciones consecutivas: <strong>ε_a = |x_{n+1} − x_n| / |x_{n+1}| × 100%</strong>. Este es el criterio de parada más común en métodos iterativos.'
      }
    ]
  },
  's4': {
    total: 2,
    questions: [
      {
        text: 'El error en los datos de entrada de un problema (mediciones físicas) se llama:',
        opts: ['Error de truncamiento','Error de redondeo','Error inherente','Error de propagación'],
        cor: 2,
        exp: 'El <strong>error inherente</strong> (o error de los datos) proviene de las imprecisiones que ya existen en los datos antes de comenzar el cálculo, como la incertidumbre en mediciones físicas. No lo introduce el método numérico.'
      },
      {
        text: '¿Cuál de estas es la fuente del error de redondeo en una computadora?',
        opts: ['Usar pocos términos de una serie','La representación binaria de punto flotante con precisión finita','Errores en los datos de entrada','Un algoritmo mal diseñado'],
        cor: 1,
        exp: 'Las computadoras usan <strong>punto flotante con precisión finita</strong> (ej: 64 bits en doble precisión). Muchos números decimales no tienen representación binaria exacta, generando pequeños errores de redondeo en cada operación.'
      }
    ]
  },
  's5': {
    total: 3,
    questions: [
      {
        text: '¿Cuántas cifras significativas tiene el número 0.00450?',
        opts: ['5','6','3','2'],
        cor: 2,
        exp: 'Los ceros a la izquierda del primer dígito distinto de cero NO son significativos (0.00). Los dígitos 4, 5 y el cero final SÍ son significativos porque está después del punto decimal. Total: <strong>3 cifras significativas</strong>.'
      },
      {
        text: '¿Cuántas cifras significativas tiene 1.0030 × 10³?',
        opts: ['3','4','5','2'],
        cor: 2,
        exp: '1.0030 × 10³ = 1003.0. Los cinco dígitos (1, 0, 0, 3, 0) son todos significativos: los ceros entre dígitos significativos y el cero final después del punto decimal <strong>sí son significativos</strong>. Total: <strong>5 c.s.</strong>'
      },
      {
        text: 'Según el criterio orientativo Er ≤ 0.5 × 10^(1−n), ¿cuál es el mayor n para Er=0.5%?',
        opts: ['1','2','3','4'],
        cor: 2,
        exp: 'Con Er=0.005, el mayor n que satisface el criterio indicado es <strong>3</strong>. Es un umbral orientativo, no una equivalencia con el criterio absoluto del libro.'
      }
    ]
  },
  's6': {
    total: 3,
    questions: [
      {
        text: 'Si u = 4.0 ± 0.2 y v = 3.0 ± 0.1, el error absoluto de u + v es:',
        opts: ['0.1','0.2','0.3','0.15'],
        cor: 2,
        exp: 'Para la suma/resta los errores absolutos se suman directamente: Δ(u+v) = Δu + Δv = 0.2 + 0.1 = <strong>0.3</strong>. Resultado: 7.0 ± 0.3.'
      },
      {
        text: 'El error relativo del producto u·v donde u=4.0±0.2, v=3.0±0.1 es aprox.:',
        opts: ['8.33%','5%','3.33%','11.5%'],
        cor: 0,
        exp: 'Δ(u·v)/|u·v| ≈ Δu/|u| + Δv/|v| = 0.2/4 + 0.1/3 = 0.05 + 0.0333 = 0.0833 = <strong>8.33%</strong>. Error absoluto = 0.0833 × 12 ≈ 1.0.'
      },
      {
        text: 'Si x = 3.0 ± 0.15, el error relativo de x⁴ es aproximadamente:',
        opts: ['5%','20%','15%','0.6%'],
        cor: 1,
        exp: 'Para la potencia: Δ(x^n)/|x^n| ≈ n·Δx/|x| = 4 × (0.15/3) = 4 × 0.05 = 0.20 = <strong>20%</strong>. La potencia amplifica el error relativo por el exponente.'
      }
    ]
  },
  's7': {
    total: 2,
    questions: [
      {
        text: 'Un problema está MAL condicionado cuando:',
        opts: ['El algoritmo usado es ineficiente','El número de condición κ es cercano a 1','Pequeños cambios en la entrada producen grandes cambios en la salida','La solución converge muy rápido'],
        cor: 2,
        exp: 'El mal condicionamiento (κ ≫ 1) significa que <strong>pequeñas perturbaciones en los datos se amplifican enormemente en la solución</strong>. Es una propiedad del problema, no del algoritmo: cambiar de método no lo corrige.'
      },
      {
        text: 'La mejor solución para evitar la cancelación catastrófica es:',
        opts: ['Usar más iteraciones','Reformular algebraicamente la expresión para evitar la resta','Aumentar la precisión de los datos','Redondear antes de restar'],
        cor: 1,
        exp: 'Como muestra el ejemplo de √(x+1)−√x, la solución es <strong>reformular algebricamente</strong>: 1/(√(x+1)+√x) evita la resta de números similares. Aumentar precisión ayuda pero no elimina el problema.'
      }
    ]
  },
  's8': {
    total: 3,
    questions: [
      {
        text: 'La convergencia cuadrática (p=2) se distingue porque:',
        opts: ['El error disminuye en un 50% cada iteración','El número de dígitos correctos casi se duplica por iteración','Requiere más iteraciones que la convergencia lineal','El error oscila alrededor de la solución'],
        cor: 1,
        exp: 'Con convergencia cuadrática |e_{n+1}| ≤ C·|e_n|². Si en la iteración n tienes k dígitos correctos, en la siguiente tendrás ~2k. Esto explica por qué Newton-Raphson (que es cuadrático) converge tan rápido.'
      },
      {
        text: 'Para la secuencia de errores 0.5, 0.25, 0.125, 0.0625, el orden de convergencia es:',
        opts: ['p = 2 (cuadrática)','p = 1 (lineal)','p = 0.5 (sublineal)','p = 3 (cúbica)'],
        cor: 1,
        exp: 'Cada error es exactamente la mitad del anterior: e_{n+1}/e_n = 0.5 = constante < 1. Cuando la razón entre errores consecutivos es constante, la convergencia es <strong>lineal (p=1)</strong> con C = 0.5.'
      },
      {
        text: 'Para estimar el orden de convergencia empíricamente se necesitan al menos:',
        opts: ['1 valor de error','2 valores de error','3 valores de error consecutivos','10 iteraciones'],
        cor: 2,
        exp: 'La fórmula p ≈ ln(e_{n+1}/e_n) / ln(e_n/e_{n-1}) requiere <strong>3 valores consecutivos</strong> de error (e_{n-1}, e_n, e_{n+1}), ya que calcula dos razones entre errores consecutivos.'
      }
    ]
  }
};

// ═══════════════════════════════════════════════════════
// ESTADO
// ═══════════════════════════════════════════════════════
expandQuizBank(QUIZ_BANK);
const SECTIONS = ['s1','s2','s3','s4','s5','s6','s7','s8'];
let state = loadState();
const v = questionVariants;
const quizVariants = {
  s1: [null, v.series],
  s2: [() => v.round()],
  s3: [() => v.error(), () => v.error(true)],
  s5: [() => v.figures(), () => v.figures(true), v.tolerance],
  s6: ['sum', 'product', 'power'].map(op => () => v.propagation(op)),
  s8: [null, () => v.convergence()]
};
const QUIZZES = {};
function newQuiz(sid) {
  const bank = QUIZ_BANK[sid];
  const questions = makeAttempt(bank.questions, bank.questions.map((question, index) => question.generatorLevel ? () => expandedQuestion(sid, question.generatorLevel, 'quiz') : (quizVariants[sid] || [])[index]));
  state['attempt_' + sid] = questions;
  return questions;
}
SECTIONS.forEach(sid => {
  if (!state['attempt_' + sid]) {
    delete state['quiz_' + sid];
    delete state['quiz_sel_' + sid];
    delete state[sid + '_done'];
  }
  const questions = state['attempt_' + sid] || newQuiz(sid);
  QUIZZES[sid] = { total: questions.length, questions };
});
state.curriculumVersion = 2;
if (!state.examAttempt) delete state.exam_score;
saveState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('itera-m1') || '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  } catch { return {}; }
}
function saveState() {
  try { localStorage.setItem('itera-m1', JSON.stringify(state)); } catch {}
}

// ═══════════════════════════════════════════════════════
// TEMA
// ═══════════════════════════════════════════════════════
const html = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
let dark = false;
try { dark = localStorage.getItem('itera-theme') === 'dark'; } catch {}
applyTheme();

themeBtn.addEventListener('click', () => {
  dark = !dark;
  try { localStorage.setItem('itera-theme', dark ? 'dark' : 'light'); } catch {}
  applyTheme();
  [...charts.values()].forEach(({id, title, labels, data, type, log}) => showChart(id, title, labels, data, type, log));
});

function applyTheme() {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeBtn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// ═══════════════════════════════════════════════════════
// PROGRESO
// ═══════════════════════════════════════════════════════
const INITIAL_COMPLETED_TOPICS = 0;

function isTopicComplete(sid) {
  return SECTIONS.indexOf(sid) < INITIAL_COMPLETED_TOPICS || Boolean(state[sid + '_done']);
}

function updateProgress() {
  const done = SECTIONS.filter(isTopicComplete).length;
  const pct = Math.round((done / SECTIONS.length) * 100);
  document.getElementById('main-prog').style.width = pct + '%';
  document.getElementById('prog-label').textContent = `${done} de ${SECTIONS.length} temas`;

  SECTIONS.forEach((sid, index) => {
    const chk = document.getElementById('chk-' + sid);
    const num = document.getElementById('snum-' + sid);
    const nav = document.querySelector(`[data-sid="${sid}"]`);
    if (isTopicComplete(sid)) {
      if (chk) { chk.innerHTML = '<i class="fa-solid fa-check"></i>'; }
      if (num) num.classList.add('done');
      if (nav) nav.classList.add('done');
    } else {
      if (chk) chk.textContent = String(index + 1);
      if (num) num.classList.remove('done');
      if (nav) nav.classList.remove('done');
    }
  });

  const score = state.exam_score === undefined
    ? ''
    : `Examen: ${state.exam_score}/${state.examAttempt?.questions.length || 24}`;
  ModuleNavigation.updateExamAccess(done, SECTIONS.length, score);
}

function showModuleView({ focusHeading = false } = {}) {
  const links = [...document.querySelectorAll('.sidebar a[href^="#"]')];
  const selected = links.find(link => !link.inert && link.hash === location.hash) || links[0];
  if (location.hash && selected.hash !== location.hash) history.replaceState(null, '', selected.hash);
  links.forEach(link => {
    const active = link === selected;
    document.getElementById(link.hash.slice(1)).hidden = !active;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const player = document.getElementById('module-video');
  if (selected.hash !== '#video') player.pause();

  if (focusHeading) {
    const heading = document.querySelector(selected.hash + ' h2');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function markSectionDone(sid) {
  state[sid + '_done'] = true;
  saveState();
  updateProgress();
}

// ═══════════════════════════════════════════════════════
// QUIZZES
// ═══════════════════════════════════════════════════════
function buildQuizzes(sections = SECTIONS) {
  sections.forEach(sid => {
    const data = QUIZZES[sid];
    const container = document.getElementById('qbody-' + sid);
    if (!container) return;

    const saved = state['quiz_' + sid] || {};
    const pending = state['quiz_sel_' + sid] || {};
    let html_str = '';

    data.questions.forEach((q, qi) => {
      const letters = ['A','B','C','D'];
      const answered = saved[qi] !== undefined;
      const sel = answered ? saved[qi] : pending[qi];
      const correct = sel === q.cor;

      html_str += `<div class="qblock" id="qb-${sid}-${qi}">
        <div class="qtxt"><span class="qnum">${qi+1}.</span>${escapeQuestionText(q.text)}</div>
        <div class="opts">`;

      q.opts.forEach((o, oi) => {
        let cls = 'opt';
        if (answered) {
          if (correct) cls += ' disabled';
          if (oi === sel) cls += correct ? ' cor' : ' wrn';
        } else if (oi === sel) cls += ' sel';

        html_str += `<button type="button" class="${cls}" aria-pressed="${sel === oi}" ${answered && correct ? 'disabled' : ''} onclick="selectOpt('${sid}',${qi},${oi})">
          <span class="opt-l">${letters[oi]}</span><span>${escapeQuestionText(o)}</span>
        </button>`;
      });

      html_str += `</div>`;

      if (answered) {
        const cls = correct ? 'fb cor show' : 'fb wrn show';
        const icon = correct ? 'fa-check-circle' : 'fa-times-circle';
        html_str += `<div class="${cls}" role="status"><i class="fa-solid ${icon}"></i><div>${correct ? '¡Correcto! ' : '<strong>Incorrecto.</strong> '}${correct ? q.exp : escapeQuestionText(incorrectFeedback(q, sel, sid))}</div></div>`;
      } else {
        html_str += `<div class="fb" id="fb-${sid}-${qi}"></div>`;
      }

      html_str += `</div>`;
    });

    const allDone = data.questions.every((_, qi) => saved[qi] !== undefined);
    const score = data.questions.filter((q, qi) => saved[qi] === q.cor).length;

    if (!allDone) html_str += '<p>Elige una alternativa para comprobarla. Si fallas, recibirás una pista y podrás seguir intentando sin que se revele la respuesta.</p>';

    const bannerCls = allDone ? (score === data.total ? 'qdone p show' : score >= data.total * 0.5 ? 'qdone g show' : 'qdone r show') : 'qdone';
    const bannerIcon = score === data.total ? 'fa-trophy' : score >= data.total * 0.5 ? 'fa-star-half-stroke' : 'fa-rotate-right';
    const bannerMsg = score === data.total ? 'Todas correctas. Tema completado.' : `${score}/${data.total} correctas. Revisa las pistas y cambia las alternativas incorrectas para completar el tema.`;

    html_str += `<div class="${bannerCls}" id="qdone-${sid}">
      <i class="fa-solid ${bannerIcon}"></i> ${bannerMsg}
    </div>`;

    if (allDone && score === data.total) {
      const next = ModuleNavigation.nextTopic(sid);
      html_str += `<a class="qbtn" href="#${next || 'exam'}">${next ? 'Siguiente tema' : 'Ir al examen'}</a>`;
      html_str += `<button type="button" class="qbtn" onclick="retryQuiz('${sid}')">Practicar otra evaluación (conserva avance)</button>`;
    }
    container.innerHTML = html_str;
    updateQuizBadge(sid);

    if (allDone && score === data.total) markSectionDone(sid);
  });
}

function selectOpt(sid, qi, oi) {
  const question = QUIZZES[sid]?.questions[qi];
  if (!question || !Number.isInteger(oi) || oi < 0 || oi >= question.opts.length) return;
  const saved = state['quiz_' + sid] || {};
  if (saved[qi] === question.cor) return;
  if (!state['quiz_sel_' + sid]) state['quiz_sel_' + sid] = {};
  state['quiz_sel_' + sid][qi] = oi;
  state['quiz_' + sid] = { ...saved, [qi]: oi };
  saveState();
  refreshQuiz(sid);
  document.querySelectorAll(`#qb-${sid}-${qi} .opt`)[oi]?.focus({ preventScroll: true });
}

function refreshQuiz(sid) {
  buildQuizzes([sid]);
  const container = document.getElementById('qbody-' + sid);
  renderModuleMath(container);
  container.querySelector('button:not(:disabled), a')?.focus({ preventScroll: true });
}

function submitQuiz(sid) {
  const selections = state['quiz_sel_' + sid] || {};
  if (!QUIZZES[sid].questions.every((_, qi) => selections[qi] !== undefined)) return;
  state['quiz_' + sid] = { ...selections };
  saveState();
  refreshQuiz(sid);
}

function retryQuiz(sid) {
  delete state['quiz_' + sid];
  delete state['quiz_sel_' + sid];
  QUIZZES[sid].questions = newQuiz(sid);
  saveState();
  refreshQuiz(sid);
}

function updateQuizBadge(sid) {
  const badge = document.getElementById('qbadge-' + sid);
  if (!badge) return;
  const saved = state['quiz_' + sid] || {};
  const qdata = QUIZZES[sid];
  const answered = Object.keys(saved).length;
  const score = qdata.questions.filter((q, qi) => saved[qi] === q.cor).length;
  if (answered > 0) {
    badge.textContent = `${score} / ${qdata.total}`;
    badge.style.color = score === qdata.total ? 'var(--ok)' : score >= qdata.total * 0.5 ? 'var(--warn)' : 'var(--err)';
  } else {
    badge.textContent = `0 / ${qdata.total}`;
    badge.style.removeProperty('color');
  }
}

// ═══════════════════════════════════════════════════════
// EXAMEN FINAL
// ═══════════════════════════════════════════════════════
function newExam() {
  return balancedExam();
}
function examPassMark() { return Math.ceil(EXAM_DATA.length * 2 / 3); }

let EXAM_DATA = state.examAttempt?.questions || newExam();
let examIdx = state.examAttempt?.index ?? 0;
let examAnswers = state.examAttempt?.answers || {};
let examSubmitted = state.examAttempt?.submitted ?? false;

function saveExam() {
  state.examAttempt = { questions: EXAM_DATA, index: examIdx, answers: examAnswers, submitted: examSubmitted };
  saveState();
}

function correctExamAnswer(question, answer) {
  if (!question.written) return answer === question.cor;
  const raw = String(answer ?? '').trim().replace(',', '.');
  if (!/^[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e[+-]?[0-9]+)?$/i.test(raw)) return false;
  const value = Number(raw);
  const correct = question.answer ?? Number(question.opts[question.cor]);
  const tolerance = question.tolerance ?? (question.rounding ? Math.max(Math.abs(correct) * 1e-12, 1e-12) : Math.max(Math.abs(correct) * 0.0005, 1e-12));
  return Number.isFinite(value) && Math.abs(value - correct) <= tolerance + Number.EPSILON * Math.abs(correct);
}

function examRender() {
  const q = EXAM_DATA[examIdx];
  document.getElementById('exam-rules').textContent = `${EXAM_DATA.length} preguntas. Apruebas con ${examPassMark()} aciertos. Los nuevos intentos incluyen tres preguntas por tema.`;
  const letters = ['A','B','C','D'];
  document.getElementById('exam-qn').textContent = `Pregunta ${examIdx + 1} de ${EXAM_DATA.length}`;
  document.getElementById('exam-qtxt').textContent = q.text;
  document.getElementById('exam-q-label').textContent = `Pregunta ${examIdx + 1} de ${EXAM_DATA.length}`;
  document.getElementById('exam-prog').style.width = ((examIdx + 1) / EXAM_DATA.length * 100) + '%';

  const optsEl = document.getElementById('exam-opts');
  optsEl.innerHTML = '';
  if (q.written) {
    const label = document.createElement('label');
    label.textContent = (q.unit === '%' ? 'Escribe el número porcentual sin el símbolo %. ' : '') + (q.rounding ? 'Escribe el resultado del redondeo solicitado. Se aceptan ceros finales equivalentes y coma decimal.' : 'Respuesta numérica (conserva al menos 4 cifras significativas; tolerancia ±0.05 % del valor esperado). Puedes usar coma decimal o notación científica.');
    const input = document.createElement('input');
    input.className = 'exam-number';
    input.inputMode = 'decimal';
    input.autocomplete = 'off';
    input.value = examAnswers[examIdx] ?? '';
    input.addEventListener('input', () => {
      if (input.value.trim()) examAnswers[examIdx] = input.value;
      else delete examAnswers[examIdx];
      saveExam();
    });
    label.appendChild(input);
    optsEl.appendChild(label);
  } else q.opts.forEach((o, oi) => {
    const div = document.createElement('button');
    div.type = 'button';
    div.setAttribute('aria-pressed', examAnswers[examIdx] === oi);
    div.className = 'opt' + (examAnswers[examIdx] === oi ? ' sel' : '');
    div.innerHTML = `<span class="opt-l">${letters[oi]}</span><span>${escapeQuestionText(o)}</span>`;
    if (!examSubmitted) div.onclick = () => examSelect(oi);
    optsEl.appendChild(div);
  });

  document.getElementById('exam-prev').disabled = examIdx === 0;
  const nextBtn = document.getElementById('exam-next');
  if (examIdx === EXAM_DATA.length - 1) {
    nextBtn.innerHTML = '<i class="fa-solid fa-check"></i> Finalizar';
    nextBtn.onclick = () => examFinish();
  } else {
    nextBtn.innerHTML = 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    nextBtn.onclick = () => examNav(1);
  }
}

function examSelect(oi) {
  examAnswers[examIdx] = oi;
  saveExam();
  document.querySelectorAll('#exam-opts .opt').forEach((el, i) => {
    el.classList.toggle('sel', i === oi);
    el.setAttribute('aria-pressed', i === oi);
  });
}

function examNav(dir) {
  examIdx = Math.max(0, Math.min(EXAM_DATA.length - 1, examIdx + dir));
  saveExam();
  examRender();
  document.getElementById('exam-qtxt').focus({ preventScroll: true });
}

function examFinish() {
  const unanswered = EXAM_DATA.length - Object.keys(examAnswers).length;
  if (unanswered > 0) {
    if (!confirm(`Tienes ${unanswered} pregunta(s) sin responder. ¿Finalizar de todos modos?`)) return;
  }
  examSubmitted = true;
  const score = EXAM_DATA.filter((q, i) => correctExamAnswer(q, examAnswers[i])).length;
  state.exam_score = score;
  saveExam();
  examShowResults(score);
  updateProgress();
}

function examShowResults(score) {
  document.getElementById('exam-rules').textContent = `${EXAM_DATA.length} preguntas. Umbral de aprobación: ${examPassMark()} aciertos.`;
  document.getElementById('exam-active').style.display = 'none';
  const res = document.getElementById('exam-results');
  res.classList.add('show');

  const circle = document.getElementById('score-circle');
  circle.textContent = `${score}/${EXAM_DATA.length}`;
  circle.className = 'score-circle ' + (score >= examPassMark() ? 'p' : 'f');

  document.getElementById('score-msg').textContent =
    score >= examPassMark() ? 'Módulo aprobado' : `Examen no aprobado. Necesitas al menos ${examPassMark()} aciertos.`;
  document.getElementById('score-sub').textContent = `${score} de ${EXAM_DATA.length} correctas · ${Math.round(score/EXAM_DATA.length*100)}%`;

  const reviewEl = document.getElementById('exam-review-items');
  reviewEl.innerHTML = '';
  EXAM_DATA.forEach((q, i) => {
    const ans = examAnswers[i];
    const correct = correctExamAnswer(q, ans);
    const letters = ['A','B','C','D'];
    const div = document.createElement('div');
    div.className = 'ri';
    div.innerHTML = `<div class="ri-head">
      <span class="ico ${correct ? 'ok' : 'err'}"><i class="fa-solid ${correct ? 'fa-check-circle' : 'fa-times-circle'}"></i></span>
      <span><strong>P${i+1}:</strong> ${escapeQuestionText(q.text)}</span>
    </div>
    <div class="ri-exp">
      ${!correct ? `<strong>Tu respuesta:</strong> <span class="review-answer"></span><br>
      <strong>Correcta:</strong> ${q.written ? '' : letters[q.cor] + ') '} ${escapeQuestionText(q.opts[q.cor])}<br><br>` : ''}
      <strong>Explicación:</strong> ${q.exp}
    </div>`;
    if (!correct) div.querySelector('.review-answer').textContent =
      ans === undefined ? 'Sin responder' : q.written ? ans : letters[ans] + ') ' + q.opts[ans];
    reviewEl.appendChild(div);
  });

  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(res, {
      delimiters: [{left:'\\(',right:'\\)',display:false},{left:'\\[',right:'\\]',display:true}]
    });
  }
}

function examReset() {
  EXAM_DATA = newExam();
  examIdx = 0;
  examAnswers = {};
  examSubmitted = false;
  delete state.exam_score;
  saveExam();
  document.getElementById('exam-results').classList.remove('show');
  document.getElementById('exam-active').style.display = '';
  document.getElementById('sb-score').textContent = '';
  examRender();
  updateProgress();
}

// ═══════════════════════════════════════════════════════
// CALCULADORAS
// ═══════════════════════════════════════════════════════
function calcRound() {
  const raw = document.getElementById('c-round-num').value.trim().replace(',', '.');
  const num = readNumber('c-round-num');
  const dec = readNumber('c-round-dec');
  if (!Number.isFinite(num) || !Number.isInteger(dec) || dec < 0 || dec > 10) {
    return calcFeedback('round', 'Ingresa un número y entre 0 y 10 decimales enteros.');
  }

  const [coefficient, exponent = '0'] = raw.toLowerCase().split('e');
  const [whole, fraction = ''] = coefficient.replace(/^[-+]/, '').split('.');
  const digits = BigInt((whole + fraction) || '0');
  const shift = Number(exponent) - fraction.length + dec;
  // Separar dígitos evita que el punto flotante cambie un empate decimal.
  if (!Number.isInteger(shift) || Math.abs(shift) > 1000) {
    return calcFeedback('round', 'Usa un exponente decimal entre −900 y 900.');
  }
  const divisor = 10n ** BigInt(Math.max(0, -shift));
  const scaled = digits * 10n ** BigInt(Math.max(0, shift));
  const quotient = scaled / divisor;
  const sign = raw.startsWith('-') ? -1n : 1n;
  const truncated = Number((sign * quotient) + 'e-' + dec);
  const remainder = scaled % divisor;
  const mode = document.getElementById('c-round-mode').value;
  const increment = 2n * remainder > divisor || (2n * remainder === divisor && (mode === 'away' || quotient % 2n !== 0n));
  const rounded = Number((sign * (quotient + (increment ? 1n : 0n))) + 'e-' + dec);
  if (!Number.isFinite(rounded)) return calcFeedback('round', 'El resultado excede el rango numérico.');
  calcFeedback('round');
  const etrunc = Math.abs(num - truncated);
  const eround = Math.abs(num - rounded);

  document.getElementById('rr-orig').textContent = num;
  document.getElementById('rr-trunc').textContent = truncated.toFixed(dec);
  document.getElementById('rr-round').textContent = rounded.toFixed(dec);
  document.getElementById('rr-etrunc').textContent = etrunc.toExponential(4);
  document.getElementById('rr-eround').textContent = eround.toExponential(4);
  document.getElementById('res-round').classList.add('show');
  showChart('round', 'Error absoluto por método', ['Truncamiento', 'Redondeo'], [etrunc, eround]);
}

function calcError() {
  const xv = readNumber('c-xv');
  const xa = readNumber('c-xa');
  const eabs = Math.abs(xv - xa);
  if (!Number.isFinite(eabs)) return calcFeedback('err', 'Ingresa dos valores finitos cuya diferencia sea representable.');
  const erel = xv === 0 ? undefined : eabs / Math.abs(xv);
  calcFeedback('err', xv === 0 ? 'El error relativo y el porcentual quedan indefinidos porque el valor verdadero es cero.' :
    eabs === 0 ? 'Los valores coinciden.' : '', true);
  document.getElementById('re-abs').textContent = eabs.toExponential(6);
  document.getElementById('re-rel').textContent = formatRelative(erel);
  document.getElementById('re-pct').textContent = formatRelative(erel, true);
  document.getElementById('re-dig').textContent = eabs === 0 ? 'Coincidencia exacta' :
    Math.max(0, Math.floor(Math.log10(0.5) - Math.log10(eabs))) + ' según el umbral 0.5 × 10⁻ⁿ';
  document.getElementById('res-err').classList.add('show');
  showChart('err', 'Valores comparados', ['Verdadero', 'Aproximado'], [xv, xa]);
}

function calcSig() {
  const raw = document.getElementById('c-sig').value.trim().replace(',', '.');
  const match = raw.match(/^[+-]?([0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e[+-]?[0-9]+)?$/i);
  const num = Number(raw);
  if (!match || !Number.isFinite(num)) return calcFeedback('sig', 'Ingresa un número decimal o en notación científica.');
  const coefficient = match[1];
  const allDigits = coefficient.replace('.', '');
  const significant = allDigits.replace(/^0+/, '');
  if (num === 0) return calcFeedback('sig', 'Usa un valor distinto de cero para estimar la precisión relativa.');
  const sigDigits = coefficient.includes('.') || /e/i.test(raw) ? significant : significant.replace(/0+$/, '');
  const sigFigs = sigDigits.length;
  if (sigFigs > 15) return calcFeedback('sig', 'Usa hasta 15 cifras significativas para la precisión de esta calculadora.');
  calcFeedback('sig', !coefficient.includes('.') && !/e/i.test(raw) && /0$/.test(coefficient) ?
    'Se omiten los ceros finales del entero. Usa notación científica para indicar cuáles cuentan.' : '', true);

  const erel = 0.5 * Math.pow(10, 1 - sigFigs);
  const sci = num.toExponential(sigFigs - 1);

  document.getElementById('rs-count').textContent = sigFigs;
  document.getElementById('rs-er').textContent = Number((erel * 100).toPrecision(4)) + '%';
  document.getElementById('rs-sci').textContent = sci;
  document.getElementById('rs-digits').textContent = sigDigits.split('').join(', ');
  document.getElementById('res-sig').classList.add('show');
  showChart('sig', 'Cifras del coeficiente', ['Significativas', 'Omitidas'], [sigFigs, allDigits.length - sigFigs]);
}

function readNumber(id) {
  const raw = document.getElementById(id).value.trim().replace(',', '.');
  return /^[+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e[+-]?[0-9]+)?$/i.test(raw) ? Number(raw) : NaN;
}

function formatRelative(value, percent = false) {
  const scaled = percent ? value * 100 : value;
  return Number.isFinite(scaled) ? (percent ? scaled.toPrecision(4) + '%' : scaled.toExponential(4)) :
    value === undefined ? 'Indefinido' : 'Fuera de rango';
}

const charts = new Map();

function calcFeedback(id, message = '', keepResult = false) {
  const status = document.getElementById('status-' + id);
  status.textContent = message;
  status.hidden = !message;
  if (message && !keepResult) {
    document.getElementById('res-' + id).classList.remove('show');
    charts.get(id)?.chart?.destroy();
    charts.delete(id);
    document.getElementById('chart-' + id).hidden = true;
  }
}

function showChart(id, title, labels, data, type = 'bar', log = false) {
  const wrap = document.getElementById('chart-' + id);
  charts.get(id)?.chart?.destroy();
  wrap.hidden = false;
  const canvas = wrap.querySelector('canvas');
  const caption = wrap.querySelector('figcaption');
  caption.textContent = title;
  if (typeof Chart === 'undefined') {
    caption.textContent += ' · Gráfico no disponible. Consulta los valores de arriba.';
    return;
  }
  const colors = getComputedStyle(document.documentElement);
  const accent = colors.getPropertyValue('--accent').trim();
  const axis = { ticks: { color: colors.getPropertyValue('--ink-2').trim() },
    grid: { color: colors.getPropertyValue('--line').trim() } };
  const chart = new Chart(canvas, {
    type,
    data: { labels, datasets: [{ label: title, data, borderColor: accent, backgroundColor: accent,
      borderRadius: 5, pointRadius: 4, pointHoverRadius: 7 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 550 },
      interaction: { mode: 'nearest', intersect: false },
      scales: { x: axis, y: { ...axis, type: log ? 'logarithmic' : 'linear', beginAtZero: !log } },
      plugins: { legend: { display: false } }
    }
  });
  charts.set(id, { id, title, labels, data, type, log, chart });
}

function calcProp() {
  const op = document.getElementById('c-op').value;
  const u = readNumber('c-u');
  const du = readNumber('c-du');
  const v = readNumber('c-v');
  const dv = ['pow','root'].includes(op) ? 0 : readNumber('c-dv');
  if (![u, v, du, dv].every(Number.isFinite) || du < 0 || dv < 0) {
    return calcFeedback('prop', 'Ingresa valores finitos e incertidumbres iguales o mayores que cero.');
  }
  if (op === 'div' && Math.abs(v) <= dv) {
    return calcFeedback('prop', 'El intervalo del denominador incluye cero. Ajusta v o Δv.');
  }
  if (op === 'pow' && (!Number.isInteger(v) && u - du <= 0 || v < 0 && Math.abs(u) <= du)) {
    return calcFeedback('prop', 'La potencia no está definida en todo el intervalo de la base.');
  }
  if (op === 'root' && (!Number.isInteger(v) || v < 2 || u - du <= 0)) {
    return calcFeedback('prop', 'Usa un índice entero n ≥ 2 y un intervalo del radicando estrictamente positivo para la estimación de primer orden.');
  }
  const operations = {
    add: () => [u + v, du, dv],
    sub: () => [u - v, du, dv],
    mul: () => [u * v, Math.abs(v) * du, Math.abs(u) * dv],
    div: () => [u / v, du / Math.abs(v), Math.abs(u / v) * (dv / Math.abs(v))],
    root: () => [u ** (1/v), (1/v) * u ** (1/v-1) * du, 0],
    pow: () => [u ** v, v === 0 ? 0 : du === 0 ? 0 : Math.abs(v * u ** (v - 1)) * du, 0]
  };
  const [res, contributionU, contributionV] = operations[op]();
  const eabs = contributionU + contributionV;
  if (![res, eabs, res - eabs, res + eabs].every(Number.isFinite)) {
    return calcFeedback('prop', 'El resultado o la incertidumbre exceden el rango numérico.');
  }
  const erel = res === 0 ? undefined : eabs / Math.abs(res);
  calcFeedback('prop', op === 'add' || op === 'sub' ? '' :
    'Estimación de primer orden. Úsala cuando las incertidumbres sean pequeñas.', true);
  document.getElementById('rp-res').textContent = res.toPrecision(6);
  document.getElementById('rp-abs').textContent = eabs.toExponential(4);
  document.getElementById('rp-rel').textContent = formatRelative(erel);
  document.getElementById('rp-pct').textContent = formatRelative(erel, true);
  document.getElementById('rp-full').textContent = `${res.toPrecision(5)} ± ${eabs.toPrecision(3)}`;
  document.getElementById('res-prop').classList.add('show');
  showChart('prop', 'Aportes al error absoluto', ['pow','root'].includes(op) ? ['Base', 'Total'] : ['Δu', 'Δv', 'Total'],
    ['pow','root'].includes(op) ? [contributionU, eabs] : [contributionU, contributionV, eabs]);
}

function calcConv() {
  const errors = document.getElementById('c-conv').value.trim().split(/\s+/).map(raw => Number(raw.replace(',', '.')));
  if (errors.length < 3 || errors.length > 200 || errors.some(value => !Number.isFinite(value) || value <= 0)) {
    return calcFeedback('conv', 'Ingresa entre 3 y 200 errores positivos, separados por espacios o saltos de línea.');
  }
  const logs = errors.map(Math.log);
  const orders = [];
  for (let i = 1; i < logs.length - 1; i++) {
    const order = (logs[i + 1] - logs[i]) / (logs[i] - logs[i - 1]);
    if (Number.isFinite(order)) orders.push(order);
  }
  const decreasing = errors.every((error, i) => i === 0 || error < errors[i - 1]);
  const avgP = orders.length && decreasing ? orders.reduce((sum, order) => sum + order, 0) / orders.length : NaN;
  const factor = Math.exp(logs.at(-1) - avgP * logs.at(-2));
  let type = 'Sin estimación';
  if (Number.isFinite(avgP)) {
    if (Math.abs(avgP - 1) < 0.05) type = factor < 1 ? 'Lineal (p ≈ 1)' : 'Sin convergencia lineal certificada';
    else if (Math.abs(avgP - 2) < 0.05) type = 'Cuadrática (p ≈ 2)';
    else if (Math.abs(avgP - 3) < 0.05) type = 'Cúbica (p ≈ 3)';
    else type = avgP < 1 ? 'Sublineal' : 'Superlineal';
  }
  calcFeedback('conv', decreasing ? '' : 'La secuencia no es estrictamente decreciente. Se muestra la gráfica sin estimar el orden.', true);
  document.getElementById('rc-p').textContent = Number.isFinite(avgP) ? avgP.toFixed(3) : '—';
  document.getElementById('rc-type').textContent = type;
  document.getElementById('rc-c').textContent = Number.isFinite(factor) ? factor.toPrecision(4) : '—';
  document.getElementById('res-conv').classList.add('show');
  showChart('conv', 'Error por iteración (escala logarítmica)', errors.map((_, index) => 'n=' + index), errors, 'line', true);
}

// Update v label for power
document.getElementById('c-op').addEventListener('change', function() {
  const lbl = document.getElementById('c-v-label');
  const dvField = document.getElementById('c-dv-field');
  if (['pow','root'].includes(this.value)) {
    lbl.textContent = this.value === 'root' ? '(índice n de la raíz)' : '(exponente n)';
    dvField.style.visibility = 'hidden';
  } else {
    lbl.textContent = '';
    dvField.style.visibility = 'visible';
  }
});

// ═══════════════════════════════════════════════════════
// INICIALIZAR
// ═══════════════════════════════════════════════════════
function renderModuleMath(root) {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(root, {
      delimiters: [
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ],
      throwOnError: false
    });
  }
}

ModuleNavigation.organizeTopics();
document.addEventListener('DOMContentLoaded', () => {
  const examples = {"round": {"ids": ["c-round-num", "c-round-dec"], "values": ["3.145", "2"]}, "err": {"ids": ["c-xv", "c-xa"], "values": ["3.14159265", "3.14"]}, "sig": {"ids": ["c-sig"], "values": ["0.00450"]}, "prop": {"ids": ["c-u", "c-du", "c-v", "c-dv"], "values": ["3", "0.1", "2", "0.05"]}, "conv": {"ids": ["c-conv"], "values": ["0.5\n0.25\n0.125\n0.0625"]}};
  document.querySelectorAll('[data-example]').forEach(button => {
    button.addEventListener('click', () => {
      const example = examples[button.dataset.example];
      example.ids.forEach((id, index) => {
        document.getElementById(id).value = example.values[index];
      });
      if (button.dataset.example === 'prop') {
        const op = document.getElementById('c-op');
        op.value = 'mul';
        op.dispatchEvent(new Event('change'));
      }
      button.previousElementSibling.click();
    });
  });
  buildQuizzes();
  if (examSubmitted) examShowResults(state.exam_score);
  else examRender();
  saveExam();
  updateProgress();

  renderModuleMath(document.body);
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('topics-btn').setAttribute('aria-expanded', 'false');
      if (link.hash === location.hash) showModuleView({ focusHeading: true });
    });
  });

  showModuleView();
  window.addEventListener('hashchange', () => showModuleView({ focusHeading: true }));
});
