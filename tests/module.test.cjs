// Run with: node tests/module.test.cjs (requires jsdom on NODE_PATH).
const {JSDOM}=require('jsdom');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('modulo-1/index.html','utf8').replace(/<script[\s\S]*?<\/script>/g,'');
const dom=new JSDOM(html,{url:'http://localhost/modulo-1/',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window;
// Combined strict eval needs explicit window bindings to match classic browser script globals.
w.HTMLMediaElement.prototype.pause=()=>{};
w.matchMedia=()=>({matches:false,addEventListener(){}});w.scrollTo=()=>{};w.confirm=()=>true;
Object.defineProperty(w.HTMLElement.prototype,'inert',{get(){return this.hasAttribute('inert')},set(value){this.toggleAttribute('inert',value)}});
w.testAssert=assert;
const source=['../assets/course/module-navigation.js','preguntas.js','banco-ampliado.js','modulo.js','mejoras.js','aprendizaje.js','progreso.js'].map(file=>fs.readFileSync('modulo-1/'+file,'utf8')+(file==='modulo.js'?'\nObject.assign(window,{calcRound,calcError,calcSig,calcProp,calcConv});\n':'')).join('\n');
w.eval(source + `
 document.dispatchEvent(new Event('DOMContentLoaded'));
 const assert = window.testAssert;
 assert.equal(SECTIONS.filter(isTopicComplete).length,0);
 assert.equal(document.getElementById('prog-label').textContent,'0 de 8 temas');
 assert.equal(document.querySelector('[data-sid="s2"]').inert,false);
 location.hash='#s8';showModuleView();
 assert.equal(document.getElementById('s8').hidden,false);
 location.hash='#exam';showModuleView();
 assert.equal(document.getElementById('exam').hidden,true);
 assert.equal(document.querySelectorAll('.learning-guide select').length,8);
 for(const sid of SECTIONS) {
   QUIZZES[sid].questions.forEach((q,qi)=>{
     q.opts.forEach((_,oi)=>{if(oi===q.cor)return;
       selectOpt(sid,qi,oi);
       const block=document.getElementById('qb-'+sid+'-'+qi);
       assert.equal(block.querySelectorAll('.opt.cor').length,0);
       assert.equal(block.querySelectorAll('.opt:disabled').length,0);
       assert.equal(block.querySelector('.fb').textContent.includes(q.exp),false);
       assert.ok(block.querySelector('.fb').textContent.length>40);
     });
   });
 }
 const originalMakeAttempt=makeAttempt;
 let practiceQuestion;
 makeAttempt=function(...args){const result=originalMakeAttempt(...args);practiceQuestion=result[0];return result;};
 const positions=new Set();
 for(let n=0;n<80;n++) {
   createPractice('s1');positions.add(practiceQuestion.cor);
   const box=document.getElementById('practice-s1');
   const wrong=(practiceQuestion.cor+1)%4;
   box.querySelectorAll('button')[wrong].click();
   assert.equal(box.querySelectorAll('button:disabled').length,0);
   assert.equal(box.querySelector('[role="status"]').innerHTML.includes(practiceQuestion.exp),false);
   box.querySelectorAll('button')[practiceQuestion.cor].click();
   assert.equal(box.querySelectorAll('button:disabled').length,4);
 }
 assert.equal(positions.size,4);
 makeAttempt=originalMakeAttempt;
 for(const [index,sid] of SECTIONS.slice().reverse().entries()) {
   state['quiz_sel_'+sid]=Object.fromEntries(QUIZZES[sid].questions.map((q,i)=>[i,q.cor]));
   submitQuiz(sid);
   assert.equal(document.querySelector('.sb-exam').inert,index<5);
   assert.equal(document.querySelector('#qbody-s8 a[href="#exam"]').hidden,index<5);
   if(index===5){
     const restored=validateProgressBackup(makeProgressBackup());
     assert.equal(restored.s8_done,true);
     assert.equal(restored.s1_done,false);
     location.hash='#exam';showModuleView();
     assert.equal(document.getElementById('exam').hidden,false);
   }
 }
 assert.equal(SECTIONS.filter(isTopicComplete).length,8);
 assert.equal(document.querySelector('.sb-exam').inert,false);
 assert.equal(correctExamAnswer({written:true,opts:['1.23456'],cor:0},'1,235'),true);
 assert.equal(correctExamAnswer({written:true,opts:['1.23456'],cor:0},'1.24'),false);
 assert.equal(correctExamAnswer({written:true,opts:['1.23456'],cor:0},''),false);
 assert.equal(correctExamAnswer({written:true,rounding:true,opts:['29.34'],cor:0},'29.35'),false);
 for (const [input,rounded,truncated] of [['3.145','3.15','3.14'],['-2.675','-2.68','-2.67']]) {
 document.getElementById('c-round-mode').value='away';document.getElementById('c-round-num').value=input;document.getElementById('c-round-dec').value='2';calcRound();
 assert.equal(document.getElementById('rr-round').textContent,rounded);
 assert.equal(document.getElementById('rr-trunc').textContent,truncated);
 }
 document.getElementById('c-xv').value='0';document.getElementById('c-xa').value='1';calcError();assert.equal(document.getElementById('re-rel').textContent,'Indefinido');
 document.getElementById('c-sig').value='0.00450';calcSig();assert.equal(document.getElementById('rs-count').textContent,'3');
 document.getElementById('c-u').value='10';document.getElementById('c-du').value='0.1';document.getElementById('c-v').value='2';document.getElementById('c-dv').value='0.02';document.getElementById('c-op').value='mul';window.calcProp();assert.ok(Math.abs(Number(document.getElementById('rp-abs').textContent)-0.4)<1e-10);
 document.getElementById('c-conv').value='0.5 0.25 0.0625 0.00390625';calcConv();assert.equal(document.getElementById('rc-p').textContent,'2.000');
 const condition=conditionResult(0.99,0.0001);assert.ok(Math.abs(condition.k-99)<1e-10);assert.equal(conditionResult(1,0.1),null);
 for(const sid of SECTIONS) for(const level of ['basico','intermedio','reto']) {document.getElementById('level-'+sid).value=level;createPractice(sid);assert.equal(document.querySelectorAll('#practice-'+sid+' button').length,4);}
 assert.ok(EXAM_DATA.every(q=>SECTIONS.includes(q.topic)));
 examAnswers=Object.fromEntries(EXAM_DATA.map((q,i)=>[i,q.written?String(q.answer??q.opts[q.cor]):q.cor]));examFinish();assert.equal(state.exam_score,24);
 assert.equal(document.querySelectorAll('#exam-diagnosis a').length,8);
 for(let n=0;n<1000;n++)for(const generate of [()=>v.round(),()=>v.error(),()=>v.error(true),()=>v.figures(),v.tolerance,()=>v.propagation('sum'),()=>v.propagation('product'),()=>v.convergence(true)]) {const q=generate();assert.equal(new Set(q.opts).size,4);assert.ok(q.cor>=0&&q.cor<4);}

 assert.equal(EXAM_DATA.length,24);
 for(const sid of SECTIONS)assert.equal(EXAM_DATA.filter(q=>q.topic===sid).length,3);
 assert.equal(examPassMark(),16);
 for (const [source,expected] of [['2.345','2.34'],['2.355','2.36'],['-2.345','-2.34'],['2.3451','2.35']]) {
  document.getElementById('c-round-mode').value='even';document.getElementById('c-round-num').value=source;document.getElementById('c-round-dec').value='2';calcRound();assert.equal(document.getElementById('rr-round').textContent,expected);
 }
 document.getElementById('c-op').value='root';document.getElementById('c-u').value='25';document.getElementById('c-du').value='0.1';document.getElementById('c-v').value='2';window.calcProp();
 assert.equal(Number(document.getElementById('rp-res').textContent),5);assert.ok(Math.abs(Number(document.getElementById('rp-abs').textContent)-0.01)<1e-12);
 assert.ok(document.querySelectorAll('#steps-prop li').length>=5);
 document.getElementById('c-op').value='div';document.getElementById('c-v').value='0.01';document.getElementById('c-dv').value='0.02';window.calcProp();assert.equal(document.getElementById('res-prop').classList.contains('show'),false);
 const backup=makeProgressBackup();const restored=validateProgressBackup(backup);assert.equal(restored.exam_score,24);
 assert.throws(()=>validateProgressBackup({version:99}));
 const invalid=JSON.parse(JSON.stringify(backup));invalid.state.examAttempt.index=999;assert.throws(()=>validateProgressBackup(invalid));
 const poisoned=JSON.parse(JSON.stringify(backup));poisoned.state.attempt_s1[0].exp='<img src=x onerror="alert(1)"><strong onclick="alert(2)">Texto</strong>';
 const cleaned=validateProgressBackup(poisoned);assert.equal(cleaned.attempt_s1[0].exp,'<strong>Texto</strong>');
 applyProgress({curriculumVersion:2});assert.equal(document.getElementById('prog-label').textContent,'0 de 8 temas');assert.equal(document.querySelectorAll('.nav-item.done').length,0);assert.equal(document.querySelector('.sb-exam').inert,true);
 applyProgress(restored);assert.equal(document.getElementById('prog-label').textContent,'8 de 8 temas');assert.equal(state.exam_score,24);
 for(let trial=0;trial<100;trial++)for(const sid of SECTIONS)for(const level of ['basico','intermedio','reto']) {
  const q=makeAttempt([expandedQuestion(sid,level,'exam')],[])[0];assert.equal(new Set(q.opts).size,4);
  if(q.answer!==undefined){assert.ok(Number.isFinite(q.answer));assert.equal(correctExamAnswer({...q,written:true},String(q.answer)),true);}
  if(q.feedback)q.opts.forEach((_,i)=>{if(i!==q.cor)assert.ok(incorrectFeedback(q,i,sid).length>20);});
 }

 const previousAttempt=QUIZZES.s1.questions;
 retryQuiz('s1');assert.equal(isTopicComplete('s1'),true);assert.notEqual(QUIZZES.s1.questions,previousAttempt);
 const renewed=validateProgressBackup(makeProgressBackup());assert.equal(renewed.s1_done,true);
 console.log('Passed: 24-question exam balance, half-even/away rounding, root and division domains, worked steps, backup validation/sanitization/reset/restore, hints, shuffle, and 10400 generated exercises.');

`);
dom.window.close();
