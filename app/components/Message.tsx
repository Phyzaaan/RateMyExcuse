import Image from "next/image";
import React from "react";

interface props {
  imgUrl: string;
  color: string;
  align?: "left";
  children: React.ReactNode;
}

export default function Message({
  imgUrl,
  align,
  color,
  children,
}: props) {
  return (
    <div
      className={`flex items-end gap-2 w-full ${!align ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-full bg-${color} overflow-hidden shrink-0 flex items-center justify-center`}
      >
        <Image
          src={imgUrl}
          alt="Avatar"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
      
      <div className={`flex flex-col gap-1 max-w-[85%] ${!align ? "items-end" : "items-start"}`}>
        <div
          className={`bg-${color} text-primary px-4 pr-6 py-2.5 rounded-2xl ${align ? "rounded-bl-sm" : "rounded-br-sm"} text-sm font-medium shadow-sm`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}