"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Amrani",
    role: "Passionnée de plantes",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content: "La qualité des plantes que j'ai reçues a dépassé mes attentes. L'équipe du service client a été incroyablement utile pour me donner des conseils sur l'entretien des plantes."
  },
  {
    name: "Karim Benali",
    role: "Designer d'intérieur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content: "Je m'approvisionne régulièrement en plantes pour mes projets de design chez La Boutique de Plantes de Grand-père. Leur sélection et leur qualité sont inégalées."
  },
  {
    name: "Amina Khelifi",
    role: "Jardinière à domicile",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    content: "Les plantes sont arrivées en parfait état, et les instructions d'entretien étaient très utiles. Je commanderai à nouveau sans hésiter !"
  }  
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-playfair font-bold mb-4">Ce que disent nos clients</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ne vous contentez pas de nous croire sur parole - écoutez nos clients satisfaits à travers l'Algérie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 mb-6">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}