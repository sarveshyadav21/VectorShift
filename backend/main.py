from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def check_if_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Kahn's Algorithm for Directed Acyclic Graph (DAG) validation.
    Detects if a cycle exists in the given nodes and edges.
    """
    node_ids = [node['id'] for node in nodes]
    in_degree = {node_id: 0 for node_id in node_ids}
    adj_list = {node_id: [] for node_id in node_ids}

    for edge in edges:
        u = edge.get('source')
        v = edge.get('target')
        # Only process edges where both endpoints are in the node list
        if u in in_degree and v in in_degree:
            adj_list[u].append(v)
            in_degree[v] += 1

    # Initialize queue with nodes having an in-degree of 0
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    visited_count = 0

    while queue:
        u = queue.pop(0)
        visited_count += 1
        for v in adj_list[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # If visited nodes equals the total number of nodes, it is a valid DAG
    return visited_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(req: PipelineRequest):
    nodes = req.nodes
    edges = req.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = check_if_dag(nodes, edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

# Mount static React frontend build if it exists (for unified production deployment)
frontend_build_path = os.path.join(os.path.dirname(__file__), "../frontend/build")
if os.path.exists(frontend_build_path):
    app.mount("/", StaticFiles(directory=frontend_build_path, html=True), name="static")

