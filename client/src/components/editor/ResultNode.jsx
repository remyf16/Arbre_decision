
import React from 'react';
import { Handle, Position } from 'reactflow';

const ResultNode = ({ data }) => {
  return (
    <div className="w-64 flex flex-col gap-2 rounded-lg bg-surface-light dark:bg-surface-dark p-4 shadow-lg border border-border-light dark:border-border-dark">
      <Handle type="target" position={Position.Left} className="!bg-green" />
      <Handle type="source" position={Position.Right} className="!bg-green" />
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Node ID: {data.id}</p>
          <p className="text-text-light dark:text-text-dark text-base font-bold">{data.label}</p>
          <p className="text-sm text-green font-medium">Result Node</p>
        </div>
        <span className="material-symbols-outlined text-green mt-1">flag</span>
      </div>
    </div>
  );
};

export default ResultNode;
