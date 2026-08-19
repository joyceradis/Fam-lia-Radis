# Arquivo Vivo V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evoluir a genealogia Radis para um arquivo familiar interativo, editável e rastreável, preservando incertezas.

**Architecture:** Aplicação estática modular em HTML/CSS/JS, com dados-semente separados do estado local editável. Perfis incluem dados vitais, condições, fontes e nível de evidência. Importação/exportação JSON permite continuidade entre dispositivos sem backend nesta fase.

**Tech Stack:** HTML5, CSS3, JavaScript ES modules, localStorage, GitHub Pages.

**Spec:** desenho aprovado em chat em 19/08/2026.

## Global Constraints
- Não inventar vínculos familiares ausentes.
- Manter estados: confirmado, relato familiar, documentalmente confirmado, a investigar.
- Árvore permanece a tela principal.
- Interface responsiva e visual de arquivo histórico sofisticado.
- Backup JSON importável/exportável.

---

### Task 1: Modelo de dados e evidências
**Files:** `family-data.js`, `app.js`, `tests.html`
- [ ] Ampliar schema de pessoa com vital, conditions, sources e evidenceStatus.
- [ ] Validar relações e estados.
- [ ] Manter compatibilidade com dados existentes.

### Task 2: Ficha genealógica editável
**Files:** `index.html`, `app.js`, `style.css`
- [ ] Abrir ficha detalhada ao clicar.
- [ ] Editar nascimento, óbito, condições, notas e evidência.
- [ ] Persistir overrides em localStorage.

### Task 3: Entrada familiar rápida e backup
**Files:** `index.html`, `app.js`
- [ ] Melhorar formulário de nova pessoa.
- [ ] Implementar importação JSON com validação.
- [ ] Exportar snapshot completo versionado.

### Task 4: Experiência visual e navegação
**Files:** `style.css`, `app.js`
- [ ] Refinar hierarquia visual e cartões.
- [ ] Adicionar filtros por condição/evidência via busca.
- [ ] Garantir uso confortável em Mac e celular.

### Task 5: Verificação
**Files:** `tests.html`, `README.md`
- [ ] Executar validações de integridade.
- [ ] Verificar carregamento dos módulos e funções críticas.
- [ ] Documentar uso, backup e publicação.