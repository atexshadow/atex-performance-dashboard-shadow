
import React from "react";

type Props = {
  /** Called when search input changes */
  onSearchChange?: (value: string) => void;
  
  placeholder?: string;
  
  rightSlot?: React.ReactNode;
 
  className?: string;
};

const TopBar: React.FC<Props> = ({
  onSearchChange,
  placeholder = "Search...",
  rightSlot,
  className,
}) => {
  return (
    <div className={["topbar", className || ""].join(" ").trim()}>
      <div className="topbar__left">
        {/* If you ever want logo/title, add here */}
      </div>

      <div className="topbar__center">
        <input
          type="search"
          className="search-input"
          placeholder={placeholder}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

      <div className="topbar__right">
        {rightSlot /* e.g., <ModulesDropdown /> */}
      </div>
    </div>
  );
};

export default TopBar;
export { TopBar };
