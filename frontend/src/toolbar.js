// toolbar.js

import { useStore } from './store';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const clearCanvas = useStore((state) => state.clearCanvas);
  const loadDemo = useStore((state) => state.loadDemo);

  return (
    <div className="toolbar-container">
      <div className="toolbar-title-bar">
        <span className="toolbar-app-name">VectorShift Workflow Builder</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            className="theme-toggle-btn"
            style={{ backgroundColor: '#22c55e', color: '#ffffff', borderColor: '#22c55e' }}
            onClick={loadDemo}
            title="Load Pre-made Demo Pipeline"
          >
            ✨ Load Example Pipeline
          </button>
          <button
            type="button"
            className="theme-toggle-btn"
            style={{ backgroundColor: '#ef4444', color: '#ffffff', borderColor: '#ef4444' }}
            onClick={clearCanvas}
            title="Clear Workspace"
          >
            🗑️ Clear Canvas
          </button>
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
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
