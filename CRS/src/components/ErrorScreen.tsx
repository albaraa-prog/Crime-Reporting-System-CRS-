import { Link } from "react-router-dom";

interface ErrorScreenProps {
  message: string;
  statusCode?: number;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message,
  statusCode = 500,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="bg-red-500 text-white p-6 rounded-md shadow-lg">
        <h1 className="text-4xl font-bold">Error {statusCode}</h1>
        <p className="text-xl mt-4">{message}</p>
      </div>
      <Link to="/" className="mt-6 text-blue-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorScreen;
