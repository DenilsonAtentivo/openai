import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { Badge } from '../components/Badge';
import { useToast } from '../components/Toast';

export function ConnectMicrosoft() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'Não conectado' | 'Conectando' | 'Conectado'>('Não conectado');
  const { notify } = useToast();

  const consentLink = useMemo(
    () => `https://login.microsoftonline.com/contoso.onmicrosoft.com/adminconsent?appId=${crypto.randomUUID()}`,
    []
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(consentLink);
      notify({ title: 'Link copiado', description: 'Envie para o administrador global do tenant.' });
    } catch (error) {
      notify({ title: 'Não foi possível copiar', description: 'Copie manualmente o link.' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Conectar ao Microsoft 365</p>
        <h2 className="text-2xl font-semibold text-white">Onboarding com consentimento seguro</h2>
        <p className="text-sm text-white/60">
          Ative o aplicativo multi-tenant com permissões mínimas para iniciar o backup automático.
        </p>
      </div>

      <Card className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <ul className="space-y-3 text-sm text-white/70">
            <li>• Conceder consentimento de administrador</li>
            <li>• Instalar app multi-tenant</li>
            <li>• Selecionar permissões necessárias</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setStatus('Conectando')}>Conectar com Microsoft</Button>
            <Button variant="secondary" onClick={() => setOpen(true)}>
              Ver permissões
            </Button>
            <Button variant="ghost" onClick={handleCopy}>
              Copiar link de consentimento
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-widest text-white/40">Status</p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <div>
              <p className="text-white/40">Tenant</p>
              <p className="text-white">contoso.onmicrosoft.com</p>
            </div>
            <div>
              <p className="text-white/40">Estado</p>
              <Badge tone={status === 'Conectado' ? 'success' : status === 'Conectando' ? 'warning' : 'danger'}>
                {status}
              </Badge>
            </div>
            <div>
              <p className="text-white/40">Último check</p>
              <p className="text-white">Hoje, 14:21</p>
            </div>
          </div>
        </div>
      </Card>

      <Modal title="Permissões solicitadas" open={open} onClose={() => setOpen(false)}>
        <ul className="space-y-2 text-sm">
          <li>• Backup.ReadWrite.All</li>
          <li>• SharePoint.Read.All</li>
          <li>• Files.Read.All</li>
          <li>• Exchange.ManageAsApp</li>
          <li>• Organization.Read.All</li>
        </ul>
      </Modal>
    </div>
  );
}
