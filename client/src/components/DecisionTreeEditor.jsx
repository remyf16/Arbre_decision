
import React, { useState, useEffect, useCallback } from 'react';
import { ReactFlowProvider, useNodesState, useEdgesState, addEdge } from 'reactflow';
import Header from './editor/Header';
import ToolsSidebar from './editor/ToolsSidebar';
import EditorCanvas from './editor/EditorCanvas';
import NodeEditorSidebar from './editor/NodeEditorSidebar';

const DecisionTreeEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    const initialTreeData = {
      nodes: [
        { id: '1', type: 'question', position: { x: 250, y: 50 }, data: { id: '1', label: 'What is the user\'s main goal?', answers: [{ text: 'Find a product' }, { text: 'Get support' }] } },
        { id: '2', type: 'result', position: { x: 50, y: 300 }, data: { id: '2', label: 'Product Page' } },
        { id: '3', type: 'result', position: { x: 450, y: 300 }, data: { id: '3', label: 'Support Center' } },
      ],
      edges: [
        { id: 'e1-2', source: '1', sourceHandle: 'answer-0', target: '2' },
        { id: 'e1-3', source: '1', sourceHandle: 'answer-1', target: '3' },
      ]
    };
    setNodes(initialTreeData.nodes);
    setEdges(initialTreeData.edges);
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onSave = () => {
    const treeData = {
      nodes: nodes,
      edges: edges,
    };
    console.log('Saving tree data:', JSON.stringify(treeData, null, 2));
    alert('Tree data saved to console!');
  };

  return (
    <div className="flex flex-col h-screen w-full font-display text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
      <ReactFlowProvider>
        <Header onSave={onSave} />
        <div className="flex flex-1 overflow-hidden">
          <ToolsSidebar />
          <main className="flex-1 relative bg-background-light dark:bg-background-dark overflow-hidden">
            <EditorCanvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={(event, node) => setSelectedNode(node)}
              setNodes={setNodes}
            />
          </main>
          <NodeEditorSidebar selectedNode={selectedNode} setNodes={setNodes} />
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DecisionTreeEditor;
