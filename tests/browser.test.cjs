const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser=await chromium.launch({...(require('node:fs').existsSync(edge)?{executablePath:edge}:{}),headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/fonts.googleapis.com|fonts.gstatic.com/,route=>route.abort());
await page.goto('http://localhost:8000/modulo-1/');await page.waitForSelector('#level-s1');
assert.equal(await page.locator('#prog-label').innerText(),'0 de 8 temas');
assert.equal(await page.evaluate(()=>typeof Chart==='function' && typeof renderMathInElement==='function' && typeof Prism==='object'),true);
await page.locator('#theme-btn').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.locator('#theme-btn').click();
await page.locator('#qbody-s1 .opt').first().focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#qbody-s1 .opt').first().getAttribute('aria-pressed'),'true');
await page.locator('#level-s1').selectOption('reto');await page.locator('#s1 .learning-guide button').click();assert.equal(await page.locator('#practice-s1 button').count(),4);
await page.evaluate(()=>{for(const sid of SECTIONS){state['quiz_sel_'+sid]=Object.fromEntries(QUIZZES[sid].questions.map((q,i)=>[i,q.cor]));submitQuiz(sid);}});
await page.goto('http://localhost:8000/modulo-1/#s7');await page.locator('#condition-x').fill('0.99');await page.locator('#s7 .learning-guide button').last().click();assert.match(await page.locator('#condition-result').innerText(),/99/);
await page.screenshot({path:require('node:path').join(require('node:os').tmpdir(),'itera-desktop.png'),fullPage:true});
await page.setViewportSize({width:390,height:844});await page.reload();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:require('node:path').join(require('node:os').tmpdir(),'itera-mobile.png'),fullPage:true});
const switcher=page.locator('.module-switcher');
const moduleToggle=switcher.locator('summary');
assert.match(await moduleToggle.innerText(),/Módulo 1/);
await moduleToggle.focus();await page.keyboard.press('Enter');
assert.equal(await switcher.locator('.nav-item').count(),8);
assert.match(await switcher.locator('[aria-current="page"]').innerText(),/Errores numéricos/);
await page.keyboard.press('Escape');
assert.equal(await switcher.getAttribute('open'),null);
await moduleToggle.click();
await switcher.getByRole('link',{name:/Implementación y validación/}).click();
await page.waitForURL('**/modulo-8/index.html#s1');
assert.match(await moduleToggle.innerText(),/Módulo 8/);
await page.goBack();
assert.match(await moduleToggle.innerText(),/Módulo 1/);
assert.equal(await switcher.getAttribute('open'),null);
// Back up a completed module, cancel and confirm reset, and restore through the file input.
await page.evaluate(()=>{location.hash='#progress';});
await page.waitForSelector('#export-progress',{state:'visible'});
const downloadEvent=page.waitForEvent('download');await page.locator('#export-progress').click();const download=await downloadEvent;
const backupPath=require('node:path').join(require('node:os').tmpdir(),'itera-progress-test.json');await download.saveAs(backupPath);
page.once('dialog',dialog=>dialog.dismiss());await page.locator('#reset-progress').click();assert.equal(await page.locator('#prog-label').innerText(),'8 de 8 temas');
page.once('dialog',dialog=>dialog.accept());await page.locator('#reset-progress').click();assert.equal(await page.locator('#prog-label').innerText(),'0 de 8 temas');
await page.locator('#import-progress').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{"wrong":true}')});
await page.waitForFunction(()=>document.getElementById('progress-status').textContent.includes('No se importó'));
assert.equal(await page.locator('#prog-label').innerText(),'0 de 8 temas');
page.once('dialog',dialog=>dialog.accept());await page.locator('#import-progress').setInputFiles(backupPath);await page.waitForFunction(()=>document.getElementById('progress-status').textContent.includes('Respaldo importado'));
assert.equal(await page.locator('#prog-label').innerText(),'8 de 8 temas');
await page.reload();assert.equal(await page.locator('#prog-label').innerText(),'8 de 8 temas');
// Review all views in two common mobile widths. Every formula must render without a KaTeX parse error.
for(const width of [390,768,1440]) {
 await page.setViewportSize({width,height:900});
 for(const id of ['s1','s2','s3','s4','s5','s6','s7','s8','exam','formulas','progress']) {
  await page.evaluate(id=>{location.hash='#'+id;},id);
  await page.waitForFunction(id=>!document.getElementById(id).hidden,id);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,'overflow '+id+' at '+width);
 }
}
assert.equal(await page.locator('.katex-error').count(),0);
await page.evaluate(()=>{location.hash='#s6';});await page.waitForSelector('#c-op',{state:'visible'});
await page.locator('#c-op').selectOption('root');await page.locator('#c-u').fill('25');await page.locator('#c-du').fill('0.1');await page.locator('#c-v').fill('2');await page.locator('#s6 .cbtn').click();
assert.equal(await page.locator('#rp-res').innerText(),'5.00000');assert.match(await page.locator('#steps-prop').innerText(),/sin linealizar/);
await page.locator('#steps-prop').scrollIntoViewIfNeeded();await page.screenshot({path:require('node:path').join(require('node:os').tmpdir(),'itera-root-desktop.png')});
await page.setViewportSize({width:390,height:844});await page.locator('#steps-prop').scrollIntoViewIfNeeded();await page.screenshot({path:require('node:path').join(require('node:os').tmpdir(),'itera-root-mobile.png')});
// All local libraries loaded; simulate loss of network after loading.
await page.context().setOffline(true);await page.evaluate(()=>{document.getElementById('c-xv').value='10';document.getElementById('c-xa').value='9';calcError();});assert.equal(await page.locator('#re-pct').innerText(),'10.00%');
assert.deepEqual(errors,[]);console.log('Browser checks passed: 11 views at 390/768/1440px, keyboard, roots, no formula errors, export/import/reset dialogs, persisted restore, offline calculation and no JS errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
