import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';

export function Settings() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-semibold text-white">Configurações gerais</p>
        <p className="text-xs text-white/50">Ajuste políticas de retenção e alertas.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">Retenção (dias)</label>
            <Input className="mt-2" placeholder="90" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">Janela de execução</label>
            <Input className="mt-2" placeholder="00:00 - 06:00" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">Webhook de alertas</label>
            <Input className="mt-2" placeholder="https://hooks.slack.com/..." />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">E-mail de notificação</label>
            <Input className="mt-2" placeholder="alerts@contoso.com" />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
          <div>
            <p className="text-sm font-semibold text-white">Criptografia em repouso</p>
            <p className="text-xs text-white/50">Protege dados armazenados automaticamente.</p>
          </div>
          <Button variant="secondary">Ativado</Button>
        </div>
      </Card>

      <Card>
        <p className="text-sm font-semibold text-white">Branding White-label</p>
        <p className="text-xs text-white/50">Personalize o painel para seus clientes.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">Upload de logo</label>
            <Input className="mt-2" type="file" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">Cor primária</label>
            <Select className="mt-2" defaultValue="laranja">
              <option value="laranja">Laranja neon</option>
              <option value="azul">Azul Microsoft</option>
              <option value="verde">Verde vibrante</option>
              <option value="vermelho">Vermelho intenso</option>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
}
