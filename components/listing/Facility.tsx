import React, { useMemo } from "react";
import { facility } from "../shared/Fasilitas";
import Fas from "./Fas";

interface FacilityProps {
  key: string;
  label: string;
}

const Facility: React.FC<FacilityProps> = ({ label }) => {
  const fasilitas = useMemo(() => {
    return facility.find((item) => item.label === label);
  }, []);
  return (
    <div>
      {fasilitas && (
        <Fas
          icon={fasilitas.icon}
          label={fasilitas.label}
        />
      )}
    </div>
  );
};

export default Facility;
