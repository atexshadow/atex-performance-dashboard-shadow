
import React from "react";
import { FaUser, FaHome, FaStar, FaCog } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <button className="sidebar__item" aria-label="Profile">
        <FaUser size={22} color="#fff" />
      </button>
      <button className="sidebar__item" aria-label="Home">
        <FaHome size={22} color="#fff" />
      </button>
      <button className="sidebar__item" aria-label="Favorites">
        <FaStar size={22} color="#fff" />
      </button>
      <button className="sidebar__item" aria-label="Settings">
        <FaCog size={22} color="#fff" />
      </button>
    </aside>
  );
};

export default Sidebar;
export { Sidebar };
