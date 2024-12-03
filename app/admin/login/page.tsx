"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

// In a real app, these would be stored securely
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // In a real app, we'd set a secure session/token
      localStorage.setItem('isAdmin', 'true');
      document.cookie = "isAdmin=true; path=/admin; httpOnly: true; secure: true;  SameSite=Strict";
      router.push('/admin');
    } else {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Accès Administrateur</h1>
          <p className="mt-2 text-muted-foreground">
            Connectez-vous pour accéder au tableau de bord administrateur
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded-lg shadow-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom d'utilisateur</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Mot de passe</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>

        <p className="mt-4 text-center text-md text-muted-foreground">
          Si la connexion ne fonctionne pas, veuillez recharger la page et réessayer.
        </p>
      </div>
    </div>
  );
}