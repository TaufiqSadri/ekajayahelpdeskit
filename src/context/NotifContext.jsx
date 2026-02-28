import { createContext, useCallback, useContext, useState } from "react";
import NotifToast from "../components/NotifToast.jsx";

const NotifContext = createContext(null);

export function NotifProvider({ children }) {
  const [notif, setNotif] = useState(null);

  const showNotif = useCallback((message, type = "success") => {
    setNotif({ message, type });
    setTimeout(() => {
      setNotif(null);
    }, 3000);
  }, []);

  return (
    <NotifContext.Provider value={{ showNotif }}>
      {children}
      <NotifToast notif={notif} />
    </NotifContext.Provider>
  );
}

export function useNotif() {
  const ctx = useContext(NotifContext);
  if (!ctx) {
    throw new Error("useNotif harus digunakan di dalam NotifProvider");
  }
  return ctx;
}
