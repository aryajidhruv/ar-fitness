"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TransformationsPage() {
  // Sample transformation data for AR Fitness
  const transformations = [
    {
      id: 1,
      name: "Client Transformation 1",
      duration: "12 Weeks",
      goal: "Fat Loss & Muscle Gain",
      beforeImg: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop",
      afterImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop",
      testimonial: "Ajit's guidance completely changed my approach to nutrition and heavy lifting.",
    },
    // Add more transformation objects here as needed
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 selection:bg-white selection:text-black">
      <div className="max-w-[1400px] mx-auto">
        {/* Header / Back button */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="font-cond font-bold text-xs uppercase tracking-[0.18em] text-neutral-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
          <span className="font-display font-black text-xl tracking-wider">AR FITNESS</span>
        </div>

        {/* Title Section */}
        <div className="mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight mb-4"
          >
            Real Results. <span className="text-neutral-500">Real Timelines.</span>
          </motion.h1>
          <p className="text-neutral-400 font-body text-base sm:text-lg max-w-xl">
            Explore verifiable body transformations achieved under Ajit Singh's strength and conditioning protocols at AR Fitness.
          </p>
        </div>

        {/* Transformations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {transformations.map((item) => (
            <div key={item.id} className="bg-neutral-950 border border-neutral-800 p-6 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-[300px] w-full">
                  <span className="absolute top-2 left-2 z-10 bg-black/70 text-white font-cond text-[10px] uppercase px-2 py-1 tracking-widest border border-white/20">
                    Before
                  </span>
                  <Image
                    src={item.beforeImg}
                    alt={`${item.name} Before`}
                    fill
                    className="object-cover filter grayscale contrast-125"
                  />
                </div>
                <div className="relative h-[300px] w-full">
                  <span className="absolute top-2 left-2 z-10 bg-white text-black font-cond text-[10px] uppercase px-2 py-1 tracking-widest font-black">
                    After
                  </span>
                  <Image
                    src={item.afterImg}
                    alt={`${item.name} After`}
                    fill
                    className="object-cover filter grayscale contrast-125"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-display font-bold text-xl uppercase tracking-wide">{item.name}</h3>
                  <span className="font-cond text-xs uppercase tracking-widest text-neutral-400 bg-neutral-900 px-3 py-1">
                    {item.duration}
                  </span>
                </div>
                <p className="text-neutral-300 text-sm font-body italic">"{item.testimonial}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}