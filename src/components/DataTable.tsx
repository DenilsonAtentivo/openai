import { useMemo, useState } from 'react';

type Column<T> = { key: keyof T; label: string; render?: (row: T) => React.ReactNode };

export function DataTable<T extends { id: string }>({ columns, data }: { columns: Column<T>[]; data: T[] }) {
  const [sort, setSort] = useState<keyof T>(columns[0].key);
  const sorted = useMemo(() => [...data].sort((a, b) => String(a[sort]).localeCompare(String(b[sort]))), [data, sort]);

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-800/60 text-slate-300">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="cursor-pointer px-4 py-3" onClick={() => setSort(col.key)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className="border-t border-slate-800">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-slate-200">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
