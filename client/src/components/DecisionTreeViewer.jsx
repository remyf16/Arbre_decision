
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const DecisionTreeViewer = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await axios.get(`/decision-trees/${id}`);
        setTree(res.data);
        setCurrentNodeId(res.data.nodes[0].id); // Start with the first node
        setLoading(false);
      } catch (err) {
        setError('Failed to load decision tree.');
        setLoading(false);
      }
    };
    fetchTree();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!tree) return <p>No tree found.</p>;

  const currentNode = tree.nodes.find(node => node.id === currentNodeId);

  const handleAnswerClick = (answer, index) => {
    const edge = tree.edges.find(edge => edge.source === currentNodeId && edge.sourceHandle === `answer-${index}`);
    if (edge) {
      setPath([...path, { nodeId: currentNodeId, answer: answer.text }]);
      setCurrentNodeId(edge.target);
    }
  };

  const handleGoBack = () => {
    if (path.length > 0) {
      const lastPathItem = path[path.length - 1];
      setPath(path.slice(0, -1));
      setCurrentNodeId(lastPathItem.nodeId);
    }
  };

  const handleRestart = () => {
    setPath([]);
    setCurrentNodeId(tree.nodes[0].id);
  };

  useEffect(() => {
    if (currentNode && currentNode.type === 'result') {
      const saveResult = async () => {
        try {
          await axios.post('/results/public', {
            decisionTree: id,
            path,
            resultNode: currentNode.id,
          });
        } catch (err) {
          console.error('Failed to save result:', err);
        }
      };
      saveResult();
    }
  }, [currentNode, id, path]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <div className="flex min-w-72 flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">{tree.name}</h1>
            <p className="text-slate-500 dark:text-[#9da6b9] text-base font-normal leading-normal">{tree.description}</p>
          </div>
        </header>
        <div className="bg-white dark:bg-[#111318] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
          <div className="text-center">
            <h2 className="text-slate-900 dark:text-white text-2xl sm:text-[32px] font-bold leading-tight tracking-tight">{currentNode.data.label}</h2>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="flex w-full max-w-sm flex-col items-stretch gap-3">
              {currentNode.type === 'question' && currentNode.data.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer, index)}
                  className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-primary/90"
                >
                  <span className="truncate">{answer.text}</span>
                </button>
              ))}
              {currentNode.type === 'result' && (
                <p className="text-center text-slate-500 dark:text-white/80">Vous avez atteint la fin du diagnostic.</p>
              )}
            </div>
          </div>
        </div>
        <footer className="mt-8 flex items-center justify-center gap-4">
          <button onClick={handleGoBack} disabled={path.length === 0} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-transparent px-4 text-slate-500 transition-colors hover:bg-slate-200 disabled:opacity-50">
            Retour
          </button>
          <button onClick={handleRestart} className="flex h-11 items-center justify-center gap-2 rounded-lg bg-transparent px-4 text-slate-500 transition-colors hover:bg-slate-200">
            Recommencer
          </button>
        </footer>
      </div>
    </div>
  );
};

export default DecisionTreeViewer;
