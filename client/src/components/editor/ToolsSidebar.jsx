
import React from 'react';

const ToolsSidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark p-4 z-10 flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-text-light dark:text-text-dark text-base font-medium">Tools</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal">Drag to canvas</p>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 border border-primary/50 cursor-grab"
            onDragStart={(event) => onDragStart(event, 'question')}
            draggable
          >
            <p className="text-primary text-sm font-medium">Add Question</p>
          </div>
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-grab"
            onDragStart={(event) => onDragStart(event, 'result')}
            draggable
          >
            <p className="text-text-light dark:text-text-dark text-sm font-medium">Add Result</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-4 border-t border-border-light dark:border-border-dark">
        {/* Zoom buttons functionality will be added later */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <p className="text-text-light dark:text-text-dark text-sm font-medium">Zoom In</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <p className="text-text-light dark:text-text-dark text-sm font-medium">Zoom Out</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">
          <p className="text-text-light dark:text-text-dark text-sm font-medium">Recenter View</p>
        </div>
      </div>
    </aside>
  );
};

export default ToolsSidebar;
