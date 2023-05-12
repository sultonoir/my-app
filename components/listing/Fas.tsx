import React from "react";
import { IconType } from "react-icons";

interface FasProps {
  icon: IconType;
  label: string;
}
const Fas: React.FC<FasProps> = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon
          size={20}
          className="text-lg font-semibold"
        />
        <div className="font-light text-neutral-500">{label}</div>
      </div>
    </div>
  );
};

export default Fas;
