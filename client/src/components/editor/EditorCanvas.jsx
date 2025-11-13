
import React, { useRef, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useReactFlow, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

import QuestionNode from './QuestionNode';
import ResultNode from './ResultNode';

const nodeTypes = {
  question: QuestionNode,
  result: ResultNode,
};

let id = 4;
const getId = () => `${id++}`;

const EditorCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, setNodes }) => {
  const reactFlowWrapper = useRef(null);
  const { project } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newId = getId();
      const newNode = {
        id: newId,
        type,
        position,
        data: { id: newId, label: `New ${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project, setNodes]
  );

  return (
    <div style={{ height: '100%', width: '100%' }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default EditorCanvas;
