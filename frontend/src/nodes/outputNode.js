import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    const val = e.target.value;
    setCurrName(val);
    updateNodeField(id, 'outputName', val);
  };

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setOutputType(val);
    updateNodeField(id, 'outputType', val);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      headerColor="#f43f5e"
      selected={selected}
      inputs={[{ id: `${id}-value`, label: 'Value' }]}
      outputs={[]}
      width={200}
      minHeight={80}
    >
      <div className="base-node-field">
        <label className="base-node-label">Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="base-node-input"
        />
      </div>
      <div className="base-node-field">
        <label className="base-node-label">Type</label>
        <select
          value={outputType}
          onChange={handleTypeChange}
          className="base-node-select"
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
