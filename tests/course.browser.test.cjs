'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
(async()=>{const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',browser=await chromium.launch({headless:true,...(fs.existsSync(edge)?{executablePath:edge}:{})});const context=await browser.newContext({viewport:{width:1440,height:900}});await context.route(/fonts.googleapis.com|fonts.gstatic.com/,route=>route.abort());const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));let labs=0;
for(const id of [2,3,4,5]){
 await context.setOffline(false);await page.goto(`http://localhost:8000/modulo-${id}/`);await page.waitForSelector('#quiz-0');const n={2:12,3:8,4:8,5:7}[id];assert.equal(await page.locator('#prog-label').innerText(),`0 de ${n} temas`);
 await page.evaluate(()=>localStorage.setItem('itera-m1-test-marker','untouched'));
 const required=Math.ceil(n*0.75);
 const topicOrder={2:[1,2,3,4,5,6,7,8,9,10,11,12],3:[1,2,3,4,5,6,7,8]}[id]||Array.from({length:n},(_,i)=>i+1);
 assert.deepEqual(await page.locator('.sb-topic-group a').evaluateAll(links=>links.map(link=>Number(link.hash.slice(2)))),topicOrder);
 await page.evaluate(()=>{location.hash='#s2';});await page.waitForSelector('#s2:not([hidden])');
 await page.evaluate(()=>{location.hash='#exam';});await page.waitForSelector('#s1:not([hidden])');
 const first=await page.evaluate(()=>ITERA.getState().quizzes[0].questions[0]);await page.locator(`#quiz-0 [data-choice="0-${(first.correct+1)%4}"]`).click();assert.equal(await page.locator('#quiz-0 .qblock').first().locator('.cor').count(),0);assert.equal(await page.locator('#quiz-0 .qblock').first().locator('button:disabled').count(),0);
 for(let i=n-1;i>=0;i--){
  await page.evaluate(i=>{location.hash='#s'+(i+1);},i);await page.waitForSelector(`#s${i+1}:not([hidden])`);
  for(let j=0;j<3;j++){const correct=await page.evaluate(([i,j])=>ITERA.getState().quizzes[i].questions[j].correct,[i,j]);await page.locator(`#quiz-${i} [data-choice="${j}-${correct}"]`).click();}
  const next=topicOrder[topicOrder.indexOf(i+1)+1];
  assert.equal(await page.locator(`#quiz-${i} a.qbtn`).getAttribute('href'),next?'#s'+next:'#exam');
  assert.equal(await page.locator('.sb-exam').getAttribute('inert')!==null,n-i<required);
  if(i===n-1){
   await page.reload();await page.waitForSelector(`#s${n}:not([hidden])`);
   assert.equal(await page.locator('#prog-label').innerText(),`1 de ${n} temas`);
  }
  if(n-i===required){
   await page.locator('.sb-exam').click();await page.waitForSelector('#exam:not([hidden])');
   await page.locator(`[data-topic="${i}"]`).click();await page.waitForSelector(`#s${i+1}:not([hidden])`);
  }
  const method=page.locator('#method-'+i),methods=await method.locator('option').evaluateAll(options=>options.map(o=>o.value));
  for(const value of methods){await method.selectOption(value);await page.locator(`#lab-${i} button[type="submit"]`).click();assert.equal(await page.locator(`#output-${i} [role="alert"]`).count(),0,`module ${id} topic ${i} method ${value}`);assert.ok((await page.locator(`#output-${i} h4`).first().innerText()).length>0);labs++;}
 }
 assert.equal(await page.locator('#prog-label').innerText(),`${n} de ${n} temas`);
 // Wrong practice selections keep every alternative available; a correct selection finishes it.
 await page.evaluate(()=>{location.hash='#s1';const orig=CourseData.question;CourseData.question=(...args)=>{const q=orig(...args);window.__practice=q;return q;};});await page.waitForSelector('#s1:not([hidden])');
 for(const level of ['basico','intermedio','reto']){await page.locator('#level-0').selectOption(level);await page.locator('#s1 .learning-guide').filter({has:page.locator('#level-0')}).getByRole('button',{name:'Generar ejercicio'}).click();const q=await page.evaluate(()=>window.__practice);await page.locator('#practice-0 .opt').nth((q.correct+1)%4).click();assert.equal(await page.locator('#practice-0 button:disabled').count(),0);assert.equal((await page.locator('#practice-0').innerText()).includes(q.exp),false);await page.locator('#practice-0 .opt').nth(q.correct).click();assert.equal(await page.locator('#practice-0 button:disabled').count(),4);}
 await page.locator('#level-0').selectOption('intermedio');await page.locator('#mode-0').selectOption('written');await page.locator('#s1 .learning-guide').filter({has:page.locator('#level-0')}).getByRole('button',{name:'Generar ejercicio'}).click();const numeric=await page.evaluate(()=>window.__practice);await page.locator('#practice-0 input').fill(String(numeric.answer));await page.locator('#practice-0').getByRole('button',{name:'Comprobar'}).click();assert.match(await page.locator('#practice-0').innerText(),/Correcto/);
 // Complete the balanced examination through its actual controls.
 await page.evaluate(()=>{location.hash='#exam';});await page.waitForSelector('#exam:not([hidden])');const exam=await page.evaluate(()=>ITERA.getState().exam.questions);assert.equal(exam.length,n*3);for(let i=0;i<n;i++)assert.equal(exam.filter(q=>q.topic===i).length,3);
 for(let i=0;i<exam.length;i++){const q=exam[i];if(q.numeric)await page.locator('#exam-body input').fill(String(q.answer));else await page.locator('#exam-body .opts button').nth(q.correct).click();await page.locator('#exam-body .course-actions button').last().click();}
 assert.match(await page.locator('#exam-body h3').first().innerText(),new RegExp(`${n*3}/${n*3}`));
 // Real download, cancel reset, reset, reject cross-module file and restore the saved state.
 await page.evaluate(()=>{location.hash='#progress';});await page.waitForSelector('#progress:not([hidden])');const download=page.waitForEvent('download');await page.getByRole('button',{name:'Exportar progreso',exact:true}).click();const file=path.join(os.tmpdir(),`itera-module-${id}-backup.json`);await(await download).saveAs(file);
 page.once('dialog',dialog=>dialog.dismiss());await page.getByRole('button',{name:'Reiniciar este módulo'}).click();assert.equal(await page.locator('#prog-label').innerText(),`${n} de ${n} temas`);
 page.once('dialog',dialog=>dialog.accept());await page.getByRole('button',{name:'Reiniciar este módulo'}).click();assert.equal(await page.locator('#prog-label').innerText(),`0 de ${n} temas`);assert.equal(await page.evaluate(()=>localStorage.getItem('itera-m1-test-marker')),'untouched');
 const invalid=JSON.parse(fs.readFileSync(file,'utf8'));invalid.module=99;await page.locator('#import-progress').setInputFiles({name:'other.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(invalid))});await page.waitForFunction(()=>document.getElementById('progress-status').textContent.includes('No se importó'));
 page.once('dialog',dialog=>dialog.accept());await page.locator('#import-progress').setInputFiles(file);await page.waitForFunction(()=>document.getElementById('progress-status').textContent==='Respaldo importado.');await page.reload();assert.equal(await page.locator('#prog-label').innerText(),`${n} de ${n} temas`);
 for(const width of [390,768,1440]){await page.setViewportSize({width,height:900});for(const target of ['s1','s'+n,'exam','formulas','progress']){await page.evaluate(target=>{location.hash='#'+target;},target);await page.waitForFunction(target=>!document.getElementById(target).hidden,target);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`overflow ${id} ${target} width ${width}`);}}
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{location.hash='#s1';});await page.waitForSelector('#s1:not([hidden])');await page.locator('#topics-btn').click();assert.equal(await page.locator('#module-topics').isVisible(),true);await page.locator('#module-topics a[href="#formulas"]').click();assert.equal(await page.locator('#module-topics').isVisible(),false);
 await page.evaluate(()=>{location.hash='#s1';});await page.waitForSelector('#s1:not([hidden])');await page.locator('#lab-0 button[type="submit"]').click();await page.locator('#output-0').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(os.tmpdir(),`itera-module-${id}-mobile.png`)});
 await page.setViewportSize({width:1440,height:900});await page.locator('#output-0').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(os.tmpdir(),`itera-module-${id}-desktop.png`)});
 await context.setOffline(true);await page.locator('#lab-0 button[type="submit"]').click();assert.equal(await page.locator('#output-0 [role="alert"]').count(),0);
 console.log('Module',id,'passed: all topics, labs, feedback, practice, written exam, persistence, backups, 3 viewport widths and offline calculation.');
}
await context.setOffline(false);await page.goto('http://localhost:8000/');for(let id=2;id<=5;id++){assert.equal(await page.locator(`[data-module="${id}"] a.card-cta`).count(),1);assert.match(await page.locator(`[data-course-progress="${id}"]`).innerText(),/de/);}assert.deepEqual(errors,[]);console.log(`${labs} calculator runs passed; no JavaScript errors. Module 1 unchanged by course state.`);await browser.close();
})().catch(error=>{console.error(error);process.exit(1);});
