"use client";

import { motion } from "framer-motion";
import { Brain, Eye, Gamepad2, Layout, Shield } from "lucide-react";
const iconMap = {
  Eye,
  Brain,
  Layout,
  Gamepad2,
  Shield,
};

export default function FeatureCard({ title, description, icon }) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 hover:bg-zinc-800/80 transition-colors"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-xl"></div>

      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20 text-blue-500">
          {Icon && <Icon className="h-6 w-6" />}
        </div>

        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-zinc-400">{description}</p>

        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
          <span>Learn more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
