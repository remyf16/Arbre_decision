import React from 'react';

const Dashboard = () => {
  const trees = [
    {
      _id: '1',
      name: 'Parcours Client B2B',
      updatedAt: '15 Mars 2024',
      status: 'Publié',
      views: 1204,
    },
    {
      _id: '2',
      name: 'Guide de Dépannage Produit',
      updatedAt: '12 Mars 2024',
      status: 'Publié',
      views: 876,
    },
    {
      _id: '3',
      name: 'Arbre de Qualification de Leads',
      updatedAt: '10 Mars 2024',
      status: 'Brouillon',
      views: 0,
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-10 overflow-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <p className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight">Mes Arbres de Décision</p>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-accent text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90">
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span className="truncate">Créer un arbre</span>
          </button>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark">
          <div className="px-2 py-3 @container">
            <div className="flex overflow-hidden">
              <table className="w-full text-left">
                <thead className="border-b border-border-light dark:border-border-dark">
                  <tr>
                    <th className="px-4 py-3 text-text-muted-light dark:text-text-muted-dark text-xs font-medium uppercase tracking-wider">Nom de l'arbre</th>
                    <th className="px-4 py-3 text-text-muted-light dark:text-text-muted-dark text-xs font-medium uppercase tracking-wider">Dernière modification</th>
                    <th className="px-4 py-3 text-text-muted-light dark:text-text-muted-dark text-xs font-medium uppercase tracking-wider">Statut</th>
                    <th className="px-4 py-3 text-text-muted-light dark:text-text-muted-dark text-xs font-medium uppercase tracking-wider text-right">Vues</th>
                    <th className="px-4 py-3 text-text-muted-light dark:text-text-muted-dark text-xs font-medium uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trees.map((tree) => (
                    <tr key={tree._id} className="border-b border-border-light dark:border-border-dark">
                      <td className="px-4 py-4 text-text-light dark:text-text-dark text-sm font-medium">{tree.name}</td>
                      <td className="px-4 py-4 text-text-muted-light dark:text-text-muted-dark text-sm">{tree.updatedAt}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${tree.status === 'Publié' ? 'bg-status-published' : 'bg-status-draft'}`}></span>
                          <span className={`text-sm font-medium ${tree.status === 'Publié' ? 'text-status-published' : 'text-status-draft'}`}>
                            {tree.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-text-muted-light dark:text-text-muted-dark text-sm text-right">{tree.views}</td>
                      <td className="px-4 py-4 text-right">
                        <button className="p-2 text-text-muted-light dark:text-text-muted-dark rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                          <span className="material-symbols-outlined text-xl">more_horiz</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
