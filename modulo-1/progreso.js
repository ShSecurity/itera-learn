'use strict';
const PROGRESS_FORMAT='itera-learn/module-1';
const PROGRESS_VERSION=1;
function progressError(message) { throw new Error(message); }
function plainObject(value) { return value!==null && typeof value==='object' && !Array.isArray(value); }
function cleanExplanation(raw) {
 const source=document.createElement('template');source.innerHTML=raw;
 const allowed=new Set(['STRONG','EM','BR','CODE','SUP','SUB']);
 function clean(node) {
  if(node.nodeType===3)return document.createTextNode(node.textContent);
  if(node.nodeType!==1)return document.createTextNode('');
  if(!allowed.has(node.tagName))return document.createTextNode(node.textContent);
  const result=document.createElement(node.tagName.toLowerCase());node.childNodes.forEach(child=>result.append(clean(child)));return result;
 }
 const target=document.createElement('div');source.content.childNodes.forEach(node=>target.append(clean(node)));return target.innerHTML;
}
function checkedQuestion(raw) {
 if(!plainObject(raw)||typeof raw.text!=='string'||!raw.text.trim()||raw.text.length>3000||typeof raw.exp!=='string'||raw.exp.length>6000||!Array.isArray(raw.opts)||raw.opts.length!==4||!raw.opts.every(x=>typeof x==='string'&&x.length>0&&x.length<=1500)||new Set(raw.opts).size!==4||!Number.isInteger(raw.cor)||raw.cor<0||raw.cor>3)progressError('El respaldo contiene una pregunta inválida.');
 const q={text:raw.text,exp:cleanExplanation(raw.exp),opts:raw.opts.slice(),cor:raw.cor};
 for(const key of ['numeric','written','rounding'])if(raw[key]!==undefined){if(typeof raw[key]!=='boolean')progressError('Formato de respuesta inválido.');q[key]=raw[key];}
 if(raw.answer!==undefined){if(typeof raw.answer!=='number'||!Number.isFinite(raw.answer))progressError('Respuesta numérica inválida.');q.answer=raw.answer;}
 if(raw.tolerance!==undefined){if(typeof raw.tolerance!=='number'||!Number.isFinite(raw.tolerance)||raw.tolerance<0)progressError('Tolerancia inválida.');q.tolerance=raw.tolerance;}
 if(q.written&&!Number.isFinite(q.answer??Number(q.opts[q.cor])))progressError('Pregunta escrita sin solución numérica válida.');
 if(raw.topic!==undefined){if(!SECTIONS.includes(raw.topic))progressError('Tema de pregunta inválido.');q.topic=raw.topic;}
 if(raw.feedback!==undefined){if(!Array.isArray(raw.feedback)||raw.feedback.length!==4||raw.feedback.some(x=>typeof x!=='string'||x.length>2000))progressError('Pistas inválidas.');q.feedback=raw.feedback.slice();}
 for(const key of ['level','source','roundingMode','generatorLevel'])if(typeof raw[key]==='string'&&raw[key].length<40)q[key]=raw[key];
 return q;
}
function checkedAnswers(raw, questions, numeric=false) {
 if(raw===undefined)return {};
 if(!plainObject(raw))progressError('Formato de respuestas inválido.');
 const answers={};
 for(const [index,value] of Object.entries(raw)) {
  if(!/^(0|[1-9][0-9]*)$/.test(index)||Number(index)>=questions.length)progressError('Índice de respuesta fuera de rango.');
  if(numeric&&questions[index].written){if(typeof value!=='string'||value.length>120)progressError('Respuesta escrita inválida.');}
  else if(!Number.isInteger(value)||value<0||value>3)progressError('Alternativa fuera de rango.');
  answers[index]=value;
 }
 return answers;
}
function validateProgressBackup(backup) {
 if(!plainObject(backup)||backup.format!==PROGRESS_FORMAT||backup.version!==PROGRESS_VERSION||!plainObject(backup.state))progressError('El archivo no es un respaldo compatible de ITERA · Módulo 1.');
 const raw=backup.state,next={curriculumVersion:2};
 for(const sid of SECTIONS) {
  const attempt=raw['attempt_'+sid];
  if(attempt===undefined)continue;
  if(!Array.isArray(attempt)||attempt.length<1||attempt.length>30)progressError('Cantidad de preguntas de tema inválida.');
  const questions=attempt.map(checkedQuestion);next['attempt_'+sid]=questions;
  next['quiz_'+sid]=checkedAnswers(raw['quiz_'+sid],questions);
  next['quiz_sel_'+sid]=checkedAnswers(raw['quiz_sel_'+sid],questions);
  if(raw[sid+'_done']!==undefined&&typeof raw[sid+'_done']!=='boolean')progressError('Marca de avance inválida.');
  next[sid+'_done']=raw[sid+'_done']===true||questions.every((q,i)=>next['quiz_'+sid][i]===q.cor);
 }
 if(raw.examAttempt!==undefined) {
  const attempt=raw.examAttempt;
  if(!plainObject(attempt)||!Array.isArray(attempt.questions)||![15,24].includes(attempt.questions.length)||!Number.isInteger(attempt.index)||attempt.index<0||attempt.index>=attempt.questions.length||typeof attempt.submitted!=='boolean')progressError('Intento de examen inválido.');
  const questions=attempt.questions.map(checkedQuestion),answers=checkedAnswers(attempt.answers,questions,true);
  next.examAttempt={questions,index:attempt.index,answers,submitted:attempt.submitted};
  if(attempt.submitted)next.exam_score=questions.filter((q,i)=>correctExamAnswer(q,answers[i])).length;
 }
 return next;
}
function makeProgressBackup() {
 saveExam();
 return {format:PROGRESS_FORMAT,version:PROGRESS_VERSION,exportedAt:new Date().toISOString(),state:JSON.parse(JSON.stringify(state))};
}
function applyProgress(next) {
 // Store successfully before replacing the in-memory state.
 localStorage.setItem('itera-m1',JSON.stringify(next));state=next;
 for(const sid of SECTIONS){const questions=state['attempt_'+sid]||newQuiz(sid);QUIZZES[sid]={total:questions.length,questions};}
 EXAM_DATA=state.examAttempt?.questions||newExam();examIdx=state.examAttempt?.index??0;examAnswers=state.examAttempt?.answers||{};examSubmitted=state.examAttempt?.submitted??false;
 buildQuizzes();saveExam();updateProgress();
 document.getElementById('exam-results').classList.toggle('show',examSubmitted);
 document.getElementById('exam-active').style.display=examSubmitted?'none':'';
 if(examSubmitted)examShowResults(state.exam_score);else examRender();
 renderDiagnosis();showModuleView();
 renderModuleMath(document.querySelector('main'));
}
async function importProgressFile(file) {
 if(!file||file.size>1000000)throw new Error('Elige un respaldo JSON de hasta 1 MB.');
 const backup=JSON.parse(await file.text()),next=validateProgressBackup(backup);
 if(!confirm('Este respaldo reemplazará el progreso de este navegador. Exporta el actual si quieres conservarlo. ¿Importar?'))return false;
 applyProgress(next);return true;
}
function exportProgress() {
 const blob=new Blob([JSON.stringify(makeProgressBackup(),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='ITERA-Modulo-1-progreso.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 document.getElementById('progress-status').textContent='Respaldo descargado. Guárdalo para recuperar tu avance en otro navegador.';
}
function resetProgress() {
 if(!confirm('Se borrarán las respuestas y el avance del módulo 1 en este navegador. Puedes cancelar y exportar primero. ¿Reiniciar?'))return;
 try{applyProgress({curriculumVersion:2});document.getElementById('progress-status').textContent='Progreso reiniciado. Tus preferencias de tema visual se conservan.';}
 catch{document.getElementById('progress-status').textContent='No se pudo guardar el cambio. Comprueba el almacenamiento del navegador.';}
}
document.addEventListener('DOMContentLoaded',()=>{
 document.getElementById('import-progress').addEventListener('change',async event=>{try{if(await importProgressFile(event.target.files[0]))document.getElementById('progress-status').textContent='Respaldo importado.';}catch(error){document.getElementById('progress-status').textContent='No se importó: '+error.message;}finally{event.target.value='';}});
 showModuleView();
});
