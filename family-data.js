export const EVIDENCE=['confirmed','family-report','documented','investigate'];
export const people=[
{id:'joyce',name:'Joyce Radis',sex:'F',branch:'Radis',generation:'Filhos',evidenceStatus:'confirmed',tags:['família Radis'],conditions:[],sources:[],notes:'Pessoa focal da árvore.'},
{id:'estevao',name:'Estevão',sex:'M',branch:'Radis',generation:'Filhos',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmão de Joyce.'},
{id:'arthur',name:'Arthur',sex:'M',branch:'Radis',generation:'Filhos',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmão de Joyce.'},
{id:'ritheli',name:'Ritheli',sex:'F',branch:'Radis',generation:'Pais',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Mãe de Joyce, Estevão e Arthur; filha de Terezinha.'},
{id:'elielton',name:'Elielton',sex:'M',branch:'Radis',generation:'Pais',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Pai de Joyce, Estevão e Arthur; filho de Zeli.'},
{id:'sheila',name:'Sheila',sex:'F',branch:'Radis',generation:'Tios',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmã de Ritheli; casada com Elenilton.'},
{id:'elenilton',name:'Elenilton',sex:'M',branch:'Radis',generation:'Tios',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmão de Elielton; casado com Sheila.'},
{id:'manoel-tio',name:'Manoel Radis',alias:'Tio Manoel',sex:'M',branch:'Radis',generation:'Tios-avós',evidenceStatus:'family-report',tags:['filho de Arlinda e Manoel'],conditions:[],sources:[],notes:'Um dos muitos filhos de Arlinda Radis e Manoel Radis. Homônimo do pai.'},
{id:'zeli',name:'Zeli Radis',sex:'F',branch:'Radis',generation:'Avós',evidenceStatus:'family-report',tags:[],conditions:[],sources:[],notes:'Mãe de Elielton e Elenilton; filha de América Radis.'},
{id:'terezinha',name:'Terezinha',sex:'F',branch:'Radis',generation:'Avós',evidenceStatus:'family-report',tags:[],conditions:[],sources:[],notes:'Filha de Arlinda e Manoel Radis; mãe de Sheila e Ritheli.'},
{id:'america',name:'América Radis',alias:'Merca',sex:'F',branch:'Radis',generation:'Bisavós',evidenceStatus:'family-report',tags:[],conditions:[],sources:[],notes:'Irmã de Arlinda; mãe de Zeli.'},
{id:'arlinda',name:'Arlinda Radis',alias:'Vó Arlinda',sex:'F',branch:'Radis',generation:'Bisavós',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Irmã de América; casada com Manoel Radis; tiveram muitos filhos, entre eles Terezinha e Manoel.'},
{id:'manoel-avo',name:'Manoel Radis',alias:'Vô Manoel',sex:'M',branch:'Radis',generation:'Bisavós',evidenceStatus:'confirmed',tags:[],conditions:[],sources:[],notes:'Casado com Arlinda Radis; tiveram muitos filhos, entre eles Terezinha e Manoel.'},
{id:'pedro',name:'Pedro',sex:'M',branch:'Radis',generation:'Ancestrais',evidenceStatus:'investigate',tags:['Itália?','a confirmar'],conditions:[],sources:[],notes:'Possivelmente ligado à geração que veio da Itália; não conectar até confirmação.'},
{id:'carlos',name:'Carlos Radis',sex:'M',branch:'Radis',generation:'Ancestrais',evidenceStatus:'investigate',tags:['a confirmar'],conditions:[],sources:[],notes:'Vínculo exato ainda não confirmado.'},
{id:'maria',name:'Maria Bertosse',sex:'F',branch:'Radis',generation:'Ancestrais',evidenceStatus:'investigate',tags:['grafia a confirmar'],conditions:[],sources:[],notes:'Sobrenome/grafia e vínculo exato ainda precisam de confirmação.'}
];
export const relations=[
{type:'sibling',from:'america',to:'arlinda'},
{type:'partner',from:'arlinda',to:'manoel-avo'},
{type:'parent',from:'america',to:'zeli'},
{type:'parent',from:'arlinda',to:'terezinha'},{type:'parent',from:'manoel-avo',to:'terezinha'},
{type:'parent',from:'arlinda',to:'manoel-tio'},{type:'parent',from:'manoel-avo',to:'manoel-tio'},
{type:'parent',from:'terezinha',to:'sheila'},{type:'parent',from:'terezinha',to:'ritheli'},
{type:'parent',from:'zeli',to:'elielton'},{type:'parent',from:'zeli',to:'elenilton'},
{type:'partner',from:'sheila',to:'elenilton'},
{type:'partner',from:'ritheli',to:'elielton',consanguineous:true},
{type:'parent',from:'ritheli',to:'joyce'},{type:'parent',from:'elielton',to:'joyce'},
{type:'parent',from:'ritheli',to:'estevao'},{type:'parent',from:'elielton',to:'estevao'},
{type:'parent',from:'ritheli',to:'arthur'},{type:'parent',from:'elielton',to:'arthur'}
];
export const personById=(id,list=people)=>list.find(p=>p.id===id);
export function validateData(list=people,rels=relations){const errors=[];const ids=new Set(list.map(p=>p.id));if(ids.size!==list.length)errors.push('IDs duplicados');for(const p of list)if(!EVIDENCE.includes(p.evidenceStatus||'family-report'))errors.push(`Evidência inválida: ${p.id}`);for(const r of rels)if(!ids.has(r.from)||!ids.has(r.to))errors.push(`Relação inválida: ${r.from} → ${r.to}`);return errors}
