"use client";
import React, { useEffect, useState } from "react";

interface User {
  imagePath: string;
  name: string;
}

interface UserListProps {
  userProp: User[];
}

const UserList: React.FC<UserListProps> = ({ userProp }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const userSlice = userProp.slice(0, 9);
    setUsers(userSlice);
  }, [userProp]);

  const handleAddUser = () => {
    const newUser: User = {
      imagePath: "/images/new-user.jpg",
      name: `Usuário ${users.length + 1}`,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="flex items-center -space-x-4 py-3 w-full justify-center">
      <div className="flex -space-x-6">
        {users.map((user, index) => (
          <img
            key={index}
            src={user.imagePath || "/images/userDefalut.png"}
            alt={user.name}
            className="w-14 h-14 rounded-full border border-gray-300"
          />
        ))}
      </div>

      <button
        onClick={handleAddUser}
        className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400"
      >
        <span className="text-3xl font-bold">+</span>
      </button>
    </div>
  );
};

export default UserList;
