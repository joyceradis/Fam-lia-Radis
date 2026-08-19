# Família Radis — Arquivo Vivo

Genealogia interativa da Família Radis: árvore, memória familiar, saúde e evidências no mesmo arquivo.

## Estado atual
- árvore genealógica navegável;
- ficha individual editável;
- nascimento e óbito;
- condições e histórico de saúde;
- fontes, documentos e memórias;
- estados de evidência: **confirmado**, **relato familiar**, **documentado**, **a investigar**;
- busca por nome, apelido, condição ou estado;
- inclusão rápida de pessoas;
- backup JSON e importação;
- persistência local no navegador;
- layout responsivo para desktop e celular.

## Regra de ouro dos dados
`family-data.js` é a fonte canônica do núcleo genealógico reconstruído. Relações não demonstradas permanecem explicitamente **a investigar**. O sistema não completa lacunas por inferência.

A aplicação deve manter uma única fonte de verdade para a topologia e o posicionamento da árvore; implementações antigas ou paralelas de layout não devem permanecer no repositório.

## Backup
Use **Backup** para baixar o snapshot completo. Em outro navegador/dispositivo, use **Importar** para restaurá-lo. Alterações locais permanecem no navegador até a exportação.

## Desenvolvimento
Aplicação estática em HTML/CSS/JavaScript ES modules. `tests.html` contém as verificações de integridade genealógica e regressão disponíveis no próprio projeto.

## Publicação
A versão pública é servida pelo GitHub Pages a partir da branch estável configurada no repositório.
