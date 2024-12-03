export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">À Propos de Nous</h3>
            <p className="mt-4 text-sm text-foreground/80">
              Les Plantes de Grand-père est votre source de confiance pour de belles plantes et des conseils de jardinage experts en Algérie.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Liens Rapides</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/products" className="text-foreground/80 hover:text-foreground">Produits</a>
              </li>
              <li>
                <a href="/categories" className="text-foreground/80 hover:text-foreground">Catégories</a>
              </li>
              <li>
                <a href="/about" className="text-foreground/80 hover:text-foreground">À Propos</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-foreground/80">Téléphone: +213 XX XX XX XX</li>
              <li className="text-foreground/80">Email: contact@grandpasplants.dz</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Livraison</h3>
            <p className="mt-4 text-sm text-foreground/80">
              Nous livrons dans toutes les wilayas d'Algérie. Les frais de livraison varient selon la localisation.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-foreground/80">
          <p>&copy; {new Date().getFullYear()} Les Plantes de Grand-père. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}