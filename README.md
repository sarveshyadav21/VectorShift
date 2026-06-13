# VectorShift - AI Workflow Builder

A production-quality visual AI workflow builder similar to LangFlow, Flowise, or n8n. This project contains a React + ReactFlow frontend and a FastAPI backend parser.

## Project Overview

This application allows users to build pipelines of custom nodes, connect them together, and submit the pipeline to a backend to calculate statistics and analyze the topology of the pipeline (specifically verifying if the connections form a valid Directed Acyclic Graph).

### Key Features
- **9 Custom Node Types**: Fully abstract, themed components representing data loaders, LLMs, integrations, and logic branches.
- **Dynamic TextNode Variables**: Real-time extraction of mustache syntax variables (e.g. `{{name}}`) that automatically adds and removes target input handles in the node.
- **Textarea Auto-Resizing**: Resizing input components based on scrollHeight/scrollWidth.
- **DAG Parsing and Cycle Detection**: Kahn's algorithm evaluates nodes and edges to check for cycles.
- **Modern Responsive Design**: Glassmorphism toolbars, floating cards, subtle animations, and clean interactive handles.

---

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python (3.9+)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies (Zustand and ReactFlow styles are pre-configured):
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
3. Start the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend runs on [http://localhost:8000](http://localhost:8000).

---

## Architecture Decisions

- **State Management**: Used **Zustand** alongside ReactFlow to synchronize node states, field updates, drag-and-drop operations, and connections.
- **Base Node Component**: Designed a unified, generic container component (`BaseNode.js`) to handle titles, header colorization, layout constraints, and math-based handle positioning.
- **CSS-only Styling**: Built the entire UI on vanilla CSS styles (`index.css`) without Tailwind or external UI frameworks to keep the design lightweight, fast, and completely customizable.
- **Backend CORS**: Configured standard CORS middleware on FastAPI to permit cross-origin requests from the React client.

---

## Technical Details

### BaseNode Explanation
The `BaseNode.js` component accepts inputs and outputs as configure arrays: `[{ id, label }]`. It dynamically positions these handles vertically using the formula:
$$\text{topPercent} = \frac{(index + 1) \times 100}{N + 1}$$
This handles 1, 2, 3, or more handles automatically, spacing them perfectly down the side of the node. In addition, input/output labels are rendered inline next to their corresponding handle.

### TextNode Variable Extraction & Auto-Resize
- **Variable Detection**: A `useEffect` hooks watches changes to the text field and runs the regex:
  ```regex
  /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g
  ```
  Unique variables are extracted and mapped to target input handles (e.g. `var-name`). If a user deletes a variable from the template, the handle is immediately removed from the component, and a cleanup effect removes any stale edges connected to that handle from the ReactFlow store.
- **Auto-Resize**: Uses the textarea's `scrollHeight` and `scrollWidth` properties to adjust height and width styling parameters. By sending these measurements up to the `BaseNode` component via dimensions state, the node card itself expands or contracts dynamically around the text length.

### DAG Validation Explanation
**Kahn's Algorithm** was used for DAG validation.
The algorithm works by:
1. Building an adjacency list of the graph from the submitted edges and counting the **in-degree** (number of incoming edges) of each node.
2. Initializing a queue with all nodes that have an in-degree of `0`.
3. Processing the queue by removing nodes one-by-one, incrementing a `visited_count` counter, and decrementing the in-degree of all their adjacent neighbors.
4. If a neighbor's in-degree drops to `0`, it is pushed to the queue.
5. If the final `visited_count` is equal to the total number of nodes in the graph, it is a valid DAG. If `visited_count < total_nodes`, a cycle is present in the pipeline topology.

---

## New Nodes Explanation

1. **API Node**: Used for external webhook calls. Contains URL path and Method verb selector (GET, POST, etc). Blue theme.
2. **Database Node**: Handles database reads/writes. Allows entering connection parameters and a SQL query template. Green theme.
3. **Email Node**: Performs email operations. Configures recipient email addresses and custom subjects. Orange theme.
4. **Condition Node**: Branching logic check (If/Else). Has two output handles (`True` and `False`) to direct flow based on conditional logic. Purple theme.
5. **Transform Node**: Transforms payload shapes. Contains textarea for entering mapping templates. Teal theme.