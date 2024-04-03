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
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItem");
    if (cartItems) {
      const items = JSON.parse(cartItems);
      setTotalItem(items ? items.length : 0);
    }
  }, [totalItem]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setSession(token);
      setRole(role);
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession, role, setRole,totalItem,setTotalItem }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
