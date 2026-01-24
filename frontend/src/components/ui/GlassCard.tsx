"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import React from "react";


export default function GlassCard({ children, className = "" }: any) {
  return (
    <div className={`rounded-xl border border-white/10 bg-white/5 p-4 ${className}`}>
      {children}
    </div>
  );
}
