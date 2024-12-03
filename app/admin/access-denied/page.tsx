import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Accès Refusé</h1>
        <p className="text-muted-foreground mb-6">
          Vous n'avez pas la permission d'accéder à la zone administrateur. Veuillez contacter l'administrateur du système.
        </p>
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">Retour à la page d'accueil</Button>
          </Link>
          <Link href="/admin/login">
            <Button variant="outline" className="w-full">Essayer un autre compte</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}