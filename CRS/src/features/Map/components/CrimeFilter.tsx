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
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-semibold">Filter by Crime Type</h2>
      {crimeTypes.map((type) => (
        <label key={type} className="mr-4">
          <input
            type="checkbox"
            checked={selectedTypes.includes(type)}
            onChange={() => toggleCrimeType(type)}
            className="mr-1"
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default CrimeFilter;
