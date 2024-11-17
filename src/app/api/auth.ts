import axios from "axios";
import toast from "react-hot-toast";
import { ConfirmationCodeAuthorization, RequestConfirmationCode } from "../types/Auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const requestConfirmationCode = async (
  data: RequestConfirmationCode.Request
): Promise<RequestConfirmationCode.Response> => {
  try {
    const response = await axios.post<RequestConfirmationCode.Response>(
      `${API_URL}/auth/request-confirmation-code`,
      data
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const apiMessage = error.response.data?.message || "Erro desconhecido na solicitação.";
      toast.error(`Erro: ${apiMessage}`);
    } else {
      toast.error("Erro ao conectar com a API. Tente novamente.");
    }

    console.error("Erro ao solicitar o código de confirmação:", error);
    throw new Error("Não foi possível solicitar o código de confirmação.");
  }
};


export const confirmationCodeAuthorization = async (
  data: ConfirmationCodeAuthorization.Request
): Promise<ConfirmationCodeAuthorization.Response> => {
  try {
    const response = await axios.post<ConfirmationCodeAuthorization.Response>(
      `${API_URL}/auth/confirmation-code-authorization`,
      data
    );

    toast.success("Código verificado com sucesso!");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const apiMessage = error.response.data?.message || "Erro desconhecido na verificação do código.";
      toast.error(`Erro: ${apiMessage}`);
    } else {
      toast.error("Erro ao conectar com a API. Tente novamente.");
    }

    console.error("Erro ao verificar o código de confirmação:", error);
    throw new Error("Não foi possível verificar o código de confirmação.");
  }
};