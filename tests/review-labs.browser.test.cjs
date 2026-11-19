const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const edge='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
 const browser=await chromium.launch({headless:true,...(fs.existsSync(edge)?{executablePath:edge}:{})}),page=await browser.newPage();
 await page.route(/fonts.googleapis.com|fonts.gstatic.com/,r=>r.abort());let count=0;
 for(const id of [2,3,4,5,6,7,8]){
  await page.goto(`http://localhost:8000/modulo-${id}/`);
  const topics=await page.locator('.ls').count();
  for(let i=0;i<topics;i++){
   await page.evaluate(i=>{location.hash='#s'+(i+1)},i);await page.waitForSelector(`#s${i+1}:not([hidden])`);
   const methods=await page.locator(`#method-${i} option`).evaluateAll(options=>options.map(o=>o.value));
   for(const method of methods){
    await page.locator(`#method-${i}`).selectOption(method);
    await page.locator(`#lab-${i} button[type=submit]`).click();
    const errors=await page.locator(`#output-${i} [role=alert]`).allTextContents();
    assert.deepEqual(errors,[],`module ${id} topic ${i+1} method ${method}`);count++;
   }
  }
 }
 await browser.close();console.log(`${count} browser calculator runs passed across modules 2–8, including EDO.`);
})().catch(e=>{console.error(e);process.exit(1)});
