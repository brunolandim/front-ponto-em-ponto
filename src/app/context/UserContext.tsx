"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchUserById } from "../api/user";

interface Company {
  id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  company: Company;
}

interface UserContextProps {
  user: User | null;
  token: string | null;
  currentEmail: string | null;
  isInitialized: boolean;
  setUserAndToken: (user: User, token: string) => void;
  setCurrentEmail: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");

      if (storedToken && storedUserId) {
        try {
          const fetchedUser = await fetchUserById(storedUserId, storedToken);

          setUser(fetchedUser.data);
          setToken(storedToken);
        } catch (error) {
          console.error("Erro ao buscar o usuário:", error);
          logout();
        }
      }
      setIsInitialized(true);
    };

    initializeUser();
  }, []);

  const setUserAndToken = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider
      value={{ user, token, isInitialized, currentEmail, setCurrentEmail, setUserAndToken, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
