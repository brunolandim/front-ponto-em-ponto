"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CaretLeft, ShieldCheck } from "phosphor-react";
import { useUser } from "@/app/context/UserContext";
import { confirmationCodeAuthorization } from "@/app/api/auth";

const VerifyCodePage = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentEmail, setUserAndToken, user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!currentEmail) {
      toast.error("Email não encontrado. Por favor, faça login novamente.");
      router.push("/auth/login");
      return;
    }

    const response = await confirmationCodeAuthorization({ email: currentEmail, shortCode: code });
    const { token, user } = response.data;

    setUserAndToken(user, token);
    toast.success("Código verificado com sucesso!");
    router.push("/dashboard");
    setLoading(false);
  };

  const handleResendCode = () => {
    setLoading(true);
    toast.loading("Reenviando código...");

    setTimeout(() => {
      toast.dismiss();
      toast.success(`Código reenviado para ${currentEmail}`);
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    if (!currentEmail) {
      router.push("/auth/login");
    }
  }, [currentEmail, router]);

  return (
    <div>
      <div className="absolute top-4 left-4  cursor-pointer flex items-center gap-1" onClick={() => router.back()}>
        <CaretLeft width={20} height={20} />
        Voltar
      </div>
      <h2 className="text-3xl font-bold text-center mb-6">Verificar Código</h2>
      <p className="text-center mb-6">Insira o código enviado para o seu email.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Digite o código"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none text-black"
          />
        </div>
        <Button
          type="submit"
          children="Verificar"
          isLoading={loading}
          icon={<ShieldCheck size={20} color="white" />}
          iconPosition="right"
          className="bg-orange-500 hover:bg-orange-400"
        />
      </form>
      <div className="mt-6 text-center">
        <p className="">
          Não recebeu o código??{" "}
          <a href="#" className="text-orange-400 hover:underline font-medium" onClick={handleResendCode}>
            Clique aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default VerifyCodePage;
