export const people=[
{id:'joyce',name:'Joyce Radis',sex:'F',branch:'Radis',generation:'Atual',tags:['família Radis'],notes:'Pessoa focal da árvore.'},
{id:'ritheli',name:'Ritheli',sex:'F',branch:'Radis',generation:'Pais',tags:[],notes:'Mãe de Joyce.'},
{id:'elielton',name:'Elielton',sex:'M',branch:'Radis',generation:'Pais',tags:[],notes:'Pai de Joyce.'},
{id:'sheila',name:'Sheila',sex:'F',branch:'Radis',generation:'Tios',tags:[],notes:'Irmã de Ritheli.'},
{id:'elenilton',name:'Elenilton',sex:'M',branch:'Radis',generation:'Tios',tags:[],notes:'Irmão de Elielton; casado com Sheila.'},
{id:'zeli',name:'Zeli Radis',sex:'F',branch:'Radis',generation:'Avós',tags:[],notes:'Mãe de Elielton e Elenilton.'},
{id:'terezinha',name:'Terezinha',sex:'F',branch:'Radis',generation:'Avós',tags:[],notes:'Filha de Arlinda; mãe de Sheila e Ritheli.'},
{id:'america',name:'América Radis',alias:'Merca',sex:'F',branch:'Radis',generation:'Bisavós',tags:[],notes:'Irmã de Arlinda; mãe de Zeli.'},
{id:'arlinda',name:'Arlinda Radis',sex:'F',branch:'Radis',generation:'Bisavós',tags:[],notes:'Irmã de América; mãe de Terezinha.'},
{id:'manoel',name:'Manoel Radis',sex:'M',branch:'Radis',generation:'Ancestrais',status:'a-confirmar',tags:['conexão a confirmar'],notes:'Conexão exata com este ramo ainda precisa ser confirmada por documentos/vídeo familiar.'},
{id:'pedro',name:'Pedro',sex:'M',branch:'Radis',generation:'Ancestrais',status:'a-confirmar',tags:['Itália?','a confirmar'],notes:'Relato familiar: possivelmente ligado à geração que veio da Itália.'},
{id:'carlos',name:'Carlos Radis',sex:'M',branch:'Radis',generation:'Ancestrais',status:'a-confirmar',tags:['a confirmar'],notes:'Nome recuperado de conversa familiar antiga; vínculo exato ainda não confirmado.'},
{id:'maria',name:'Maria Bertosse',sex:'F',branch:'Radis',generation:'Ancestrais',status:'a-confirmar',tags:['grafia a confirmar'],notes:'Sobrenome/grafia e vínculo exato ainda precisam de documento.'}
];
export const relations=[
{type:'parent',from:'america',to:'zeli'},{type:'parent',from:'arlinda',to:'terezinha'},
{type:'parent',from:'terezinha',to:'sheila'},{type:'parent',from:'terezinha',to:'ritheli'},
{type:'parent',from:'zeli',to:'elielton'},{type:'parent',from:'zeli',to:'elenilton'},
{type:'parent',from:'ritheli',to:'joyce'},{type:'parent',from:'elielton',to:'joyce'},
{type:'partner',from:'sheila',to:'elenilton'}
];
export const personById=id=>people.find(p=>p.id===id);
export const childrenOf=id=>relations.filter(r=>r.type==='parent'&&r.from===id).map(r=>personById(r.to)).filter(Boolean);
export const parentsOf=id=>relations.filter(r=>r.type==='parent'&&r.to===id).map(r=>personById(r.from)).filter(Boolean);
export function validateData(){const errors=[];const ids=new Set(people.map(p=>p.id)); if(ids.size!==people.length)errors.push('IDs duplicados'); for(const r of relations)if(!ids.has(r.from)||!ids.has(r.to))errors.push(`Relação inválida: ${r.from} → ${r.to}`);return errors}
