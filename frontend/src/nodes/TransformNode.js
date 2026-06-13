import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [template, setTemplate] = useState(data?.template || '');

  const handleTemplateChange = (e) => {
    const val = e.target.value;
    setTemplate(val);
    updateNodeField(id, 'template', val);
  };

  return (
    <BaseNode
      title="Transform"
      headerColor="#14b8a6"
      selected={selected}
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[{ id: `${id}-output`, label: 'Output' }]}
      width={220}
      minHeight={100}
    >
      <div className="base-node-field">
        <label className="base-node-label">JSON / Text Template</label>
        <textarea
          value={template}
          onChange={handleTemplateChange}
          placeholder="e.g. { 'message': input }"
          className="base-node-textarea"
          style={{ minHeight: '60px' }}
        />
      </div>
    </BaseNode>
  );
};
