"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  let initial=null;
  
  if (typeof localStorage !== "undefined") {
    initial = localStorage.getItem("token");
  }
  const [session, setSession] = useState(initial);
  const [role, setRole] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setSession(token);
      setRole(role);
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession, role, setRole }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
