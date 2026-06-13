import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({
  id,
  title,
  headerColor = '#2563eb',
  inputs = [],
  outputs = [],
  children,
  width = 200,
  minHeight = 80,
  selected = false,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div
      className={`base-node ${selected ? 'selected' : ''}`}
      style={{
        width,
        minHeight,
      }}
    >
      {/* Node Header */}
      <div
        className="base-node-header"
        style={{ backgroundColor: headerColor }}
      >
        <span className="base-node-title">{title}</span>
        <button
          className="base-node-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
          title="Delete Node"
        >
          &times;
        </button>
      </div>

      {/* Node Content Body */}
      <div className="base-node-body">
        {children}
      </div>

      {/* Input Handles (Target) */}
      {inputs.map((input, index) => {
        // Handle positioning:
        // 1 handle: 50%
        // 2 handles: 33%, 66%
        // 3 handles: 25%, 50%, 75%
        // Formula: ((index + 1) * 100) / (N + 1)
        const topPercent = ((index + 1) * 100) / (inputs.length + 1);
        return (
          <div key={input.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={input.id}
              style={{ top: `${topPercent}%` }}
              className="base-node-handle"
            />
            {input.label && (
              <span 
                className="handle-label input-label"
                style={{ top: `${topPercent}%` }}
              >
                {input.label}
              </span>
            )}
          </div>
        );
      })}

      {/* Output Handles (Source) */}
      {outputs.map((output, index) => {
        const topPercent = ((index + 1) * 100) / (outputs.length + 1);
        return (
          <div key={output.id}>
            {output.label && (
              <span 
                className="handle-label output-label"
                style={{ top: `${topPercent}%` }}
              >
                {output.label}
              </span>
            )}
            <Handle
              type="source"
              position={Position.Right}
              id={output.id}
              style={{ top: `${topPercent}%` }}
              className="base-node-handle"
            />
          </div>
        );
      })}
    </div>
  );
};
