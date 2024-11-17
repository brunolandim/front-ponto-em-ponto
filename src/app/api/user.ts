// src/services/userService.ts

import axios from "axios";
import { GetUserById } from "../types/User";

export interface User {
  imagePath: string;
  name: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserById = async (id: string, token: string) => {

  try {
    const response = await axios.get<GetUserById.Response>(`${API_URL}/user/userid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    throw error;
  }
};

export const fetchUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { imagePath: 'images/user.jpg', name: 'Usuário 1' },
        { imagePath: '', name: 'Usuário 2' },
        { imagePath: 'images/user.jpg', name: 'Usuário 3' },
        { imagePath: 'images/user.jpg', name: 'Usuário 4' },
        { imagePath: '', name: 'Usuário 5' },
        { imagePath: 'images/user.jpg', name: 'Usuário 6' },
        { imagePath: 'images/user.jpg', name: 'Usuário 7' },
        { imagePath: 'images/user.jpg', name: 'Usuário 8' },
        { imagePath: 'images/user.jpg', name: 'Usuário 9' },
        { imagePath: 'images/user.jpg', name: 'Usuário 10' },
        { imagePath: 'images/user.jpg', name: 'Usuário 11' },
        { imagePath: 'images/user.jpg', name: 'Usuário 12' },
        { imagePath: 'images/user.jpg', name: 'Usuário 13' },
        { imagePath: 'images/user.jpg', name: 'Usuário 14' },
        { imagePath: 'images/user.jpg', name: 'Usuário 15' },
      ]);
    }, 1000);
  });
};
