import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-playfair font-bold text-center mb-12">À propos de la boutique de Les Plantes de Grand-père</h1>
        
        <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Our garden"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            Bienvenue à la boutique de plantes de grand-père, où notre passion pour les plantes rencontre des décennies d'expertise en jardinage.
            Ce qui a commencé comme un petit jardin familial est devenu la source de confiance de l'Algérie pour des plantes de qualité
            et des conseils d'experts.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            Notre mission est simple : partager la joie du jardinage et aider à créer de beaux espaces verts dans les maisons
            à travers l'Algérie. Chaque plante de notre collection est soigneusement sélectionnée et entretenue pour s'assurer qu'elle prospère
            dans sa nouvelle maison.
          </p>

          <p className="text-lg leading-relaxed">
            Avec des années d'expérience dans le soin et la culture des plantes, nous ne vendons pas seulement des plantes – nous partageons
            des connaissances et une passion qui traversent les générations. Que vous soyez un jardinier chevronné ou que vous commenciez
            votre aventure avec les plantes, nous sommes là pour aider votre famille verte à grandir.
          </p>
        </div>
      </div>
    </div>
  );
}