
import React, { useEffect, useState } from 'react';

const NodeEditorSidebar = ({ selectedNode, setNodes }) => {
  const [nodeLabel, setNodeLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setNodeLabel(selectedNode.data.label);
    }
  }, [selectedNode]);

  const onLabelChange = (event) => {
    const newLabel = event.target.value;
    setNodeLabel(newLabel);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          // Create a new node object with the updated data property
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          };
        }
        return node;
      })
    );
  };

  if (!selectedNode) {
    return (
      <aside className="w-80 flex-shrink-0 bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark p-4 z-10 flex flex-col">
        <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight pb-3">Node Editor</h2>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-muted-light dark:text-text-muted-dark">Select a node to edit its properties.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 flex-shrink-0 bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark p-4 z-10 flex flex-col">
      <h2 className="text-text-light dark:text-text-dark text-lg font-bold tracking-tight pb-3">Edit Node</h2>
      <div className="flex-1 space-y-6 overflow-y-auto">
        <div>
          <label className="block text-sm font-medium text-text-muted-light dark:text-text-muted-dark mb-1" htmlFor="node-question">Label</label>
          <input
            className="w-full bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md h-10 px-3 text-sm focus:ring-primary focus:border-primary"
            id="node-question"
            type="text"
            value={nodeLabel}
            onChange={onLabelChange}
          />
        </div>
        {/* More editing options will be added here based on node type */}
      </div>
    </aside>
  );
};

export default NodeEditorSidebar;
