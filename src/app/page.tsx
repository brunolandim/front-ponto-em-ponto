"use client";
import React, { useEffect, useState, useRef } from "react";
import { fetchUsers } from "./api/user";
import { monthNames } from "@/helpers/monthNames";
import InfoCard from "./components/InfoCards";
import UserList from "./components/UserList";

interface User {
  imagePath: string;
  name: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [hoursWorked, setHoursWorked] = useState(160);
  const [hourValue, setHourValue] = useState(94475);

  const currentMonth = monthNames[new Date().getMonth()];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    loadUsers();

    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  return (
    <div className="flex flex-col items-center max-w-[1200px] h-full m-auto">
      <div
        ref={scrollRef}
        className="flex flex-row gap-4 py-3 overflow-x-auto snap-x snap-mandatory scroll-smooth w-full max-w-full"
      >
        <InfoCard
          title={`Horas Trabalhadas em ${currentMonth}`}
          mainValue={`${hoursWorked} horas`}
          colorBox="bg-customYellow"
        />
        <InfoCard
          title={`Valor Total das Horas em ${currentMonth}`}
          mainValue={`$${hourValue.toFixed(2)}`}
          colorBox="bg-customGreen"
        />
        <InfoCard
          title={`Colaboradores Ativos em ${currentMonth}`}
          mainValue={`${users.length}`}
          colorBox="bg-customPink"
        />
      </div>
      <UserList userProp={users} />
    </div>
  );
}
