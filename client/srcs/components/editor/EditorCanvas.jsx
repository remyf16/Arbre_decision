import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import QuestionNode from './QuestionNode';
import ResultNode from './ResultNode';

const nodeTypes = {
  question: QuestionNode,
  result: ResultNode,
};

const EditorCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick, setNodes }) => {
  const reactFlowInstance = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: crypto.randomUUID(), // Using crypto.randomUUID() for unique IDs
        type,
        position,
        data: { label: `${type} node` },
      };

      if (type === 'question') {
        newNode.data.answers = [{ text: 'Réponse 1' }, { text: 'Réponse 2' }];
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default EditorCanvas;
