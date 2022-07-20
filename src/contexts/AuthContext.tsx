import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
  user: FirebaseAuthTypes.User | null;
  isUserLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      setIsUserLoading(false);
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
