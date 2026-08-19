# Família Radis — Arquivo Vivo

Genealogia interativa da Família Radis: árvore, memória familiar, saúde e evidências no mesmo arquivo.

## V2
- árvore navegável com zoom e pan;
- ficha individual editável;
- nascimento e óbito;
- condições e histórico de saúde;
- fontes/documentos e memórias;
- quatro estados de evidência: **confirmado**, **relato familiar**, **documentado**, **a investigar**;
- busca por nome, apelido, condição ou estado;
- inclusão rápida de pessoas;
- backup JSON versionado e importação posterior;
- persistência local no navegador;
- layout responsivo para Mac e celular.

## Regra de ouro dos dados
`family-data.js` guarda o núcleo reconstruído. Relações antigas não demonstradas permanecem explicitamente **a investigar**. O sistema não completa lacunas por inferência.

## Backup
Use **Backup** para baixar o snapshot completo. Em outro navegador/dispositivo, use **Importar** para restaurá-lo. O navegador mantém alterações localmente até a exportação.

## Desenvolvimento
A aplicação é estática (HTML/CSS/JavaScript ES modules). Sirva a pasta por HTTP; `tests.html` executa as verificações de integridade do núcleo genealógico.

## Publicação
Compatível com GitHub Pages. A publicação deve apontar para a branch que for escolhida como versão estável.