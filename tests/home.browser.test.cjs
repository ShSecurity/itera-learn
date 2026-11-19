'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
  const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const browser=await chromium.launch({headless:true,...(fs.existsSync(edge)?{executablePath:edge}:{})});
  const page=await browser.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route(/fonts.googleapis.com|fonts.gstatic.com/,route=>route.abort());
  await page.goto('http://localhost:8000/');
  assert.equal(await page.locator('#pp-pct').innerText(),'0%');
  assert.equal(await page.locator('#pp-btn').getAttribute('href'),'modulo-1/index.html#s1');
  assert.equal(await page.locator('#pp-dots a').count(),8);
  assert.ok(await page.locator('.chapter-card').evaluateAll(cards=>cards.every(card=>getComputedStyle(card,'::before').animationName==='none'&&!card.classList.contains('reveal'))),'Module cards must remain stable without flashing borders');
  // Progress combines all modules; an old "last" pointer cannot skip an unfinished topic.
  await page.evaluate(()=>{const m1={};for(let i=1;i<=8;i++)m1['s'+i+'_done']=true;localStorage.setItem('itera-m1',JSON.stringify(m1));localStorage.setItem('itera-m2',JSON.stringify({done:[true,true,false],last:'s12'}));});
  await page.reload();
  assert.equal(await page.locator('#pp-pct').innerText(),'17%');
  assert.equal(await page.locator('#completed-lessons').innerText(),'10/ 60');
  assert.equal(await page.locator('#completed-modules').innerText(),'1/ 8');
  assert.equal(await page.locator('#pp-btn').getAttribute('href'),'modulo-2/index.html#s3');
  assert.equal(await page.locator('[data-course-progress="2"]').innerText(),'2 de 12 temas');
  await page.evaluate(()=>{[12,8,8,7,7,6,4].forEach((n,i)=>localStorage.setItem('itera-m'+(i+2),JSON.stringify({done:Array(n).fill(true)})));});
  await page.reload();assert.equal(await page.locator('#pp-pct').innerText(),'100%');assert.match(await page.locator('#course-progress-title').innerText(),/Completaste/);
  // Bad local data must not crash the page or inflate its progress.
  await page.evaluate(()=>{localStorage.clear();localStorage.setItem('itera-m1','null');localStorage.setItem('itera-m2','{bad json');localStorage.setItem('itera-m3',JSON.stringify({done:['yes',1],quizzes:'invalid'}));});
  await page.reload();assert.equal(await page.locator('#pp-pct').innerText(),'0%');
  // Search and keyboard navigation still work after the layout changes.
  await page.locator('#topic-search').fill('Newton');assert.ok(await page.locator('#syllabus mark').count()>0);
  await page.locator('#topic-search').fill('no-existe-xyz');assert.equal(await page.locator('#no-results').getAttribute('class'),'no-results show');
  await page.locator('#topic-search').fill('');
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#inicio').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'true');
  const step=await page.locator('#iteration-number').innerText();await page.waitForTimeout(2500);assert.equal(await page.locator('#iteration-number').innerText(),step);
  await page.locator('#motion-toggle').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'false');
  await page.waitForFunction(previous=>document.getElementById('iteration-number').textContent!==previous,step);await page.locator('#motion-toggle').click();
  for(const width of [360,390,768,1180,1440,1920]){
    await page.setViewportSize({width,height:900});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Page overflow at '+width);
    if(width>=1180)assert.ok(await page.locator('#header-cta').evaluate(el=>el.scrollWidth<=el.clientWidth),'Header button overflow');
  }
  await page.setViewportSize({width:390,height:844});await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  await page.locator('#theme-btn').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');await page.reload();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.evaluate(()=>{localStorage.clear();});await page.reload();
  await page.setViewportSize({width:1440,height:1100});await page.screenshot({path:path.join(os.tmpdir(),'itera-home-desktop.png')});
  await page.locator('#progreso').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(os.tmpdir(),'itera-home-dashboard.png')});
  await page.setViewportSize({width:390,height:844});await page.locator('#inicio').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(os.tmpdir(),'itera-home-mobile.png')});
  // Every local link resolves, including PDF and MP4 links, without downloading media.
  const urls=await page.locator('a[href]').evaluateAll(links=>[...new Set(links.map(a=>a.href).filter(href=>href.startsWith(location.origin)&&!href.includes('#')))]);
  for(const url of urls){const response=await page.request.head(url);assert.ok(response.ok(),url);}
  assert.deepEqual(errors,[]);await browser.close();
  console.log('Home: aggregate progress, resume links, corrupt storage, search, reduced motion, playback control, navigation, persistent theme, local links and six viewport widths passed.');
})().catch(error=>{console.error(error);process.exit(1);});
