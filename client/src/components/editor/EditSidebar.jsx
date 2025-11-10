import React from 'react';

const EditSidebar = () => {
  return (
    <aside className="w-80 flex-shrink-0 bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark p-4 z-10 flex flex-col">
      <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight pb-3">Edit Node</h2>
      <div className="flex-1 space-y-6 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="node-question">
            Question Text
          </label>
          <input
            className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md h-10 px-3 text-sm focus:ring-primary focus:border-primary"
            id="node-question"
            type="text"
            value="What is the user's main goal?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="node-description">
            Description (optional)
          </label>
          <textarea
            className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md p-3 text-sm focus:ring-primary focus:border-primary"
            id="node-description"
            placeholder="Add supplementary help text..."
            rows="3"
          ></textarea>
        </div>
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-text-light dark:text-text-dark">Answers</h3>
          <div className="p-3 border border-border-light dark:border-border-dark rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <input
                className="flex-1 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md h-9 px-3 text-sm"
                type="text"
                value="Find a product"
              />
              <button className="flex items-center justify-center size-9 rounded-md bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600">
                <span className="material-symbols-outlined text-base">link</span>
              </button>
              <button className="flex items-center justify-center size-9 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md h-9 px-3 text-sm"
                type="text"
                value="Get support"
              />
              <button className="flex items-center justify-center size-9 rounded-md bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600">
                <span className="material-symbols-outlined text-base">link</span>
              </button>
              <button className="flex items-center justify-center size-9 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700">
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 rounded-md h-10 px-4 bg-primary/10 border border-primary/50 text-primary text-sm font-medium hover:bg-primary/20">
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add Answer</span>
          </button>
        </div>
      </div>
      <div className="pt-4 mt-auto border-t border-border-light dark:border-border-dark">
        <button className="w-full flex items-center justify-center gap-2 rounded-md h-10 px-4 bg-red/10 text-red text-sm font-medium hover:bg-red/20">
          <span className="material-symbols-outlined text-base">delete</span>
          <span>Delete Node</span>
        </button>
      </div>
    </aside>
  );
};

export default EditSidebar;
