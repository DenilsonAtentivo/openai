import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function Login() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center px-6">
      <div className="glass-card w-full max-w-md rounded-3xl border border-white/10 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Microsoft 365 Backup</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">Bem-vindo de volta</h1>
        <p className="mt-2 text-sm text-white/60">
          Entre para monitorar backups críticos e proteger dados corporativos.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">E-mail</label>
            <Input className="mt-2" placeholder="voce@empresa.com" type="email" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50">Senha</label>
            <Input className="mt-2" placeholder="••••••••" type="password" />
          </div>
        </div>
        <Button className="mt-6 w-full">Entrar</Button>
        <div className="mt-5 text-center text-xs text-white/60">
          <Link to="/" className="text-neon-blue hover:text-neon-blue/70">
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
}
