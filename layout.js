export function buildLayout(people,relations){
 const ids=new Set(people.map(p=>p.id)),parents=relations.filter(r=>r.type==='parent'&&ids.has(r.from)&&ids.has(r.to)),partners=relations.filter(r=>r.type==='partner');
 const depth=Object.fromEntries(people.map(p=>[p.id,0]));
 for(let i=0;i<people.length+2;i++){let changed=false;for(const r of parents){const d=depth[r.from]+1;if(d>depth[r.to]){depth[r.to]=d;changed=true}}for(const r of partners){const d=Math.max(depth[r.from]||0,depth[r.to]||0);if(depth[r.from]!==d||depth[r.to]!==d){depth[r.from]=depth[r.to]=d;changed=true}}if(!changed)break}
 // keep partner depth synchronized after parent propagation
 for(let i=0;i<3;i++)for(const r of partners){const d=Math.max(depth[r.from]||0,depth[r.to]||0);depth[r.from]=depth[r.to]=d}
 const groups={};for(const p of people)(groups[depth[p.id]]??=[]).push(p);
 const out={},rowGap=175,nodeGap=190,center=700;
 Object.keys(groups).map(Number).sort((a,b)=>a-b).forEach(d=>{const row=groups[d];row.sort((a,b)=>score(a.id)-score(b.id)||a.name.localeCompare(b.name));const width=(row.length-1)*nodeGap;row.forEach((p,i)=>out[p.id]=[center-width/2+i*nodeGap,105+d*rowGap])});
 // pull partners closer without changing their generation
 for(const r of partners){if(!out[r.from]||!out[r.to])continue;const mid=(out[r.from][0]+out[r.to][0])/2;out[r.from][0]=mid-nodeGap*.38;out[r.to][0]=mid+nodeGap*.38}
 return out;
 function score(id){const descendants=parents.filter(r=>r.from===id).map(r=>r.to);return descendants.reduce((n,c)=>n+(depth[c]||0),0)}
}
