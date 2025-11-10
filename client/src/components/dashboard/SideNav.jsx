import React from 'react';

const SideNav = () => {
  return (
    <aside className="flex flex-col w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark">
      <div className="flex flex-col h-full justify-between p-4">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3 items-center px-2">
            <div className="bg-primary text-white flex items-center justify-center aspect-square rounded-lg size-10">
              <span className="material-symbols-outlined text-2xl">account_tree</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-text-light dark:text-text-dark text-base font-bold leading-normal">DecisionTree</h1>
              <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">Admin Panel</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary" href="#">
              <span className="material-symbols-outlined fill">dashboard</span>
              <p className="text-sm font-medium leading-normal">Tableau de bord</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-lg" href="#">
              <span className="material-symbols-outlined">group</span>
              <p className="text-sm font-medium leading-normal">Utilisateurs</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5 rounded-lg" href="#">
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium leading-normal">Paramètres</p>
            </a>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
