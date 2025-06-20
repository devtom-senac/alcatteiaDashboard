import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function NavLateral() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`h-screen ${isMobile ? "w-16" : "w-56"} bg-[#1a1332] flex flex-col py-8 px-4 border-r-2 border-white`}
    >
      <NavLink
        to="/kanban"
        className={({ isActive }) =>
          `mb-4 ${isMobile ? "justify-center" : "px-4 py-2"} rounded font-semibold text-white flex items-center gap-3 transition ` +
          (isActive ? "bg-gray-700" : "hover:bg-gray-700")
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <rect x="3" y="4" width="4" height="16" rx="1" />
          <rect x="9" y="4" width="4" height="16" rx="1" />
          <rect x="15" y="4" width="4" height="16" rx="1" />
        </svg>
        {!isMobile && "Kanban"}
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `mb-4 ${isMobile ? "justify-center" : "px-4 py-2"} rounded font-semibold text-white flex items-center gap-3 transition ` +
          (isActive ? "bg-gray-700" : "hover:bg-gray-700")
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8v-10h-8v10zm0-18v6h8V3h-8z" />
        </svg>
        {!isMobile && "Dashboard"}
      </NavLink>
      <NavLink
        to="/call"
        className={({ isActive }) =>
          `mb-4 ${isMobile ? "justify-center" : "px-4 py-2"} rounded font-semibold text-white flex items-center gap-3 transition ` +
          (isActive ? "bg-gray-700" : "hover:bg-gray-700")
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.06.72 3.03a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.97.35 1.98.59 3.03.72A2 2 0 0 1 22 16.92z" />
        </svg>
        {!isMobile && "Call"}
      </NavLink>
      <NavLink
        to="/equipe"
        className={({ isActive }) =>
          `mb-4 ${isMobile ? "justify-center" : "px-4 py-2"} rounded font-semibold text-white flex items-center gap-3 transition ` +
          (isActive ? "bg-gray-700" : "hover:bg-gray-700")
        }
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M17 20h5v-2a4 4 0 0 0-3-3.87M9 20H4v-2a4 4 0 0 1 3-3.87M16 3.13a4 4 0 0 1 0 7.75M8 3.13a4 4 0 0 0 0 7.75" />
        </svg>
        {!isMobile && "Equipe"}
      </NavLink>
    </nav>
  );
}