import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/Auth/pages/LoginPage";
import SignupPage from "./features/Auth/pages/SignupPage";
import ProtectedRoute from "./features/Auth/routes/ProtectedRoute";
import CrimeMap from "./features/Map/pages/CrimeMapPage";
import Toast from "./shared/components/UI/ToastMsg";

const App: React.FC = () => {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CrimeMap />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
