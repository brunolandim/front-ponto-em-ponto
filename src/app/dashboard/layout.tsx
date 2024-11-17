"use client";
import React from "react";
import useAuthGuard from "@/app/hooks/useAuthGuard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useAuthGuard();

  return (
    <div>
      <header></header>
      <main>{children}</main>
    </div>
  );
}
