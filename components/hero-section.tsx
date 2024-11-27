"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from 'lucide-react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ACTIVE_USERS = [
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    name: "Sarah"
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
    name: "Emma"
  },
  {
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=faces",
    name: "Alex"
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=64&h=64&fit=crop&crop=faces",
    name: "Lisa"
  }
];

export function HeroSection() {
  return (
    <div className="relative min-h-[70vh] flex items-center bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-[10%] left-[10%]"
            >
          
        <img src="/dot.png" className="opacity-25 w-[150px]" />
          
        </motion.div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold tracking-tight text-foreground font-playfair lg:text-6xl">
                Proper care
                <span className="block text-[#4CAF50] dark:text-[#6ECF73] mt-2">
                  of Plants
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                Caring for indoor plants is a pleasant activity that can turn into a real hobby.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="rounded-full px-8"
                  >
                    Explore More
                  </Button>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 flex flex-col items-start gap-6"
              >
                <div className="flex items-start gap-6">
                  <div className="relative overflow-hidden rounded-xl w-32 h-24 bg-muted">
                    <a href="https://youtu.be/1ao2841cwwI?si=2EQ5stVlXRV0-Bpr" className="pointer" target="blank_">
                      <Image
                        src="/hero-section-image.webp?height=96&width=128"
                        alt="Plant care video thumbnail"
                        width={128}
                        height={96}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-background/90 p-2">
                          <Play className="w-4 h-4 text-foreground" />
                        </div>
                      </div>
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Useful video</p>
                    <p className="text-sm font-medium text-foreground">tips and tricks for plant care</p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-4 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border shadow-sm"
                >
                  <div className="flex -space-x-3">
                    {ACTIVE_USERS.map((user, i) => (
                      <Avatar
                        key={i}
                        className="w-8 h-8 border-2 border-background ring-0"
                      >
                        <AvatarImage
                          src={user.image}
                          alt={user.name}
                          className="object-cover"
                        />
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">42,567</span>
                    <span className="text-muted-foreground ml-1">plant enthusiasts online</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative lg:h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] lg:h-full rounded-2xl overflow-hidden"
            >
              <Image
                src="/hero-section-main-image.jpg?height=600&width=600"
                alt="Plant care demonstration"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -right-12 top-1/2 -translate-y-1/2"
            >
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}