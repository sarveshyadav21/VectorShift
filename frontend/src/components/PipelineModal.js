// PipelineModal.js

export const PipelineModal = ({ state, data, onClose }) => {
  if (!state) return null;

  // Determine modal contents based on state
  let icon = 'ℹ️';
  let iconClass = 'warning';
  let title = 'Pipeline Info';
  let message = '';
  let showStats = false;

  switch (state) {
    case 'success_dag':
      icon = '✓';
      iconClass = 'success';
      title = 'Pipeline Parsed';
      message = 'Your pipeline is a valid Directed Acyclic Graph (DAG) and has no cycles.';
      showStats = true;
      break;
    case 'success_cycle':
      icon = '⚠️';
      iconClass = 'warning';
      title = 'Cycle Detected';
      message = 'Validation failed! A cycle was detected in your pipeline. It is not a valid Directed Acyclic Graph (DAG).';
      showStats = true;
      break;
    case 'empty':
      icon = '🔍';
      iconClass = 'warning';
      title = 'Empty Pipeline';
      message = 'No nodes found. Drag and drop some nodes onto the canvas to construct a pipeline.';
      showStats = false;
      break;
    case 'error':
      icon = '✗';
      iconClass = 'error';
      title = 'Backend Error';
      message = 'Unable to reach the backend parsing server. Please ensure the FastAPI server is running on http://localhost:8000.';
      showStats = false;
      break;
    default:
      break;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-status-indicator">
            <div className={`status-icon ${iconClass}`}>{icon}</div>
            <div className="modal-status-text">{message}</div>
          </div>

          {showStats && (
            <div className="modal-stats">
              <div className="stat-item">
                <span className="stat-label">Total Nodes</span>
                <span className="stat-value">{data.numNodes}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Edges</span>
                <span className="stat-value">{data.numEdges}</span>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
