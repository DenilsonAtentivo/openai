# M365 Backup SaaS Front-end (Vite + React + TypeScript)

Aplicação front-end para produto de backup Microsoft 365 com foco em **SharePoint Online**, **OneDrive** e **Exchange Online**.

## Stack usada
- Vite + React + TypeScript
- React Router
- TailwindCSS (dark + verde como primary)
- Componentes de UI reutilizáveis em `src/components/ui`
- Ícones `lucide-react`
- Gráficos com `recharts`
- API mock em memória (sem backend)

> Observação: o ambiente bloqueou instalação de novas libs npm (HTTP 403), então a camada de estado/requests/validação foi implementada com alternativas nativas + mocks em memória.

## Rodando
```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```

## Rotas
- `/dashboard`
- `/schedules`
- `/schedules/new`
- `/settings`

## Estrutura
- `src/layout/` layout principal (sidebar + topbar)
- `src/pages/` páginas
- `src/components/` componentes reutilizáveis (`StatCard`, `DataTable`, `ScheduleForm`, `TreePicker`, `ConnectionCard`)
- `src/api/` client + services mock
- `src/data/` seeds mock
- `src/types/` DTOs e tipos
- `src/store/` estado global leve

## Mock seeds
- Métricas de dashboard
- Execuções recentes
- Schedules iniciais
- Árvore SharePoint/OneDrive (lazy-load)
- Mailboxes Exchange
- Status de conexão M365
- Logs
