import { useEffect, useState } from "react";

interface CrimeReportForm {
  id: number;
  details: string;
  type: string;
  nationalId: number;
  latitude: number;
  longitude: number;
  status: string;
  reportTime: string;
}

export const useCrimes = () => {
  const [crimes, setCrimes] = useState<CrimeReportForm[]>([]);

  useEffect(() => {
    const storedCrimes = localStorage.getItem("crimes");
    if (storedCrimes) {
      setCrimes(JSON.parse(storedCrimes));
    }
  }, []);

  const addCrime = (
    newCrime: Omit<CrimeReportForm, "id" | "reportTime" | "status">
  ) => {
    const crimeData: CrimeReportForm = {
      ...newCrime,
      id: Date.now(),
      reportTime: new Date().toISOString(),
      status: "Pending",
    };
    const updatedCrimes = [...crimes, crimeData];
    setCrimes(updatedCrimes);
    localStorage.setItem("crimes", JSON.stringify(updatedCrimes));
  };

  return { crimes, addCrime };
};
