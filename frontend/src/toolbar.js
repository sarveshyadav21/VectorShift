// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar-container">
      <div className="toolbar-title-bar">
        <span className="toolbar-app-name">VectorShift Workflow Builder</span>
      </div>

      <div className="toolbar-groups">
        {/* Core Nodes Group */}
        <div className="toolbar-section">
          <span className="toolbar-section-title">Core Nodes</span>
          <div className="toolbar-nodes-list">
            <DraggableNode type="customInput" label="Input" icon="📥" />
            <DraggableNode type="customOutput" label="Output" icon="📤" />
            <DraggableNode type="text" label="Text" icon="📝" />
            <DraggableNode type="llm" label="LLM" icon="🤖" />
          </div>
        </div>

        {/* AI Nodes Group */}
        <div className="toolbar-section">
          <span className="toolbar-section-title">AI Nodes</span>
          <div className="toolbar-nodes-list">
            <DraggableNode type="transform" label="Transform" icon="🔄" />
            <DraggableNode type="condition" label="Condition" icon="🔀" />
          </div>
        </div>

        {/* Integrations Group */}
        <div className="toolbar-section">
          <span className="toolbar-section-title">Integrations</span>
          <div className="toolbar-nodes-list">
            <DraggableNode type="api" label="API" icon="🌐" />
            <DraggableNode type="database" label="Database" icon="🗄️" />
            <DraggableNode type="email" label="Email" icon="✉️" />
          </div>
        </div>
      </div>
    </div>
  );
};
