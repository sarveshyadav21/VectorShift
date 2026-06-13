import { useState } from 'react';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

export const EmailNode = ({ id, data, selected }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [recipient, setRecipient] = useState(data?.recipient || '');
  const [subject, setSubject] = useState(data?.subject || '');

  const handleRecipientChange = (e) => {
    const val = e.target.value;
    setRecipient(val);
    updateNodeField(id, 'recipient', val);
  };

  const handleSubjectChange = (e) => {
    const val = e.target.value;
    setSubject(val);
    updateNodeField(id, 'subject', val);
  };

  return (
    <BaseNode
      id={id}
      title="Send Email"
      headerColor="#f97316"
      selected={selected}
      inputs={[{ id: `${id}-trigger`, label: 'Trigger' }]}
      outputs={[{ id: `${id}-status`, label: 'Status' }]}
      width={220}
      minHeight={100}
    >
      <div className="base-node-field">
        <label className="base-node-label">Recipient</label>
        <input
          type="email"
          value={recipient}
          onChange={handleRecipientChange}
          placeholder="user@example.com"
          className="base-node-input"
        />
      </div>
      <div className="base-node-field">
        <label className="base-node-label">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={handleSubjectChange}
          placeholder="Enter subject..."
          className="base-node-input"
        />
      </div>
    </BaseNode>
  );
};
