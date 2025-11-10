import React, { useState } from 'react';
import { decisionTree } from '../data/decision-tree';

const DecisionTreeViewer = () => {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [history, setHistory] = useState(['start']);

  const handleAnswerClick = (nextNodeId) => {
    setHistory([...history, nextNodeId]);
    setCurrentNodeId(nextNodeId);
  };

  const handleBackClick = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentNodeId(newHistory[newHistory.length - 1]);
    }
  };

  const handleRestartClick = () => {
    setHistory(['start']);
    setCurrentNodeId('start');
  };

  const currentNode = decisionTree[currentNodeId];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl">
          <header className="mb-8 text-center">
            <div className="flex min-w-72 flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                {currentNode.isResult ? currentNode.title : 'Guide de diagnostic de panne'}
              </h1>
              <p className="text-slate-500 dark:text-[#9da6b9] text-base font-normal leading-normal">
                {currentNode.isResult ? currentNode.description : 'Répondez aux questions suivantes pour trouver une solution.'}
              </p>
            </div>
          </header>

          <div className="bg-white dark:bg-[#111318] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
            {!currentNode.isResult ? (
              <>
                <div className="mb-8">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {history.map((nodeId, index) => (
                      <React.Fragment key={nodeId}>
                        <span className={`text-sm sm:text-base font-medium leading-normal ${index === history.length - 1 ? 'text-primary' : 'text-slate-400'}`}>
                          Étape {index + 1}
                        </span>
                        {index < history.length - 1 && (
                          <span className="text-slate-400 dark:text-[#9da6b9] text-sm sm:text-base font-medium leading-normal">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-slate-900 dark:text-white text-2xl sm:text-[32px] font-bold leading-tight tracking-tight">
                    {currentNode.question}
                  </h2>
                  <p className="text-slate-500 dark:text-white/80 text-base font-normal leading-normal mt-3">
                    {currentNode.description}
                  </p>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="flex w-full max-w-sm flex-col items-stretch gap-3">
                    {currentNode.answers.map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(answer.nextNode)}
                        className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-white text-base font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                      >
                        <span className="truncate">{answer.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <footer className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={handleBackClick}
              disabled={history.length <= 1}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-transparent px-4 text-slate-500 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              <span className="text-sm font-medium">Retour</span>
            </button>
            <button
              onClick={handleRestartClick}
              className="flex h-11 items-center justify-center gap-2 rounded-lg bg-transparent px-4 text-slate-500 transition-colors hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
            >
              <span className="material-symbols-outlined text-xl">refresh</span>
              <span className="text-sm font-medium">Recommencer</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeViewer;
