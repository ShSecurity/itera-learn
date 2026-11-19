const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
(async()=>{
 const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
 const browser=await chromium.launch({headless:true,...(fs.existsSync(edge)?{executablePath:edge}:{})}),page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/fonts.googleapis.com|fonts.gstatic.com/,r=>r.abort());
 await page.goto('http://localhost:8000/modulo-6/#s1');
 for(const method of ['odeEuler','odeHeun','odeRK4','odeRK45','odeTaylor','odeAdams','odeMilne','odeImplicit','coolingEuler','coolingRK4','coolingRK45']){
  const out=await page.evaluate(method=>{const fields=Object.fromEntries(CourseLabs.fields(method).map(f=>[f.key,f.value]));return CourseLabs.run(method,fields)},method);
  assert.equal(out.refinement.rows.length,3,method);
  const rows=out.refinement.rows;
  assert.ok(rows[2][4]<=rows[0][4],method+' error at finest resolution');
  if(method==='odeEuler'){assert.ok(Math.abs(rows[0][3]-Math.E)<1e-14);assert.ok(rows[0][4]/rows[1][4]>1.9);}
  if(method==='odeRK4')assert.ok(rows[0][4]/rows[1][4]>15);
  if(method==='odeRK45')assert.deepEqual(rows.map(r=>r[0]),[1e-6,2.5e-7,6.25e-8]);
 }
 await page.locator('#lab-0 button[type=submit]').click();
 assert.equal(await page.locator('#output-0 [role=alert]').count(),0);
 assert.match(await page.locator('#output-0').innerText(),/Comparación al refinar/);
 const download=page.waitForEvent('download');await page.locator('#output-0').getByRole('button',{name:'Descargar tabla CSV'}).first().click();const file=await download;
 assert.match(fs.readFileSync(await file.path(),'utf8'),/Error absoluto final/);
 await page.locator('#lab-0-y0').fill('2');assert.equal(await page.locator('#lab-0-reference').inputValue(),'');
 await page.locator('#lab-0 button[type=submit]').click();assert.match(await page.locator('#output-0').innerText(),/sin referencia analítica/);
 await page.locator('#lab-0-reference').fill('exp(x)');await page.locator('#lab-0 button[type=submit]').click();assert.match(await page.locator('#output-0 [role=alert]').innerText(),/condición inicial/);
 await page.locator('#lab-0-reference').fill('2*exp(x)');await page.locator('#lab-0 button[type=submit]').click();assert.equal(await page.locator('#output-0 [role=alert]').count(),0);
 for(const width of [375,1440]){await page.setViewportSize({width,height:900});await page.locator('#output-0').scrollIntoViewIfNeeded();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:path.join(os.tmpdir(),`itera-edo-review-${width}.png`)});}
 assert.deepEqual(errors,[]);await browser.close();console.log('EDO review passed: 11 methods, analytic errors, refinement orders, adaptive tolerances, CSV, stale-reference clearing, initial-condition validation and mobile/desktop layout.');
})().catch(e=>{console.error(e);process.exit(1)});
