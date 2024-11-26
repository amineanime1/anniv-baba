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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-playfair font-bold">Our Story</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                Welcome to Grandpa's Plant Shop, where our passion for plants meets decades of gardening expertise. 
                What started as a small family garden has blossomed into Algeria's trusted source for quality plants 
                and expert advice.
              </p>
              <p>
                Our mission is simple: to share the joy of gardening and help create beautiful, green spaces in homes 
                across Algeria. Every plant in our collection is carefully selected and nurtured to ensure it thrives 
                in its new home.
              </p>
              <p>
                With years of experience in plant care and cultivation, we're not just selling plants – we're 
                sharing knowledge and passion that spans generations.
              </p>
            </div>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Learn More About Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}