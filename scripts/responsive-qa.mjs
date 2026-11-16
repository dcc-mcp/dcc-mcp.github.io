import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { dirname, extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

// Local, browser-driven acceptance fixture. Open it through the project DCC-CUA route.
// The iframe supplies real CSS viewport widths without browser-window minimums.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'docs', '.vitepress', 'dist')
const port = Number(process.argv[2] || 5174)
const reportPath = join(root, '.codex-tmp', 'responsive-report.json')
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.webm': 'video/webm' }

const fixture = String.raw`<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>DCC-MCP responsive acceptance</title>
<style>
*{box-sizing:border-box}body{margin:0;padding:18px;font:14px/1.5 system-ui;background:#eeeef0;color:#171719}h1{font-size:20px;margin:0 0 10px}header{position:sticky;top:0;z-index:2;background:#eeeef0;padding-bottom:12px}button,select{font:inherit;min-height:42px;padding:8px 12px;margin:3px;border:1px solid #c6c6ca;border-radius:8px;background:white;color:#171719}button{cursor:pointer}button[aria-pressed=true]{background:#171719;color:white}#status{min-height:24px;margin:6px 0}#stage{position:relative;overflow:hidden;background:white;box-shadow:0 0 0 1px #ccc}iframe{display:block;border:0;transform-origin:top left}#results{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.6 ui-monospace;padding:16px;background:white;border-radius:8px;max-height:420px;overflow:auto}
</style>
<header><h1>DCC-MCP responsive acceptance</h1>
<div id="presets"></div>
<select id="locale" aria-label="Language"><option value="zh">简体中文</option><option value="en">English</option></select>
<select id="route" aria-label="Page"><option value="">Homepage</option><option value="examples">Adapter examples</option><option value="marketplace">Marketplace</option><option value="agents">Agent guide</option><option value="developers">Developer guide</option><option value="ecosystem">Ecosystem</option><option value="why-dcc-mcp">Why DCC-MCP</option><option value="use-cases">Use cases</option><option value="examples/wwise">Audio examples</option><option value="cloud-agents">Cloud agents</option><option value="control/maya">Maya guide</option><option value="control/unreal-engine">Unreal guide</option><option value="control/powerpoint">PowerPoint guide</option><option value="control/comfyui">ComfyUI guide</option></select>
<select id="theme" aria-label="Appearance"><option value="light">Light</option><option value="dark">Dark</option></select>
<button id="audit">Run all layouts</button><button id="home">Show page top</button>
<p id="status" role="status">Choose a viewport or run the audit.</p></header>
<div id="stage"><iframe id="preview" title="DCC-MCP exact content viewport"></iframe></div><pre id="results"></pre>
<script>
const presets=[['320 phone',320,740],['390 phone',390,844],['540 folded',540,720],['720 unfolded',720,900],['768 tablet',768,1024],['844 landscape',844,390],['1024 tablet',1024,768],['1114 expanded',1114,720],['1440 desktop',1440,1000]];
const frame=document.querySelector('#preview'),stage=document.querySelector('#stage'),status=document.querySelector('#status'),results=document.querySelector('#results');
const routes=['','examples','marketplace','agents','developers','ecosystem','why-dcc-mcp','use-cases','examples/wwise','cloud-agents','control/maya','control/unreal-engine','control/powerpoint','control/comfyui'];
const query=new URLSearchParams(location.search);
if(query.has('review'))document.querySelector('header').hidden=true;
let current=presets[Number(query.get('preset')||1)]||presets[1],running=false,sequence=0;
for(const [id,key] of [['locale','locale'],['route','page'],['theme','theme']])if(query.has(key))document.querySelector('#'+id).value=query.get(key);
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function fit(){const scale=Math.min(1,(document.documentElement.clientWidth-36)/current[1],query.has('review')?(innerHeight-36)/current[2]:1);frame.style.width=current[1]+'px';frame.style.height=current[2]+'px';frame.style.transform='scale('+scale+')';stage.style.width=current[1]*scale+'px';stage.style.height=current[2]*scale+'px'}
async function load(locale,route,theme){
  localStorage.setItem('vitepress-theme-appearance',theme);fit();
  await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Page load timed out')),10000);frame.onload=()=>{clearTimeout(timer);resolve()};frame.src='/'+(locale==='zh'?'zh/':'')+route+'?responsive-qa='+sequence++});
  await frame.contentDocument.fonts.ready;
  if(!route)for(const disclosure of frame.contentDocument.querySelectorAll('.home-demonstrations,.integration-disclosure,.setup-details'))disclosure.open=true;
  const started=performance.now();
  while(frame.contentDocument.querySelector('.marketplace-search[aria-busy="true"]')&&performance.now()-started<2400)await sleep(80);
  await sleep(100);
}
function measure(locale,route,theme){
  const win=frame.contentWindow,doc=frame.contentDocument,width=win.innerWidth,availableWidth=doc.documentElement.clientWidth;
  const failures=[];
  const scrollWidth=Math.max(doc.documentElement.scrollWidth,doc.body.scrollWidth);
  if(scrollWidth>availableWidth+1){
    failures.push('document overflow '+scrollWidth+' > '+availableWidth);
    for(const element of doc.querySelectorAll('.VPNavBar *,main > *,.vp-doc > div > *')){
      const rect=element.getBoundingClientRect();
      if(rect.width&&rect.right>availableWidth+1)failures.push(element.tagName.toLowerCase()+'.'+String(element.className).split(' ').join('.')+' right='+Math.round(rect.right));
      if(failures.length>=12)break;
    }
  }
  for(const selector of ['.hero-app-prefix','.hero-app-rotator','.hero-app-punctuation','.showcase-tabs','.home-actions','.marketplace-toolbar','.showcase-gallery','.site-footer-inner','.pipeline-controls','.collection-toolbar','.install-cards','.crew-roles','.intro-video-grid','.dcc-control-guide-index']){
    for(const element of doc.querySelectorAll(selector)){
      if(!element.getClientRects().length)continue;
      const rect=element.getBoundingClientRect();
      if(rect.left < -1 || rect.right > availableWidth+1)failures.push(selector+' outside viewport: '+Math.round(rect.left)+'..'+Math.round(rect.right));
    }
  }
  for(const element of doc.querySelectorAll('.showcase-tabs button,.pipeline-controls button,.hero-app-name'))if(element.getClientRects().length&&element.scrollWidth>element.clientWidth+1)failures.push('clipped control text: '+element.textContent.trim());
  const viewport=doc.querySelector('meta[name=viewport]')?.content||'';
  if(!viewport.includes('viewport-fit=cover'))failures.push('missing safe-area viewport');
  return {locale,route:route||'home',theme,preset:current[0],width,availableWidth,height:win.innerHeight,scrollWidth,failures,catalogPending:!!doc.querySelector('.marketplace-search[aria-busy="true"]')};
}
async function preview(){if(running)return;await load(document.querySelector('#locale').value,document.querySelector('#route').value,document.querySelector('#theme').value);const row=measure(document.querySelector('#locale').value,document.querySelector('#route').value,document.querySelector('#theme').value);status.textContent=current[0]+': '+row.width+' × '+row.height+' CSS pixels; '+(row.failures.length?row.failures.join('; '):'no horizontal overflow');results.textContent=JSON.stringify(row,null,2);const anchor=frame.contentDocument.getElementById(query.get('anchor'));if(anchor)frame.contentWindow.scrollTo({top:anchor.getBoundingClientRect().top+frame.contentWindow.scrollY-96,behavior:'instant'})}
for(const preset of presets){const button=document.createElement('button');button.textContent=preset[0];button.onclick=async()=>{current=preset;for(const peer of document.querySelectorAll('#presets button'))peer.setAttribute('aria-pressed',String(peer===button));await preview()};document.querySelector('#presets').append(button)}
for(const select of document.querySelectorAll('select'))select.onchange=preview;
document.querySelector('#home').onclick=()=>frame.contentWindow.scrollTo({top:0,behavior:'instant'});
document.querySelector('#audit').onclick=async()=>{
  if(running)return;running=true;document.querySelector('#audit').disabled=true;const rows=[];const total=presets.length*routes.length*4;
  try{
    for(const locale of ['en','zh'])for(const theme of ['light','dark'])for(const route of routes)for(const preset of presets){
      current=preset;status.textContent='Auditing '+(rows.length+1)+' / '+total+': '+locale+' '+(route||'home')+' '+theme+' '+preset[0];
      try{await load(locale,route,theme);rows.push(measure(locale,route,theme))}catch(error){rows.push({locale,route:route||'home',theme,preset:preset[0],failures:[error.message]})}
      results.textContent=JSON.stringify({tested:rows.length,total,failed:rows.filter(row=>row.failures.length).length,last:rows.at(-1)},null,2);
    }
    const report={tested:rows.length,failed:rows.filter(row=>row.failures.length).length,pendingCatalogs:rows.filter(row=>row.catalogPending).length,physicalFoldHingeEmulated:false,rows};
    await fetch('/__qa/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(report)});
    status.textContent='Audit complete: '+report.tested+' layouts, '+report.failed+' failures. Report saved.';
    results.textContent=JSON.stringify({tested:report.tested,failed:report.failed,pendingCatalogs:report.pendingCatalogs,failures:rows.filter(row=>row.failures.length)},null,2);
  }finally{running=false;document.querySelector('#audit').disabled=false}
};
addEventListener('resize',fit);preview();
</script></html>`

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1')
    if (url.pathname === '/__qa') {
      response.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-store' })
      response.end(fixture)
      return
    }
    if (url.pathname === '/__qa/report' && request.method === 'POST') {
      let body = ''
      for await (const chunk of request) {
        body += chunk
        if (body.length > 2_000_000) throw new Error('Report too large')
      }
      const report = JSON.parse(body)
      await mkdir(dirname(reportPath), { recursive: true })
      await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n')
      response.writeHead(200, { 'Content-Type': mime['.json'] })
      response.end(JSON.stringify({ saved: true }))
      return
    }
    let path = resolve(dist, '.' + decodeURIComponent(url.pathname))
    if (path !== dist && !path.startsWith(dist + sep)) throw new Error('Invalid path')
    if (url.pathname.endsWith('/')) path = join(path, 'index.html')
    else if (!extname(path)) path += '.html'
    if (!(await stat(path)).isFile()) throw new Error('Not a file')
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' })
    response.end(await readFile(path))
  } catch {
    response.writeHead(404)
    response.end('Not found')
  }
}).listen(port, '127.0.0.1', () => {
  console.log('Responsive acceptance: http://127.0.0.1:' + port + '/__qa')
})
