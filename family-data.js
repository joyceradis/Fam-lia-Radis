export const EVIDENCE=['confirmed','family-report','documented','investigate'];
export const people=[
{id:'joyce',name:'Joyce Radis',sex:'F',branch:'Radis',generation:'Atual',evidenceStatus:'confirmed',tags:['família Radis'],conditions:[],sources:[],notes:'Pessoa focal da árvore.'},
{id:'ritheli',name:'Ritheli',sex:'F',branch:'Radis',generation:'Pais',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Mãe de Joyce.'},
{id:'elielton',name:'Elielton',sex:'M',branch:'Radis',generation:'Pais',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Pai de Joyce.'},
{id:'sheila',name:'Sheila',sex:'F',branch:'Radis',generation:'Tios',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmã de Ritheli; filha de Terezinha.'},
{id:'elenilton',name:'Elenilton',sex:'M',branch:'Radis',generation:'Tios',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmão de Elielton; casado com Sheila.'},
{id:'zeli',name:'Zeli Radis',sex:'F',branch:'Radis',generation:'Avós',evidenceStatus:'family-report',tags:[],conditions:[],sources:[],notes:'Filha de América Radis; mãe de Elielton e Elenilton.'},
{id:'terezinha',name:'Terezinha',sex:'F',branch:'Radis',generation:'Avós',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Filha de Arlinda Radis e Manoel Radis; mãe de Ritheli e Sheila.'},
{id:'america',name:'América Radis',alias:'Merca',sex:'F',branch:'Radis',generation:'Bisavós',evidenceStatus:'family-report',tags:[],conditions:[],sources:[],notes:'Irmã de Arlinda Radis; mãe de Zeli Radis.'},
{id:'arlinda',name:'Arlinda Radis',sex:'F',branch:'Radis',generation:'Bisavós',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmã de América Radis; companheira de Manoel Radis e mãe de Terezinha.'},
{id:'manoel',name:'Manoel Radis',alias:'vô Manoel',sex:'M',branch:'Radis',generation:'Bisavós',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Companheiro de Arlinda Radis; pai de Terezinha.'},
{id:'pedro',name:'Pedro',sex:'M',branch:'Radis',generation:'Ancestrais',evidenceStatus:'investigate',tags:['Itália?','a confirmar'],conditions:[],sources:[],notes:'Relato familiar: possivelmente ligado à geração que veio da Itália.'},
{id:'carlos',name:'Carlos Radis',sex:'M',branch:'Radis',generation:'Ancestrais',evidenceStatus:'investigate',tags:['a confirmar'],conditions:[],sources:[],notes:'Nome recuperado de conversa familiar antiga; vínculo exato ainda não confirmado.'},
{id:'maria',name:'Maria Bertosse',sex:'F',branch:'Radis',generation:'Ancestrais',evidenceStatus:'investigate',tags:['grafia a confirmar'],conditions:[],sources:[],notes:'Sobrenome/grafia e vínculo exato ainda precisam de documento.'}
];
export const relations=[
{type:'parent',from:'america',to:'zeli'},
{type:'partner',from:'arlinda',to:'manoel'},
{type:'parent',from:'arlinda',to:'terezinha'},{type:'parent',from:'manoel',to:'terezinha'},
{type:'parent',from:'terezinha',to:'sheila'},{type:'parent',from:'terezinha',to:'ritheli'},
{type:'parent',from:'zeli',to:'elielton'},{type:'parent',from:'zeli',to:'elenilton'},
{type:'parent',from:'ritheli',to:'joyce'},{type:'parent',from:'elielton',to:'joyce'},
{type:'partner',from:'sheila',to:'elenilton'}
];
export const personById=(id,list=people)=>list.find(p=>p.id===id);
export function validateData(list=people,rels=relations){const errors=[];const ids=new Set(list.map(p=>p.id));if(ids.size!==list.length)errors.push('IDs duplicados');for(const p of list)if(!EVIDENCE.includes(p.evidenceStatus||'family-report'))errors.push(`Evidência inválida: ${p.id}`);for(const r of rels)if(!ids.has(r.from)||!ids.has(r.to))errors.push(`Relação inválida: ${r.from} → ${r.to}`);return errors}
