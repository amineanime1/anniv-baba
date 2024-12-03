"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Our garden"
              fill
              className="object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-primary/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-playfair font-bold">Notre Histoire</h2>
            <div className="space-y-4 text-foreground/80">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Bienvenue chez Les Plantes de Grand-père, où notre passion pour les plantes rencontre des décennies d'expertise en jardinage. 
                Ce qui a commencé comme un petit jardin familial est devenu la source de confiance de l'Algérie pour des plantes de qualité 
                et des conseils d'experts.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Notre mission est simple : partager la joie du jardinage et aider à créer de beaux espaces verts dans les maisons 
                à travers l'Algérie. Chaque plante de notre collection est soigneusement sélectionnée et entretenue pour s'assurer qu'elle 
                prospère dans son nouveau foyer.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Avec des années d'expérience dans les soins et la culture des plantes, nous ne vendons pas seulement des plantes – nous 
                partageons des connaissances et une passion qui s'étendent sur des générations.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/about">
                <Button variant="outline" size="lg">
                  En Savoir Plus Sur Nous
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

