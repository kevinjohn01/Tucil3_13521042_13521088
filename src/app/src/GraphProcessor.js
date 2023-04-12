import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import "./App.css";

function GraphProcessor({ weight, nodenames, path }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [routeEdgeId, setRouteEdgeId] = useState([]);
  const visJsRef = useRef(null);
  
  useEffect(() => {
    try {
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
    } catch (error) {
      console.error("An error occurred in the first useEffect: ", error);
    }
  }, [weight, nodenames, path]);

  useEffect(() => {
    try {
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
            color: "white",
          }
        }
      );
      console.log(network);
      console.log("routeEdgeId");
      console.log(routeEdgeId);
      for(let i = 0; i < routeEdgeId.length; i++){
        console.log("update edges");
        network.body.data.edges.update({id: `${routeEdgeId[i]}`, color: "red"});
      }
      if(path.length > 0){
        network.body.data.nodes.update({id: `${path[0]}`, color:"green"});
        network.body.data.nodes.update({id: `${path[path.length - 1]}`, color: "red"});
      }
      return () => {
        network.destroy();
      };
    } catch (error) {
      console.error("An error occurred in the second useEffect: ", error);
    }
  }, [nodes, edges, path, routeEdgeId]);

  return (<div ref={visJsRef} className="graph" />);
}

export default GraphProcessor;