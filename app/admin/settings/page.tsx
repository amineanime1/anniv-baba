import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-5xl font-bold text-primary">Cette page ne fonctionne pas pour le moment</h1>
      <h1 className="text-3xl font-bold">Paramètres</h1>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Informations sur le magasin</h2>
          <div className="grid gap-4 max-w-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du magasin</label>
              <Input defaultValue="Magasin de plantes de grand-père" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email de contact</label>
              <Input defaultValue="contact@grandpasplants.dz" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Numéro de téléphone</label>
              <Input defaultValue="+213 XX XX XX XX" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Compte administrateur</h2>
          <div className="grid gap-4 max-w-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom d'utilisateur</label>
              <Input type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nouveau mot de passe</label>
              <Input type="password" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmer le mot de passe</label>
              <Input type="password" />
            </div>
          </div>
        </div>

        <Button>Enregistrer les modifications</Button>
      </div>
    </div>
  );
}