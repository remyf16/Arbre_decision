import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = ({ isSidebarOpen, toggleSidebar }) => {
  const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg";
  const inactiveClasses = "text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5";
  const activeClasses = "bg-primary/20 text-primary";

  return (
    <aside className={`flex flex-col bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 items-center px-2">
            <div className="bg-primary text-white flex items-center justify-center aspect-square rounded-lg size-10">
              {/* This span can be replaced with an actual icon component if you add one */}
              <span className="material-symbols-outlined text-2xl">account_tree</span>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <h1 className="text-text-light dark:text-text-dark text-base font-bold leading-normal">DecisionTree</h1>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">Admin Panel</p>
              </div>
            )}
          </div>
          <nav className="flex flex-col gap-2">
            <NavLink to="/dashboard" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
              {/* Icon would go here */}
              {isSidebarOpen && <p className="text-sm font-medium leading-normal">Tableau de bord</p>}
            </NavLink>
            <NavLink to="/users" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
              {/* Icon would go here */}
              {isSidebarOpen && <p className="text-sm font-medium leading-normal">Utilisateurs</p>}
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
              {/* Icon would go here */}
              {isSidebarOpen && <p className="text-sm font-medium leading-normal">Paramètres</p>}
            </NavLink>
          </nav>
        </div>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5"
        >
          {/* Icon would go here */}
          {isSidebarOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
    </aside>
  );
};

export default SideNav;
