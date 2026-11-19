function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function numericQuestion(text, answer, distractors, exp, format = String) {
  const correct = format(answer);
  const options = new Set([correct, ...distractors.map(format)]);
  for (let multiplier = 2; options.size < 4; multiplier++) {
    options.add(format(answer * multiplier));
  }
  return { text, numeric: true, opts: [...options].slice(0, 4), cor: 0, exp: exp + ' <strong>' + correct + '</strong>.' };
}

const questionVariants = {
  series() {
    const terms = randomInt(2, 12);
    return {
      text: `¿Qué tipo de error se introduce al aproximar una serie infinita de Taylor con solo ${terms} términos?`,
      opts: ['Error inherente', 'Error de redondeo', 'Error de truncamiento', 'Error absoluto'],
      cor: 2,
      exp: 'El error de truncamiento surge al reemplazar una serie infinita por una suma finita.'
    };
  },
  round(significant = false) {
    const digits = randomInt(1, 3);
    const whole = significant ? randomInt(1, 9) : randomInt(1, 29);
    const scale = 10 ** digits;
    const retained = whole * scale + randomInt(0, scale - 2);
    const next = randomInt(1, 9);
    const source = ((retained * 10 + next) / (scale * 10)).toFixed(digits + 1);
    const result = retained + Number(next >= 5);
    const target = significant ? `${digits + 1} cifras significativas` : `${digits} decimales`;
    const format = value => (value / scale).toFixed(digits);
    return { ...numericQuestion(`Redondea ${source} a ${target}; en empate, aléjate de cero.`, result,
      [result - 1, result + 1, result + 2], `Con la regla indicada y primera cifra descartada ${next}, el resultado es`, format), rounding: true };
  },
  error(relative = false) {
    const exact = randomInt(11, 49);
    const percent = randomInt(2, 19);
    const distance = exact * percent;
    const approx = (exact * 100 + distance * (randomInt(0, 1) ? 1 : -1)) / 100;
    if (relative) {
      return numericQuestion(`Si el valor verdadero es ${exact} y el aproximado es ${approx}, ¿cuál es el error relativo porcentual?`,
        percent, [percent / 10, percent * 10, percent + 1],
        `Se divide |${exact} − ${approx}| entre |${exact}| y se multiplica por 100. El resultado es`, value => value + '%');
    }
    return numericQuestion(`Si el valor verdadero es ${exact} y el aproximado es ${approx}, ¿cuál es el error absoluto?`,
      distance / 100, [distance / 10, distance / 1000, approx],
      `Se calcula |${exact} − ${approx}|. El resultado es`, value => value.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''));
  },
  figures(scientific = false) {
    const count = randomInt(2, 6);
    const leading = randomInt(1, 4);
    const digits = String(randomInt(1, 9)) + Array.from({ length: count - 2 }, () => randomInt(0, 9)).join('') + '0';
    const value = scientific ? `${digits[0]}.${digits.slice(1)} × 10^${randomInt(1, 9)}` : '0.' + '0'.repeat(leading) + digits;
    return numericQuestion(`¿Cuántas cifras significativas tiene ${value}?`, count, [count - 1, count + 1, count + 2],
      'Los ceros iniciales no cuentan. El cero final tras el punto sí cuenta. El total es');
  },
  tolerance() {
    const count = randomInt(2, 6);
    const percent = (50 * 10 ** (1 - count)).toFixed(count - 2);
    return numericQuestion(`Con el criterio Eᵣ ≤ 0.5 × 10^(1−n), ¿cuál es el mayor n que satisface un error de ${percent}%?`,
      count, [count - 1, count + 1, count + 2], 'Al expresar el porcentaje como fracción e igualarlo al umbral, n vale');
  },
  propagation(operation) {
    const u = randomInt(2, 9);
    const v = randomInt(2, 9);
    const a = randomInt(1, 4);
    const b = randomInt(5, 9);
    const du = u * a / 100;
    const dv = v * b / 100;
    if (operation === 'sum') {
      return numericQuestion(`Si u = ${u} ± ${du} y v = ${v} ± ${dv}, ¿cuál es la cota del error absoluto de u + v?`,
        du + dv, [du, dv, Math.abs(du - dv)], `Se suman las incertidumbres ${du} + ${dv}. La cota es`, value => value.toFixed(2));
    }
    if (operation === 'product') {
      return numericQuestion(`Si u = ${u} ± ${du} y v = ${v} ± ${dv}, ¿cuál es el error relativo porcentual del producto a primer orden?`,
        a + b, [a, b, b - a], `Se suman ${a}% y ${b}%. El resultado es`, value => value + '%');
    }
    return numericQuestion(`Si x = ${u} ± ${du}, ¿cuál es el error relativo porcentual de x^${v} a primer orden?`,
      a * v, [a, a * v + a, a * v + v], `Se multiplica ${a}% por el exponente ${v}. El resultado es`, value => value + '%');
  },
  convergence(quadratic = false) {
    const base = randomInt(2, 8) / 10;
    const order = quadratic ? 2 : 1;
    const errors = Array.from({ length: 4 }, (_, i) => Number((base ** (quadratic ? 2 ** i : i + 1)).toPrecision(8)));
    return numericQuestion(`¿Qué orden de convergencia siguen estos errores consecutivos: ${errors.join(', ')}?`,
      order, [order === 1 ? 2 : 1, 1.5, 3],
      quadratic ? 'Cada error es el cuadrado del anterior. Por tanto, p =' : `La razón entre errores es constante (${base}). Por tanto, p =`);
  }
};

function makeAttempt(bank, variants) {
  return shuffle(bank.map((original, index) => {
    const question = variants[index] ? variants[index]() : original;
    const order = shuffle(question.opts.map((_, option) => option));
    return { ...original, ...question, opts: order.map(option => question.opts[option]), cor: order.indexOf(question.cor), feedback: question.feedback ? order.map(option => question.feedback[option]) : undefined };
  }));
}

// Hints explain the selected distractor without exposing the answer or its position.
function incorrectFeedback(question, option, sid) {
  if (question.feedback?.[option]) return question.feedback[option] + ' Vuelve a intentarlo.';
  const selected = question.opts[option];
  const specific = {
    'Siempre producen resultados exactos': 'La aritmética finita y la detención de procesos iterativos pueden introducir aproximaciones; esa afirmación promete exactitud en todos los casos.',
    'Son más fáciles de entender': 'La facilidad depende del problema y del método; no es una ventaja general garantizada.',
    'No requieren computadoras': 'Poder efectuar operaciones a mano no explica la utilidad de estos métodos para problemas complejos.',
    'Error inherente': 'Esta categoría se refiere a imprecisiones que ya vienen en los datos de entrada. Comprueba si el enunciado habla de datos o de una operación del método.',
    'Error de redondeo': 'Esta categoría aparece al representar números con precisión finita. Revisa si el enunciado limita dígitos o limita pasos de un proceso.',
    'Error de truncamiento': 'Esta categoría requiere sustituir un proceso matemático por una versión finita. Revisa si eso es lo que sucede en el enunciado.',
    'Error absoluto': 'Esto es una medida de la diferencia entre valores; el enunciado pide identificar el origen del error.',
    'Error de propagación': 'La propagación describe cómo se transmite una incertidumbre al operar; no identifica cómo se originó la incertidumbre de una medición.',
    'Un error de desbordamiento en la memoria': 'El desbordamiento se refiere a límites de representación o almacenamiento; no explica la pérdida de información en una resta.',
    'Error cuando el número es demasiado grande': 'El tamaño excesivo del número puede causar desbordamiento; aquí debes analizar la operación y la precisión que conserva.',
    'Un error en la suma de muchos términos': 'Acumular errores en una suma es otro fenómeno. Revisa qué operación describe la cancelación.',
    'Usar pocos términos de una serie': 'Aquí se limita un proceso matemático. No explica por qué una computadora no puede representar ciertos números exactamente.',
    'Errores en los datos de entrada': 'La incertidumbre de los datos existe antes de ejecutar el cálculo; no explica una limitación de la representación numérica.',
    'Un algoritmo mal diseñado': 'Puede causar otros problemas numéricos, pero la limitación indicada también existe en algoritmos bien diseñados.',
    'El algoritmo usado es ineficiente': 'La eficiencia mide recursos o tiempo; el condicionamiento analiza la sensibilidad del problema a perturbaciones.',
    'El número de condición κ es cercano a 1': 'Una amplificación relativa cercana a la unidad no justifica describir una gran sensibilidad.',
    'La solución converge muy rápido': 'La rapidez de una iteración no determina la sensibilidad del problema frente a cambios en sus datos.',
    'Usar más iteraciones': 'Repetir un cálculo no recupera automáticamente los dígitos perdidos en una operación.',
    'Aumentar la precisión de los datos': 'Puede reducir el efecto, pero mantiene la operación que causa la pérdida de dígitos; no elimina su mecanismo.',
    'Redondear antes de restar': 'Eliminar dígitos antes de operar puede agravar la pérdida de información.',
    'El error disminuye en un 50% cada iteración': 'Un porcentaje fijo describe una razón constante. Comprueba si eso caracteriza el orden solicitado.',
    'Requiere más iteraciones que la convergencia lineal': 'El número de iteraciones depende también de constantes y errores iniciales; no define el orden.',
    'El error oscila alrededor de la solución': 'El cambio de signo no determina la rapidez con la que disminuye la magnitud del error.',
    '1 valor de error': 'Un solo dato no permite comparar cómo cambia el error entre iteraciones.',
    '2 valores de error': 'Dos datos solo permiten formar una razón; el estimador del orden compara razones consecutivas.',
    '|x_n+1 − x_v| / |x_v|': 'La expresión necesita el valor verdadero, que en este caso se declara desconocido. No puedes usarlo para estimar el error entre iteraciones.',
    'Δx / x': 'La escritura no identifica qué iteraciones se comparan, no asegura una magnitud no negativa y no expresa el porcentaje solicitado.',
    'x_n / x_n+1': 'El cociente de valores no mide cuánto cambió la aproximación: falta comparar su diferencia.',
    '10 iteraciones': 'Puede convenir usar muchos datos para validar el régimen, pero no es el mínimo exigido por la fórmula.',
    'Sí, siempre': 'Un residuo pequeño por sí solo no controla la amplificación causada por datos sensibles.',
    'Sí, si hay más de diez iteraciones': 'Un número fijo de iteraciones no garantiza precisión ni controla la sensibilidad a los datos.',
    'Solo depende del lenguaje usado': 'Cambiar de lenguaje no modifica la sensibilidad matemática del problema.',
    'Se eliminan todos los errores': 'La resta no elimina los errores previos de sus operandos; pueden dominar un resultado pequeño.',
    'Se introduce exclusivamente error inherente': 'El enunciado ya indica errores de representación; no son exclusivamente incertidumbres de los datos originales.',
    'La resta siempre conserva la precisión relativa': 'Si el resultado es pequeño frente a los operandos, los errores previos pueden resultar grandes en proporción a él.',
    'Siempre cuatro': 'Los ceros finales de un entero sin contexto no declaran por sí solos esa precisión.',
    'Siempre tres': 'La escritura del entero no permite decidir cuáles de sus ceros finales expresan precisión.',
    'Ninguna cifra es significativa': 'La ambigüedad de los ceros finales no elimina la información de los dígitos distintos de cero.'
  };
  if (specific[selected]) return specific[selected] + ' Vuelve a intentarlo.';
  if (question.rounding) return 'La opción no cumple el redondeo solicitado. Comprueba cuántas posiciones se conservan, si el descarte es un empate exacto y qué regla se declaró. No elimines ni cambies más posiciones de las necesarias. Vuelve a intentarlo.';
  if (/mayor n|criterio Eᵣ/i.test(question.text)) {
    const picked=Number(selected), expected=Number(question.opts[question.cor]);
    return picked>expected ? 'La cantidad de cifras propuesta exige un umbral más pequeño que el error dado. Convierte primero el porcentaje a fracción y comprueba la desigualdad. Vuelve a intentarlo.' : 'La cantidad propuesta puede satisfacer la desigualdad, pero no es la máxima que pide el enunciado. Revisa el siguiente valor de n sin confundir porcentaje y fracción. Vuelve a intentarlo.';
  }
  const numeric = value => Number(String(value).replace('%','').replace(',', '.'));
  const chosen = numeric(selected), expected = numeric(question.opts[question.cor]);
  if (Number.isFinite(chosen) && Number.isFinite(expected)) {
    const direction = chosen > expected ? 'sobreestima' : 'subestima';
    if (/cifras significativas tiene|cuántas cifras/i.test(question.text) && !/criterio|error|confiables/i.test(question.text))
      return chosen > expected ? 'Estás contando más cifras de las que declara la escritura. Revisa los ceros iniciales y el papel del exponente; no representan cifras adicionales. Intenta otra alternativa.' : 'Estás omitiendo cifras que la escritura conserva. Revisa los ceros interiores y los finales tras el punto decimal. Intenta otra alternativa.';
    const hints = {
      s2:'Revisa la posición que debes conservar y la primera cifra descartada; no confundas truncar con redondear.',
      s3:'Comprueba la resta en valor absoluto, el divisor solicitado y si debes convertir a porcentaje.',
      s5:'Convierte el porcentaje a fracción y comprueba el umbral del criterio para la cantidad de cifras propuesta.',
      s6:'Comprueba si se pide error absoluto o relativo y si has incluido las contribuciones de todos los datos inciertos.',
      s7:'Comprueba la derivada y el cociente de sensibilidad relativa, evaluados en la entrada indicada.',
      s8:'Compara las razones de errores consecutivos; no deduzcas el orden solo por su tamaño.'
    };
    return `La alternativa elegida ${direction} la cantidad solicitada. ${hints[sid] || 'Revisa las unidades y el procedimiento.'} Vuelve a intentarlo.`;
  }
  if (sid === 's3') return 'La expresión elegida no representa la comparación entre iteraciones consecutivas con la normalización solicitada. Revisa qué valores están disponibles y las unidades. Vuelve a intentarlo.';
  return 'La alternativa elegida no cumple el criterio del enunciado. Comprueba las hipótesis de esa afirmación y compáralas con los datos antes de intentarlo otra vez.';
}

function escapeQuestionText(value) {
 return String(value).replace(/[&<>"']/g, character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
