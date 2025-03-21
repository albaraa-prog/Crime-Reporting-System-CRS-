import { useEffect, useState } from "react";

interface Crime {
  id: number;
  report_details: string;
  crime_type: string;
  report_date_time: string;
  report_status: string;
  latitude: number;
  longitude: number;
}

export const useCrimes = () => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredCrimes, setFilteredCrimes] = useState<Crime[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 23.588, // Default center (Muscat)
    lng: 58.3829,
  });

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

  // Update the center based on filtered crimes
  useEffect(() => {
    if (filteredCrimes.length > 0) {
      const newCenter = getCenterCoordinates(filteredCrimes);
      setCenter(newCenter);
    }
  }, [filteredCrimes]);

  const getCenterCoordinates = (crimes: Crime[]) => {
    if (!crimes.length) return { lat: 23.588, lng: 58.3829 }; // Default center if no crimes

    const sumLat = crimes.reduce((sum, crime) => sum + crime.latitude, 0);
    const sumLng = crimes.reduce((sum, crime) => sum + crime.longitude, 0);

    return {
      lat: sumLat / crimes.length,
      lng: sumLng / crimes.length,
    };
  };

  const toggleCrimeType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return { crimes, filteredCrimes, selectedTypes, toggleCrimeType, center };
};
