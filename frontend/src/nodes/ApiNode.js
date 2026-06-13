import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    updateNodeField(id, 'url', val);
  };

  const handleMethodChange = (e) => {
    const val = e.target.value;
    setMethod(val);
    updateNodeField(id, 'method', val);
  };

  return (
    <BaseNode
      title="API Request"
      headerColor="#2563eb"
      selected={selected}
      inputs={[{ id: `${id}-trigger`, label: 'Trigger' }]}
      outputs={[{ id: `${id}-response`, label: 'Response' }]}
      width={220}
      minHeight={100}
    >
      <div className="base-node-field">
        <label className="base-node-label">URL</label>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://api.example.com"
          className="base-node-input"
        />
      </div>
      <div className="base-node-field">
        <label className="base-node-label">Method</label>
        <select
          value={method}
          onChange={handleMethodChange}
          className="base-node-select"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};
