// components/InfoCard.js
import React from "react";

interface InfoCardProps {
  title: string;
  mainValue: string;
  description?: string;
  colorBox?: string;
}

function InfoCard({ title, mainValue, colorBox }: InfoCardProps) {
  return (
    <div className={`p-6 rounded-3xl  min-w-[250px] min-h-[132px] shadow-lg ${colorBox} text-customGray`}>
      {/* Título e valor principal */}
      <div className="flex  flex-col  justify-center h-full w-full ">
        <p className="text-gray-600 font-semibold text-sm">{title}</p>
        <h2 className="text-4xl font-bold mt-1 ">{mainValue}</h2>
      </div>
    </div>
  );
}

export default InfoCard;
