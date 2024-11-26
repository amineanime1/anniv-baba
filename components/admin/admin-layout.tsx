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
    title: "Welcome to the Admin Panel",
    description: "Let's get you set up with everything you need to manage your plant shop.",
    content: (
      <div className="space-y-4">
        <p>As an admin, you'll be able to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Manage products and inventory</li>
          <li>Process and track orders</li>
          <li>Set delivery fees by region</li>
          <li>View analytics and reports</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Products Management",
    description: "Learn how to manage your product catalog.",
    content: (
      <div className="space-y-4">
        <p>Quick tips for product management:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Use high-quality images for products</li>
          <li>Keep stock levels updated</li>
          <li>Set competitive prices</li>
          <li>Write detailed descriptions</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Order Processing",
    description: "Understanding the order fulfillment process.",
    content: (
      <div className="space-y-4">
        <p>Order processing steps:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Review new orders daily</li>
          <li>Update order status promptly</li>
          <li>Coordinate with delivery partners</li>
          <li>Handle customer inquiries</li>
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
              Complete Onboarding
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