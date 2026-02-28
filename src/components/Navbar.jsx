import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Navbar({ onMenuClick }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userName, setUserName] = useState("User");

  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Ambil user dari Supabase
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        const name = session.user.email.split("@")[0];
        setUserName(name);
      }
    };
    getUser();
  }, []);

  // Tutup menu saat klik luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 shadow-sm">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Ekajaya Group" className="h-8" />
            <span className="hidden sm:block text-sm font-semibold">
              Ekajaya Helpdesk IT
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell size={20} />
            </button>
          </div>

          {/* User */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:block text-sm font-medium">
                {userName}
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate("/settings");
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <User size={16} />
                  Profil
                </button>

                <div className="border-t my-1"></div>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
