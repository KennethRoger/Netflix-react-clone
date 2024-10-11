import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./assets/components/Login/Login";
import Home from "./assets/components/Home/Home";
import ProtectedRoute from "./assets/components/ProtectedRoute";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, googleProvider);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
      setLoading(false);
      if (userData) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-black h-screen text-white flex justify-center items-center">
        <h1 className="text-3xl">Netflix Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <UserContext.Provider value={{ signInWithGoogle, signOutUser, user }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={"Replace with an element for showing not found"}
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
