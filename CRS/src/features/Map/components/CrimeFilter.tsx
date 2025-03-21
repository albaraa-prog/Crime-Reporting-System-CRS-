interface CrimeFilterProps {
  selectedTypes: string[];
  toggleCrimeType: (type: string) => void;
}

const CrimeFilter: React.FC<CrimeFilterProps> = ({
  selectedTypes,
  toggleCrimeType,
}) => {
  const crimeTypes = ["Assault", "Robbery", "Homicide", "Kidnapping", "Theft"];

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-lg p-3 rounded-md border border-gray-300 w-auto flex items-center space-x-4">
      <h2 className="text-sm font-semibold text-gray-800">Filter Crimes:</h2>
      {crimeTypes.map((type) => (
        <label key={type} className="flex items-center space-x-1 text-gray-700">
          <input
            type="checkbox"
            checked={selectedTypes.includes(type)}
            onChange={() => toggleCrimeType(type)}
            className="accent-blue-500"
          />
          <span className="text-sm">{type}</span>
        </label>
      ))}
    </div>
  );
};

export default CrimeFilter;
