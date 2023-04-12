import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import "./App.css";

function getEdgeColor(edges, newRouteEdge) {
  return newRouteEdge[edges.from] && newRouteEdge[edges.from].includes(edges.to) ? "#000000" : "#FF0000";
}

function GraphProcessor({ weight, nodenames, path }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [routeEdgeId, setRouteEdgeId] = useState([]);
  const visJsRef = useRef(null);
  useEffect(() => {
    let newRouteEdgeId = [];
    let routeEdge = [];
    console.log("path");
    console.log(path);
    if (path != null) {
      routeEdge = Array.from({ length: weight.length }, () => []);
      for (let i = 0; i < path.length - 1; i++) {
        routeEdge[path[i]][path[i + 1]] = true;
      }
    }
    if (weight && nodenames) {
      const newNodes = [];
      const newEdges = [];
      let id = 0;
      for (let i = 0; i < weight.length; i++) {
        newNodes.push({ id: `${i}`, label: nodenames[i][0]});
        for (let j = 0; j < weight[i].length; j++) {
          if (weight[i][j] !== 0){
              newEdges.push({ id: `${id}`, from: i, to: j, label: `${weight[i][j]}`});
              if(routeEdge[i][j] === true) newRouteEdgeId.push(id);
          }
          id++;
        }
      }
      setNodes(newNodes);
      setEdges(newEdges);
      setRouteEdgeId(newRouteEdgeId);
    }
  }, [weight, nodenames, path]);

  useEffect(() => {
    const visJsRefCurrent = visJsRef.current;
    const network = new Network(
      visJsRefCurrent,
      { nodes, edges },
      {
        autoResize: true,
        nodes: {
          color: "white"
        },
        edges: {
          color: {
            color: "white",
          }
        }
      }
    );
    console.log(network);
    console.log("routeEdgeId");
    console.log(routeEdgeId);
    for(let i = 0; i < routeEdgeId.length; i++){
      console.log("update");
        network.body.data.edges.update({id: `${routeEdgeId[i]}`, color: {color: "red"}});
    }
    return () => {
      network.destroy();
    };
  }, [nodes, edges, path, routeEdgeId]);

  return (<div ref={visJsRef} className="graph" />);
}

export default GraphProcessor;
