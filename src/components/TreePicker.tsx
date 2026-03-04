import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { getTreeNodes } from '../api/services';
import type { ScheduleType, TreeNode } from '../types';
import { Button } from './ui/Button';

export function TreePicker({ type, selected, onChange }: { type: Extract<ScheduleType, 'SharePoint' | 'OneDrive'>; selected: string[]; onChange: (ids: string[]) => void }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ root: true });
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => { getTreeNodes(null, type).then(setNodes); }, [type]);

  const loadChildren = async (node: TreeNode) => {
    if (!node.hasChildren || nodes.some((n) => n.parentId === node.id)) return;
    const children = await getTreeNodes(node.id, type);
    setNodes((prev) => [...prev, ...children]);
  };

  const toggleNode = (node: TreeNode) => {
    const next = !expanded[node.id];
    setExpanded((p) => ({ ...p, [node.id]: next }));
    if (next) loadChildren(node);
  };

  const mapChildren = useMemo(() => nodes.reduce<Record<string, TreeNode[]>>((acc, n) => {
    const key = n.parentId ?? 'root';
    acc[key] = acc[key] || [];
    acc[key].push(n);
    return acc;
  }, {}), [nodes]);

  const cascade = (id: string): string[] => {
    const children = mapChildren[id] ?? [];
    return [id, ...children.flatMap((c) => cascade(c.id))];
  };

  const toggleSelect = (id: string) => {
    const all = cascade(id);
    const has = all.every((x) => selected.includes(x));
    onChange(has ? selected.filter((x) => !all.includes(x)) : [...new Set([...selected, ...all])]);
  };

  const render = (parentId: string | null, level = 0): React.ReactNode => (mapChildren[parentId ?? 'root'] || [])
    .filter((n) => n.label.toLowerCase().includes(search.toLowerCase()) || !search)
    .map((node) => {
      const childIds = cascade(node.id).slice(1);
      const selectedChildren = childIds.filter((id) => selected.includes(id)).length;
      const indeterminate = selectedChildren > 0 && selectedChildren < childIds.length;
      return (
        <div key={node.id} style={{ marginLeft: `${level * 16}px` }} className="py-1">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => toggleNode(node)} className="text-slate-400">{node.hasChildren ? (expanded[node.id] ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <span className="w-[14px]" />}</button>
            <input type="checkbox" checked={selected.includes(node.id)} ref={(el) => { if (el) el.indeterminate = indeterminate; }} onChange={() => toggleSelect(node.id)} />
            <span>{node.label}</span>
          </div>
          {expanded[node.id] && render(node.id, level + 1)}
        </div>
      );
    });

  return (
    <div className="grid grid-cols-[1fr_260px] gap-3">
      <div className="rounded-lg border border-slate-800 p-3">
        <input className="mb-3 w-full rounded bg-slate-800 px-2 py-1" placeholder="Buscar na árvore" value={search} onChange={(e) => setSearch(e.target.value)} />
        {render(null)}
      </div>
      <aside className="rounded-lg border border-slate-800 p-3">
        <h4 className="text-sm font-medium">Selecionados ({selected.length})</h4>
        <div className="mt-2 max-h-48 overflow-auto text-xs text-slate-300">{selected.map((id) => <p key={id}>{id}</p>)}</div>
        <Button variant="ghost" className="mt-2 w-full" onClick={() => onChange([])}>Limpar</Button>
      </aside>
    </div>
  );
}
