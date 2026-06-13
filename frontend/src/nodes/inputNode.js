import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'Input '));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCurrName(val);
    updateNodeField(id, 'inputName', val);
  };

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setInputType(val);
    updateNodeField(id, 'inputType', val);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      headerColor="#6366f1"
      selected={selected}
      inputs={[]}
      outputs={[{ id: `${id}-value`, label: 'Value' }]}
      width={200}
      minHeight={80}
    >
      <div className="base-node-field">
        <label className="base-node-label">Field Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          placeholder="e.g. user_query"
          className="base-node-input"
        />
      </div>
      <div className="base-node-field">
        <label className="base-node-label">Field Type</label>
        <select
          value={inputType}
          onChange={handleTypeChange}
          className="base-node-select"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
