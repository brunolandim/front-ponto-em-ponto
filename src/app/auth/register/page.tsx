"use client";
import React from "react";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CaretLeft, ArrowRight, Buildings, User, EnvelopeSimple } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCompanyWithAdmin } from "@/app/api/company";

interface FormInputs {
  companyName: string;
  adminName: string;
  adminEmail: string;
}

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    toast.loading("Enviando...");
    await createCompanyWithAdmin({
      companyData: { name: data.companyName },
      adminData: {
        email: data.adminEmail,
        name: data.adminName,
        role: "admin",
      },
    });
    toast.dismiss();
    toast.success("Cadastro realizado com sucesso!");
    router.push("/auth/login");
  };

  return (
    <div>
      <div className="absolute top-4 left-4 cursor-pointer flex items-center gap-1" onClick={() => router.back()}>
        <CaretLeft width={20} height={20} />
        Voltar
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">Registrar</h2>
      <p className="text-center mb-6">Preencha os dados para criar sua conta.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium mb-2">
            <Buildings width={30} height={30} />
          </label>
          <input
            id="companyName"
            {...register("companyName", { required: "O nome da empresa é obrigatório." })}
            placeholder="Digite o nome da empresa"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none text-black"
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
        </div>

        <div>
          <label htmlFor="adminName" className="block text-sm font-medium mb-2">
            <User width={30} height={30} />
          </label>
          <input
            id="adminName"
            {...register("adminName", { required: "O nome do administrador é obrigatório." })}
            placeholder="Digite o nome do administrador"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none text-black"
          />
          {errors.adminName && <p className="text-red-500 text-sm mt-1">{errors.adminName.message}</p>}
        </div>

        <div>
          <label htmlFor="adminEmail" className="block text-sm font-medium mb-2">
            <EnvelopeSimple width={30} height={30} />
          </label>
          <input
            id="adminEmail"
            type="email"
            {...register("adminEmail", {
              required: "O email é obrigatório.",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Digite um email válido." },
            })}
            placeholder="Digite o email do administrador"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none text-black"
          />
          {errors.adminEmail && <p className="text-red-500 text-sm mt-1">{errors.adminEmail.message}</p>}
        </div>

        <Button
          type="submit"
          children="Registrar"
          isLoading={isSubmitting}
          className="bg-orange-500 hover:bg-orange-400"
          icon={<ArrowRight width={20} height={20} />}
          iconPosition="right"
        />
      </form>
    </div>
  );
};

export default RegisterPage;
