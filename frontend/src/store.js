// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    deleteNode: (nodeId) => {
      set({
        nodes: get().nodes.filter((node) => node.id !== nodeId),
        edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      });
    },
    theme: 'light',
    toggleTheme: () => {
      const nextTheme = get().theme === 'light' ? 'dark' : 'light';
      set({ theme: nextTheme });
      document.documentElement.setAttribute('data-theme', nextTheme);
    },
    modalState: null,
    modalData: { numNodes: 0, numEdges: 0 },
    setModalState: (modalState) => set({ modalState }),
    setModalData: (modalData) => set({ modalData }),
    clearCanvas: () => set({ nodes: [], edges: [] }),
    loadDemo: () => {
      const demoNodes = [
        {
          id: 'customInput-1',
          type: 'customInput',
          position: { x: 50, y: 180 },
          data: { id: 'customInput-1', nodeType: 'customInput', inputName: 'Customer Name', inputType: 'Text' }
        },
        {
          id: 'text-1',
          type: 'text',
          position: { x: 300, y: 150 },
          data: { id: 'text-1', nodeType: 'text', text: 'Hello {{Customer Name}}! We received your inquiry regarding {{topic}}.' }
        },
        {
          id: 'llm-1',
          type: 'llm',
          position: { x: 580, y: 120 },
          data: { id: 'llm-1', nodeType: 'llm' }
        },
        {
          id: 'email-1',
          type: 'email',
          position: { x: 840, y: 140 },
          data: { id: 'email-1', nodeType: 'email', recipient: 'sales@vectorshift.ai', subject: 'Inquiry Response' }
        },
        {
          id: 'customOutput-1',
          type: 'customOutput',
          position: { x: 1100, y: 180 },
          data: { id: 'customOutput-1', nodeType: 'customOutput', outputName: 'Status', outputType: 'Text' }
        }
      ];

      const demoEdges = [
        {
          id: 'e-1',
          source: 'customInput-1',
          sourceHandle: 'customInput-1-value',
          target: 'text-1',
          targetHandle: 'var-Customer Name',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e-2',
          source: 'text-1',
          sourceHandle: 'text-1-output',
          target: 'llm-1',
          targetHandle: 'llm-1-prompt',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e-3',
          source: 'llm-1',
          sourceHandle: 'llm-1-response',
          target: 'email-1',
          targetHandle: 'email-1-trigger',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        },
        {
          id: 'e-4',
          source: 'email-1',
          sourceHandle: 'email-1-status',
          target: 'customOutput-1',
          targetHandle: 'customOutput-1-value',
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: 'arrow', height: '20px', width: '20px' }
        }
      ];

      set({ nodes: demoNodes, edges: demoEdges });
    },
  }));
