import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [condition, setCondition] = useState(data?.condition || '');

  const handleConditionChange = (e) => {
    const val = e.target.value;
    setCondition(val);
    updateNodeField(id, 'condition', val);
  };

  return (
    <BaseNode
      title="Condition (If/Else)"
      headerColor="#7c3aed"
      selected={selected}
      inputs={[{ id: `${id}-input`, label: 'Input' }]}
      outputs={[
        { id: `${id}-true`, label: 'True' },
        { id: `${id}-false`, label: 'False' },
      ]}
      width={220}
      minHeight={80}
    >
      <div className="base-node-field">
        <label className="base-node-label">Condition</label>
        <input
          type="text"
          value={condition}
          onChange={handleConditionChange}
          placeholder="e.g. status === 200"
          className="base-node-input"
        />
      </div>
    </BaseNode>
  );
};
