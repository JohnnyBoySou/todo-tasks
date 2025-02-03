import React, { useState, useEffect, createContext } from "react";
import { auth } from "../config/firebaseConfig"; 
import { onAuthStateChanged, User } from "firebase/auth";

// Define o tipo para o contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Cria o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente que envolve o App e fornece o contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe(); // Limpeza do efeito
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
