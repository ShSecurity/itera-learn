const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
 const browser=await chromium.launch({headless:true,...(fs.existsSync(edge)?{executablePath:edge}:{})});
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/fonts.googleapis.com|fonts.gstatic.com/,r=>r.abort());
 await page.goto('http://localhost:8000/');
 assert.equal(await page.locator('[data-count="sections"]').textContent(),'60');
 assert.ok(Number(await page.locator('[data-count="topics"]').textContent())>0);
 for(const id of [1,2,3,4,5,6,7,8]){
  await page.goto(`http://localhost:8000/modulo-${id}/`);
  const titles=await page.locator('.lesson-content').count();
  assert.equal(await page.getByRole('heading',{name:'Resumen del tema',exact:true,includeHidden:true}).count(),titles);
  if([2,3].includes(id))assert.deepEqual(await page.locator('.sb-topic-group a').evaluateAll(a=>a.map(x=>Number(x.hash.slice(2)))),Array.from({length:id===2?12:8},(_,i)=>i+1));
  assert.ok((await page.getByText('Historial de resultados de este módulo',{exact:true}).count())===1);
  await page.setViewportSize({width:375,height:812});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow module '+id);
 }
 await page.goto('http://localhost:8000/modulo-2/#s3');
 assert.equal(await page.locator('#lab-2-tol').inputValue(),'0.000001');
 await page.locator('#lab-2 button[type=submit]').click();
 assert.equal(await page.locator('#output-2 [role=alert]').count(),0);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('itera-results-2')).length),1);
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#output-2').getByRole('button',{name:'Descargar tabla CSV'}).first().click()]);
 const csv=fs.readFileSync(await download.path(),'utf8');assert.match(csv,/Cota de bisección/);assert.match(csv,/1\.521/);
 await page.reload();assert.match(await page.locator('main > details').first().textContent(),/Bisección/);
 await page.locator('#lab-2-a').fill('2');await page.locator('#lab-2-b').fill('3');await page.locator('#lab-2 button[type=submit]').click();
 assert.match(await page.locator('#output-2 [role=alert]').textContent(),/signos opuestos/);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('itera-results-2')).length),1,'invalid calculation must not be recorded');
 await page.goto('http://localhost:8000/modulo-5/#s1');
 await page.locator('#lab-0 button[type=submit]').click();
 assert.equal(await page.locator('#output-0 [role=alert]').count(),0);
 const values=await page.evaluate(()=>{const v=Object.fromEntries(new FormData(document.querySelector('#lab-0 form')));return CourseLabs.run('trap',v).refinement;});
 assert.equal(values.rows.length,3);assert.ok(Math.abs(values.rows[0][3]-1/3)<1e-14);assert.ok(values.rows[2][4]<values.rows[0][4]/10);
 await page.locator('#lab-0-f').fill('sin(x)');assert.equal(await page.locator('#lab-0-primitive').inputValue(),'');
 await page.locator('#lab-0 button[type=submit]').click();assert.match(await page.locator('#output-0').textContent(),/sin referencia analítica/);
 await page.locator('#lab-0-primitive').fill('-cos(x)');await page.locator('#lab-0 button[type=submit]').click();
 assert.match(await page.locator('#output-0').textContent(),/error absoluto/);
 await page.locator('#lab-0-primitive').fill('sqrt(-1)');await page.locator('#lab-0 button[type=submit]').click();assert.equal(await page.locator('#output-0 [role=alert]').count(),1);
 await page.locator('#lab-0 .sample-btn').click();await page.locator('#lab-0 button[type=submit]').click();
 for(const width of [375,1440]){await page.setViewportSize({width,height:900});await page.locator('#output-0').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(os.tmpdir(),`itera-review-${width}.png`)});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 assert.deepEqual(errors,[]);await browser.close();console.log('Review passed: counters, summaries, ordered navigation, CSV download, persistent history, invalid cases, analytic reference, refinement, stale reference clearing and mobile overflow.');
})().catch(e=>{console.error(e);process.exit(1);});
