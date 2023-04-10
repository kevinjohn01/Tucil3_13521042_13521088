//Belummmmmmm
import React, { useState } from 'react';
import Graph from 'react-graph-vis';

function GraphVisualiser() {
  const [graph, setGraph] = useState({
    nodes: [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  });

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: '#000000'
    },
    height: '500px'
  };

  return (
    <div>
      <Graph
        graph={graph}
        options={options}
      />
    </div>
  );
}

export default GraphVisualiser;
