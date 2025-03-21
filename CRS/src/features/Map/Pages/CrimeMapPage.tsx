import { Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CrimeFilter from "../components/CrimeFilter";
import { useCrimes } from "../hooks/useCrimes";

const CrimeMap = () => {
  const { filteredCrimes, selectedTypes, toggleCrimeType, center } =
    useCrimes();
  const markerRefs = useRef<{ [key: number]: LeafletMarker | null }>({});

  // Crime status color mapping
  const statusColors: { [key: string]: string } = {
    Pending: "bg-yellow-500",
    "En Route": "bg-blue-500",
    "On Scene": "bg-green-500",
    "Under Investigation": "bg-purple-500",
    Resolved: "bg-gray-500",
  };

  return (
    <div className="relative w-screen h-screen">
      {/* Filter Navbar at the Top */}
      <CrimeFilter
        selectedTypes={selectedTypes}
        toggleCrimeType={toggleCrimeType}
      />

      {/* Full-Screen Map */}
      <MapContainer
        center={center} // Now this uses the center from the hook
        zoom={10}
        className="absolute top-0 left-0 w-full h-full z-40"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Crime Markers */}
        {filteredCrimes.map((crime) => (
          <Marker
            key={crime.id}
            position={[crime.latitude, crime.longitude]}
            ref={(el) => {
              markerRefs.current[crime.id] = el;
            }}
            eventHandlers={{
              mouseover: () => {
                // Open the popup when the mouse is over the marker
                markerRefs.current[crime.id]?.openPopup();
              },
              mouseout: () => {
                // Close the popup when the mouse leaves the marker
                markerRefs.current[crime.id]?.closePopup();
              },
            }}
          >
            <Popup>
              <div className="p-4 bg-white shadow-md rounded-lg w-64">
                <h4 className="text-lg font-semibold text-blue-600">
                  {crime.crime_type}
                </h4>
                <p className="text-gray-700">{crime.report_details}</p>
                <p className="text-xs text-gray-600">
                  <strong>Date:</strong> {crime.report_date_time}
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Location:</strong> {crime.latitude}, {crime.longitude}
                </p>
                <span
                  className={`mt-2 inline-block text-white text-xs font-semibold px-3 py-1 rounded-full ${
                    statusColors[crime.report_status] || "bg-gray-400"
                  }`}
                >
                  {crime.report_status}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CrimeMap;
