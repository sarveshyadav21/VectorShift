import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [connection, setConnection] = useState(data?.connection || '');
  const [query, setQuery] = useState(data?.query || '');

  const handleConnectionChange = (e) => {
    const val = e.target.value;
    setConnection(val);
    updateNodeField(id, 'connection', val);
  };

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    updateNodeField(id, 'query', val);
  };

  return (
    <BaseNode
      title="Database"
      headerColor="#10b981"
      selected={selected}
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[{ id: `${id}-results`, label: 'Results' }]}
      width={220}
      minHeight={120}
    >
      <div className="base-node-field">
        <label className="base-node-label">Connection String</label>
        <input
          type="text"
          value={connection}
          onChange={handleConnectionChange}
          placeholder="postgresql://..."
          className="base-node-input"
        />
      </div>
      <div className="base-node-field">
        <label className="base-node-label">SQL Query</label>
        <textarea
          value={query}
          onChange={handleQueryChange}
          placeholder="SELECT * FROM table;"
          className="base-node-textarea"
          style={{ minHeight: '60px' }}
        />
      </div>
    </BaseNode>
  );
};
