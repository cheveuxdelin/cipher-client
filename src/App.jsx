import React, { useState } from "react";

import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { ref, onValue } from 'firebase/database';
import { onAuthStateChanged } from "firebase/auth";

import { Navigate, Route, Routes } from "react-router-dom";

import { auth, database } from "../firebase.js";
import { off } from "firebase/database";

export default function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user.uid);
      onValue(ref(database, `/saved_ciphers/${user.uid}`), (snapshot) => {
        setData(snapshot.val());
      });
    } else {
      off(ref(database, "/"));
      setUser(false);
    }
  })

  return user !== null && <Routes>
    <Route path="/dashboard" element={user ? <Dashboard values={data} /> : <Navigate to="/login" replace />} />
    <Route path="/register" element={user ? <Dashboard values={data} /> : <Register />} />
    <Route path="/login" element={user ? <Dashboard values={data} /> : <Login />} />
    <Route path="*" element={user ? < Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
  </Routes>
}

