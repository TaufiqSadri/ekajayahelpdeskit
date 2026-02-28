import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Megaphone,
  FileText,
  Settings,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const [role, setRole] = useState(null);

  useEffect(() => {
    loadRole();
  }, []);

  /* AMBIL ROLE */

  const loadRole = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    setRole(profile?.role);
  };

  /* MENU DINAMIS */

  const menuItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },

    { path: "/tickets", label: "Tiket Pengaduan", icon: Ticket },

    { path: "/announcements", label: "Pengumuman IT", icon: Megaphone },

    /* ADMIN ONLY */

    ...(role === "admin"
      ? [
          { path: "/archives", label: "Arsip Tiket", icon: FileText },

          { path: "/reports", label: "Laporan", icon: FileText },

          { path: "/settings", label: "Pengaturan", icon: Settings },
        ]
      : []),
  ];

  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`

fixed top-16 left-0 h-[calc(100vh-4rem)] w-64

bg-white border-r border-gray-200 z-50 shadow-lg

transform transition-transform duration-300

lg:translate-x-0

${isOpen ? "translate-x-0" : "-translate-x-full"}

`}
      >
        <div className="p-4 flex items-center justify-between lg:hidden border-b">
          <h2 className="text-lg font-bold">Menu</h2>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-2 px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`

flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition


${
  isActive
    ? "bg-emerald-700 text-white border-l-4 border-emerald-900"
    : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
}

`}
              >
                <Icon size={20} />

                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
