import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext"; 

//SCREENS
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound"; 

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Carregando...</div>;
  }
  return user ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />  
      </Routes>
      </Router>
      </AuthProvider>
  );
};

export default App;
