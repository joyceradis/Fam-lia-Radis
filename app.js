import {people as seed,relations as seedRelations,validateData} from './family-data.js';
import {buildUnions,buildGraphModel,sideAnchors,bottomAnchor,topAnchor,computeBounds,interpretWheel,isClickGesture} from './pedigree-core.js';

const STORE='radis-archive-v8';
const VERSION=8;
const clone=x=>JSON.parse(JSON.stringify(x));
let saved;try{saved=JSON.parse(localStorage.getItem(STORE)||'null')}catch{saved=null}
let people=saved?.version===VERSION&&Array.isArray(saved.people)?saved.people:clone(seed);
let relations=saved?.version===VERSION&&Array.isArray(saved.relations)?saved.relations:clone(seedRelations);
let scale=.8,tx=0,ty=0,gesture=null;

const pos={
  pedro:[330,210],america:[500,210],'manoel-avo':[1000,210],arlinda:[1170,210],
  zeli:[380,420],sebastiao:[560,420],jose:[800,420],terezinha:[980,420],bras:[1160,420],'manoel-tio':[1370,420],
  welington:[220,650],elenice:[380,650],elielton:[590,650],ritheli:[750,650],elenilton:[940,650],sheila:[1100,650],brazin:[1260,650],fabiana:[1420,650],renata:[1580,650],
  joyce:[590,890],estevao:[750,890],arthur:[910,890],gabi:[1040,890],samuel:[1200,890],
  carlos:[1490,120],maria:[1650,120]
};

const $=s=>document.querySelector(s);
const byId=id=>people.find(p=>p.id===id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials=n=>n.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
const evidenceLabel={confirmed:'Confirmado','family-report':'Relato familiar',documented:'Documentado',investigate:'Em pesquisa'};
const stage=$('#stage'),viewport=$('#viewport'),links=$('#links'),nodesRoot=$('#nodes');

function persist(){localStorage.setItem(STORE,JSON.stringify({version:VERSION,updatedAt:new Date().toISOString(),people,relations}))}
function transform(){stage.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`}
function nodeBox(id){const node=nodesRoot.querySelector(`[data-person-id="${CSS.escape(id)}"]`);if(!node)return null;const avatar=node.querySelector('.avatar');if(!avatar)return null;const left=node.offsetLeft-node.offsetWidth/2+avatar.offsetLeft,top=node.offsetTop-node.offsetHeight/2+avatar.offsetTop;return{left:left+avatar.offsetWidth/2,top:top+avatar.offsetHeight/2,width:avatar.offsetWidth,height:avatar.offsetHeight}}
function allNodeBoxes(){const m=new Map();for(const p of people){const b=nodeBox(p.id);if(b)m.set(p.id,b)}return m}
function path(d,cls='line'){const e=document.createElementNS('http://www.w3.org/2000/svg','path');e.setAttribute('class',cls);e.setAttribute('d',d);links.appendChild(e)}
function line(x1,y1,x2,y2,cls='line'){path(`M${x1},${y1} L${x2},${y2}`,cls)}

function drawEdges(){
  links.innerHTML='';
  const boxes=allNodeBoxes(),unions=buildUnions(relations),handledChildren=new Set();
  for(const union of unions.values()){
    const[aId,bId]=union.partners,a=boxes.get(aId),b=boxes.get(bId);if(!a||!b)continue;
    const anchors=sideAnchors(a,b);line(anchors.left.x,anchors.left.y,anchors.right.x,anchors.right.y,'line partner');
    if(!union.children.length)continue;
    const children=union.children.map(id=>({id,box:boxes.get(id)})).filter(x=>x.box);if(!children.length)continue;
    children.forEach(x=>handledChildren.add(x.id));
    const childAnchors=children.map(x=>({id:x.id,...topAnchor(x.box)})),minChildY=Math.min(...childAnchors.map(c=>c.y)),sibY=Math.max(anchors.midpoint.y+52,minChildY-54);
    line(anchors.midpoint.x,anchors.midpoint.y,anchors.midpoint.x,sibY,'line descent');
    if(childAnchors.length===1){line(anchors.midpoint.x,sibY,childAnchors[0].x,childAnchors[0].y,'line descent');continue}
    const xs=childAnchors.map(c=>c.x),minX=Math.min(...xs),maxX=Math.max(...xs);line(minX,sibY,maxX,sibY,'line sibship');for(const c of childAnchors)line(c.x,sibY,c.x,c.y,'line descent');
  }
  for(const r of relations.filter(r=>r.type==='parent')){
    if(handledChildren.has(r.to))continue;const p=boxes.get(r.from),c=boxes.get(r.to);if(!p||!c)continue;const a=bottomAnchor(p),b=topAnchor(c),mid=(a.y+b.y)/2;path(`M${a.x},${a.y} L${a.x},${mid} L${b.x},${mid} L${b.x},${b.y}`,'line descent');
  }
}

function render(filter=''){
  nodesRoot.innerHTML='';const q=filter.trim().toLowerCase();
  people.forEach((p,i)=>{const xy=pos[p.id]||[1500+(i%2)*170,980+Math.floor(i/2)*130],hay=[p.name,p.alias,p.branch,p.generation,p.notes,...(p.tags||[]),...(p.conditions||[])].join(' ').toLowerCase(),el=document.createElement('button');el.type='button';el.dataset.personId=p.id;el.className=`node ${p.sex==='F'?'f':'m'} ${p.evidenceStatus==='investigate'?'pending':''} ${p.id==='joyce'?'focus':''} ${p.deceased?'deceased':''}`;el.style.left=xy[0]+'px';el.style.top=xy[1]+'px';el.style.opacity=q&&!hay.includes(q)?'.12':'1';el.innerHTML=`<span class="avatar"><span>${esc(initials(p.name))}</span></span><b>${esc(p.name)}</b><small>${p.alias?`“${esc(p.alias)}” · `:''}${esc(p.generation||'Família')}</small><span class="badge">${esc(evidenceLabel[p.evidenceStatus]||'Relato familiar')}</span>`;nodesRoot.appendChild(el)});
  stats();requestAnimationFrame(drawEdges);
}
function stats(){$('#count').textContent=people.length;$('#pending').textContent=people.filter(p=>p.evidenceStatus==='investigate').length;$('#confirmed').textContent=people.filter(p=>['confirmed','documented'].includes(p.evidenceStatus)).length}

function openProfile(id){const p=byId(id);if(!p)return;const parents=relations.filter(r=>r.type==='parent'&&r.to===id).map(r=>byId(r.from)?.name).filter(Boolean),partners=relations.filter(r=>r.type==='partner'&&(r.from===id||r.to===id)).map(r=>byId(r.from===id?r.to:r.from)?.name).filter(Boolean),kids=relations.filter(r=>r.type==='parent'&&r.from===id).map(r=>byId(r.to)?.name).filter(Boolean);$('#profileBody').innerHTML=`<div class="profileTop"><div class="portrait ${p.deceased?'portrait-deceased':''}">${esc(initials(p.name))}</div><div><div class="eyebrow">${p.deceased?'FALECIDO · ':''}${esc(evidenceLabel[p.evidenceStatus]||'Relato familiar')}</div><h2>${esc(p.name)}</h2><p>${p.alias?`“${esc(p.alias)}” · `:''}${esc(p.branch||'Família Radis')}</p></div></div><form id="profileForm" class="dossier"><input type="hidden" name="id" value="${esc(p.id)}"><div class="facts"><label class="fact"><span>Nascimento</span><input name="birth" type="date" value="${esc(p.birth||'')}"></label><label class="fact"><span>Óbito</span><input name="death" type="date" value="${esc(p.death||'')}"></label><label class="fact"><span>Evidência</span><select name="evidenceStatus">${Object.entries(evidenceLabel).map(([v,l])=>`<option value="${v}" ${p.evidenceStatus===v?'selected':''}>${l}</option>`).join('')}</select></label>${parents.length?`<div class="fact"><span>Pais</span><b>${esc(parents.join(' + '))}</b></div>`:''}${partners.length?`<div class="fact"><span>Cônjuge</span><b>${esc(partners.join(', '))}</b></div>`:''}${kids.length?`<div class="fact"><span>Filhos</span><b>${esc([...new Set(kids)].join(', '))}</b></div>`:''}</div><label>Condições / histórico<input name="conditions" value="${esc((p.conditions||[]).join(', '))}"></label><label>Fontes / documentos<textarea name="sources">${esc((p.sources||[]).join('\n'))}</textarea></label><label>Memórias e observações<textarea name="notes">${esc(p.notes||'')}</textarea></label><button class="primary" type="submit">Salvar ficha</button></form>`;$('#profile').showModal();$('#profileForm').onsubmit=saveProfile}
function saveProfile(e){e.preventDefault();const f=new FormData(e.target),p=byId(f.get('id'));p.birth=f.get('birth');p.death=f.get('death');p.deceased=Boolean(p.deceased||p.death);p.evidenceStatus=f.get('evidenceStatus');p.conditions=String(f.get('conditions')||'').split(',').map(x=>x.trim()).filter(Boolean);p.sources=String(f.get('sources')||'').split('\n').map(x=>x.trim()).filter(Boolean);p.notes=String(f.get('notes')||'').trim();persist();render($('#search').value);$('#profile').close()}

function fit(){const boxes=allNodeBoxes(),model=buildGraphModel(people,relations),ids=[...model.linked].filter(id=>boxes.has(id)),b=computeBounds(boxes,ids),w=viewport.clientWidth,h=viewport.clientHeight,pad=70;scale=Math.max(.34,Math.min(1,(w-pad*2)/b.width,(h-pad*2)/b.height));tx=(w-b.width*scale)/2-b.minX*scale;ty=(h-b.height*scale)/2-b.minY*scale;transform()}
function zoomAt(factor,cx,cy){const old=scale,next=Math.max(.34,Math.min(1.7,old*factor));if(next===old)return;const localX=(cx-tx)/old,localY=(cy-ty)/old;scale=next;tx=cx-localX*scale;ty=cy-localY*scale;transform()}

viewport.addEventListener('pointerdown',e=>{if(e.target.closest('.zoom,.canvas-note'))return;viewport.setPointerCapture(e.pointerId);const node=e.target.closest('.node');gesture={id:e.pointerId,startX:e.clientX,startY:e.clientY,lastX:e.clientX,lastY:e.clientY,moved:false,nodeId:node?.dataset.personId||null}});
viewport.addEventListener('pointermove',e=>{if(!gesture||gesture.id!==e.pointerId)return;const dx=e.clientX-gesture.lastX,dy=e.clientY-gesture.lastY;if(!isClickGesture({startX:gesture.startX,startY:gesture.startY,endX:e.clientX,endY:e.clientY},5))gesture.moved=true;if(gesture.moved){tx+=dx;ty+=dy;transform()}gesture.lastX=e.clientX;gesture.lastY=e.clientY});
function endGesture(e){if(!gesture||gesture.id!==e.pointerId)return;const g=gesture;gesture=null;if(!g.moved&&g.nodeId)openProfile(g.nodeId)}
viewport.addEventListener('pointerup',endGesture);viewport.addEventListener('pointercancel',()=>gesture=null);
viewport.addEventListener('wheel',e=>{e.preventDefault();const rect=viewport.getBoundingClientRect(),action=interpretWheel(e);if(action.type==='zoom')zoomAt(action.factor,e.clientX-rect.left,e.clientY-rect.top);else{tx+=action.dx;ty+=action.dy;transform()}},{passive:false});

$('#zin').onclick=()=>zoomAt(1.14,viewport.clientWidth/2,viewport.clientHeight/2);$('#zout').onclick=()=>zoomAt(1/1.14,viewport.clientWidth/2,viewport.clientHeight/2);$('#fit').onclick=fit;$('#search').oninput=e=>render(e.target.value);document.querySelectorAll('.close').forEach(b=>b.onclick=()=>b.closest('dialog').close());$('#add').onclick=()=>$('#editor').showModal();
$('#personForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),p={id:'custom-'+Date.now(),name:String(f.get('name')).trim(),sex:f.get('sex'),birth:f.get('birth'),death:f.get('death'),deceased:Boolean(f.get('death')),conditions:String(f.get('conditions')||'').split(',').map(x=>x.trim()).filter(Boolean),tags:[],sources:f.get('source')?[String(f.get('source')).trim()]:[],evidenceStatus:f.get('evidenceStatus'),notes:String(f.get('notes')||'').trim(),generation:'Novo registro',branch:'Radis'};people.push(p);persist();render();$('#editor').close();e.target.reset()};
$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({schema:'familia-radis',version:VERSION,exportedAt:new Date().toISOString(),people,relations},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`familia-radis-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),500)};
$('#importBtn').onclick=()=>$('#importFile').click();$('#importFile').onchange=async e=>{try{const file=e.target.files?.[0];if(!file)return;const data=JSON.parse(await file.text()),errors=validateData(data.people,data.relations);if(errors.length)throw Error(errors.join('\n'));people=data.people;relations=data.relations;persist();render();requestAnimationFrame(fit)}catch(err){alert('Arquivo incompatível: '+err.message)}finally{e.target.value=''}};
const errors=validateData(people,relations);if(errors.length){console.error(errors);people=clone(seed);relations=clone(seedRelations)}persist();render();requestAnimationFrame(()=>requestAnimationFrame(fit));window.addEventListener('resize',()=>requestAnimationFrame(fit));