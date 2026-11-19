'use strict';
(()=>{
  const totals=[8,12,8,8,7,7,6,4];
  const names=['Errores numéricos','Ecuaciones no lineales','Sistemas lineales','Ajuste e interpolación','Integración y diferenciación','Ecuaciones diferenciales','Optimización','Implementación y validación'];
  function read(id){try{const value=JSON.parse(localStorage.getItem('itera-m'+id)||'{}');return value&&typeof value==='object'?value:{};}catch{return {};}}
  function update(){
    const modules=totals.map((total,i)=>{const state=read(i+1),done=Array.from({length:total},(_,j)=>i===0?state['s'+(j+1)+'_done']===true:state.done?.[j]===true);return{state,done,count:done.filter(Boolean).length,total};});
    const completed=modules.reduce((sum,m)=>sum+m.count,0),full=modules.filter(m=>m.count===m.total).length,pct=Math.round(completed/60*100);
    const next=modules.findIndex(m=>m.count<m.total),id=next<0?8:next+1,m=modules[id-1];
    const topic=m.done.findIndex(done=>!done)+1;
    const href=`modulo-${id}/index.html${topic?'#s'+topic:'#exam'}`;
    const started=completed>0||modules.some(m=>Array.isArray(m.state.quizzes)&&m.state.quizzes.some(q=>q&&Object.keys(q.answers||{}).length>0));
    document.getElementById('pp-ring').style.setProperty('--p',pct);
    document.getElementById('pp-pct').textContent=pct+'%';
    document.getElementById('completed-lessons').replaceChildren(document.createTextNode(completed),Object.assign(document.createElement('small'),{textContent:'/ 60'}));
    document.getElementById('completed-modules').replaceChildren(document.createTextNode(full),Object.assign(document.createElement('small'),{textContent:'/ 8'}));
    document.getElementById('course-progress-title').textContent=next<0?'Completaste todos los temas':`Módulo ${id} · ${names[id-1]}`;
    document.getElementById('pp-sub').textContent=next<0?'Puedes volver a los módulos para practicar y completar sus exámenes.':`${completed} de 60 temas completados. ${started?'Continúa con tu siguiente evaluación.':'Empieza con los fundamentos y avanza a tu ritmo.'}`;
    const dots=document.getElementById('pp-dots');dots.replaceChildren();
    modules.forEach((module,i)=>{const a=document.createElement('a');a.href=`modulo-${i+1}/index.html`;a.textContent=i+1;a.className=module.count===module.total?'complete':module.count?'started':'';a.title=`Módulo ${i+1}: ${module.count}/${module.total} temas`;a.setAttribute('aria-label',a.title);dots.append(a);});
    for(const selector of ['#pp-btn','#hero-cta']){const a=document.querySelector(selector);a.href=href;a.querySelector('span').textContent=next<0?'Repasar el curso':started?'Continuar aprendiendo':'Empezar mi recorrido';}
    const header=document.getElementById('header-cta');header.href=href;header.textContent=started?`Continuar (${pct}%)`:'Empezar a aprender';
    const mobile=document.querySelector('.nav-foot a');mobile.href=href;mobile.firstChild.textContent=started?'Continuar aprendiendo ':'Empezar a aprender ';
    const m1=modules[0];document.getElementById('card-bar-fill').style.width=100*m1.count/8+'%';document.getElementById('card-bar-text').textContent=m1.count?`${m1.count} de 8 secciones`:'Sin empezar';
    modules.slice(1).forEach((module,i)=>{const id=i+2;document.querySelector(`[data-course-bar="${id}"]`).style.width=100*module.count/module.total+'%';document.querySelector(`[data-course-progress="${id}"]`).textContent=module.count?`${module.count} de ${module.total} temas`:'Sin empezar';});
    const status=document.querySelector('.local-status');try{const probe='itera-home-storage-check';localStorage.setItem(probe,'1');localStorage.removeItem(probe);}catch{status.textContent='El guardado no está disponible en este navegador';}
  }
  update();addEventListener('pageshow',update);addEventListener('storage',update);

  // A deterministic Newton sequence: no canvas, dependency, or per-frame JS loop.
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),card=document.querySelector('.convergence-card'),toggle=document.getElementById('motion-toggle');
  const values=[1];for(let i=0;i<4;i++)values.push((values[i]+2/values[i])/2);
  let step=0,timer,paused=reduced.matches,inView=false;
  function frame(){const x=values[step];document.getElementById('iteration-number').textContent=String(step).padStart(2,'0');document.getElementById('iteration-value').textContent=x.toFixed(8);document.getElementById('iteration-error').textContent=Math.abs(x-Math.SQRT2).toExponential(2);document.getElementById('iteration-point').setAttribute('cx',60+196*x);document.querySelectorAll('.iteration-track i').forEach((dot,i)=>dot.classList.toggle('active',i<=step));}
  function schedule(){clearInterval(timer);card.classList.toggle('motion-paused',paused||!inView||document.hidden);if(!paused&&inView&&!document.hidden)timer=setInterval(()=>{step=(step+1)%values.length;frame();},2300);}
  function label(){toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Reproducir demostración':'Pausar demostración');toggle.querySelector('span').textContent=paused?'Reproducir':'Pausar';toggle.querySelector('i').className=paused?'fa-solid fa-play':'fa-solid fa-pause';}
  toggle.onclick=()=>{paused=!paused;label();schedule();};
  reduced.addEventListener('change',()=>{paused=reduced.matches;label();schedule();});
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(card);
  document.addEventListener('visibilitychange',schedule);frame();label();
  // Suspend decorative SVG motion when its section is off screen.
  const scene=document.querySelector('.scene');let sceneVisible=false;
  function syncScene(){const active=sceneVisible&&!reduced.matches&&!document.hidden;scene.querySelectorAll('*').forEach(el=>el.style.animationPlayState=active?'running':'paused');if(active)scene.unpauseAnimations();else scene.pauseAnimations();}
  new IntersectionObserver(entries=>{sceneVisible=entries[0].isIntersecting;syncScene();}).observe(scene);
  reduced.addEventListener('change',syncScene);document.addEventListener('visibilitychange',syncScene);
})();
