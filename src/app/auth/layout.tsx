// src/app/auth/layout.tsx
import Image from "next/image";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-2/5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-lg m-auto text-white">{children}</div>
      </div>

      <div className="hidden w-3/5 h-full bg-white md:flex items-center justify-center">
        <Image
          src="/images/defaultImage.jpg"
          alt="Imagem de autenticação"
          width={850}
          height={850}
          className="object-contain"
        />
      </div>
    </div>
  );
}
