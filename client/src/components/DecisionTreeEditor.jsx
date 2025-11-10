import React, { useState, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Header from './editor/Header';
import ToolsSidebar from './editor/ToolsSidebar';
import EditSidebar from './editor/EditSidebar';

const initialNodes = [
    {
        id: '1',
        type: 'default',
        data: { label: 'What is the user\'s main goal?' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        type: 'default',
        data: { label: 'Product Page' },
        position: { x: 100, y: 100 },
    },
    {
        id: '3',
        type: 'default',
        data: { label: 'Support Center' },
        position: { x: 400, y: 100 },
    },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
];

const DecisionTreeEditor = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="flex flex-col h-screen w-full bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <ToolsSidebar />
                <main className="flex-1 relative">
                    <ReactFlowProvider>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            fitView
                        >
                            <Background />
                            <Controls />
                        </ReactFlow>
                    </ReactFlowProvider>
                </main>
                <EditSidebar />
            </div>
        </div>
    );
};

export default DecisionTreeEditor;
