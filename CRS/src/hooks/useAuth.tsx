import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state when authentication state changes
      setLoading(false); // Set loading to false once the check is done
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  return { user, loading }; // Return user data and loading state
};

export default useAuth;
