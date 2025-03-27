import React, { useState } from "react";

interface CrimeFormProps {
  addCrime: (crime: {
    details: string;
    type: string;
    nationalId: number;
    latitude: number;
    longitude: number;
  }) => void;
}

const CrimeReportForm: React.FC<CrimeFormProps> = ({ addCrime }) => {
  const [formData, setFormData] = useState({
    details: "",
    type: "Assault",
    nationalId: "",
    latitude: "",
    longitude: "",
  });

  const [isOpen, setIsOpen] = useState(false); // Controls form visibility

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCrime({
      details: formData.details,
      type: formData.type,
      nationalId: Number(formData.nationalId),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
    });
    setFormData({
      details: "",
      type: "Assault",
      nationalId: "",
      latitude: "",
      longitude: "",
    });
    setIsOpen(false); // Close form after submission
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-700"
      >
        + Report Crime
      </button>

      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Report a Crime
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">Report Details:</label>
              <input
                type="text"
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />

              <label className="block">Crime Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option>Assault</option>
                <option>Robbery</option>
                <option>Homicide</option>
                <option>Kidnapping</option>
              </select>

              <label className="block">National ID:</label>
              <input
                type="number"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />

              <label className="block">
                Crime Location (Latitude & Longitude):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CrimeReportForm;
