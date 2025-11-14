
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider, useNodesState, useEdgesState, addEdge } from 'reactflow';
import axios from '../api/axios';
import Header from './editor/Header';
import ToolsSidebar from './editor/ToolsSidebar';
import EditorCanvas from './editor/EditorCanvas';
import NodeEditorSidebar from './editor/NodeEditorSidebar';
import useDebounce from '../hooks/useDebounce';

const DecisionTreeEditor = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const debouncedNodes = useDebounce(nodes, 1000);
  const debouncedEdges = useDebounce(edges, 1000);
  const debouncedTreeName = useDebounce(tree?.name, 1000);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await axios.get(`/decision-trees/${id}`);
        setTree(res.data);
        setNodes(res.data.nodes || []);
        setEdges(res.data.edges || []);
        // Set initial load to false after a short delay to prevent initial save
        setTimeout(() => setIsInitialLoad(false), 500);
      } catch (err) {
        console.error("Failed to fetch tree data:", err);
      }
    };
    if (id) {
      fetchTree();
    }
  }, [id, setNodes, setEdges]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const handleNameChange = (newName) => {
    setTree({ ...tree, name: newName });
  };

  const onSave = useCallback(async () => {
    if (!tree || !id) return;
    try {
      await axios.put(`/decision-trees/${id}`, {
        name: tree.name,
        nodes: nodes,
        edges: edges,
      });
      console.log('Tree saved successfully!');
    } catch (err) {
      console.error('Failed to save tree:', err);
    }
  }, [id, tree, nodes, edges]);

  useEffect(() => {
    if (!isInitialLoad) {
      onSave();
    }
  }, [debouncedNodes, debouncedEdges, debouncedTreeName, onSave, isInitialLoad]);

  if (!tree) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen w-full font-display text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark">
      <ReactFlowProvider>
        <Header treeName={tree.name} onNameChange={handleNameChange} />
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
