import React from "react";

interface CrimePinProps {
  latitude: number;
  longitude: number;
  type: string;
  onClick?: () => void;
}

const CrimePin: React.FC<CrimePinProps> = ({
  latitude,
  longitude,
  type,
  onClick,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: `${latitude}%`,
        left: `${longitude}%`,
        cursor: "pointer",
        color: "red",
        fontSize: "1.5rem",
      }}
      title={type}
      onClick={onClick}
    >
      📍
    </div>
  );
};

export default CrimePin;
