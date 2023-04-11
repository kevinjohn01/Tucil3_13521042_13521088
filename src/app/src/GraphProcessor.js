import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network';

function GraphProcessor({weight, nodenames, path}) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  // console.log(weight);
  // console.log(nodenames);
  useEffect(() => {
    if (weight && nodenames) {
      console.log("weight:");
      console.log(weight);
      const newNodes = [];
      const newEdges = [];
      console.log(weight.length);
      for(let i = 0; i < weight.length; i++){
          newNodes.push({id: i, label: nodenames[i][0]});
          console.log("newNodes");
          for(let j = 0; j < weight[i].length; j++){
              if(weight[i][j] !== 0) newEdges.push({from: i, to: j});
              console.log(newEdges);
          }
      }
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [weight, nodenames]);

  const visJsRef = useRef(null);
  // console.log(nodes);
  // console.log(edges);
  useEffect(() => {
    const network =
      visJsRef.current &&
      new Network(
        visJsRef.current,
        { nodes, edges },
        {
          // autoResize: true,
          edges: {
            color: "#411811"
          }
        }
      );
  }, [visJsRef, nodes, edges]);

  return(<div ref={visJsRef} />);
}

export default GraphProcessor;