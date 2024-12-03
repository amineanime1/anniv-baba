"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase/config";
import { Loader2 } from "lucide-react";

const steps = [
  {
    title: "Bienvenue dans le panneau d'administration",
    description: "Commençons par vous fournir tout ce dont vous avez besoin pour gérer votre boutique de plantes.",
    content: (
      <div className="space-y-4">
        <p>En tant qu'administrateur, vous pourrez :</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Gérer les produits et les stocks</li>
          <li>Traiter et suivre les commandes</li>
          <li>Définir les frais de livraison par région</li>
          <li>Consulter les analyses et les rapports</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Gestion des produits",
    description: "Apprenez à gérer votre catalogue de produits.",
    content: (
      <div className="space-y-4">
        <p>Conseils rapides pour la gestion des produits :</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Utilisez des images de haute qualité pour les produits</li>
          <li>Maintenez les niveaux de stock à jour</li>
          <li>Fixez des prix compétitifs</li>
          <li>Rédigez des descriptions détaillées</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Traitement des commandes",
    description: "Comprendre le processus de traitement des commandes.",
    content: (
      <div className="space-y-4">
        <p>Étapes de traitement des commandes :</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Examinez les nouvelles commandes quotidiennement</li>
          <li>Mettez à jour le statut des commandes rapidement</li>
          <li>Coordonnez avec les partenaires de livraison</li>
          <li>Gérez les demandes des clients</li>
        </ul>
      </div>
    ),
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    if (!supabase) return;
    
    setIsCompleting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await supabase.auth.updateUser({
          data: {
            onboarding_completed: true,
          },
        });
      }
      
      router.push('/admin');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4">
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>{steps[currentStep].content}</CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(current => current - 1)}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleComplete} disabled={isCompleting}>
              {isCompleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Compléter l'intégration
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(current => current + 1)}>
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}