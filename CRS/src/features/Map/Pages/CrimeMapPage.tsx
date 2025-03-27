import { Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CrimeFilter from "../components/CrimeFilter";
import { useMap } from "../hooks/useMap";

const CrimeMap = () => {
  const { filteredCrimes, selectedTypes, toggleCrimeType, center, addCrime } =
    useMap();
  const markerRefs = useRef<{ [key: number]: LeafletMarker | null }>({});
  const [showForm, setShowForm] = useState(false);
  const [newCrime, setNewCrime] = useState({
    report_details: "",
    crime_type: "",
    latitude: center.lat,
    longitude: center.lng,
  });

  // Crime status color mapping
  const statusColors = {
    Pending: "bg-yellow-500",
    "En Route": "bg-blue-500",
    "On Scene": "bg-green-500",
    "Under Investigation": "bg-purple-500",
    Resolved: "bg-gray-500",
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addCrime({
      id: Date.now(),
      ...newCrime,
      report_date_time: new Date().toISOString(),
      report_status: "Pending",
    });
    setShowForm(false);
  };

  return (
    <div className="relative w-screen h-screen">
      <CrimeFilter
        selectedTypes={selectedTypes}
        toggleCrimeType={toggleCrimeType}
      />
      <button
        className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        onClick={() => setShowForm(true)}
      >
        Report Crime
      </button>
      {showForm && (
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50">
          <h3 className="text-lg font-bold mb-2">Report a Crime</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Crime Type"
              className="w-full p-2 border rounded mb-2"
              value={newCrime.crime_type}
              onChange={(e) =>
                setNewCrime({ ...newCrime, crime_type: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Details"
              className="w-full p-2 border rounded mb-2"
              value={newCrime.report_details}
              onChange={(e) =>
                setNewCrime({ ...newCrime, report_details: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      <MapContainer
        center={center}
        zoom={10}
        className="absolute top-0 left-0 w-full h-full z-40"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredCrimes.map((crime) => (
          <Marker
            key={crime.id}
            position={[crime.latitude, crime.longitude]}
            ref={(el) => {
              markerRefs.current[crime.id] = el;
            }}
            eventHandlers={{
              mouseover: () => markerRefs.current[crime.id]?.openPopup(),
              mouseout: () => markerRefs.current[crime.id]?.closePopup(),
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
                    statusColors[
                      crime.report_status as keyof typeof statusColors
                    ] || "bg-gray-400"
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
