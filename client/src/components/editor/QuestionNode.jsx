
import React from 'react';
import { Handle, Position } from 'reactflow';

const QuestionNode = ({ data }) => {
  return (
    <div className="w-96 flex flex-col gap-2 rounded-lg bg-surface-light dark:bg-surface-dark p-4 shadow-lg border-2 border-primary">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Node ID: {data.id}</p>
          <p className="text-text-light dark:text-text-dark text-base font-bold">{data.label}</p>
          <p className="text-sm text-primary font-medium">Question Node</p>
        </div>
        <span className="material-symbols-outlined text-primary mt-1">help</span>
      </div>
      <div className="border-t border-border-light dark:border-border-dark mt-2 pt-2 space-y-2">
        {data.answers && data.answers.map((answer, index) => (
          <div key={index} className="flex justify-between items-center group">
            <p className="text-sm text-text-light dark:text-text-dark">{answer.text}</p>
            <Handle type="source" position={Position.Right} id={`answer-${index}`} className="!bg-primary" style={{ top: 'auto', bottom: `${18 + index * 28}px` }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionNode;
