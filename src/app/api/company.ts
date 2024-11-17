import axios from "axios";
import toast from "react-hot-toast";
import { CreateCompanyWithAdminAPI } from "@/app/types/Company";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createCompanyWithAdmin = async (
  data: CreateCompanyWithAdminAPI.Request
): Promise<CreateCompanyWithAdminAPI.Response> => {
  try {
    const response = await axios.post<CreateCompanyWithAdminAPI.Response>(
      `${API_URL}/company/create`,
      data,
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const apiMessage = error.response.data?.message || "Erro desconhecido.";
      toast.error(`Erro: ${apiMessage}`);
    } else {
      toast.error("Erro ao conectar com a API. Tente novamente.");
    }
    console.error("Erro ao criar a empresa com administrador:", error);
    throw new Error("Não foi possível criar a empresa com o administrador.");
  }
};
