"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  let initial=null;
  
  if (typeof localStorage !== "undefined") {
    initial = localStorage.getItem("token");
  }
  const [session, setSession] = useState(initial);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSession(token);
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
