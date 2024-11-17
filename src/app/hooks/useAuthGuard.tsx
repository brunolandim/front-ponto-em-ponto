"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const useAuthGuard = () => {
  const { token, isInitialized } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !token) {
      router.push("/auth/login");
    }
  }, [isInitialized, token, router]);
};

export default useAuthGuard;
