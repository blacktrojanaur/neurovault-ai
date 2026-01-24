import React from "react";
import clsx from "clsx";

export default function GlassCard({ children, className }: any) {
  return (
    <div
      className={clsx(
        "bg-black/60 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
export  function Card({ children, className }: any) {
  return (
    <div
      className={clsx(
        "bg-black/60 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}


export function CardHeader({ children, className }: any) {
  return (
    <div className={clsx("p-4 border-b border-purple-500/20", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: any) {
  return (
    <h3 className={clsx("text-lg font-bold text-purple-300", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: any) {
  return (
    <p className={clsx("text-sm text-gray-400", className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: any) {
  return (
    <div className={clsx("p-4", className)}>
      {children}
    </div>
  );
}
