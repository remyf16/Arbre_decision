import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [trees, setTrees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const res = await axios.get('/api/decision-trees');
        setTrees(res.data);
      } catch (err) {
        console.error('Failed to fetch decision trees:', err);
      }
    };
    fetchTrees();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 p-10 overflow-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <p className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight">Mes Arbres de Décision</p>
          <button
            onClick={async () => {
              try {
                const res = await axios.post('/api/decision-trees');
                navigate(`/editor/${res.data._id}`);
              } catch (err) {
                console.error('Failed to create new tree:', err);
              }
            }}
            className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold"
          >
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
                    <tr
                      key={tree._id}
                      className="border-b border-border-light dark:border-border-dark hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                      onClick={() => navigate(`/results/${tree._id}`)}
                    >
                      <td className="px-4 py-4 text-text-light dark:text-text-dark text-sm font-medium">{tree.name}</td>
                      <td className="px-4 py-4 text-text-muted-light dark:text-text-muted-dark text-sm">{new Date(tree.updatedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${tree.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                          <span className={`text-sm font-medium ${tree.status === 'Published' ? 'text-green-500' : 'text-yellow-500'}`}>
                            {tree.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-text-muted-light dark:text-text-muted-dark text-sm text-right">{tree.views || 0}</td>
                      <td className="px-4 py-4 text-right">
                        {/* Actions button placeholder */}
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
