import React from "react";

interface PopUpCardProps {
  type: string;
  description: string;
  date: string;
  location: string;
}

const PopUpCard: React.FC<PopUpCardProps> = ({
  type,
  description,
  date,
  location,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        width: "200px",
      }}
    >
      <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>{type}</h4>
      <p style={{ margin: "0 0 5px 0", fontSize: "0.9rem", color: "#555" }}>
        {description}
      </p>
      <p style={{ margin: "0 0 5px 0", fontSize: "0.8rem", color: "#777" }}>
        <strong>Date:</strong> {date}
      </p>
      <p style={{ margin: "0", fontSize: "0.8rem", color: "#777" }}>
        <strong>Location:</strong> {location}
      </p>
    </div>
  );
};

export default PopUpCard;
