import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, selected }) => {
  return (
    <BaseNode
      title="LLM"
      headerColor="#8b5cf6"
      selected={selected}
      inputs={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputs={[
        { id: `${id}-response`, label: 'Response' },
      ]}
      width={200}
      minHeight={80}
    >
      <div className="base-node-desc">
        This is an LLM node that processes system instructions and prompts.
      </div>
    </BaseNode>
  );
};
