import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CrimeFilter from "../components/CrimeFilter";

// Define the type for a crime object
interface Crime {
  id: number;
  report_details: string;
  crime_type: string;
  report_date_time: string;
  report_status: string;
  latitude: number;
  longitude: number;
}

const CrimeMap = () => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredCrimes, setFilteredCrimes] = useState<Crime[]>([]);

  const defaultCenter: LatLngExpression = [23.588, 58.3829];

  useEffect(() => {
    fetch("/data/crimes.json")
      .then((res) => res.json())
      .then((data) => setCrimes(data.crimes))
      .catch((err) => console.error("Error fetching crimes:", err));
  }, []);

  useEffect(() => {
    setFilteredCrimes(
      selectedTypes.length === 0
        ? crimes
        : crimes.filter((crime) => selectedTypes.includes(crime.crime_type))
    );
  }, [selectedTypes, crimes]);

  // Function to toggle selected crime types
  const toggleCrimeType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div>
      <CrimeFilter
        selectedTypes={selectedTypes}
        toggleCrimeType={toggleCrimeType}
      />
      <MapContainer
        center={defaultCenter}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredCrimes.map((crime) => (
          <Marker key={crime.id} position={[crime.latitude, crime.longitude]}>
            <Popup>
              <strong>{crime.crime_type}</strong>
              <p>{crime.report_details}</p>
              <p>
                <strong>Date:</strong> {crime.report_date_time}
              </p>
              <p>
                <strong>Status:</strong> {crime.report_status}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeMap;
