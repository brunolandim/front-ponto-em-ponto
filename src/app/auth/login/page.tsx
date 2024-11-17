"use client";
import React, { useState } from "react";
import Button from "@/app/components/Button";
import { CaretLeft, EnvelopeSimple } from "phosphor-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { requestConfirmationCode } from "@/app/api/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentEmail, setUserAndToken } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await requestConfirmationCode({ email });

    toast.success("Código enviado com sucesso!");
    setCurrentEmail(email);
    router.push("/auth/verify-code");
    setLoading(false);
  };

  return (
    <div>
      <div className="absolute top-4 left-4  cursor-pointer flex items-center gap-1" onClick={() => router.back()}>
        <CaretLeft width={20} height={20} />
        Voltar
      </div>
      <h2 className="text-3xl font-bold text-center mb-6">Bem-vindo!</h2>
      <p className="text-center mb-6">Insira seu email para acessar sua conta.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@dominio.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none text-black"
          />
        </div>
        <Button
          type="submit"
          children="Enviar código"
          isLoading={loading}
          icon={<EnvelopeSimple size={20} color="white" />}
          iconPosition="right"
          className="bg-orange-500 hover:bg-orange-400"
        />
      </form>
      <div className="mt-6 text-center">
        <p className="">
          Não possui uma conta?{" "}
          <a href="/auth/register" className="text-orange-400 hover:underline font-medium">
            Registre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
