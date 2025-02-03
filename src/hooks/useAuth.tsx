import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Importe o contexto de AuthContext

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
