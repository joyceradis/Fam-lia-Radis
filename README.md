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

O renderer usa `pedigree-core.js` para agrupar uniões, descendência, limites do grafo e regras de interação. As linhas são calculadas a partir dos nós renderizados, e não por coordenadas independentes.

## Navegação
- arrastar: move a árvore;
- scroll/gesto de dois dedos: desloca a árvore sem alterar o zoom;
- pinça/gesto de zoom do trackpad: amplia ou reduz mantendo o ponto sob o cursor;
- clique curto em uma pessoa: abre o dossiê;
- **Enquadrar**: calcula o enquadramento pelo conteúdo genealógico conectado.

## Backup
Use **Backup** para baixar o snapshot completo. Em outro navegador/dispositivo, use **Importar** para restaurá-lo. Alterações locais permanecem no navegador até a exportação.

## Verificação
`node tests.mjs` valida a âncora genealógica, uniões, descendência, nós em pesquisa e regras de pan/zoom/clique. O workflow `Verify Family Archive` também executa `node --check` em todos os módulos principais a cada push e pull request.

## Publicação
A versão pública é servida pelo GitHub Pages a partir da branch estável configurada no repositório.
