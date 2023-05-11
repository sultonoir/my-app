"use client";

import { IconType } from "react-icons";
import { BsSnow, BsWifi } from "react-icons/bs";
import { MdOutlineDesk } from "react-icons/md";

export const facility = [
  {
    label: "AC",
    icon: BsSnow,
  },
  {
    label: "Wifi",
    icon: BsWifi,
  },
  {
    label: "Area kerja khusus",
    icon: MdOutlineDesk,
  },
];

interface FasilitasProps {
  icon: IconType;
  label: string;
  selected?: string[];
  onClick: (value: string[]) => void;
}

const Fasilitas: React.FC<FasilitasProps> = ({
  icon: Icon,
  label,
  selected = [],
  onClick,
}) => {
  const handleClick = () => {
    const index = selected.indexOf(label);
    if (index === -1) {
      onClick([...selected, label]);
    } else {
      const newSelected = [...selected];
      newSelected.splice(index, 1);
      onClick(newSelected);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected.includes(label) ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default Fasilitas;
