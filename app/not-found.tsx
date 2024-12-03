import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-playfair font-bold mb-4">Page non trouvée</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Désolé, nous n'avons pas pu trouver la page que vous recherchez.
      </p>
      <Link href="/">
        <Button>Retour à l'accueil</Button>
      </Link>
    </div>
  );
}