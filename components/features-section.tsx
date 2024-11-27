"use client";

import { motion } from "framer-motion";
import { Leaf, Truck, Shield, ThumbsUp } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Premium Quality Plants",
    description: "Hand-picked, healthy plants nurtured by expert gardeners",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "Safe delivery to all 58 wilayas across Algeria",
  },
  {
    icon: Shield,
    title: "Plant Health Guarantee",
    description: "30-day guarantee on all plants with expert care guidance",
  },
  {
    icon: ThumbsUp,
    title: "Expert Support",
    description: "Dedicated plant care support from our experienced team",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-playfair font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to bringing nature into your home with the highest quality plants and exceptional service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-lg bg-background shadow-lg"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

