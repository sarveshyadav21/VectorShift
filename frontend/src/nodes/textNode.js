import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const edges = useStore((state) => state.edges);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  
  const [currText, setCurrText] = useState(data?.text || 'Hello {{name}}! Welcome to the builder.');
  const [variables, setVariables] = useState([]);
  const [nodeDimensions, setNodeDimensions] = useState({ width: 220, minHeight: 100 });
  const textareaRef = useRef(null);

  // Extract variables dynamically and update Zustand store
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.push(match[1]);
    }
    const uniqueVars = [...new Set(matches)];
    setVariables(uniqueVars);
    
    updateNodeField(id, 'text', currText);
    updateNodeField(id, 'variables', uniqueVars);
  }, [currText, id, updateNodeField]);

  // Clean up edges connected to removed variables
  useEffect(() => {
    const activeHandles = variables.map((v) => `var-${v}`);
    const edgesToRemove = edges.filter(
      (edge) =>
        edge.target === id &&
        edge.targetHandle &&
        edge.targetHandle.startsWith('var-') &&
        !activeHandles.includes(edge.targetHandle)
    );

    if (edgesToRemove.length > 0) {
      const edgeChanges = edgesToRemove.map((edge) => ({
        id: edge.id,
        type: 'remove',
      }));
      onEdgesChange(edgeChanges);
    }
  }, [variables, edges, id, onEdgesChange]);

  // Adjust size dynamically on text changes
  useEffect(() => {
    const tx = textareaRef.current;
    if (!tx) return;

    // Reset styles to get correct scroll measurements
    tx.style.height = 'auto';
    tx.style.width = 'auto';

    const newHeight = tx.scrollHeight;
    const newWidth = Math.max(160, tx.scrollWidth);

    tx.style.height = `${newHeight}px`;
    tx.style.width = `${newWidth}px`;

    setNodeDimensions({
      width: newWidth + 28,
      // 30px header + padding/margins
      minHeight: newHeight + 68,
    });
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const inputs = variables.map((v) => ({
    id: `var-${v}`,
    label: v,
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      headerColor="#ec4899"
      selected={selected}
      inputs={inputs}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      width={nodeDimensions.width}
      minHeight={nodeDimensions.minHeight}
    >
      <div className="base-node-field" style={{ flexGrow: 1 }}>
        <label className="base-node-label">Text Template (Use {"{{var}}"} for inputs)</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Type here. Use {{variable_name}} to add inputs dynamically..."
          className="base-node-textarea"
          style={{ overflow: 'hidden' }}
        />
      </div>
    </BaseNode>
  );
};
