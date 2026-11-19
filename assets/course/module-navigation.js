'use strict';

const ModuleNavigation = (() => {
  const current = document.body.dataset.module;
  const titles = [
    'Errores numéricos',
    'Ecuaciones no lineales',
    'Sistemas lineales',
    'Ajuste e interpolación',
    'Integración y diferenciación',
    'Ecuaciones diferenciales',
    'Optimización numérica',
    'Implementación y validación'
  ];
  const topicGroups = {
    1: [
      ['Representación de aproximaciones', [1, 2]],
      ['Medición y origen del error', [3, 4, 5]],
      ['Propagación, sensibilidad y convergencia', [6, 7, 8]]
    ],
    2: [
      ['Planteamiento y localización de raíces', [1, 2]],
      ['Métodos cerrados o de intervalo', [3, 4]],
      ['Métodos abiertos y polinomios', [5, 6, 7, 8, 9, 10]],
      ['Sistemas no lineales y aplicaciones', [11, 12]]
    ],
    3: [
      ['Matrices y diagnóstico', [1, 2]],
      ['Eliminación y métodos iterativos', [3, 4]],
      ['Factorización y sistemas tridiagonales', [5, 6]],
      ['Valores propios y aplicaciones', [7, 8]]
    ],
    4: [
      ['Fundamentos', [1, 2]],
      ['Regresión y transformación de modelos', [3, 4, 5, 6]],
      ['Interpolación', [7]],
      ['Aplicaciones de ingeniería', [8]]
    ],
    5: [
      ['Integración en una variable', [1, 2, 3]],
      ['Integración en varias variables', [4]],
      ['Diferenciación numérica', [5, 6]],
      ['Aplicaciones de ingeniería', [7]]
    ],
    6: [
      ['Fundamentos de EDO', [1, 2]],
      ['Problemas de valor inicial', [3, 4]],
      ['Problemas de valor en la frontera', [5]],
      ['Ecuaciones en derivadas parciales', [6]],
      ['Aplicaciones de ingeniería', [7]]
    ],
    7: [
      ['Conceptos de óptimo', [1]],
      ['Optimización sin restricciones', [2, 3]],
      ['Mínimos cuadrados no lineales', [4]],
      ['Optimización lineal con restricciones', [5]],
      ['Aplicaciones de ingeniería', [6]]
    ],
    8: [
      ['Representación de datos', [1]],
      ['Implementación de algoritmos', [2]],
      ['Pruebas y validación', [3]],
      ['Procesamiento de datos y simulación', [4]]
    ]
  };
  const groups = topicGroups[current];
  const topicOrder = groups.flatMap(([, topics]) => topics.map(number => `s${number}`));
  const menu = document.createElement('details');
  menu.className = 'module-switcher';
  const toggle = document.createElement('summary');
  const label = document.createElement('span');
  const title = document.createElement('em');
  title.textContent = titles[Number(current) - 1];
  label.append(`Módulo ${current} · `, title);
  toggle.setAttribute('aria-label', `Cambiar de módulo. ${label.textContent}`);
  const chevron = document.createElement('i');
  chevron.className = 'fa-solid fa-chevron-down';
  chevron.setAttribute('aria-hidden', 'true');
  toggle.append(label, chevron);

  const links = document.createElement('nav');
  links.className = 'module-switcher-links';
  links.setAttribute('aria-label', 'Módulos del curso');
  titles.forEach((title, index) => {
    const id = String(index + 1);
    const active = id === current;
    const item = document.createElement(active ? 'span' : 'a');
    item.className = active ? 'nav-item active' : 'nav-item';
    if (active) item.setAttribute('aria-current', 'page');
    else item.href = `../modulo-${id}/index.html`;
    const number = document.createElement('span');
    number.className = 'nav-chk';
    number.textContent = id;
    item.append(number, title);
    links.append(item);
  });
  menu.append(toggle, links);
  document.querySelector('.htitle').replaceWith(menu);

  menu.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !menu.open) return;
    event.preventDefault();
    menu.open = false;
    toggle.focus();
  });
  menu.addEventListener('focusout', event => {
    if (!menu.contains(event.relatedTarget)) menu.open = false;
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  menu.addEventListener('toggle', () => {
    if (menu.open) document.getElementById('topics-btn').setAttribute('aria-expanded', 'false');
  });
  window.addEventListener('pageshow', () => { menu.open = false; });

  function organizeTopics() {
    const sidebar = document.getElementById('module-topics');
    const organized = document.createDocumentFragment();
    groups.forEach(([name, topics], index) => {
      const group = document.createElement('div');
      group.className = 'sb-topic-group';
      group.setAttribute('role', 'group');
      const heading = document.createElement('h2');
      heading.className = 'sb-topic-label';
      heading.id = `topic-group-${index + 1}`;
      heading.textContent = name;
      group.setAttribute('aria-labelledby', heading.id);
      group.append(heading);
      topics.forEach(number => group.append(sidebar.querySelector(`a[href="#s${number}"]`)));
      organized.append(group);
    });
    sidebar.firstElementChild.after(organized);
  }

  function nextTopic(sid) {
    return topicOrder[topicOrder.indexOf(sid) + 1];
  }

  function updateExamAccess(completed, total, score = '') {
    const required = Math.ceil(total * 0.75);
    const remaining = Math.max(0, required - completed);
    const locked = remaining > 0;
    const examLink = document.querySelector('.sb-exam');
    examLink.toggleAttribute('inert', locked);
    examLink.classList.toggle('locked', locked);
    document.querySelectorAll('main a.qbtn[href="#exam"]').forEach(link => {
      link.hidden = locked;
    });
    document.getElementById('sb-score').textContent = locked
      ? `Completa ${required} de ${total} temas (75 % como mínimo). ${remaining === 1 ? 'Falta 1 tema.' : `Faltan ${remaining} temas.`}`
      : score;
  }

  return { organizeTopics, nextTopic, updateExamAccess };
})();
