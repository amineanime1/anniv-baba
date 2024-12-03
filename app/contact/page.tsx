import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-playfair font-bold text-center mb-12">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Entrer en contact</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <span>+213 XX XX XX XX</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <span>contact@grandpasplants.dz</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Alger, Algérie</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Heures d'ouverture</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Lundi - Vendredi</span>
              <span>9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Samedi</span>
              <span>9:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Dimanche</span>
              <span>Fermé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}