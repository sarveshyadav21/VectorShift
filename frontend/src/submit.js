// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const setModalState = useStore((state) => state.setModalState);
  const setModalData = useStore((state) => state.setModalData);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!nodes || nodes.length === 0) {
      setModalState('empty');
      return;
    }

    try {
      // Map ReactFlow data into the expected API format
      const payload = {
        nodes: nodes.map((n) => ({ id: n.id, type: n.type, data: n.data })),
        edges: edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          sourceHandle: e.sourceHandle,
          targetHandle: e.targetHandle,
        })),
      };

      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();
      setModalData({
        numNodes: data.num_nodes,
        numEdges: data.num_edges,
      });

      if (data.is_dag) {
        setModalState('success_dag');
      } else {
        setModalState('success_cycle');
      }
    } catch (err) {
      console.error('Submit failed:', err);
      setModalState('error');
    }
  };

  return (
    <div className="submit-section">
      <button type="button" onClick={handleSubmit} className="submit-btn">
        🚀 Run Pipeline
      </button>
    </div>
  );
};
