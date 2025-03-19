import { useState } from "react";
import CrimePin from "../components/UI/CrimePin";
import PopUpCard from "../components/UI/PopUpCard";

const Map = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        background: "#e0e0e0",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative" }}
      >
        <CrimePin latitude={50} longitude={50} type="Theft" />
        {hovered && (
          <PopUpCard
            type="Theft"
            description="A wallet was stolen from a parked car."
            date="March 15, 2025"
            location="Downtown Park"
          />
        )}
      </div>
    </div>
  );
};

export default Map;
